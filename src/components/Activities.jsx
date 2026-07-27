import { useEffect, useRef, useState } from 'react';
import { Crosshair } from 'lucide-react';
import './Activities.css';

const activities = [
  {
    id: 1,
    type: 'COMPETITION',
    title: 'Hackathon / CTF Competition',
    date: '2024.11',
    status: 'MISSION ACCOMPLISHED',
    description:
      'Participated in [Hackathon Name]. Our team developed [brief description of solution]. My role: [your specific contribution]. Result: [award/ranking if any].',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    type: 'COMMUNITY',
    title: 'CS / Cybersecurity Club',
    date: '2022.08 - PRESENT',
    status: 'ACTIVE OPERATION',
    description:
      'Active member of [Club Name] at university. Organized workshops on network fundamentals and participated in group security research sessions.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    type: 'SEMINAR',
    title: 'Tech Seminar & Training',
    date: '2023.05',
    status: 'DATA ACQUIRED',
    description:
      'Attended [Seminar Name] covering topics in modern cybersecurity trends, cloud security, and zero-trust architecture.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop'
  },
];

const Activities = ({ isDark = true }) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const timelineRef = useRef(null);

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
                  
                  <div className="log-image-wrapper">
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Activities;
