const fs = require('fs');
const files = [
  'src/components/Contact.css',
  'src/components/Navbar.css',
  'src/components/Skills.css'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Replace 'blue' in text-shadows
  content = content.replace(/text-shadow:(.*?)blue/g, 'text-shadow:$1#ff00ff');
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});
