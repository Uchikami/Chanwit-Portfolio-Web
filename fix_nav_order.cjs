const fs = require('fs');

let navJsx = fs.readFileSync('src/light/LightNav.jsx', 'utf8');

// Fix in handleScroll
const scrollSectionsOld = "const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'activities'];";
const scrollSectionsNew = "const sections = ['home', 'about', 'skills', 'projects', 'activities', 'certifications'];";
navJsx = navJsx.replace(scrollSectionsOld, scrollSectionsNew);

// Fix in render mapping
const mapSectionsOld = "{['home', 'about', 'skills', 'projects', 'certifications', 'activities'].map((section) => (";
const mapSectionsNew = "{['home', 'about', 'skills', 'projects', 'activities', 'certifications'].map((section) => (";
navJsx = navJsx.replace(mapSectionsOld, mapSectionsNew);

fs.writeFileSync('src/light/LightNav.jsx', navJsx);
console.log("Fixed LightNav menu order!");
