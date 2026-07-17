import React, { useState, useEffect, useRef } from "react";
import { Terminal, Menu, X } from "lucide-react";
import HackerTransition from "./HackerTransition";

const LightNav = ({ onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
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
  }, [activeSection, isScrolled]);

  useEffect(() => {
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
    };

    window.addEventListener('scroll', handleScroll);
    // trigger once on mount to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 w-full transition-all duration-300 ${
        isScrolled 
          ? 'z-50 py-3 bg-white shadow-lg' 
          : 'z-50 py-5 bg-white md:bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Brand */}
        <a href="/" className="flex items-center">
          <img 
            src="/assets/images/hacker.png" 
            className={`mr-3 transition-all duration-300 ${isScrolled ? 'h-6' : 'h-8'}`} 
            alt="Logo" 
            style={{ filter: 'invert(1)' }}
          />
          <span className={`self-center whitespace-nowrap font-bold text-black transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-2xl'}`}>
            CHANWIT
          </span>
        </a>

        {/* Actions (Toggle & Contact) */}
        <div className="flex md:order-2 items-center">
          <button 
            onClick={() => setIsTransitioning(true)}
            className="p-2 mr-3 text-slate-500 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-100"
            title="Access Secret Hacker Mode"
          >
            <Terminal size={22} />
          </button>
          
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className={`text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-bold rounded-lg text-center mx-3 md:mr-0 transition-all duration-300 ${
              isScrolled ? 'text-sm px-3 py-1.5' : 'text-base px-4 py-2'
            }`}
          >
            Contact Me!
          </button>
          
          {/* Mobile menu toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Links */}
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto md:order-1`}>
          <ul className="relative flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            {/* Sliding Indicator for Desktop */}
            <div 
              className="absolute bottom-0 h-0.5 bg-sky-600 transition-all duration-300 ease-out hidden md:block"
              style={{ left: indicatorStyle.left, width: indicatorStyle.width, opacity: indicatorStyle.opacity }}
            />
            {['home', 'about', 'skills', 'projects', 'activities', 'certifications'].map((section) => (
              <li key={section} ref={el => navRefs.current[section] = el}>
                <button 
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left py-2 pl-3 pr-4 rounded md:p-0 font-bold transition-colors duration-300 ${activeSection === section ? "text-sky-600" : "text-slate-700 hover:bg-slate-100 md:hover:bg-transparent md:hover:text-sky-600"}`}
                  style={{ paddingBottom: "6px" }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
          {isTransitioning && (
        <HackerTransition 
          onComplete={() => {
            setIsTransitioning(false);
            onToggleTheme();
          }} 
        />
      )}
    </nav>
  );
};

export default LightNav;
