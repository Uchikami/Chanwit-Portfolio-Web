const fs = require('fs');

// 1. Update ProfessionalPortfolio.css
let css = fs.readFileSync('src/ProfessionalPortfolio.css', 'utf8');
const newStyles = `
/* =========================================
   Hybrid About Me Design (Light Mode Only)
   ========================================= */
.light-about-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .light-about-container {
    flex-direction: row;
    align-items: flex-start;
  }
}

.bento-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
@media (min-width: 768px) {
  .bento-sidebar {
    width: 30%;
  }
}

.stat-box {
  background: #FFFFFF;
  border: 1px solid #CBD5E1;
  border-radius: 4px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.stat-label {
  display: block;
  font-size: 0.75rem;
  color: #64748B;
  font-weight: 700;
  margin-bottom: 0.25rem;
  letter-spacing: 1px;
}

.stat-value {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: #0F172A;
}

.dossier-content {
  width: 100%;
  border-left: 4px solid #1E293B !important;
}
@media (min-width: 768px) {
  .dossier-content {
    width: 70%;
  }
}

.dossier-section {
  margin-bottom: 1.5rem;
}
.dossier-section:last-child {
  margin-bottom: 0;
}

.dossier-header {
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  color: #1E293B;
  margin-bottom: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.dossier-section p {
  margin-bottom: 0.5rem;
  line-height: 1.7;
}

.keyword-badge {
  background-color: #F1F5F9;
  color: #059669;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  font-size: 0.85em;
  font-weight: 600;
  border: 1px solid #E2E8F0;
}
`;
css += newStyles;
fs.writeFileSync('src/ProfessionalPortfolio.css', css);

// 2. Update About.jsx content
let aboutJsx = fs.readFileSync('src/components/About.jsx', 'utf8');

const oldBioSectionRegex = /<div className="about-bio card"[\s\S]*?<\/div>/;

const newBioSection = `{isDark ? (
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
              <div className="bento-sidebar">
                <div className="stat-box">
                  <span className="stat-label">ROLE</span>
                  <span className="stat-value">Security Intern</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">FOCUS</span>
                  <span className="stat-value">Red Team & AI</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">STATUS</span>
                  <span className="stat-value text-emerald-600">Active</span>
                </div>
              </div>
              
              <div className="dossier-content about-bio card" data-light-title="root@chanwit:~# whoami">
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
          )}`;

aboutJsx = aboutJsx.replace(oldBioSectionRegex, newBioSection);
fs.writeFileSync('src/components/About.jsx', aboutJsx);

console.log("Applied Hybrid Design and English translation!");
