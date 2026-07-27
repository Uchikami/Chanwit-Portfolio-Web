import { useEffect, useState } from 'react';
import HackerPortfolio from './pages/HackerPortfolio';
import ProfessionalPortfolio from './pages/ProfessionalPortfolio';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // Higher = more responsive / follows mouse faster (default is 0.1)
      wheelMultiplier: 1.1, // Slightly faster scroll distance
      smoothTouch: false,
    });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      window.lenis = null;
      lenis.destroy();
    };
  }, []);

  return isDark
    ? <HackerPortfolio onToggleTheme={() => { setIsDark(false); }} />
    : <ProfessionalPortfolio onToggleTheme={() => { setIsDark(true); }} />;
}

export default App;
