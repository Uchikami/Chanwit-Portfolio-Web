import { useEffect, useState } from 'react';
import HackerPortfolio from './HackerPortfolio';
import ProfessionalPortfolio from './ProfessionalPortfolio';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return isDark
    ? <HackerPortfolio onToggleTheme={() => setIsDark(false)} />
    : <ProfessionalPortfolio onToggleTheme={() => setIsDark(true)} />;
}

export default App;
