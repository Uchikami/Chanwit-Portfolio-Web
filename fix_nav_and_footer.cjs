const fs = require('fs');

// 1. Fix LightNav.jsx
let navJsx = fs.readFileSync('src/light/LightNav.jsx', 'utf8');

const navScrollRegex = /const handleScroll = \(\) => \{\s*setIsScrolled\(window\.scrollY > 50\);\s*\};/;
const newNavScroll = `const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'activities'];
      let current = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section top is above the middle of the viewport, it's active
          if (rect.top <= window.innerHeight / 3) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };`;

navJsx = navJsx.replace(navScrollRegex, newNavScroll);
fs.writeFileSync('src/light/LightNav.jsx', navJsx);
console.log("Fixed LightNav scrolling logic");

// 2. Fix LightFooter.jsx
let footerJsx = fs.readFileSync('src/light/LightFooter.jsx', 'utf8');
const backToTopRegex = /\{\/\* Back to Top Button \*\/\}[\s\S]*?<\/button>/;
footerJsx = footerJsx.replace(backToTopRegex, '');
fs.writeFileSync('src/light/LightFooter.jsx', footerJsx);
console.log("Removed Back to Top button from LightFooter");
