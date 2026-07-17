const fs = require('fs');
let content = fs.readFileSync('src/ProfessionalPortfolio.jsx', 'utf8');

const newStack = `
 {/* #### TECH STACK SECTION #### */}
 <section className="bg-gray-100 lg:py-18 lg:px-6 border-t-4 border-b-4 border-solid border-green-700 bg-white relative z-20">
 <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-4 text-center">
 <h2 className="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 md:text-4xl">Core Technologies</h2>
 <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
   {['Kali Linux', 'Burp Suite', 'Wireshark', 'Nmap', 'Python', 'JavaScript', 'React', 'Docker'].map((tech) => (
     <div key={tech} className="px-6 py-3 border-2 border-green-700 text-green-800 font-bold text-xl rounded-md bg-green-50 hover:bg-green-700 hover:text-white transition-colors duration-300">
       {tech}
     </div>
   ))}
 </div>
 </div>
 </section>
`;

const startIdx = content.indexOf('{/* #### LOGOS SECTION #### */}');
const endIdx = content.indexOf('{/* #### SERVICES SECTION #### */}');

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + newStack + '\n ' + content.substring(endIdx);
  fs.writeFileSync('src/ProfessionalPortfolio.jsx', content);
  console.log('Replaced successfully');
} else {
  console.log('Could not find boundaries', { startIdx, endIdx });
}
