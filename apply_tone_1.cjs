const fs = require('fs');

let css = fs.readFileSync('src/ProfessionalPortfolio.css', 'utf8');

// Replace everything from .professional-layout to the end
const startIdx = css.indexOf('.professional-layout {');
if (startIdx !== -1) {
    const newCss = `.professional-layout {
  /* Tone 1: Corporate Defense */
  min-height: 100vh;
  background-color: #F1F5F9; /* Soft Blue-Gray background */
  color: #0F172A; /* Deep Slate text */
  font-family: 'Anonymous Pro', monospace;
}

/* Light Mode Terminal Boxes (Corporate) */
.professional-layout .card {
  background-color: #FFFFFF !important;
  border-radius: 4px !important;
  border: 1px solid #CBD5E1 !important; /* Soft border */
  border-top: 28px solid #1E293B !important; /* Deep Navy Header */
  position: relative;
  margin-top: 15px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
}

.professional-layout .card::after {
  content: attr(data-light-title);
  position: absolute;
  top: -24px;
  left: 12px;
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  font-size: 0.90rem;
  font-weight: 600;
  color: #FFFFFF !important; /* White text on Navy header */
}

/* Override accent colors in Light Mode */
.professional-layout .section-title {
  color: #1E293B !important;
}
.professional-layout .ts-badge {
  background-color: #E0F2FE !important;
  color: #0284C7 !important;
  border: 1px solid #BAE6FD !important;
}
.professional-layout .skills-group-title {
  color: #0284C7 !important;
}
`;
    css = css.substring(0, startIdx) + newCss;
    fs.writeFileSync('src/ProfessionalPortfolio.css', css);
    console.log("Applied Tone 1 to ProfessionalPortfolio.css");
}
