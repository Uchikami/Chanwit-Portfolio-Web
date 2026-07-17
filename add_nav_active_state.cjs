const fs = require('fs');
let navJsx = fs.readFileSync('src/light/LightNav.jsx', 'utf8');

// 1. Add activeSection state
navJsx = navJsx.replace(
    'const [isOpen, setIsOpen] = useState(false);',
    'const [isOpen, setIsOpen] = useState(false);\n  const [activeSection, setActiveSection] = useState("home");'
);

// 2. Add scroll spy logic to handleScroll
const oldScrollLogic = `    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };`;

const newScrollLogic = `    const handleScroll = () => {
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

navJsx = navJsx.replace(oldScrollLogic, newScrollLogic);

// 3. Update the link rendering to use active state
const oldLinkClass = 'className="block w-full text-left py-2 pl-3 pr-4 text-slate-700 rounded hover:bg-slate-100 md:hover:bg-transparent md:hover:text-sky-600 md:p-0 font-bold transition-colors"';
const newLinkClass = 'className={`block w-full text-left py-2 pl-3 pr-4 rounded md:p-0 font-bold transition-all duration-300 ${activeSection === section ? "text-sky-600 md:border-b-2 md:border-sky-600" : "text-slate-700 hover:bg-slate-100 md:hover:bg-transparent md:hover:text-sky-600"}`}\n                  style={{ paddingBottom: activeSection === section ? "4px" : "6px" }}';

navJsx = navJsx.replace(oldLinkClass, newLinkClass);

fs.writeFileSync('src/light/LightNav.jsx', navJsx);
console.log("Added Scroll Spy Active State to LightNav!");
