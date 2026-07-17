import { ArrowRight, ShieldCheck } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function LightHero() {
  return <section id="home" className="prof-hero">
    <div className="prof-particles" aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <span key={index} className={`prof-particle prof-particle-${index + 1}`} />)}</div>
    <div className="prof-container prof-hero-grid">
      <div className="prof-hero-copy">
        <p className="prof-kicker">CYBERSECURITY PORTFOLIO</p>
        <h1>Chanwit <span>Loeyos</span></h1>
        <p className="prof-role">Computer Science Student / Cybersecurity</p>
        <p className="prof-lead">I explore how systems work, where they can fail, and how to make them more secure through practical projects and continuous learning.</p>
        <div className="prof-hero-actions">
          <a className="prof-button prof-button-solid" href="#projects">View my work <ArrowRight size={18} /></a>
          <a className="prof-button prof-button-quiet" href="mailto:chanwit.loeyos@gmail.com">Get in touch</a>
        </div>
        <div className="prof-socials">
          <a href="https://github.com/chanwit-loeyos" target="_blank" rel="noreferrer"><FaGithub size={17} /> GitHub</a>
          <a href="https://www.linkedin.com/in/chanwit-loeyos-b54a202a0/" target="_blank" rel="noreferrer"><FaLinkedin size={17} /> LinkedIn</a>
        </div>
      </div>
      <div className="prof-cyber-visual" aria-label="Cybersecurity visual" role="img">
        <div className="prof-visual-grid" />
        <div className="prof-visual-ring prof-visual-ring-one" /><div className="prof-visual-ring prof-visual-ring-two" />
        <div className="prof-visual-shield"><ShieldCheck size={74} strokeWidth={1.25} /></div>
        <span className="prof-visual-label prof-visual-label-one">SECURE</span><span className="prof-visual-label prof-visual-label-two">DEFEND</span>
        <span className="prof-visual-code">01001000 01000001 01001011</span>
      </div>
    </div>
    <a className="prof-scroll" href="#about">SCROLL TO EXPLORE <ArrowRight size={16} /></a>
  </section>;
}

export default LightHero;
