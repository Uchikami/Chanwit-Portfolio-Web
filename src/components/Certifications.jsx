import { useState, useEffect } from 'react';
import './Certifications.css';

const certifications = [
  // The 3 Verified Links
  {
    id: 1,
    name: 'Cyber Security 101 (SEC1) Certificate',
    issuer: 'TryHackMe',
    date: '2024',
    image: '/certs/Cyber Security 101 (SEC1) Certificate.jpg',
    link: 'https://assets.tryhackme.com/certification-certificate/69974832a981bfe768a733a4.pdf'
  },
  {
    id: 2,
    name: 'Pre Security Certificate',
    issuer: 'TryHackMe',
    date: '2024',
    image: '/certs/Pre Security Certificate.png',
    link: 'https://tryhackme.com/certificate/THM-FC1YEUACMM'
  },
  {
    id: 3,
    name: 'Cyber Security 101 Certificate',
    issuer: 'TryHackMe',
    date: '2024',
    image: '/certs/Cyber Security 101 Certificate.png',
    link: 'https://tryhackme.com/certificate/THM-KBAFHETJ7S'
  },
  // The 5 Pictures
  {
    id: 4,
    name: 'Linux 100 Fundamentals',
    issuer: 'Organization',
    date: '2024',
    image: '/certs/Linux 100 Fundamentals.jpg',
    link: null
  },
  {
    id: 5,
    name: 'BU MINI CTF COMPETITION 2026',
    issuer: 'Organization',
    date: '2026',
    image: '/certs/BU MINI CTF COMPETITION 2026.jpg',
    link: null
  },
  {
    id: 6,
    name: 'Cyber Security Forensics (Online + Workshop)',
    issuer: 'Organization',
    date: '2024',
    image: '/certs/Cyber Security Forensics (Online + Workshop).jpg',
    link: null
  },
  {
    id: 7,
    name: 'Thailand Cyber Top Talent 2023',
    issuer: 'Organization',
    date: '2023',
    image: '/certs/Thailand Cyber Top Talent 2023.jpg',
    link: null
  },
  {
    id: 8,
    name: 'Thailand Cyber Top Talent 2025',
    issuer: 'Organization',
    date: '2025',
    image: '/certs/Thailand Cyber Top Talent 2025.jpg',
    link: null
  }
];

const ScrambleText = ({ targetText, isHovered, delay = 0 }) => {
  const [text, setText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    if (!isHovered) {
      setText('');
      return;
    }

    let iteration = 0;
    let interval = null;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setText(targetText
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return targetText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
        );

        if (iteration >= targetText.length) {
          clearInterval(interval);
        }

        iteration += 1 / 2;
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isHovered, targetText, delay]);

  return <span>{text || ' '}</span>;
};

const CertCard = ({ cert, isDark }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={cert.link || cert.image}
      target="_blank"
      rel="noopener noreferrer"
      className="cert-cyber-frame"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="cyber-frame-inner">
        {/* Glowing Corner Accents */}
        <div className="cyber-corner top-left"></div>
        <div className="cyber-corner bottom-right"></div>

        <div className="cyber-image-container">
          <img src={cert.image} alt={cert.name} className="cyber-image" />
          {isDark && (
            <div className="cyber-overlay">
              <div className="light-glow"></div>
              <div className="light-sweep"></div>

              <div className="fetch-sequence">
                <ScrambleText targetText="> DECRYPTING_FILE" isHovered={isHovered} delay={0} />
                <ScrambleText targetText="> BYPASSING_SEC_PROTOCOLS" isHovered={isHovered} delay={400} />
                <ScrambleText targetText="> PAYLOAD_EXTRACTED" isHovered={isHovered} delay={800} />
                {isHovered && <span className="blink-text" style={{ animationDelay: '1.2s' }}>&gt; [ CLICK_TO_EXECUTE ]</span>}
              </div>
            </div>
          )}
        </div>

        <div className="cyber-data">
          <h3 className="cyber-title">{cert.name}</h3>
          <div className="cyber-meta">
            <span className="cyber-issuer">{cert.issuer}</span>
            <span className="cyber-date">{cert.date}</span>
          </div>
          {cert.link && (
            <div className="cyber-verify-btn">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              Verify Credential
            </div>
          )}
        </div>
      </div>
    </a>
  );
};

const Certifications = ({ isDark = true }) => {
  return (
    <section id="certifications" className="certifications-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Clearance Levels</span>
          <h2 className="section-title">Credentials</h2>
          <div className="section-divider" />
        </div>

        <div className="certs-grid">
          {certifications.map((cert) => (
            <CertCard key={cert.id} cert={cert} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
