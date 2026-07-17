const fs = require('fs');
let navJsx = fs.readFileSync('src/light/LightNav.jsx', 'utf8');

// 1. Add useRef import if not present
if (!navJsx.includes('useRef')) {
    navJsx = navJsx.replace('import React, { useState, useEffect }', 'import React, { useState, useEffect, useRef }');
}

// 2. Add refs and indicator state inside the component
const stateRegex = /const \[activeSection, setActiveSection\] = useState\("home"\);/;
const stateReplacement = `const [activeSection, setActiveSection] = useState("home");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRefs = useRef({});

  useEffect(() => {
    const currentElement = navRefs.current[activeSection];
    if (currentElement) {
      setIndicatorStyle({
        left: currentElement.offsetLeft,
        width: currentElement.offsetWidth,
        opacity: 1
      });
    }
  }, [activeSection, isScrolled]);`;

navJsx = navJsx.replace(stateRegex, stateReplacement);

// 3. Update the ul to be relative and insert the sliding indicator
const ulRegex = /<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">/;
const ulReplacement = `<ul className="relative flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            {/* Sliding Indicator for Desktop */}
            <div 
              className="absolute bottom-0 h-0.5 bg-sky-600 transition-all duration-300 ease-out hidden md:block"
              style={{ left: indicatorStyle.left, width: indicatorStyle.width, opacity: indicatorStyle.opacity }}
            />`;
navJsx = navJsx.replace(ulRegex, ulReplacement);

// 4. Update the mapping to attach refs and use cleaner active classes without border-b
const mappingRegex = /<li key=\{section\}>\s*<button[\s\S]*?<\/button>\s*<\/li>/g;
let foundMapping = false;

navJsx = navJsx.replace(mappingRegex, (match) => {
    if (foundMapping) return match;
    foundMapping = true;
    return `<li key={section} ref={el => navRefs.current[section] = el}>
                <button 
                  onClick={() => scrollToSection(section)}
                  className={\`block w-full text-left py-2 pl-3 pr-4 rounded md:p-0 font-bold transition-colors duration-300 \${activeSection === section ? "text-sky-600" : "text-slate-700 hover:bg-slate-100 md:hover:bg-transparent md:hover:text-sky-600"}\`}
                  style={{ paddingBottom: "6px" }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>`;
});

fs.writeFileSync('src/light/LightNav.jsx', navJsx);
console.log("Added Sliding Active Indicator to LightNav!");
