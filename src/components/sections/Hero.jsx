import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ArrowDown } from 'lucide-react';
import MatrixRain from '../ui/MatrixRain';
import { playAudio } from '../../utils/audioManager';
import './Hero.css';

const Hero = ({ isDark, isLoggingOut }) => {
  const fullBio = "> ./initialize_internship_protocol.sh";
  const fullName = "CHANWIT LOEYOS";

  const nameRef = useRef(null);
  const bioRef = useRef(null);
  const cursorNameRef = useRef(null);
  const cursorBioRef = useRef(null);

  // Still keep state for initial render content (light mode full, dark mode empty initially)
  const [typedName, setTypedName] = useState(!isDark ? fullName : "");
  const [typedBio, setTypedBio] = useState(!isDark ? fullBio : "");

  // Update DOM directly via refs to avoid React re-renders blocking the main thread
  useEffect(() => {
    if (!nameRef.current || !bioRef.current) return;

    if (isDark && !isLoggingOut) {
      let i = 0;
      const totalLen = fullName.length + fullBio.length;
      
      const interval = setInterval(() => {
        if (i <= fullName.length) {
          const currentText = fullName.slice(0, i);
          if (currentText.length > 7) {
            nameRef.current.innerHTML = `${currentText.slice(0, 7)}<br /><span class="hero-surname">${currentText.slice(8)}</span>`;
          } else {
            nameRef.current.innerText = currentText;
          }
          if (cursorNameRef.current) cursorNameRef.current.style.display = 'inline-block';
          if (cursorBioRef.current) cursorBioRef.current.style.display = 'none';
        } else if (i <= totalLen) {
          nameRef.current.innerHTML = `${fullName.slice(0, 7)}<br /><span class="hero-surname">${fullName.slice(8)}</span>`;
          const bioIndex = i - fullName.length;
          bioRef.current.innerText = fullBio.slice(0, bioIndex);
          if (cursorNameRef.current) cursorNameRef.current.style.display = 'none';
          if (cursorBioRef.current) cursorBioRef.current.style.display = 'inline-block';
        } else {
          clearInterval(interval);
        }
        i += 1;
      }, 15);

      return () => clearInterval(interval);
    } else if (!isDark) {
      nameRef.current.innerHTML = `${fullName.slice(0, 7)}<br /><span class="hero-surname">${fullName.slice(8)}</span>`;
      bioRef.current.innerText = fullBio;
      if (cursorNameRef.current) cursorNameRef.current.style.display = 'none';
      if (cursorBioRef.current) cursorBioRef.current.style.display = 'none';
    }
  }, [isDark, isLoggingOut]);

  useEffect(() => {
    if (isLoggingOut && isDark && nameRef.current && bioRef.current) {
      let currentTotalLength = fullName.length + fullBio.length;

      const interval = setInterval(() => {
        currentTotalLength -= 8;

        if (currentTotalLength > fullName.length) {
          const bioIndex = currentTotalLength - fullName.length;
          bioRef.current.innerText = fullBio.slice(0, bioIndex);
          if (cursorNameRef.current) cursorNameRef.current.style.display = 'none';
          if (cursorBioRef.current) cursorBioRef.current.style.display = 'inline-block';
        } else if (currentTotalLength > 0) {
          bioRef.current.innerText = "";
          const currentText = fullName.slice(0, currentTotalLength);
          if (currentText.length > 7) {
            nameRef.current.innerHTML = `${currentText.slice(0, 7)}<br /><span class="hero-surname">${currentText.slice(8)}</span>`;
          } else {
            nameRef.current.innerText = currentText;
          }
          if (cursorNameRef.current) cursorNameRef.current.style.display = 'inline-block';
          if (cursorBioRef.current) cursorBioRef.current.style.display = 'none';
        } else {
          bioRef.current.innerText = "";
          nameRef.current.innerText = "";
          if (cursorNameRef.current) cursorNameRef.current.style.display = 'none';
          if (cursorBioRef.current) cursorBioRef.current.style.display = 'none';
          clearInterval(interval);
        }
      }, 15);

      return () => clearInterval(interval);
    }
  }, [isLoggingOut, isDark]);

  return (
    <section id="home" className="hero">
      <MatrixRain isDark={isDark} />
      <div className="container hero-container" style={{ position: 'relative', zIndex: 1 }}>

        <div className="hero-content">

          <h1 className="hero-name">
            <span ref={nameRef}>{!isDark ? <>{fullName.slice(0, 7)}<br /><span className="hero-surname">{fullName.slice(8)}</span></> : ""}</span>
            <span ref={cursorNameRef} className="typewriter-cursor" style={{ display: isDark ? 'inline-block' : 'none' }}>█</span>
          </h1>

          <p className="hero-bio">
            <span ref={bioRef}>{!isDark ? fullBio : ""}</span>
            <span ref={cursorBioRef} className="typewriter-cursor" style={{ display: 'none' }}>█</span>
          </p>

          <div className="hero-links">
            <a href="https://github.com/Uchikami" target="_blank" rel="noopener noreferrer" className="hero-social-link" onClick={() => {
              if (isDark) playAudio('/assets/sound/comm_btn.mp3', 0.5);
            }}>
              <FaGithub size={18} />
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/chanwit-loeyos-b54a202a0/" target="_blank" rel="noopener noreferrer" className="hero-social-link" onClick={() => {
              if (isDark) playAudio('/assets/sound/comm_btn.mp3', 0.5);
            }}>
              <FaLinkedin size={18} />
              LinkedIn
            </a>
          </div>

          <div className="hero-cta">
            <a href="#projects" onClick={(e) => { 
              e.preventDefault(); 
              if (isDark) playAudio('/assets/sound/comm_btn.mp3', 0.5);
              if (window.lenis) window.lenis.scrollTo('#projects');
              else document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }); 
            }} className="btn btn-primary">View Projects</a>
            <a href="#contact" onClick={(e) => { 
              e.preventDefault(); 
              if (isDark) playAudio('/assets/sound/comm_btn.mp3', 0.5);
              if (window.lenis) window.lenis.scrollTo('#contact');
              else document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); 
            }} className="btn btn-outline">Contact Me</a>
          </div>
        </div>

        {/* RIGHT: Avatar card */}
        <div className="hero-card-wrapper">
          <div className="hero-card">
            <div className="hero-avatar" style={{ padding: 0, overflow: 'hidden' }}>
              <img src="/profile_pic.jpg" alt="Chanwit Loeyos" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            </div>
            <div className="hero-card-info">
              <strong>Chanwit Loeyos</strong>
              <span>CS Student &middot; Cybersecurity</span>
              <span className="university-label">Seeking Internship Opportunity</span>
            </div>
          </div>
        </div>

      </div>

      <a href="#about" onClick={(e) => { 
        e.preventDefault(); 
        if (window.lenis) window.lenis.scrollTo('#about');
        else document.getElementById('about').scrollIntoView({ behavior: 'smooth' }); 
      }} className="scroll-hint">
        <ArrowDown size={16} />
        <span>Scroll down</span>
      </a>
    </section>
  );
};

export default Hero;
