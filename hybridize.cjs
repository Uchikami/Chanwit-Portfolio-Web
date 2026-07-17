const fs = require('fs');
const filePath = 'src/ProfessionalPortfolio.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add imports at the top
const importsToAdd = `
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Activities from './components/Activities';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
`;

// Only add imports if not already there
if (!content.includes('import About from')) {
    content = content.replace('import Footer from "./light/LightFooter";', 'import Footer from "./light/LightFooter";\n' + importsToAdd);
}

// 2. Find the end of the Hero section.
// The Hero section ends with: </div>\n      </section>
const heroEndSearchStr = '</section>';
const accoladesCommentStr = '{/* #### ACCOLADES SECTION #### */}'; // Or whatever is right after the hero.
const techStackCommentStr = '{/* #### TECH STACK SECTION #### */}'; 
// The Hero section in ProfessionalPortfolio ends right before the Accolades or Stats section.
// Let's find where the <main id="home"> is, and find the first </section> inside it.

const mainIdx = content.indexOf('<main id="home" className="w-full">');
if(mainIdx !== -1) {
    const firstSectionStart = content.indexOf('<section', mainIdx);
    const firstSectionEnd = content.indexOf('</section>', firstSectionStart) + '</section>'.length;
    
    // Everything from firstSectionEnd to the Footer should be replaced.
    const footerIdx = content.lastIndexOf('<Footer />');
    
    if(firstSectionEnd !== -1 && footerIdx !== -1) {
        // Find the closing tag of <main>
        const mainCloseIdx = content.lastIndexOf('</main>', footerIdx);
        
        const newComponents = `
      <About isDark={false} />
      <Skills isDark={false} />
      <Projects />
      <Activities />
      <Certifications />
      <Contact />
      `;
        
        content = content.substring(0, firstSectionEnd) + '\n' + newComponents + '\n' + content.substring(mainCloseIdx);
        fs.writeFileSync(filePath, content);
        console.log("Successfully hybridized ProfessionalPortfolio!");
    } else {
        console.log("Could not find bounds", {firstSectionEnd, footerIdx});
    }
} else {
    console.log("Could not find main tag");
}
