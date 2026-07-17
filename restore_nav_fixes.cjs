const fs = require('fs');

let navJsx = fs.readFileSync('src/light/LightNav.jsx', 'utf8');

// 1. Imports
navJsx = navJsx.replace(
    'import React, { useState, useEffect } from "react";\nimport { Moon, Menu, X } from "lucide-react";',
    'import React, { useState, useEffect, useRef } from "react";\nimport { Terminal, Moon, Menu, X } from "lucide-react";'
);

// 2. States and Refs
const oldStates = `  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);`;

const newStates = `  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
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

navJsx = navJsx.replace(oldStates, newStates);

// 3. Scroll Logic
const oldScroll = `  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };`;

const newScroll = `  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'projects', 'activities', 'certifications'];
      let current = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };`;

navJsx = navJsx.replace(oldScroll, newScroll);

// 4. Toggle Button
const oldBtn = `<button 
            onClick={onToggleTheme}
            className="p-2 mr-3 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
            title="Switch to Hacker Mode"
          >
            <Moon size={20} />
          </button>`;

const newBtn = `<button 
            onClick={onToggleTheme}
            className="p-2 mr-3 text-slate-500 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-100"
            title="Access Secret Hacker Mode"
          >
            <Terminal size={22} />
          </button>`;

navJsx = navJsx.replace(oldBtn, newBtn);

// 5. Links
const oldUl = /<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">[\s\S]*?<\/ul>/;

const newUl = `<ul className="relative flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            {/* Sliding Indicator for Desktop */}
            <div 
              className="absolute bottom-0 h-0.5 bg-sky-600 transition-all duration-300 ease-out hidden md:block"
              style={{ left: indicatorStyle.left, width: indicatorStyle.width, opacity: indicatorStyle.opacity }}
            />
            {['home', 'about', 'skills', 'projects', 'activities', 'certifications'].map((section) => (
              <li key={section} ref={el => navRefs.current[section] = el}>
                <button 
                  onClick={() => scrollToSection(section)}
                  className={\`block w-full text-left py-2 pl-3 pr-4 rounded md:p-0 font-bold transition-colors duration-300 \${activeSection === section ? "text-sky-600" : "text-slate-700 hover:bg-slate-100 md:hover:bg-transparent md:hover:text-sky-600"}\`}
                  style={{ paddingBottom: "6px" }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
          </ul>`;

navJsx = navJsx.replace(oldUl, newUl);

fs.writeFileSync('src/light/LightNav.jsx', navJsx);
console.log("Restored all LightNav fixes!");
