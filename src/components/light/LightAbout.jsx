import { GraduationCap, Network } from 'lucide-react';

function LightAbout() {
  return <section id="about" className="prof-section prof-about"><div className="prof-container">
    <div className="prof-section-heading"><p className="prof-eyebrow">01 / ABOUT</p><h2>Breaking systems.<br />Building security.</h2></div>
    <div className="prof-about-grid">
      <div className="prof-about-copy"><p>I’m interested in the intersection of software and security: how systems are built, where they can fail, and how they can be strengthened.</p><p>My work combines practical problem-solving with a growing foundation in networking, ethical hacking, and secure application development.</p></div>
      <div className="prof-fact-list">
        <article><GraduationCap size={22} /><div><h3>Education</h3><p>B.Sc. Computer Science<br />Focused on software engineering, networking, and cybersecurity.</p></div></article>
        <article><Network size={22} /><div><h3>Current direction</h3><p>Network security, penetration-testing fundamentals, and building dependable web applications.</p></div></article>
      </div>
    </div>
  </div></section>;
}

export default LightAbout;
