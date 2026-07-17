const fs = require('fs');

// 1. Update ProfessionalPortfolio.jsx
let pFile = fs.readFileSync('src/ProfessionalPortfolio.jsx', 'utf8');
pFile = pFile.replace('<Projects />', '<Projects isDark={false} />');
pFile = pFile.replace('<Activities />', '<Activities isDark={false} />');
pFile = pFile.replace('<Certifications />', '<Certifications isDark={false} />');
pFile = pFile.replace('<Contact />', '<Contact isDark={false} />');
fs.writeFileSync('src/ProfessionalPortfolio.jsx', pFile);

// 2. Update HackerPortfolio.jsx
let hFile = fs.readFileSync('src/HackerPortfolio.jsx', 'utf8');
hFile = hFile.replace('<Projects />', '<Projects isDark={true} />');
hFile = hFile.replace('<Activities />', '<Activities isDark={true} />');
hFile = hFile.replace('<Certifications />', '<Certifications isDark={true} />');
hFile = hFile.replace('<Contact />', '<Contact isDark={true} />');
// ensure About and Skills have it (they might just have `isDark`)
fs.writeFileSync('src/HackerPortfolio.jsx', hFile);

// 3. Update Projects.jsx
let projFile = fs.readFileSync('src/components/Projects.jsx', 'utf8');
projFile = projFile.replace('const Projects = () => {', 'const Projects = ({ isDark = true }) => {');
projFile = projFile.replace('const [isBreached, setIsBreached] = useState(false);', 'const [isBreached, setIsBreached] = useState(false);\n  const effectivelyBreached = !isDark || isBreached;');
// Replace `!isBreached` with `!effectivelyBreached`
projFile = projFile.replace(/!isBreached/g, '!effectivelyBreached');
projFile = projFile.replace(/isBreached/g, 'effectivelyBreached');
// Restore the state variables that were wrongly replaced
projFile = projFile.replace('const [effectivelyBreached, setIsBreached]', 'const [isBreached, setIsBreached]');
projFile = projFile.replace('const effectivelyBreached = !isDark || effectivelyBreached;', 'const effectivelyBreached = !isDark || isBreached;');
fs.writeFileSync('src/components/Projects.jsx', projFile);

// 4. Update Certifications.jsx
let certFile = fs.readFileSync('src/components/Certifications.jsx', 'utf8');
certFile = certFile.replace('const CertCard = ({ cert }) => {', 'const CertCard = ({ cert, isDark }) => {');
certFile = certFile.replace('const Certifications = () => {', 'const Certifications = ({ isDark = true }) => {');
certFile = certFile.replace(/<CertCard key=\{cert\.id\} cert=\{cert\} \/>/g, '<CertCard key={cert.id} cert={cert} isDark={isDark} />');
// Remove the overlay if !isDark
certFile = certFile.replace('<div className="cyber-overlay">', '{isDark && <div className="cyber-overlay">');
certFile = certFile.replace('</div>\n        </div>\n\n        <div className="cyber-data">', '</div>}\n        </div>\n\n        <div className="cyber-data">');
fs.writeFileSync('src/components/Certifications.jsx', certFile);

// 5. Update Skills.jsx
let skillFile = fs.readFileSync('src/components/Skills.jsx', 'utf8');
// Fix cursor
skillFile = skillFile.replace(`cursor: isHovered && !isSecured && !isBreaking ? 'crosshair' : 'default'`, `cursor: isHovered && isDark && !isSecured && !isBreaking ? 'crosshair' : 'default'`);
// Fix onClick
skillFile = skillFile.replace(`onClick={handleFix}`, `onClick={isDark ? handleFix : undefined}`);
fs.writeFileSync('src/components/Skills.jsx', skillFile);

console.log("Gimmicks removed for Light Mode successfully!");
