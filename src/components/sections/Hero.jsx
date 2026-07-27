import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ArrowDown } from 'lucide-react';
import MatrixRain from '../ui/MatrixRain';
import './Hero.css';

const Hero = ({ isDark, isLoggingOut }) => {
  const fullBio = "> ./initialize_internship_protocol.sh";
  const fullName = "CHANWIT LOEYOS";

  const [typedName, setTypedName] = useState(fullName);
  const [typedBio, setTypedBio] = useState(fullBio);

  useEffect(() => {
    if (isDark && !isLoggingOut) {
      setTypedName("");
      setTypedBio("");
      let i = 0;
      const totalLen = fullName.length + fullBio.length;

      const interval = setInterval(() => {
        if (i <= fullName.length) {
          setTypedName(fullName.slice(0, i));
        } else if (i <= totalLen) {
          setTypedName(fullName);
          const bioIndex = i - fullName.length;
          setTypedBio(fullBio.slice(0, bioIndex));
        } else {
          clearInterval(interval);
        }
        i += 1; // Smooth character by character typing
      }, 10); // Adjust speed

      return () => clearInterval(interval);
    } else if (!isDark) {
      setTypedName(fullName);
      setTypedBio(fullBio);
    }
  }, [isDark, isLoggingOut]);

  useEffect(() => {
    if (isLoggingOut && isDark) {
      // Start backspacing from full length
      let currentTotalLength = fullName.length + fullBio.length;

      const interval = setInterval(() => {
        currentTotalLength -= 8; // Very fast delete

        if (currentTotalLength > fullName.length) {
          const bioIndex = currentTotalLength - fullName.length;
          setTypedBio(fullBio.slice(0, bioIndex));
        } else if (currentTotalLength > 0) {
          setTypedBio("");
          setTypedName(fullName.slice(0, currentTotalLength));
        } else {
          setTypedBio("");
          setTypedName("");
          clearInterval(interval);
        }
      }, 15);

      return () => clearInterval(interval);
    }
  }, [isLoggingOut, isDark]);

  const renderName = () => {
    if (typedName.length > 7) {
      return (
        <>
          {typedName.slice(0, 7)}<br />
          <span className="hero-surname">{typedName.slice(8)}</span>
        </>
      );
    }
    return typedName;
  };

  return (
    <section id="home" className="hero">
      <MatrixRain isDark={isDark} />
      <div className="container hero-container" style={{ position: 'relative', zIndex: 1 }}>

        {/* LEFT: Text content */}
        <div className="hero-content">

          <h1 className="hero-name">
            {renderName()}
            {isDark && typedBio === "" && <span className="typewriter-cursor">█</span>}
          </h1>

          <p className="hero-bio">
            {typedBio}
            {isDark && typedBio !== "" && <span className="typewriter-cursor">█</span>}
          </p>

          <div className="hero-links">
            <a href="https://github.com/Uchikami" target="_blank" rel="noopener noreferrer" className="hero-social-link" onClick={() => {
              const audio = new Audio('/assets/sound/comm_btn.mp3');
              audio.volume = 0.5;
              audio.play().catch(e => console.log(e));
            }}>
              <FaGithub size={18} />
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/chanwit-loeyos-b54a202a0/" target="_blank" rel="noopener noreferrer" className="hero-social-link" onClick={() => {
              const audio = new Audio('/assets/sound/comm_btn.mp3');
              audio.volume = 0.5;
              audio.play().catch(e => console.log(e));
            }}>
              <FaLinkedin size={18} />
              LinkedIn
            </a>
          </div>

          <div className="hero-cta">
            <a href="#projects" onClick={(e) => { 
              e.preventDefault(); 
              const audio = new Audio('/assets/sound/comm_btn.mp3');
              audio.volume = 0.5;
              audio.play().catch(err => console.log(err));
              document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }); 
            }} className="btn btn-primary">View Projects</a>
            <a href="#contact" onClick={(e) => { 
              e.preventDefault(); 
              const audio = new Audio('/assets/sound/comm_btn.mp3');
              audio.volume = 0.5;
              audio.play().catch(err => console.log(err));
              document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); 
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

      <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about').scrollIntoView({ behavior: 'smooth' }); }} className="scroll-hint">
        <ArrowDown size={16} />
        <span>Scroll down</span>
      </a>
    </section>
  );
};

export default Hero;
