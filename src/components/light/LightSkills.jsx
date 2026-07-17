const skillGroups = [
  ['Cybersecurity', ['Network Security', 'Linux / Kali Linux', 'Wireshark', 'OWASP Top 10']],
  ['Development', ['Python', 'JavaScript', 'React', 'HTML & CSS']],
  ['Tools & Platforms', ['Git & GitHub', 'Docker basics', 'SQL', 'Figma']],
];

function LightSkills() {
  return <section id="skills" className="prof-section prof-skills"><div className="prof-container">
    <div className="prof-section-heading"><p className="prof-eyebrow">02 / EXPERTISE</p><h2>Skills &amp; tools.</h2></div>
    <div className="prof-skill-grid">{skillGroups.map(([title, skills], index) => <article className="prof-skill-card" key={title}><span>0{index + 1}</span><h3>{title}</h3><ul>{skills.map(skill => <li key={skill}>{skill}</li>)}</ul></article>)}</div>
  </div></section>;
}

export default LightSkills;
