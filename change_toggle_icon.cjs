const fs = require('fs');

let navJsx = fs.readFileSync('src/light/LightNav.jsx', 'utf8');

// Replace imports
navJsx = navJsx.replace('import { Moon, Menu, X } from "lucide-react";', 'import { Terminal, Moon, Menu, X } from "lucide-react";');

// Replace the Moon button with Terminal button
const oldButton = `<button 
            onClick={onToggleTheme}
            className="p-2 mr-3 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
            title="Switch to Hacker Mode"
          >
            <Moon size={20} />
          </button>`;

const newButton = `<button 
            onClick={onToggleTheme}
            className="p-2 mr-3 text-slate-500 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-100"
            title="Access Secret Hacker Mode"
          >
            <Terminal size={22} />
          </button>`;

navJsx = navJsx.replace(oldButton, newButton);

fs.writeFileSync('src/light/LightNav.jsx', navJsx);
console.log("Updated toggle icon to Terminal!");
