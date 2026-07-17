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
          <div className="about-bio card">
            <p>
              สวัสดีครับ ผม <strong>ชาญวิทย์ เลยยศ (Chanwit Loeyos)</strong> นักศึกษาที่หลงใหลในด้าน Cybersecurity และการพัฒนาระบบป้องกัน 
              ปัจจุบันกำลังทำโปรเจกต์จบเกี่ยวกับการใช้ AI ตรวจจับโดรนด้วยคลื่นเสียง เพื่อวิเคราะห์และระบุตัวตนของภัยคุกคามทางอากาศ
            </p>
            <p>
              ผมมีความสนใจและเชี่ยวชาญในการวิเคราะห์เครือข่าย (Network Analysis) และการทดสอบเจาะระบบ (Penetration Testing) 
              ผ่านเครื่องมือเช่น Kali Linux, Wireshark, และ Burp Suite
            </p>
            <p>
              ตอนนี้ผมกำลังมองหา <strong>โอกาสในการฝึกงาน (Internship)</strong> ด้าน Cyber Security เพื่อนำความรู้ที่เรียนมา
              ประยุกต์ใช้ในสภาพแวดล้อมการทำงานจริง และพัฒนาทักษะด้าน Offensive/Defensive Security ให้แข็งแกร่งยิ่งขึ้น
            </p>
          </div>

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
