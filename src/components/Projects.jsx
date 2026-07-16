import { useState, useEffect } from 'react';
import { ExternalLink, X, Unlock, ShieldAlert, Folder, FileCode2, Terminal } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'Network Packet Analyzer',
    description:
      'A Python-based tool for capturing and analyzing network traffic. Built to understand packet structure and detect anomalies in local network environments.',
    tags: ['Python', 'Scapy', 'Wireshark', 'Networking'],
    role: 'Solo Developer — designed architecture, wrote all capture/analysis modules.',
    githubUrl: '#',
    liveUrl: null,
    type: 'Cybersecurity',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'CTF Challenge Write-ups',
    description:
      'A collection of write-ups and solutions from Capture The Flag competitions. Covers categories including web exploitation, cryptography, and forensics.',
    tags: ['CTF', 'Security', 'Python', 'Cryptography'],
    role: 'Individual — competed and documented solutions independently.',
    githubUrl: '#',
    liveUrl: null,
    type: 'Cybersecurity',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Secure Task Manager',
    description:
      'A web application for managing tasks with role-based access control and JWT authentication. Designed with security best practices in mind.',
    tags: ['React', 'Node.js', 'JWT', 'MongoDB'],
    role: 'Full-stack Developer — handled both frontend UI and backend API.',
    githubUrl: '#',
    liveUrl: '#',
    type: 'Web Development',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'University Course Project',
    description:
      'Replace this with a real course project. Include tools used, your specific role, and any outcomes. Capture screenshots if possible.',
    tags: ['Course Project'],
    role: 'Replace with your actual role.',
    githubUrl: '#',
    liveUrl: null,
    type: 'Academic',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop'
  },
];

const Projects = ({ isDark }) => {
  const [isBreached, setIsBreached] = useState(false);
  const [isBreaching, setIsBreaching] = useState(false);
  const [breachProgress, setBreachProgress] = useState(0);
  const [breachLogs, setBreachLogs] = useState([]);
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [isClosingPanel, setIsClosingPanel] = useState(false);

  // Group projects by type
  const groupedProjects = projects.reduce((acc, proj) => {
    if (!acc[proj.type]) acc[proj.type] = [];
    acc[proj.type].push(proj);
    return acc;
  }, {});

  const handleBreach = () => {
    setIsBreaching(true);
    let progress = 0;
    
    const logs = [
      "> INITIATING BRUTE FORCE...",
      "> BYPASSING FIREWALL...",
      "> DECRYPTING PAYLOADS...",
      "> EXTRACTING NODE DATA...",
      "> ACCESS GRANTED."
    ];
    let logIndex = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) progress = 100;
      
      setBreachProgress(progress);
      
      if (progress > (logIndex + 1) * 18 && logIndex < logs.length) {
        setBreachLogs(prev => [...prev, logs[logIndex]]);
        logIndex++;
      }

      if (progress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsBreaching(false);
          setIsBreached(true);
        }, 800);
      }
    }, 120);
  };

  const handleClosePanel = () => {
    setIsClosingPanel(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsClosingPanel(false);
    }, 250);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Work</span>
          <h2 className="section-title">Projects</h2>
          <div className="section-divider" />
        </div>

        <div className="projects-tree-container">
          {!isBreached ? (
            <div className={`encrypted-archive card ${isBreaching ? 'breaching' : ''}`} data-title="root@chanwit:~# ./crack_archive">
              <div className="archive-inner">
                <ShieldAlert size={64} className="archive-icon" />
                <h3 className="archive-title">[ RESTRICTED_ARCHIVE.tar.gz ]</h3>
                <p className="archive-status">STATUS: ENCRYPTED (AES-256)</p>
                
                {!isBreaching ? (
                  <button className="breach-btn" onClick={handleBreach}>
                    <Unlock size={18} /> INITIATE BREACH
                  </button>
                ) : (
                  <div className="breach-progress-container">
                    <div className="breach-bar-bg">
                      <div className="breach-bar-fill" style={{ width: `${breachProgress}%` }}></div>
                    </div>
                    <div className="breach-terminal">
                      {breachLogs.map((log, idx) => (
                        <div key={idx} className="log-line">{log}</div>
                      ))}
                      <span className="cursor">_</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="directory-view card" data-title="root@chanwit:~# tree ./projects">
              <div className="tree-container">
                <div className="tree-root">
                  <Terminal size={18} className="tree-icon root-icon" />
                  <span>/root/projects/archive</span>
                </div>
                
                {Object.entries(groupedProjects).map(([type, projs], groupIndex, groupArray) => {
                  const isLastGroup = groupIndex === groupArray.length - 1;
                  const groupPrefix = isLastGroup ? '└── ' : '├── ';
                  const childIndent = isLastGroup ? '    ' : '│   ';

                  return (
                    <div key={type} className="tree-group">
                      <div className="tree-node folder-node">
                        <span className="tree-line">{groupPrefix}</span>
                        <Folder size={16} className="tree-icon folder-icon" />
                        <span className="folder-name">{type}/</span>
                      </div>
                      
                      <div className="tree-children">
                        {projs.map((proj, projIndex) => {
                          const isLastProj = projIndex === projs.length - 1;
                          const projPrefix = isLastProj ? '└── ' : '├── ';
                          const isSelected = selectedProject?.id === proj.id;
                          
                          return (
                            <div 
                              key={proj.id} 
                              className={`tree-node file-node ${isSelected ? 'selected' : ''}`}
                              onClick={() => {
                                setIsClosingPanel(false);
                                setSelectedProject(proj);
                              }}
                            >
                              <span className="tree-line">{childIndent}{projPrefix}</span>
                              <FileCode2 size={16} className="tree-icon file-icon" />
                              <span className="file-name">{proj.title.replace(/\s+/g, '_')}.exe</span>
                              {isSelected && <span className="file-status">[ ACTIVE ]</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* SIDE PANEL */}
              {selectedProject && (
                <div className={`project-side-panel card ${isClosingPanel ? 'closing' : ''}`} key={selectedProject.id}>
                  <div className="panel-header">
                    <span className="panel-header-title">root@chanwit:~# cat {selectedProject.title.replace(/\s+/g, '_')}.info</span>
                    <button className="close-panel-btn" onClick={handleClosePanel}>
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div className="panel-content">
                    <div className="panel-image-wrapper">
                      <div className="panel-image-container">
                         <img src={selectedProject.image} alt={selectedProject.title} className="panel-image" />
                      </div>
                    </div>
                    
                    <div className="panel-data">
                      <div className="data-row">
                        <span className="data-label">TYPE:</span>
                        <span className="data-value highlight">{selectedProject.type}</span>
                      </div>
                      
                      <div className="data-row">
                        <span className="data-label">TITLE:</span>
                        <h3 className="data-value title">{selectedProject.title}</h3>
                      </div>

                      <div className="data-row block">
                        <span className="data-label">DESC:</span>
                        <p className="data-value desc">{selectedProject.description}</p>
                      </div>

                      <div className="data-row block">
                        <span className="data-label">ROLE:</span>
                        <span className="data-value">{selectedProject.role}</span>
                      </div>

                      <div className="data-row block">
                        <span className="data-label">MODULES:</span>
                        <div className="panel-tags">
                          {selectedProject.tags.map((tag, i) => (
                            <span key={i} className="panel-tag">[{tag}]</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="data-row block">
                        <span className="data-label">EXECUTE:</span>
                        <div className="panel-actions">
                          {selectedProject.githubUrl && (
                            <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="panel-action-btn" aria-label="GitHub">
                              <FaGithub size={16} /> <span>SOURCE</span>
                            </a>
                          )}
                          {selectedProject.liveUrl && (
                            <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="panel-action-btn" aria-label="Live Demo">
                              <ExternalLink size={16} /> <span>DEPLOY</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
