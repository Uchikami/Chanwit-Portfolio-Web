const fs = require('fs');
let content = fs.readFileSync('src/ProfessionalPortfolio.jsx', 'utf8');

// Replace imports
content = content.replace(/import Nav from "\.\/components\/Nav";/g, 'import Nav from "./light/LightNav";');
content = content.replace(/import Footer from "\.\/components\/Footer";/g, 'import Footer from "./light/LightFooter";');
content = content.replace(/import "\/public\/assets\/css\/particles\.css";/g, 'import "./particles.css";');

// Replace App declaration to accept props
content = content.replace(/const App: React\.FC = \(\) => {/g, 'const ProfessionalPortfolio = ({ onToggleTheme }) => {');

// Pass props to Nav
content = content.replace(/<Nav \/>/g, '<Nav onToggleTheme={onToggleTheme} />');

// Remove dark: classes
content = content.replace(/dark:[a-zA-Z0-9\-\/]+/g, '');

// Clean up any double spaces left by removing dark classes
content = content.replace(/ +/g, ' ');

// Export name change
content = content.replace(/export default App;/g, 'export default ProfessionalPortfolio;');

// Remove React.FC typings if any others exist
content = content.replace(/: React\.FC/g, '');

fs.writeFileSync('src/ProfessionalPortfolio.jsx', content);
console.log('Processed ProfessionalPortfolio.jsx');
