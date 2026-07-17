const fs = require('fs');

let navJsx = fs.readFileSync('src/light/LightNav.jsx', 'utf8');

// Import HackerTransition
navJsx = navJsx.replace(
    'import { Terminal, Menu, X } from "lucide-react";',
    'import { Terminal, Menu, X } from "lucide-react";\nimport HackerTransition from "./HackerTransition";'
);

// Add isTransitioning state
const stateMatch = 'const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });';
navJsx = navJsx.replace(stateMatch, stateMatch + '\n  const [isTransitioning, setIsTransitioning] = useState(false);');

// Update button onClick
const oldButton = `<button 
            onClick={onToggleTheme}`;
const newButton = `<button 
            onClick={() => setIsTransitioning(true)}`;
navJsx = navJsx.replace(oldButton, newButton);

// Render HackerTransition component
const returnRegex = /(<\/nav>\s*\);\s*};)/;
const newReturn = `      {isTransitioning && (
        <HackerTransition 
          onComplete={() => {
            setIsTransitioning(false);
            onToggleTheme();
          }} 
        />
      )}
    </nav>
  );
};`;
navJsx = navJsx.replace(returnRegex, newReturn);

fs.writeFileSync('src/light/LightNav.jsx', navJsx);
console.log("Integrated HackerTransition into LightNav!");
