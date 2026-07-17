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

function HackerPortfolio({ onToggleTheme }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAFK, setIsAFK] = useState(false);

  useEffect(() => {
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

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <filter id="glitch-tear-1"><feTurbulence type="fractalNoise" baseFrequency="0 0.15" numOctaves="1" result="warp" /><feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp" /></filter>
        <filter id="glitch-tear-2"><feTurbulence type="fractalNoise" baseFrequency="0 0.3" numOctaves="1" result="warp" /><feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="50" in="SourceGraphic" in2="warp" /></filter>
      </svg>
      <div className="crt-glitch-overlay" />
      <HackerCursor />
      <Navbar isDark onToggleTheme={onToggleTheme} isLoggingOut={isLoggingOut} setIsLoggingOut={setIsLoggingOut} />
      <main className={`${isLoggingOut ? 'logging-out' : ''} ${isAFK ? 'afk-glitch' : ''}`}>
        <Hero isDark isLoggingOut={isLoggingOut} />
        <About isDark /><Skills isDark /><Projects isDark={true} /><Activities isDark={true} /><Certifications isDark={true} /><Contact isDark={true} />
      </main>
      <footer className="footer"><div className="container"><p>Designed & Built by Chanwit Loeyos &middot; {new Date().getFullYear()}</p></div></footer>
    </>
  );
}

export default HackerPortfolio;
