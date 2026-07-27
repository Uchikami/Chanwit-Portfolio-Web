import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './HackerTransition.css';

const HackerTransition = ({ onComplete }) => {
  const [phase, setPhase] = useState(1);
  const [lines, setLines] = useState(0);

  useEffect(() => {
    const sfxAlert = new Audio('/assets/sound/red_alert.mp3');
    const sfxSnap = new Audio('/assets/sound/thanos_snap.mp3');
    const sfxHackscene = new Audio('/assets/sound/hackscene.mp3');
    
    sfxAlert.volume = 0.5;
    sfxSnap.volume = 0.8;
    sfxHackscene.volume = 0.4;

    const playSound = (audioObj) => {
      audioObj.currentTime = 0;
      audioObj.play().catch(e => {});
    };

    playSound(sfxAlert);

    const t1 = setTimeout(() => {
      setPhase(2);
      sfxAlert.pause(); // Sync redalert stop with phase end
      playSound(sfxSnap);
    }, 1500);

    const t2 = setTimeout(() => {
      setPhase(3);
      playSound(sfxHackscene);
    }, 2500);

    const t3 = setTimeout(() => setLines(1), 2500);
    const t4 = setTimeout(() => setLines(2), 3100);
    const t5 = setTimeout(() => setLines(3), 3700);
    const t6 = setTimeout(() => onComplete(), 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);

      sfxAlert.pause();
      sfxSnap.pause();
      sfxHackscene.pause();
    };
  }, [onComplete]);

  // Apply dusting class to the root app element
  useEffect(() => {
    const root = document.getElementById('root');
    const originalBodyBg = document.body.style.backgroundColor;
    
    if (phase >= 2) {
      document.body.style.backgroundColor = '#000'; // Make background black so it dusts into darkness
      if (root) root.classList.add('page-dusting');
    }

    return () => {
      document.body.style.backgroundColor = originalBodyBg;
      if (root) root.classList.remove('page-dusting');
    };
  }, [phase]);

  const overlayContent = (
    <div className={`hacker-transition-overlay ${phase === 1 ? 'phase-red-alert' : phase === 2 ? 'phase-glitch' : 'phase-terminal'}`}>
      
      {/* SVG filter always rendered so the DOM has it ready for Phase 2 */}
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
            <div className="progress-bar"></div>
          </div>
        </div>
      )}

      {/* Phase 2 overlay is now transparent to show the page dusting underneath */}
      {phase === 2 && (
        <div style={{ width: '100%', height: '100%' }}></div>
      )}

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
