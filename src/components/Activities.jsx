import { useEffect, useRef, useState } from 'react';
import { Crosshair, ExternalLink, X } from 'lucide-react';
import './Activities.css';

const activities = [
  {
    id: 1,
    type: 'AWARD',
    title: 'IT Empowering Day Award',
    date: '2026',
    status: 'ACHIEVED',
    description: 'Received an award at the university\'s IT Empowering Day for the "COSI: Skywarden Acoustic Anti-Drone" project. Successfully presented the deep learning-based acoustic detection model to academic panels and industry professionals, demonstrating its real-world application in defense technology.',
    image: '/activities/IMG_3373.jpg'
  },
  {
    id: 2,
    type: 'COMPETITION',
    title: 'BU Mini CTF',
    date: '2026',
    status: 'COMPLETED',
    description: 'Participated in the BU Mini CTF competition organized by the faculty. Engaged in solving practical cybersecurity challenges, applying analytical thinking to tackle various categories such as web exploitation, cryptography, and reverse engineering. This hands-on experience sparked a deep interest and served as the starting point for my journey into the cybersecurity field.',
    image: '/activities/bu_mini_ctf.jpg'
  },
  {
    id: 3,
    type: 'CERTIFICATION',
    title: 'Pre Security Certificate',
    date: '2026',
    status: 'ACQUIRED',
    description: 'Successfully completed the TryHackMe Pre Security learning path, gaining foundational knowledge in cybersecurity, networking, and web mechanics.',
    image: '/certs/Pre Security Certificate.png',
    verifyLink: 'https://tryhackme.com/certificate/THM-FC1YEUACMM'
  },
  {
    id: 4,
    type: 'CERTIFICATION',
    title: 'Cyber Security 101',
    date: '2026',
    status: 'ACQUIRED',
    description: 'Completed the Cyber Security 101 certification, mastering core security concepts and threat landscape fundamentals.',
    image: '/certs/Cyber Security 101 Certificate.png',
    verifyLink: 'https://tryhackme.com/certificate/THM-KBAFHETJ7S'
  },
  {
    id: 5,
    type: 'CERTIFICATION',
    title: 'Linux 100 Fundamentals',
    date: '2025',
    status: 'ACQUIRED',
    description: 'Achieved proficiency in Linux operating system operations, including command-line navigation, file permissions, and system administration.',
    image: '/certs/Linux 100 Fundamentals.jpg'
  },
  {
    id: 6,
    type: 'COMPETITION',
    title: 'Thailand Cyber Top Talent 2023',
    date: '2023',
    status: 'COMPLETED',
    description: 'Competed against top cybersecurity talents across Thailand in a rigorous national CTF competition, solving complex security challenges.',
    image: '/certs/Thailand Cyber Top Talent 2023.jpg'
  },
  {
    id: 7,
    type: 'COMPETITION',
    title: 'Thailand Cyber Top Talent 2025',
    date: '2025',
    status: 'COMPLETED',
    description: 'Returned to compete in the national-level Thailand Cyber Top Talent CTF, applying advanced offensive and defensive techniques under pressure.',
    image: '/certs/Thailand Cyber Top Talent 2025.jpg'
  },
  {
    id: 8,
    type: 'TRAINING',
    title: 'Cyber Security Forensics',
    date: '2026',
    status: 'COMPLETED',
    description: 'Participated in an intensive digital forensics workshop, learning how to analyze cyber incidents, acquire evidence, and trace malicious activities.',
    image: '/certs/Cyber Security Forensics (Online + Workshop).jpg'
  }
];

const Activities = ({ isDark = true }) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [selectedImage, setSelectedImage] = useState(null);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const timelineRef = useRef(null);

  const handleOpenImage = (img) => {
    setSelectedImage(img);
    setIsClosingModal(false);
  };

  const handleCloseImage = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setSelectedImage(null);
      setIsClosingModal(false);
    }, 280); // match css animation duration
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-id'));
            setVisibleItems(prev => {
              if (prev.has(id)) return prev;

              // Play fade-in sound with random pitch in dark mode
              if (isDark) {
                const audio = new Audio('/assets/sound/activis_fade-in.mp3');
                audio.volume = 0.5;
                audio.playbackRate = 0.85 + Math.random() * 0.3; // Random pitch between 0.85 and 1.15
                audio.preservesPitch = false; // Ensures playbackRate changes pitch in modern browsers
                audio.play().catch(e => console.log(e));
              }

              const newSet = new Set(prev);
              newSet.add(id);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.timeline-node');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, [isDark]);

  return (
    <section id="activities" className="activities-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Log History</span>
          <h2 className="section-title">Activities</h2>
          <div className="section-divider" />
        </div>

        <div className="timeline-container" ref={timelineRef}>
          <div className="timeline-traceroute"></div>
          
          {activities.map((act, index) => {
            const isVisible = visibleItems.has(act.id);
            const side = index % 2 === 0 ? 'left' : 'right';

            return (
              <div 
                key={act.id} 
                data-id={act.id}
                className={`timeline-node ${side} ${isVisible ? 'visible' : ''}`}
              >
                {/* Center marker */}
                <div className="timeline-marker">
                  <div className="marker-core">
                    <Crosshair size={16} />
                  </div>
                </div>

                {/* Content Block */}
                <div className="timeline-content card">
                  <div className="log-header">
                    <span className="log-id">OP_ID: {act.id.toString().padStart(2, '0')}</span>
                    <span className="log-date">[{act.date}]</span>
                  </div>
                  
                  <div className="log-image-wrapper" onClick={() => handleOpenImage(act.image)}>
                    <img src={act.image} alt={act.title} className="log-image" />
                    <div className="scanline-overlay"></div>
                  </div>

                  <div className="log-data">
                    <div className="data-field">
                      <span className="field-label">TYPE:</span>
                      <span className="field-value highlight">{act.type}</span>
                    </div>
                    
                    <div className="data-field">
                      <span className="field-label">TARGET:</span>
                      <h4 className="field-value title">{act.title}</h4>
                    </div>

                    <div className="data-field block">
                      <span className="field-label">REPORT:</span>
                      <p className="field-value desc">{act.description}</p>
                    </div>

                    <div className="data-field">
                      <span className="field-label">STATUS:</span>
                      <span className="field-value status">{act.status}</span>
                    </div>

                    {act.verifyLink && (
                      <div className="data-field" style={{ marginTop: '10px' }}>
                        <a href={act.verifyLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                          <ExternalLink size={14} /> VERIFY RECORD
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedImage && (
        <div className={`image-modal-overlay ${isClosingModal ? 'closing' : ''}`} onClick={handleCloseImage}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={handleCloseImage}>
              <X size={24} />
            </button>
            <img src={selectedImage} alt="Full Size Preview" className="image-modal-img" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Activities;
