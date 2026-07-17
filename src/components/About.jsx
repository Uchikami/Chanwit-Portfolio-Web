import { GraduationCap, Briefcase } from 'lucide-react';
import './About.css';

const About = ({ isDark }) => {
  const education = [
    {
      degree: 'Bachelor of Science, Computer Science',
      school: 'Your University Name',
      period: '2022 – Present',
      detail: 'Focus on Software Engineering, Networking, and Cybersecurity fundamentals.',
    },
  ];

  const experience = [
    {
      title: 'Internship / Part-time (Placeholder)',
      company: 'Company Name',
      period: '2024',
      detail: 'Replace this with your actual work experience.',
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
                Hello, I am <strong>Chanwit Loeyos</strong>, a student passionate about Cybersecurity and defense system development. I am currently working on my senior project involving AI-based acoustic drone detection to analyze and identify aerial threats.
              </p>
              <p>
                I have a strong interest in Network Analysis and Penetration Testing, with proficiency in tools such as Kali Linux, Wireshark, and Burp Suite.
              </p>
              <p>
                I am currently seeking a <strong>Cyber Security Internship</strong> opportunity to apply my theoretical knowledge in a real-world environment and am eager to deeply learn new techniques in Offensive and Defensive Security.
              </p>
            </div>
          ) : (
            <div className="light-about-container">
              <div className="dossier-content about-bio card">
                <div className="dossier-section">
                  <h4 className="dossier-header">[SUBJECT_PROFILE]</h4>
                  <p>&gt; Hello, I am <strong>Chanwit Loeyos</strong>, a student passionate about <span className="keyword-badge">Cybersecurity</span> and defense system development.</p>
                </div>
                <div className="dossier-section">
                  <h4 className="dossier-header">[CURRENT_OPERATION]</h4>
                  <p>&gt; Currently working on my senior project involving <span className="keyword-badge">AI Drone Detection</span> using acoustic signatures to analyze and identify aerial threats.</p>
                  <p>&gt; Strong interest in <span className="keyword-badge">Network Analysis</span> and <span className="keyword-badge">Penetration Testing</span>, with proficiency in tools such as <span className="keyword-badge">Kali Linux</span>, <span className="keyword-badge">Wireshark</span>, and <span className="keyword-badge">Burp Suite</span>.</p>
                </div>
                <div className="dossier-section">
                  <h4 className="dossier-header">[OBJECTIVE]</h4>
                  <p>&gt; Seeking a <strong>Cyber Security Internship</strong> opportunity to apply theoretical knowledge in a real-world environment.</p>
                  <p>&gt; Eager to deeply learn new techniques in Offensive and Defensive Security.</p>
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

          {/* Experience */}
          <div className="about-section">
            <div className="about-section-title">
              <Briefcase size={18} />
              <h3>Experience</h3>
            </div>
            <div className="timeline">
              {experience.map((item, i) => (
                <div key={i} className="timeline-item card">
                  <div className="timeline-period">{item.period}</div>
                  <div className="timeline-body">
                    <h4 className="timeline-title">{item.title}</h4>
                    <p className="timeline-sub">{item.company}</p>
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
