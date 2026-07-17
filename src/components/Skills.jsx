import { useState, useEffect, useRef } from 'react';
import './Skills.css';

// Level: 'Beginner' | 'Intermediate' | 'Advanced'
const skillData = [
  {
    category: 'Cybersecurity',
    items: [
      { name: 'Network Security', level: 'Intermediate' },
      { name: 'Linux / Kali Linux', level: 'Intermediate' },
      { name: 'CTF Challenges', level: 'Beginner' },
      { name: 'Wireshark', level: 'Beginner' },
      { name: 'OWASP Top 10', level: 'Beginner' },
    ],
  },
  {
    category: 'Programming Languages',
    items: [
      { name: 'Python', level: 'Intermediate' },
      { name: 'JavaScript', level: 'Intermediate' },
      { name: 'C / C++', level: 'Intermediate' },
      { name: 'Bash Scripting', level: 'Beginner' },
      { name: 'SQL', level: 'Intermediate' },
    ],
  },
  {
    category: 'Web Development',
    items: [
      { name: 'React', level: 'Intermediate' },
      { name: 'Node.js / Express', level: 'Beginner' },
      { name: 'HTML & CSS', level: 'Advanced' },
      { name: 'REST APIs', level: 'Intermediate' },
    ],
  },
  {
    category: 'Tools & Platforms',
    items: [
      { name: 'Git & GitHub', level: 'Intermediate' },
      { name: 'VS Code', level: 'Advanced' },
      { name: 'Docker (basics)', level: 'Beginner' },
      { name: 'Figma', level: 'Intermediate' },
      { name: 'MySQL / PostgreSQL', level: 'Intermediate' },
    ],
  },
];

// Pre-calculate flat data indices for waterfall animation
let currentIndex = 0;
const processedSkillData = skillData.map(group => {
  return {
    ...group,
    items: group.items.map(skill => {
      return { ...skill, globalIndex: currentIndex++ };
    })
  };
});
const totalSkills = currentIndex;

const SkillItem = ({ skill, isDark, isRevealed }) => {
  const [displayText, setDisplayText] = useState(skill.name);
  const [isHovered, setIsHovered] = useState(false);
  const [isSecured, setIsSecured] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);

  useEffect(() => {
    if (!isRevealed) return;

    // Scramble if hovered, dark mode, not secured, and not currently breaking
    if (isHovered && isDark && !isSecured && !isBreaking) {
      let iterations = 0;
      const chars = '!@#$%^&*<>/?0123456789';
      const interval = setInterval(() => {
        setDisplayText(skill.name.split('').map((char) => char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]).join(''));
        iterations++;
        if (iterations > 6) {
          clearInterval(interval);
          setDisplayText(skill.name);
        }
      }, 50);
      return () => {
        clearInterval(interval);
        setDisplayText(skill.name);
      };
    } else {
      setDisplayText(skill.name);
    }
  }, [isHovered, isDark, skill.name, isRevealed, isSecured, isBreaking]);

  if (!isRevealed) {
    return <div className="terminal-skill-line hidden-skill"></div>;
  }

  const handleFix = () => {
    if (isDark && isHovered && !isSecured && !isBreaking) {
      setIsBreaking(true);
      setDisplayText(skill.name); // Stop scrambling text immediately

      // After animation finishes, mark as secured
      setTimeout(() => {
        setIsBreaking(false);
        setIsSecured(true);
      }, 600);
    }
  };

  return (
    <div
      className={`terminal-skill-line ${isSecured ? 'ts-secured' : ''} ${isBreaking ? 'ts-breaking' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleFix}
      style={{ cursor: isHovered && !isSecured && !isBreaking ? 'crosshair' : 'default' }}
    >
      {isDark && <span className="ts-prefix">[+] Installing: </span>}
      <span className={`ts-name ${isHovered && isDark && !isSecured && !isBreaking ? 'ts-name-glitch' : ''}`}>
        {displayText}
      </span>
      <span className="ts-dots"></span>
      <span className={`ts-badge ts-${skill.level.toLowerCase()} ${isHovered && isDark && !isSecured && !isBreaking ? 'ts-glitch' : ''}`}>
        {isBreaking ? (
          <span className="badge-secured-anim">[PATCHED]</span>
        ) : isHovered && isDark && !isSecured ? (
          '[VULNERABLE]'
        ) : (
          `[${skill.level.toUpperCase()}]`
        )}
      </span>
    </div>
  );
};

const Skills = ({ isDark }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 } // trigger when 20% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && isDark) {
      let count = 0;
      setRevealedCount(0);
      const interval = setInterval(() => {
        count++;
        setRevealedCount(count);
        if (count >= totalSkills) clearInterval(interval);
      }, 80); // Speed of packet install
      return () => clearInterval(interval);
    } else {
      setRevealedCount(totalSkills); // Show all instantly in light mode or when initially loading
    }
  }, [isVisible, isDark]);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Expertise</span>
          <h2 className="section-title">Technical Skills</h2>
          <div className="section-divider" />
        </div>

        <div className="skills-grid">
          {processedSkillData.map((group, i) => (
            <div
              key={i}
              className="skills-group card"
              data-title={isDark ? group.category : undefined}
            >
              {!isDark && (
                <h3 className="skills-group-title">
                  {group.category}
                </h3>
              )}
              <div className="skills-list terminal-list">
                {group.items.map((skill, j) => (
                  <SkillItem
                    key={j}
                    skill={skill}
                    isDark={isDark}
                    isRevealed={skill.globalIndex < revealedCount}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
