const fs = require('fs');
let content = fs.readFileSync('src/ProfessionalPortfolio.jsx', 'utf8');

const newStack = `
 {/* #### CERTIFICATIONS SECTION #### */}
 <section className="bg-gray-50 border-t-4 border-solid border-green-700 relative z-20 py-16">
 <div className="max-w-screen-xl px-4 mx-auto text-center">
 <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">Certifications & Education</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
    
    <div className="p-8 bg-white border-2 border-green-300 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">🎓 Education</h3>
      <p className="text-xl text-gray-500 font-medium">B.S. in Computer Science (In Progress)</p>
      <p className="text-lg text-gray-400 mt-2">University Name • 202x - Present</p>
      <p className="mt-4 text-gray-600 text-lg">Focusing on Cyber Security, Artificial Intelligence, and Network Engineering. Active participant in university CTF club.</p>
    </div>

    <div className="p-8 bg-white border-2 border-green-300 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">🏆 Certifications & Badges</h3>
      <ul className="space-y-4">
        <li className="flex items-center text-xl text-gray-600">
          <span className="text-green-500 mr-2">✔</span> TryHackMe - Junior Penetration Tester
        </li>
        <li className="flex items-center text-xl text-gray-600">
          <span className="text-green-500 mr-2">✔</span> Cisco Networking Academy (CCNA Intro)
        </li>
        <li className="flex items-center text-xl text-gray-600">
          <span className="text-green-500 mr-2">✔</span> Additional Badge/Cert 3
        </li>
      </ul>
    </div>

 </div>
 </div>
 </section>
`;

const searchStr = '<section className="bg-gray-50 border-t-4 border-solid border-green-700 relative z-20">';
const startIdx = content.indexOf(searchStr);

if (startIdx !== -1) {
  const nextSectionEnd = content.indexOf('</section>', startIdx) + '</section>'.length;
  content = content.substring(0, startIdx) + newStack + '\n ' + content.substring(nextSectionEnd);
  fs.writeFileSync('src/ProfessionalPortfolio.jsx', content);
  console.log('Replaced Testimonial successfully');
} else {
  console.log('Could not find Testimonial boundaries');
}
