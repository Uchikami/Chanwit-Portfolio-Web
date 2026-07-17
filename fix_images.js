import fs from 'fs';
let content = fs.readFileSync('src/ProfessionalPortfolio.jsx', 'utf8');
content = content.replace(/src="\.\/assets\//g, 'src="/assets/');
fs.writeFileSync('src/ProfessionalPortfolio.jsx', content);
console.log('Fixed image paths');
