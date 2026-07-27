import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Activities from './components/Activities';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import HackerCursor from './components/HackerCursor';
import './App.css';

function HackerPortfolio({ onToggleTheme, playInitSound }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAFK, setIsAFK] = useState(false);
  const [glitchClass, setGlitchClass] = useState('js-glitch-active');

  useEffect(() => {
    // We keep isAFK state in case we want other AFK behaviors later
    let timeoutId;
    const resetTimer = () => {
      setIsAFK(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsAFK(true), 8000);
    };
    resetTimer();
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('click', resetTimer);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, []);

  useEffect(() => {
    const sfxGlitch1 = new Audio('/assets/sound/glitch_1.mp3');
    const sfxGlitch2 = new Audio('/assets/sound/glitch_2.mp3');
    const sfxGlitch3 = new Audio('/assets/sound/glitch_3.mp3');
    sfxGlitch1.volume = 0.15;
    sfxGlitch2.volume = 0.15;
    sfxGlitch3.volume = 0.15;
    const glitches = [sfxGlitch1, sfxGlitch2, sfxGlitch3];

    let timerId;
    let initialTimerId;
    let tearTimerId;

    const playRandomGlitch = () => {
      const isAlt = Math.random() > 0.5;
      setGlitchClass(isAlt ? 'js-glitch-active-2' : 'js-glitch-active');
      
      const audio = glitches[Math.floor(Math.random() * glitches.length)];
      audio.currentTime = 0;
      audio.play().catch(e => {});
      
      tearTimerId = setTimeout(() => setGlitchClass(''), 150); // Normal quick tear duration

      const nextDelay = 4000 + Math.random() * 6000;
      timerId = setTimeout(playRandomGlitch, nextDelay);
    };

    // Just a quick 150ms entrance glitch with sound
    sfxGlitch1.play().catch(e => {});

    if (playInitSound) {
      const sfxAccess = new Audio("/assets/sound/i'm_in.mp3");
      sfxAccess.volume = 0.7;
      sfxAccess.play().catch(() => {
        // Autoplay fallback
        const playOnInteract = () => {
          sfxAccess.play().catch(e => {});
          window.removeEventListener('click', playOnInteract);
          window.removeEventListener('keydown', playOnInteract);
        };
        window.addEventListener('click', playOnInteract);
        window.addEventListener('keydown', playOnInteract);
      });
    }
    
    initialTimerId = setTimeout(() => {
      setGlitchClass('');
      timerId = setTimeout(playRandomGlitch, 3000);
    }, 150);

    return () => {
      clearTimeout(initialTimerId);
      clearTimeout(tearTimerId);
      clearTimeout(timerId);
      glitches.forEach(a => a.pause());
    };
  }, []);

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <filter id="glitch-tear-1"><feTurbulence type="fractalNoise" baseFrequency="0 0.15" numOctaves="1" result="warp" /><feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp" /></filter>
        <filter id="glitch-tear-2"><feTurbulence type="fractalNoise" baseFrequency="0 0.3" numOctaves="1" result="warp" /><feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="50" in="SourceGraphic" in2="warp" /></filter>
      </svg>
      <div className="crt-glitch-overlay" />
      <HackerCursor />
      <Navbar isDark onToggleTheme={onToggleTheme} isLoggingOut={isLoggingOut} setIsLoggingOut={setIsLoggingOut} />
      <main className={`${isLoggingOut ? 'logging-out' : ''} ${glitchClass}`}>
        <Hero isDark isLoggingOut={isLoggingOut} />
        <About isDark /><Skills isDark /><Projects isDark={true} /><Activities isDark={true} /><Certifications isDark={true} /><Contact isDark={true} />
      </main>
      <footer className="footer"><div className="container"><p>Designed & Built by Chanwit Loeyos &middot; {new Date().getFullYear()}</p></div></footer>
    </>
  );
}

export default HackerPortfolio;
