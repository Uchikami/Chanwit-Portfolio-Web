const fs = require('fs');

// 1. Restore index.css Dark Mode font
let indexCss = fs.readFileSync('src/index.css', 'utf8');
indexCss = indexCss.replace(
`/* Hacker Theme Global Overrides */
[data-theme="dark"] body {
  /* Inherits Fira Code from global body now */
}`,
`/* Hacker Theme Global Overrides */
[data-theme="dark"] body {
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
}`
);
fs.writeFileSync('src/index.css', indexCss);

// 2. Restore ProfessionalPortfolio.css font
let profCss = fs.readFileSync('src/ProfessionalPortfolio.css', 'utf8');
profCss = profCss.replace('/* font-family inherited from body */', `font-family: 'Anonymous Pro', monospace;`);
fs.writeFileSync('src/ProfessionalPortfolio.css', profCss);

console.log("Restored fonts successfully!");
