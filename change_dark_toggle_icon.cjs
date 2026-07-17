const fs = require('fs');

let navbarJsx = fs.readFileSync('src/components/Navbar.jsx', 'utf8');

// Replace imports
navbarJsx = navbarJsx.replace("import { Sun, Moon, Menu, X } from 'lucide-react';", "import { Briefcase, Sun, Moon, Menu, X } from 'lucide-react';");

// Replace Sun with Briefcase
navbarJsx = navbarJsx.replace("<Sun size={18} />", "<Briefcase size={18} />");

fs.writeFileSync('src/components/Navbar.jsx', navbarJsx);
console.log("Updated toggle icon to Briefcase in Dark Mode!");
