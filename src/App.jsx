import { useEffect, useState } from 'react';
import HackerPortfolio from './HackerPortfolio';
import ProfessionalPortfolio from './ProfessionalPortfolio';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return isDark
    ? <HackerPortfolio onToggleTheme={() => { setIsDark(false); setIsInitialLoad(false); }} playInitSound={isInitialLoad} />
    : <ProfessionalPortfolio onToggleTheme={() => { setIsDark(true); setIsInitialLoad(false); }} />;
}

export default App;
