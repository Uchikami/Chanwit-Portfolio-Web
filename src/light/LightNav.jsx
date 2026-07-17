import React, { useState, useEffect } from "react";
import { Moon, Menu, X } from "lucide-react";

const LightNav = ({ onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
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
            onClick={onToggleTheme}
            className="p-2 mr-3 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
            title="Switch to Hacker Mode"
          >
            <Moon size={20} />
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
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            {['home', 'about', 'skills', 'projects', 'certifications', 'activities'].map((section) => (
              <li key={section}>
                <button 
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left py-2 pl-3 pr-4 text-slate-700 rounded hover:bg-slate-100 md:hover:bg-transparent md:hover:text-sky-600 md:p-0 font-bold transition-colors"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default LightNav;
