const fs = require('fs');

// 1. Update ProfessionalPortfolio.css (ONLY affects Light Mode!)
let profCss = fs.readFileSync('src/ProfessionalPortfolio.css', 'utf8');

const lightTerminalCss = `

/* Light Mode Terminal Boxes */
.professional-layout .card {
  border-radius: 4px !important;
  border-top: 28px solid var(--border) !important;
  position: relative;
  margin-top: 15px;
}

.professional-layout .card::after {
  content: attr(data-light-title);
  position: absolute;
  top: -24px;
  left: 12px;
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-secondary);
}
`;

profCss += lightTerminalCss;
fs.writeFileSync('src/ProfessionalPortfolio.css', profCss);

// 2. Add data-light-title to components

// About.jsx
let aboutJsx = fs.readFileSync('src/components/About.jsx', 'utf8');
aboutJsx = aboutJsx.replace('<div className="about-bio card">', '<div className="about-bio card" data-light-title="root@chanwit:~# whoami">');
fs.writeFileSync('src/components/About.jsx', aboutJsx);

// Skills.jsx
let skillsJsx = fs.readFileSync('src/components/Skills.jsx', 'utf8');
// Skills already uses data-title for dark mode, just ADD data-light-title
skillsJsx = skillsJsx.replace('data-title={isDark ? group.category : undefined}', 'data-title={isDark ? group.category : undefined}\n              data-light-title={group.category}');
fs.writeFileSync('src/components/Skills.jsx', skillsJsx);

// Contact.jsx
let contactJsx = fs.readFileSync('src/components/Contact.jsx', 'utf8');
contactJsx = contactJsx.replace('<div className="contact-nodes-panel card">', '<div className="contact-nodes-panel card" data-light-title="root@chanwit:~# ping server">');
contactJsx = contactJsx.replace('<div className="secure-form-panel card">', '<div className="secure-form-panel card" data-light-title="root@chanwit:~# ./send_msg">');
fs.writeFileSync('src/components/Contact.jsx', contactJsx);

// Projects.jsx
let projectsJsx = fs.readFileSync('src/components/Projects.jsx', 'utf8');
projectsJsx = projectsJsx.replace('data-title="root@chanwit:~# ./crack_archive"', 'data-title="root@chanwit:~# ./crack_archive" data-light-title="root@chanwit:~# ./crack_archive"');
projectsJsx = projectsJsx.replace('data-title="root@chanwit:~# tree ./projects"', 'data-title="root@chanwit:~# tree ./projects" data-light-title="root@chanwit:~# tree ./projects"');
fs.writeFileSync('src/components/Projects.jsx', projectsJsx);

console.log("Light Terminal style applied successfully without touching Dark Mode!");
