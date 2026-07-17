import { useEffect, useRef } from 'react';
import './ProfessionalPortfolio.css';

function ProfessionalPortfolio({ onToggleTheme }) {
  const iframeRef = useRef(null);
  const iframeSrc = `${import.meta.env.BASE_URL}hak3r/index.html`;

  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.origin === window.location.origin &&
        event.source === iframeRef.current?.contentWindow &&
        event.data?.type === 'hak3r:dark-mode'
      ) {
        onToggleTheme();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onToggleTheme]);

  return (
    <div className="professional-layout">
      <iframe
        ref={iframeRef}
        className="hak3r-lightmode"
        title="Chanwit Loeyos cybersecurity portfolio"
        src={iframeSrc}
      />
    </div>
  );
}

export default ProfessionalPortfolio;
