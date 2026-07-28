// src/utils/audioManager.js

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const audioBuffers = {};
const htmlFallbacks = {};
let warmedUp = false;

const fetchAndDecode = async (url) => {
  if (audioBuffers[url]) return audioBuffers[url]; // Already loaded
  try {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    audioBuffers[url] = await audioCtx.decodeAudioData(buf);
    return audioBuffers[url];
  } catch (e) {
    console.warn(`[Audio] Failed to preload ${url}:`, e);
    return null;
  }
};

export const preloadAudio = (url, volume = 1) => {
  if (!htmlFallbacks[url]) {
    const a = new Audio(url);
    a.preload = 'auto';
    a.volume = volume;
    htmlFallbacks[url] = { audio: a, volume };
    fetchAndDecode(url);
  }
};

export const warmupAudioContext = () => {
  if (warmedUp) return;
  warmedUp = true;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  Object.keys(htmlFallbacks).forEach((url) => {
    if (!audioBuffers[url]) fetchAndDecode(url);
  });
};

if (typeof window !== 'undefined') {
  ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach((evt) =>
    document.addEventListener(evt, warmupAudioContext, { once: true, passive: true })
  );
}

/**
 * Plays an audio file globally.
 * @param {string} url - The URL to the audio file.
 * @param {number} volume - Volume from 0 to 1.
 * @param {function} onended - Callback when the audio ends.
 * @param {boolean} loop - Whether to loop the audio.
 * @param {number} playbackRate - Playback rate multiplier (default 1).
 * @returns {object} The audio node object for stopping later.
 */
export const playAudio = (url, volume = 1, onended = null, loop = false, playbackRate = 1.0) => {
  // Ensure it's tracked/preloaded
  if (!htmlFallbacks[url]) {
    preloadAudio(url, volume);
  }

  // Use Web Audio API if buffer is ready and context is running
  if (audioBuffers[url] && audioCtx.state === 'running') {
    const source = audioCtx.createBufferSource();
    const gainNode = audioCtx.createGain();
    
    gainNode.gain.value = volume;
    source.buffer = audioBuffers[url];
    source.loop = loop;
    source.playbackRate.value = playbackRate;
    
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    if (onended) {
      source.onended = onended;
    }
    source.start(0);
    
    return { type: 'webaudio', source, gainNode, url };
  }

  // Fallback: HTMLAudio
  const fallback = htmlFallbacks[url];
  const fb = fallback ? fallback.audio : new Audio(url);
  
  // Clone node if we want overlapping plays for the same sound (e.g. multiple clicks)
  // For fallback, we just reuse the single audio tag to save memory, which resets currentTime
  fb.currentTime = 0;
  fb.volume = volume;
  fb.loop = loop;
  fb.playbackRate = playbackRate;
  fb.preservesPitch = false;
  
  if (onended) {
    // Need a wrapper to remove listener if it's the same node reused
    const onEndedWrapper = () => {
      onended();
      fb.removeEventListener('ended', onEndedWrapper);
    };
    fb.addEventListener('ended', onEndedWrapper);
  }
  
  fb.play().catch(() => {});
  return { type: 'html', audio: fb, url };
};

export const stopAudio = (node) => {
  if (!node) return;
  if (node.type === 'webaudio') {
    try {
      node.gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      node.source.stop();
      node.source.onended = null;
    } catch (e) {}
  } else if (node.type === 'html') {
    node.audio.pause();
    node.audio.currentTime = 0;
  }
};
