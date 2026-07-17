const fs = require('fs');
let content = fs.readFileSync('src/ProfessionalPortfolio.jsx', 'utf8');

const certSection = `
 <div className="max-w-screen-xl px-4 pb-8 mx-auto text-left lg:pb-16 lg:px-6">
 <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl text-center">Certifications & Education</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
    
    <div className="p-8 bg-white border-2 border-green-300 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">🎓 Education</h3>
      <p className="text-xl text-gray-500 font-medium">B.S. in Computer Science (In Progress)</p>
      <p className="text-lg text-gray-400 mt-2">มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ</p>
      <p className="mt-4 text-gray-600 text-lg">ทำโปรเจกต์จบด้าน AI ตรวจจับโดรน และมีความสนใจพัฒนาสาย Cyber Security</p>
    </div>

    <div className="p-8 bg-white border-2 border-green-300 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">🏆 Certifications & Badges</h3>
      <ul className="space-y-4">
        <li className="flex items-center text-xl text-gray-600">
          <span className="text-green-500 mr-3 text-2xl">✔</span> (รออัปเดตชื่อ Cert/Badge 1)
        </li>
        <li className="flex items-center text-xl text-gray-600">
          <span className="text-green-500 mr-3 text-2xl">✔</span> (รออัปเดตชื่อ Cert/Badge 2)
        </li>
      </ul>
    </div>

 </div>
 </div>
`;

const startTarget = '<div className="max-w-screen-xl px-4 pb-8 mx-auto text-center lg:pb-16 lg:px-6">';
const endRegex = /<\/figure>[\s\r\n]*<\/div>/;

const startIdx = content.indexOf(startTarget);
if (startIdx !== -1) {
    const remaining = content.substring(startIdx);
    const match = remaining.match(endRegex);
    if (match) {
        const endIdx = startIdx + match.index + match[0].length;
        content = content.substring(0, startIdx) + certSection + content.substring(endIdx);
        fs.writeFileSync('src/ProfessionalPortfolio.jsx', content);
        console.log('Replaced successfully');
    } else { console.log('End target not found'); }
} else { console.log('Start target not found'); }
