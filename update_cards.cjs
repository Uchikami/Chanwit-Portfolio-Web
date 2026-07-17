const fs = require('fs');

// 1. Update index.css
let indexCss = fs.readFileSync('src/index.css', 'utf8');

const newCardCss = `/* ===== CARD ===== */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  border-top: 28px solid var(--border);
  position: relative;
  margin-top: 15px;
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
}

.card::after {
  content: attr(data-title);
  position: absolute;
  top: -24px;
  left: 12px;
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-secondary);
}
`;

// Replace the old .card definition
indexCss = indexCss.replace(
`/* ===== CARD ===== */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
}`, newCardCss);

fs.writeFileSync('src/index.css', indexCss);

// 2. Update About.jsx
let aboutJsx = fs.readFileSync('src/components/About.jsx', 'utf8');
aboutJsx = aboutJsx.replace('<div className="about-bio card">', '<div className="about-bio card" data-title="root@chanwit:~# whoami">');
fs.writeFileSync('src/components/About.jsx', aboutJsx);

// 3. Update Skills.jsx
let skillsJsx = fs.readFileSync('src/components/Skills.jsx', 'utf8');
skillsJsx = skillsJsx.replace('data-title={isDark ? group.category : undefined}', 'data-title={group.category}');
fs.writeFileSync('src/components/Skills.jsx', skillsJsx);

// 4. Update Contact.jsx
let contactJsx = fs.readFileSync('src/components/Contact.jsx', 'utf8');
contactJsx = contactJsx.replace('<div className="contact-nodes-panel card">', '<div className="contact-nodes-panel card" data-title="root@chanwit:~# ping server">');
contactJsx = contactJsx.replace('<div className="secure-form-panel card">', '<div className="secure-form-panel card" data-title="root@chanwit:~# ./send_msg">');
fs.writeFileSync('src/components/Contact.jsx', contactJsx);

console.log("Terminal boxes updated globally!");
