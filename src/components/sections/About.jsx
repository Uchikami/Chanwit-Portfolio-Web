import { GraduationCap } from 'lucide-react';
import './About.css';

const About = ({ isDark }) => {
  const education = [
    {
      degree: 'Science-Mathematics',
      school: 'Pua School',
      period: '2020 - 2023',
      detail: 'GPA: 3.32',
    },
    {
      degree: 'B.S. in Computer Science',
      school: 'Bangkok University (School of Information Technology and Innovation)',
      period: '2023 - Present (Expected Graduation: 2027)',
      detail: 'Current GPA: 3.91',
    },
  ];

  return (
    <section id="about" style={{ position: 'relative', overflow: 'hidden' }}>
      {isDark && (
        <div className="about-hacker-bg">
          <div className="circuit-nodes"></div>
          <div className="scrolling-logs">
            [SYS] Initialization sequence complete...<br/>
            [SYS] Scanning network interfaces...<br/>
            [OK] eth0: 192.168.1.100<br/>
            [WARN] Unauthorized access attempt detected on port 22...<br/>
            [INFO] Firewall rule updated...<br/>
            [SYS] Analyzing traffic patterns...<br/>
            [OK] Connection secure...<br/>
            [SYS] Loading profile: Chanwit Loeyos...<br/>
            [OK] Profile loaded successfully.<br/>
            [SYS] Initialization sequence complete...<br/>
            [SYS] Scanning network interfaces...<br/>
            [OK] eth0: 192.168.1.100<br/>
            [WARN] Unauthorized access attempt detected on port 22...<br/>
            [INFO] Firewall rule updated...<br/>
            [SYS] Analyzing traffic patterns...<br/>
            [OK] Connection secure...<br/>
            [SYS] Loading profile: Chanwit Loeyos...<br/>
            [OK] Profile loaded successfully.<br/>
          </div>
        </div>
      )}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <span className="section-label">Background</span>
          <h2 className="section-title">About Me</h2>
          <div className="section-divider" />
        </div>

        <div className="about-layout">
          {/* Bio paragraph */}
          {isDark ? (
            <div className="about-bio card">
              <p>
                I am a 4th year Computer Science student with a strong passion and dedication for Cybersecurity. My journey began when I participated in a CTF (Capture The Flag) competition, which opened my eyes and greatly challenged my problem-solving skills.
              </p>
              <p>
                The thrill of solving those challenges inspired me to seriously study and develop my security skills, ranging from Web Exploitation to Network Analysis.
              </p>
              <p>
                My ultimate goal is to apply my knowledge in a real-world working environment and grow into a Cybersecurity expert in the future.
              </p>
            </div>
          ) : (
            <div className="light-about-container">
              <div className="dossier-content about-bio card">
                <div className="dossier-section">
                  <h4 className="dossier-header">[SUBJECT_PROFILE]</h4>
                  <p>&gt; I am a 4th year Computer Science student with a strong passion and dedication for <span className="keyword-badge">Cybersecurity</span>.</p>
                </div>
                <div className="dossier-section">
                  <h4 className="dossier-header">[ORIGIN_STORY]</h4>
                  <p>&gt; My journey began when I participated in a <span className="keyword-badge">CTF (Capture The Flag)</span> competition, which opened my eyes and greatly challenged my problem-solving skills.</p>
                  <p>&gt; The thrill of solving those challenges inspired me to seriously study and develop my security skills, ranging from <span className="keyword-badge">Web Exploitation</span> to <span className="keyword-badge">Network Analysis</span>.</p>
                </div>
                <div className="dossier-section">
                  <h4 className="dossier-header">[OBJECTIVE]</h4>
                  <p>&gt; My ultimate goal is to apply my knowledge in a real-world working environment and grow into a Cybersecurity expert in the future.</p>
                </div>
              </div>
            </div>
          )}

          {/* Education */}
          <div className="about-section">
            <div className="about-section-title">
              <GraduationCap size={18} />
              <h3>Education</h3>
            </div>
            <div className="timeline">
              {education.map((item, i) => (
                <div key={i} className="timeline-item card">
                  <div className="timeline-period">{item.period}</div>
                  <div className="timeline-body">
                    <h4 className="timeline-title">{item.degree}</h4>
                    <p className="timeline-sub">{item.school}</p>
                    {item.detail && <p className="timeline-detail">{item.detail}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
