import { Menu, Moon, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useState } from 'react';

const links = [['Home', '#home'], ['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects']];

function LightNavbar({ onToggleTheme }) {
  const [open, setOpen] = useState(false);
  return <header className="prof-navbar">
    <div className="prof-container prof-nav-inner">
      <a className="prof-logo" href="#home"><span className="prof-logo-mark">&gt;_</span> CHANWIT</a>
      <nav className={`prof-nav-links ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        {links.map(([label, href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <div className="prof-nav-actions">
        <a className="prof-github-button" href="https://github.com/YOUR_USERNAME" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={17} /></a>
        <button className="prof-theme-button" onClick={onToggleTheme} aria-label="Switch to hacker theme"><Moon size={16} /> <span>Dark</span></button>
        <button className="prof-menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </div>
  </header>;
}

export default LightNavbar;
