import { useEffect } from 'react';
import './ProfessionalPortfolio.css';

function ProfessionalPortfolio({ onToggleTheme }) {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin === window.location.origin && event.data?.type === 'hak3r:dark-mode') {
        onToggleTheme();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onToggleTheme]);

  return (
    <div className="professional-layout">
      <iframe
        className="hak3r-lightmode"
        title="Chanwit Loeyos cybersecurity portfolio"
        src="/hak3r/index.html"
      />
    </div>
  );
}

export default ProfessionalPortfolio;
