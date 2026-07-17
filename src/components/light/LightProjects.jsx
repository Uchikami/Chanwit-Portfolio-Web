import { ArrowUpRight } from 'lucide-react';

const projects = [
  { title: 'Network Packet Analyzer', type: 'Cybersecurity', description: 'A Python-based tool for capturing and examining traffic to understand packet structure and spot anomalies.', tags: ['Python', 'Scapy', 'Networking'] },
  { title: 'CTF Challenge Write-ups', type: 'Research', description: 'A growing collection of documented solutions across web exploitation, cryptography, and forensics challenges.', tags: ['CTF', 'Security', 'Python'] },
  { title: 'Secure Task Manager', type: 'Web Development', description: 'A task application designed around role-based access and JWT authentication practices.', tags: ['React', 'Node.js', 'JWT'] },
];

function LightProjects() {
  return <section id="projects" className="prof-section prof-projects"><div className="prof-container">
    <div className="prof-section-heading"><p className="prof-eyebrow">03 / PROJECTS</p><h2>Selected work.</h2></div>
    <div className="prof-project-list">{projects.map((project, index) => <article className="prof-project" key={project.title}><div className="prof-project-number">0{index + 1}</div><div><p className="prof-project-type">{project.type}</p><h3>{project.title}</h3><p>{project.description}</p><div className="prof-project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><a className="prof-project-link" href="https://github.com/YOUR_USERNAME" target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}><ArrowUpRight size={22} /></a></article>)}</div>
  </div></section>;
}

export default LightProjects;
