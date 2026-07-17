const fs = require('fs');

// 1. Update index.css
let indexCss = fs.readFileSync('src/index.css', 'utf8');

// Update Light Theme colors for maximum contrast
indexCss = indexCss.replace('--text-primary: #111827;', '--text-primary: #0F172A; /* High contrast Slate 900 */');
indexCss = indexCss.replace('--text-secondary: #6b7280;', '--text-secondary: #334155; /* High contrast Slate 700 */');
indexCss = indexCss.replace('--text-muted: #9ca3af;', '--text-muted: #475569; /* High contrast Slate 600 */');
indexCss = indexCss.replace('--accent: #0f62fe;', '--accent: #059669; /* Professional Hacker Green (Emerald 600) */');
indexCss = indexCss.replace('--accent-hover: #0043ce;', '--accent-hover: #047857; /* Emerald 700 */');

// Make Fira Code the global font for body (not just data-theme="dark")
indexCss = indexCss.replace(
`body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', 'Prompt', -apple-system, BlinkMacSystemFont, sans-serif;`,
`body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira Code', 'Courier New', Courier, monospace;`
);

// Remove the dark-only font declaration to avoid confusion, though not strictly necessary if global
indexCss = indexCss.replace(
`/* Hacker Theme Global Overrides */
[data-theme="dark"] body {
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
}`,
`/* Hacker Theme Global Overrides */
[data-theme="dark"] body {
  /* Inherits Fira Code from global body now */
}`
);

fs.writeFileSync('src/index.css', indexCss);

// 2. Update ProfessionalPortfolio.css
let profCss = fs.readFileSync('src/ProfessionalPortfolio.css', 'utf8');
// Remove Anonymous Pro and hardcoded colors
profCss = profCss.replace('font-family: \'Anonymous Pro\', monospace;', '/* font-family inherited from body */');
profCss = profCss.replace('background-color: #ffffff; /* Tailwind bg-white */', 'background-color: var(--bg-primary);');
profCss = profCss.replace('color: #000000;', 'color: var(--text-primary);');
fs.writeFileSync('src/ProfessionalPortfolio.css', profCss);

// 3. Update ProfessionalPortfolio.jsx Hero styling to match contrast
let profJsx = fs.readFileSync('src/ProfessionalPortfolio.jsx', 'utf8');
// Change specific hardcoded tailwind text/bg to match variables or darker shades
profJsx = profJsx.replace('className="pt-20 md:pt-0 bg-white "', 'className="pt-20 md:pt-0"'); // Let .professional-layout handle bg
profJsx = profJsx.replace('text-gray-500 lg:mb-8', 'text-slate-600 lg:mb-8'); // Darker text for description
profJsx = profJsx.replace('text-green-500 font-bold', 'text-emerald-600 font-bold'); // Emerald 600 for highlighted text

fs.writeFileSync('src/ProfessionalPortfolio.jsx', profJsx);

console.log("Successfully updated font and contrast!");
