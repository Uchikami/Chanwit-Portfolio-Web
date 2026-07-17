const fs = require('fs');

// 1. Update About.jsx
let aboutJsx = fs.readFileSync('src/components/About.jsx', 'utf8');

const bentoRegex = /<div className="bento-sidebar">[\s\S]*?<\/div>\s*<\/div>\s*<div className="dossier-content about-bio card" data-light-title="root@chanwit:~# whoami">/;
const newContent = '<div className="dossier-content about-bio card">';

aboutJsx = aboutJsx.replace(bentoRegex, newContent);
fs.writeFileSync('src/components/About.jsx', aboutJsx);

// 2. Clean up ProfessionalPortfolio.css
let css = fs.readFileSync('src/ProfessionalPortfolio.css', 'utf8');

// Remove .bento-sidebar and .stat-* blocks
const sidebarRegex = /\.bento-sidebar[\s\S]*?\.stat-value\s*\{[\s\S]*?\}/;
css = css.replace(sidebarRegex, '');

// Remove dossier-content width: 70% media query
const dossierMediaRegex = /@media\s*\(min-width:\s*768px\)\s*\{\s*\.dossier-content\s*\{\s*width:\s*70%;\s*\}\s*\}/;
css = css.replace(dossierMediaRegex, '');

fs.writeFileSync('src/ProfessionalPortfolio.css', css);
console.log("Removed bento sidebar and whoami title");
