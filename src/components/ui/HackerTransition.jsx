import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './HackerTransition.css';

// ─── Web Audio API Setup ──────────────────────────────────────────────────────
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const audioBuffers = {};

const SOUNDS = {
  alert:     { url: '/assets/sound/red_alert.mp3',   volume: 0.5 },
  snap:      { url: '/assets/sound/thanos_snap.mp3', volume: 0.8 },
  hackscene: { url: '/assets/sound/hackscene.mp3',   volume: 0.4 },
  access:    { url: "/assets/sound/i'm_in.mp3",      volume: 0.7 },
};

// HTMLAudio fallback objects — always ready regardless of AudioContext state
const htmlFallbacks = {};
Object.entries(SOUNDS).forEach(([key, { url, volume }]) => {
  const a = new Audio(url);
  a.preload = 'auto';
  a.volume = volume;
  htmlFallbacks[key] = a;
});

const fetchAndDecode = async (key) => {
  try {
    const res = await fetch(SOUNDS[key].url);
    const buf = await res.arrayBuffer();
    audioBuffers[key] = await audioCtx.decodeAudioData(buf);
  } catch (e) {
    console.warn(`[Audio] Failed to preload ${key}:`, e);
  }
};

// Start decoding all sounds immediately on module load
Object.keys(SOUNDS).forEach(fetchAndDecode);

// Resume AudioContext + ensure buffers loaded on FIRST user interaction
let warmedUp = false;
const warmup = () => {
  if (warmedUp) return;
  warmedUp = true;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  // Re-fetch any buffers that didn't finish loading yet
  Object.keys(SOUNDS).forEach((key) => {
    if (!audioBuffers[key]) fetchAndDecode(key);
  });
};

// Attach to every possible first-interaction event
['mousedown', 'touchstart', 'keydown', 'scroll'].forEach((evt) =>
  document.addEventListener(evt, warmup, { once: true, passive: true })
);

// ─── Play / Stop helpers ──────────────────────────────────────────────────────
const playSound = (key, onended = null) => {
  const { volume } = SOUNDS[key];

  // Use Web Audio API if buffer is ready and context is running
  if (audioBuffers[key] && audioCtx.state === 'running') {
    const source   = audioCtx.createBufferSource();
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = volume;
    source.buffer = audioBuffers[key];
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    if (onended) source.onended = onended;
    source.start(0);
    return { type: 'webaudio', source, gainNode };
  }

  // Fallback: HTMLAudio
  const fb = htmlFallbacks[key];
  fb.currentTime = 0;
  if (onended) fb.addEventListener('ended', onended, { once: true });
  fb.play().catch(() => {});
  return { type: 'html', audio: fb };
};

const stopSound = (node) => {
  if (!node) return;
  if (node.type === 'webaudio') {
    try {
      node.gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      node.source.stop();
    } catch (e) { /* already stopped */ }
  } else if (node.type === 'html') {
    node.audio.pause();
    node.audio.currentTime = 0;
  }
};

// ─── Export for instant play from onClick (same user-gesture frame) ──────────
let alertNode = null; // store so HackerTransition can attach onended
export const playAlertImmediate = () => {
  alertNode = playSound('alert');
  return alertNode;
};

// ─── Component ────────────────────────────────────────────────────────────────
const HackerTransition = ({ onComplete, skipAlert = false }) => {
  const [phase, setPhase] = useState(0);
  const [lines, setLines] = useState(0);

  // Store onComplete in a ref so it doesn't trigger effect re-runs if its identity changes
  const onCompleteRef = useRef(onComplete);
  useLayoutEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Get actual audio duration for CSS animation (fallback 2s)
  const alertDurationMs = audioBuffers['alert']
    ? Math.round(audioBuffers['alert'].duration * 1000)
    : 2000;

  useLayoutEffect(() => {
    if (audioCtx.state === 'suspended') audioCtx.resume();

    let isCancelled = false;
    let t2, t3, t4, t5, t5_5, t6;
    let nodeSnap, nodeHackscene;

    // Called exactly when red_alert sound ends — perfectly synced
    const onAlertEnded = () => {
      if (isCancelled) return;
      setPhase(2);
      nodeSnap = playSound('snap');

      t2 = setTimeout(() => {
        if (isCancelled) return;
        setPhase(3);
        nodeHackscene = playSound('hackscene');
      }, 1000);

      t3 = setTimeout(() => !isCancelled && setLines(1), 1000);
      t4 = setTimeout(() => !isCancelled && setLines(2), 1600);
      t5 = setTimeout(() => !isCancelled && setLines(3), 2200);
      t5_5 = setTimeout(() => { if (!isCancelled) playSound('access'); }, 2850);
      t6 = setTimeout(() => {
        if (!isCancelled && onCompleteRef.current) onCompleteRef.current();
      }, 3000);
    };

    setPhase(1);

    if (skipAlert && alertNode) {
      // Sound already playing from onClick — attach onended to existing node
      if (alertNode.type === 'webaudio') {
        alertNode.source.onended = onAlertEnded;
      } else if (alertNode.type === 'html') {
        alertNode.audio.addEventListener('ended', onAlertEnded, { once: true });
      }
    } else {
      // Play alert here and listen for end
      playSound('alert', onAlertEnded);
    }

    return () => {
      isCancelled = true;
      clearTimeout(t2); clearTimeout(t3);
      clearTimeout(t4); clearTimeout(t5); clearTimeout(t5_5); clearTimeout(t6);
      stopSound(nodeSnap);
      stopSound(nodeHackscene);
      // Intentionally NOT stopping 'access'
    };
  }, []); // Remove onComplete from dependencies, we use the ref now

  // Apply dusting class to the root app element
  useEffect(() => {
    const root = document.getElementById('root');
    const originalBodyBg = document.body.style.backgroundColor;

    if (phase >= 2) {
      document.body.style.backgroundColor = '#000';
      if (root) root.classList.add('page-dusting');
    }

    return () => {
      document.body.style.backgroundColor = originalBodyBg;
      if (root) root.classList.remove('page-dusting');
    };
  }, [phase]);

  const overlayContent = (
    <div className={`hacker-transition-overlay ${phase === 1 ? 'phase-red-alert' : phase === 2 ? 'phase-glitch' : 'phase-terminal'}`}>

      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <filter id="thanos-dust" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.15" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="25" xChannelSelector="R" yChannelSelector="G" result="displaced" />
        </filter>
      </svg>

      {phase === 1 && (
        <div className="breach-modal">
          <div className="breach-title">[ WARNING: UNAUTHORIZED ACCESS DETECTED ]</div>
          <div className="text-sm">Initiating countermeasures...</div>
          <div className="progress-container">
            {/* Duration driven by actual audio length */}
            <div className="progress-bar" style={{ animationDuration: `${alertDurationMs}ms` }}></div>
          </div>
        </div>
      )}

      {phase === 2 && <div style={{ width: '100%', height: '100%' }}></div>}

      {phase === 3 && (
        <div className="terminal-text-container">
          {lines >= 1 && <div className="terminal-line line-1">&gt; INITIALIZING SECRET MODE...</div>}
          {lines >= 2 && <div className="terminal-line line-2">&gt; BYPASSING MAINFRAME...</div>}
          {lines >= 3 && (
            <div className="terminal-line line-3">
              &gt; ACCESS GRANTED. <span className="cursor"></span>
            </div>
          )}
          {lines < 3 && <div style={{ height: '1.2rem' }}><span className="cursor"></span></div>}
        </div>
      )}
    </div>
  );

  return createPortal(overlayContent, document.body);
};

export default HackerTransition;
