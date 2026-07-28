import { useState, useEffect, useRef } from 'react';
import { Briefcase, Moon, Menu, X } from 'lucide-react';
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
  const navRef = useRef(null);
  const [cursorStyle, setCursorStyle] = useState({ opacity: 0, visibility: 'hidden' });

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
      const audioBtn = new Audio('/assets/sound/darkmode_btn.mp3');
      audioBtn.volume = 0.5;
      audioBtn.play().catch(e => console.log(e));

      setDecryptText("EXIT");
      
      const textRmAudio = new Audio("/assets/sound/darkmode_btn_text_rm.mp3");
      textRmAudio.volume = 0.5;
      textRmAudio.play().catch(e => console.log(e));

      setTimeout(() => setDecryptText("EXI"), 200);
      setTimeout(() => setDecryptText("EX"), 350);
      setTimeout(() => setDecryptText("E"), 500);
      
      setTimeout(() => { 
        setDecryptText(""); 
        textRmAudio.pause(); 
      }, 650);

      setTimeout(() => {
        setDecryptText(null);
        setIsLoggingOut(true);
        
        const audioOut = new Audio("/assets/sound/i'm_out.mp3");
        audioOut.volume = 0.6;
        audioOut.play().catch(e => console.log(e));
      }, 650);

      setTimeout(() => {
        setIsLoggingOut(false);
        onToggleTheme();
      }, 1150);
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

      let currentActive = '#home';
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

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateCursor = () => {
      if (navRef.current) {
        const activeLink = navRef.current.querySelector('.navbar-link--active');
        if (activeLink) {
          setCursorStyle({
            left: `${activeLink.offsetLeft}px`,
            width: `${activeLink.offsetWidth}px`,
            opacity: 1,
            visibility: 'visible'
          });
        } else {
          // If no link is active (e.g. we are at #home), hide the cursor completely
          // using visibility to bypass CSS animation overriding opacity
          setCursorStyle(prev => ({ ...prev, opacity: 0, visibility: 'hidden' }));
        }
      }
    };
    
    const timer = setTimeout(updateCursor, 50);
    window.addEventListener('resize', updateCursor);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateCursor);
    };
  }, [activeSection, isDark, scrolled]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    setActiveSection(href);
    
    if (window.lenis) {
      window.lenis.scrollTo(href);
    } else {
      const id = href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="#home" className="navbar-logo" onClick={(e) => handleNavClick(e, '#home')}>
          {isDark ? "root@chanwit:~#" : <>Chanwit<span className="logo-dot">.</span></>}
        </a>

        <nav className="navbar-nav" aria-label="Main navigation" ref={navRef}>
          <div className="nav-sliding-cursor" style={cursorStyle}></div>
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
