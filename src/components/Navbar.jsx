import { useState, useEffect } from 'react';
import { Briefcase, Sun, Moon, Menu, X } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Activities', href: '#activities' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = ({ isDark, onToggleTheme, isLoggingOut, setIsLoggingOut }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [decryptText, setDecryptText] = useState(null);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isHackingIn, setIsHackingIn] = useState(false);

  const handleToggle = () => {
    if (!isDark) {
      setIsGlitching(true);
      setIsHackingIn(true);
      let iterations = 0;
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
      const interval = setInterval(() => {
        let text = '';
        for(let i=0; i<4; i++) text += chars[Math.floor(Math.random() * chars.length)];
        setDecryptText(text);
        iterations++;
        if (iterations > 30) { // Last for ~900ms
          clearInterval(interval);
          setDecryptText(null);
          setIsGlitching(false);
          setIsHackingIn(false);
          onToggleTheme();
        }
      }, 30);
    } else {
      setIsLoggingOut(true);
      setDecryptText("EXIT");
      
      setTimeout(() => setDecryptText("EXI"), 200);
      setTimeout(() => setDecryptText("EX"), 350);
      setTimeout(() => setDecryptText("E"), 500);
      setTimeout(() => setDecryptText(""), 650);

      setTimeout(() => {
        setDecryptText(null);
        setIsLoggingOut(false);
        onToggleTheme();
      }, 800);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // ScrollSpy logic to detect active section
      const sectionElements = navLinks
        .map((link) => ({
          id: link.href,
          element: document.getElementById(link.href.substring(1)),
        }))
        .filter((item) => item.element);

      let currentActive = '';
      // Offset by a third of the window height
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const { id, element } of sectionElements) {
        if (
          element.offsetTop <= scrollPosition &&
          element.offsetTop + element.offsetHeight > scrollPosition
        ) {
          currentActive = id;
          break;
        }
      }

      if (currentActive) {
        setActiveSection(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    setActiveSection(href);
    
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="#home" className="navbar-logo" onClick={(e) => handleNavClick(e, '#home')}>
          Chanwit<span className="logo-dot">.</span>
        </a>

        <nav className="navbar-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar-link ${activeSection === link.href ? 'navbar-link--active' : ''}`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar-actions">
          <button
            className={`icon-btn theme-toggle-btn ${isGlitching ? 'glitching' : ''}`}
            onClick={handleToggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{ width: decryptText ? 'auto' : '36px', padding: decryptText ? '0 10px' : '0' }}
          >
            {decryptText ? (
              <span className="decrypt-text">{decryptText}</span>
            ) : (
              isDark ? <Briefcase size={18} /> : <Moon size={18} />
            )}
          </button>

          <button
            className="icon-btn mobile-only"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-menu-link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Logout Overlay */}
      {isLoggingOut && (
        <div className="crt-power-off-overlay"></div>
      )}

      {/* Hacking In Overlay */}
      {isHackingIn && (
        <div className="hacked-overlay">
          <h1 className="hacked-text">SYSTEM COMPROMISED</h1>
          <div className="hacked-subtext">Initializing Hacker Mode...</div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
