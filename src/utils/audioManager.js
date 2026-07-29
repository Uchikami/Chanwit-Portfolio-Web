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
 * @param {number} fadeInMs - Milliseconds to fade in.
 * @returns {object} The audio node object for stopping later.
 */
export const playAudio = (url, volume = 1, onended = null, loop = false, playbackRate = 1.0, fadeInMs = 0) => {
  // Ensure it's tracked/preloaded
  if (!htmlFallbacks[url]) {
    preloadAudio(url, volume);
  }

  // Use Web Audio API if buffer is ready and context is running
  if (audioBuffers[url] && audioCtx.state === 'running') {
    const source = audioCtx.createBufferSource();
    const gainNode = audioCtx.createGain();
    if (fadeInMs > 0) {
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + fadeInMs / 1000);
    } else {
      gainNode.gain.value = volume;
    }
    
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
  if (fb._fadeInterval) clearInterval(fb._fadeInterval);
  
  if (fadeInMs > 0) {
    fb.volume = 0;
    const step = volume / (fadeInMs / 50);
    fb._fadeInterval = setInterval(() => {
      if (fb.volume + step >= volume) {
        fb.volume = volume;
        clearInterval(fb._fadeInterval);
      } else {
        fb.volume += step;
      }
    }, 50);
  } else {
    fb.volume = volume;
  }
  
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

/**
 * Plays an ambient track with crossfade looping.
 * @param {string} url - The URL to the audio file.
 * @param {number} volume - Volume from 0 to 1.
 * @param {number} crossfadeSec - Seconds to crossfade at the end of the track.
 * @returns {object} The audio node object for stopping later.
 */
export const playAmbientLoop = (url, volume = 0.5, crossfadeSec = 5) => {
  if (!htmlFallbacks[url]) preloadAudio(url, volume);
  
  const handle = { stopped: false, timeout: null, nodes: [], fallback: null };
  
  const startLoop = async () => {
    let attempts = 0;
    // Wait for buffer to be decoded or fail after 5 seconds
    while (audioBuffers[url] === undefined && !handle.stopped && attempts < 25) {
      await new Promise(r => setTimeout(r, 200));
      attempts++;
    }
    
    if (handle.stopped) return;

    if (audioCtx.state === 'suspended') {
      try { await audioCtx.resume(); } catch (e) {}
    }
    
    // If Web Audio failed to load or is not running, fallback to basic HTML Audio loop
    if (!audioBuffers[url] || audioCtx.state !== 'running') {
      console.warn('[Audio] WebAudio unavailable or buffer failed. Falling back to HTML Audio for ambient loop.');
      const fallback = htmlFallbacks[url];
      const fb = fallback ? fallback.audio : new Audio(url);
      fb.currentTime = 0;
      fb.volume = volume;
      fb.loop = true;
      fb.preservesPitch = false;
      fb.play().catch(() => {});
      handle.fallback = fb;
      return;
    }
    
    const buffer = audioBuffers[url];
    const duration = buffer.duration;
    const loopInterval = duration - crossfadeSec;
    
    let nextStartTime = audioCtx.currentTime;
    
    const scheduleNext = (isFirst) => {
      if (handle.stopped) return;
      
      const source = audioCtx.createBufferSource();
      const gainNode = audioCtx.createGain();
      source.buffer = buffer;
      source.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      // Fade in (shorter initial fade-in, full crossfade for subsequent)
      gainNode.gain.setValueAtTime(0, nextStartTime);
      gainNode.gain.linearRampToValueAtTime(volume, nextStartTime + (isFirst ? 2 : crossfadeSec));
      
      // Fade out at the end
      gainNode.gain.setValueAtTime(volume, Math.max(nextStartTime, nextStartTime + duration - crossfadeSec));
      gainNode.gain.linearRampToValueAtTime(0, nextStartTime + duration);
      
      source.start(nextStartTime);
      source.stop(nextStartTime + duration);
      
      handle.nodes.push({ source, gainNode });
      // Cleanup old nodes to prevent memory leak
      handle.nodes = handle.nodes.filter(n => audioCtx.currentTime < nextStartTime + duration);
      
      nextStartTime += loopInterval;
      
      // Schedule the next loop roughly 2 seconds before the current one finishes its interval
      const timeToNextScheduleMs = (loopInterval - 2) * 1000; 
      handle.timeout = setTimeout(() => scheduleNext(false), Math.max(0, timeToNextScheduleMs));
    };
    
    scheduleNext(true);
  };
  
  startLoop();
  return { type: 'ambientLoop', handle };
};

/**
 * Stops an audio node.
 * @param {object} node - The audio node returned by playAudio.
 * @param {number} fadeOutMs - Milliseconds to fade out.
 */
export const stopAudio = (node, fadeOutMs = 0) => {
  if (!node) return;
  
  if (node.type === 'ambientLoop') {
    node.handle.stopped = true;
    if (node.handle.timeout) clearTimeout(node.handle.timeout);
    
    if (node.handle.fallback) {
      const fb = node.handle.fallback;
      if (fb._fadeInterval) clearInterval(fb._fadeInterval);
      if (fadeOutMs > 0) {
        const step = fb.volume / (fadeOutMs / 50);
        fb._fadeInterval = setInterval(() => {
          if (fb.volume - step <= 0) {
            fb.volume = 0;
            fb.pause();
            fb.currentTime = 0;
            clearInterval(fb._fadeInterval);
          } else {
            fb.volume -= step;
          }
        }, 50);
      } else {
        fb.pause();
        fb.currentTime = 0;
      }
    }
    
    node.handle.nodes.forEach(n => {
      try {
        if (fadeOutMs > 0) {
          const currTime = audioCtx.currentTime;
          n.gainNode.gain.cancelScheduledValues(currTime);
          n.gainNode.gain.setValueAtTime(n.gainNode.gain.value, currTime);
          n.gainNode.gain.linearRampToValueAtTime(0, currTime + fadeOutMs / 1000);
          setTimeout(() => { try { n.source.stop(); } catch(e){} }, fadeOutMs);
        } else {
          n.gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
          n.source.stop();
        }
      } catch (e) {}
    });
    return;
  }

  if (node.type === 'webaudio') {
    try {
      if (fadeOutMs > 0) {
        const currTime = audioCtx.currentTime;
        node.gainNode.gain.cancelScheduledValues(currTime);
        node.gainNode.gain.setValueAtTime(node.gainNode.gain.value, currTime);
        node.gainNode.gain.linearRampToValueAtTime(0, currTime + fadeOutMs / 1000);
        setTimeout(() => {
          try { node.source.stop(); } catch (e) {}
        }, fadeOutMs);
      } else {
        node.gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        node.source.stop();
      }
    } catch (e) { /* already stopped */ }
  } else if (node.type === 'html') {
    if (node.audio._fadeInterval) clearInterval(node.audio._fadeInterval);
    if (fadeOutMs > 0) {
      const step = node.audio.volume / (fadeOutMs / 50);
      node.audio._fadeInterval = setInterval(() => {
        if (node.audio.volume - step <= 0) {
          node.audio.volume = 0;
          node.audio.pause();
          node.audio.currentTime = 0;
          clearInterval(node.audio._fadeInterval);
        } else {
          node.audio.volume -= step;
        }
      }, 50);
    } else {
      node.audio.pause();
      node.audio.currentTime = 0;
    }
  }
};
