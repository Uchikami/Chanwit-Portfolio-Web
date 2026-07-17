const fs = require('fs');
let content = fs.readFileSync('src/ProfessionalPortfolio.jsx', 'utf8');

// 1. Hero
content = content.replace('Secure Your Future with', 'Securing the Future with');
content = content.replace('Ethical Hacking Done Right', 'Cybersecurity & AI');
content = content.replace('From deep-dive penetration testing to proactive threat monitoring, I provide tailored solutions to secure your network and protect your business.', 'Computer Science Student passionate about Offensive Security, Network Analysis, and AI-driven defense systems. Looking for an internship opportunity in Cyber Security.');

// 2. Stats
content = content.replace('<span data-counter-target="20">0</span>+', '<span data-counter-target="3">3</span>+');
content = content.replace('Years of Experience', 'Years of CS Study');
content = content.replace('<span data-counter-target="300">0</span>+', '<span data-counter-target="1">1</span>');
content = content.replace('Engagements Completed', 'Major AI/Security Project');
content = content.replace('<span data-counter-target="10000">0</span>', '<span data-counter-target="10">10</span>+');
content = content.replace('Cups of Dark Roast Coffee', 'CTF Challenges Solved');

// 3. Services Header
content = content.replace('Breaking Systems, Building Security', 'Expertise & Research Focus');
content = content.replace('Specialized in uncovering critical security vulnerabilities through advanced penetration testing, helping organizations fortify their digital infrastructure before real threats emerge.', 'Focusing on modern security challenges, from network vulnerability analysis to AI-driven threat detection systems.');

// 4. Service Cards
// Pen Test
content = content.replace('Comprehensive security assessment simulating real-world attacks to identify vulnerabilities in your systems, networks, and applications before malicious actors can exploit them.', 'มีความเข้าใจและสามารถใช้เครื่องมือทดสอบเจาะระบบ เช่น Kali Linux และ Burp Suite ในการค้นหาช่องโหว่พื้นฐานของ Web Application');
// Web App -> AI
content = content.replace('Web App Security', 'AI Acoustic Drone Detection');
content = content.replace('In-depth analysis and testing of web applications to uncover security flaws, injection vulnerabilities, authentication weaknesses, and other critical risks affecting your platforms.', 'พัฒนาระบบ AI เพื่อตรวจจับและระบุตัวตนโดรนจากข้อมูลเสียง ช่วยเพิ่มศักยภาพด้านความปลอดภัยทางอากาศและป้องกันการบุกรุก');
// Network Infra -> Network Analysis
content = content.replace('Network Infrastructure', 'Network Analysis');
content = content.replace('Thorough evaluation of network architecture, firewall configurations, access controls, and routing protocols to ensure robust security across your entire digital infrastructure.', 'สามารถวิเคราะห์และตรวจสอบ Network Traffic ด้วย Wireshark และ Nmap เพื่อทำความเข้าใจโครงสร้างเครือข่ายและค้นหาความผิดปกติ');
// Security Consultation -> Secure Development
content = content.replace('Security Consultation', 'Secure Development');
content = content.replace('Strategic guidance and expert recommendations to strengthen your security posture, implement industry best practices, and develop effective incident response procedures.', 'เขียนและพัฒนาโปรแกรมประยุกต์ด้วย Python และ JavaScript โดยคำนึงถึงหลักการ Secure Coding และสามารถนำมาประยุกต์สร้างเครื่องมืออัตโนมัติได้');
// Bug Hunting -> CTF
content = content.replace('Bug Hunting', 'CTF Challenges');
content = content.replace('Discovered and responsibly disclosed over 50 critical vulnerabilities in major platforms, contributing to the security of millions of users worldwide through ethical hacking.', 'สนุกกับการแก้โจทย์ Capture The Flag เพื่อพัฒนาทักษะด้าน Cryptography, Web Exploitation, และ Reverse Engineering อย่างสม่ำเสมอ');
// Security Training -> Security Research
content = content.replace('Security Training', 'Security Research');
content = content.replace('Customized training programs to educate your team about current security threats, defensive techniques, secure coding practices, and cybersecurity best practices.', 'หมั่นศึกษาและติดตามข่าวสารด้าน Cyber Security อย่างต่อเนื่อง เพื่ออัปเดตความรู้เกี่ยวกับภัยคุกคามใหม่ๆ และเทคโนโลยีการป้องกันล่าสุด');

// 5. About Me
content = content.replace('About Me, HAK3R', 'About Me');
content = content.replace("I've dedicated my career to finding the vulnerabilities that others miss. My journey began with CTF competitions and evolved into a full-time commitment to making digital spaces more secure.", "สวัสดีครับ ผมชาญวิทย์ เป็นนักศึกษาที่หลงใหลในด้าน Cybersecurity และการพัฒนาระบบป้องกัน ปัจจุบันกำลังศึกษาและทำโปรเจกต์จบเกี่ยวกับการใช้ AI ตรวจจับโดรนด้วยคลื่นเสียง");
content = content.replace("My approach combines creative problem-solving with rigorous methodology, ensuring no stone is left unturned in the pursuit of robust security.", "ผมมีความเชี่ยวชาญในการวิเคราะห์เครือข่ายและการทดสอบเจาะระบบ (Penetration Testing) และกำลังมองหาโอกาสฝึกงานเพื่อพัฒนาทักษะด้าน Cyber Security ในสภาพแวดล้อมการทำงานจริง");

// 6. Logos -> Tech Stack
const logosStartIdx = content.indexOf('{/* #### LOGOS SECTION #### */}');
const logosEndIdx = content.indexOf('<section id="about" className="bg-white pt-8">');
if(logosStartIdx !== -1 && logosEndIdx !== -1) {
    const techStack = `
 {/* #### TECH STACK SECTION #### */}
 <section className="bg-gray-100 lg:py-18 lg:px-6 border-t-4 border-b-4 border-solid border-green-700 bg-white relative z-20">
 <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-4 text-center">
 <h2 className="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 md:text-4xl">Core Technologies</h2>
 <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
   {['Kali Linux', 'Burp Suite', 'Wireshark', 'Nmap', 'Python', 'JavaScript', 'React', 'Docker', 'Git'].map((tech) => (
     <div key={tech} className="px-6 py-3 border-2 border-green-700 text-green-800 font-bold text-xl rounded-md bg-green-50 hover:bg-green-700 hover:text-white transition-colors duration-300">
       {tech}
     </div>
   ))}
 </div>
 </div>
 </section>
`;
    content = content.substring(0, logosStartIdx) + techStack + '\n {/* #### ABOUT SECTION #### */}\n ' + content.substring(logosEndIdx);
} else {
    console.log("Failed to replace logos");
}

// 7. Testimonial -> Certifications
const testimonialStartIdx = content.indexOf('<section className="bg-gray-50 border-t-4 border-solid border-green-700 relative z-20">');
if(testimonialStartIdx !== -1) {
    const nextSectionIdx = content.indexOf('</section>', testimonialStartIdx);
    const certSection = `
 {/* #### CERTIFICATIONS SECTION #### */}
 <section className="bg-gray-50 border-t-4 border-solid border-green-700 relative z-20 py-16">
 <div className="max-w-screen-xl px-4 mx-auto text-center">
 <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">Certifications & Education</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
    
    <div className="p-8 bg-white border-2 border-green-300 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">🎓 Education</h3>
      <p className="text-xl text-gray-500 font-medium">B.S. in Computer Science (In Progress)</p>
      <p className="text-lg text-gray-400 mt-2">มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ</p>
      <p className="mt-4 text-gray-600 text-lg">มีความสนใจด้าน Cyber Security และ Artificial Intelligence (ทำโปรเจกต์จบ AI ตรวจจับโดรน)</p>
    </div>

    <div className="p-8 bg-white border-2 border-green-300 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">🏆 Certifications & Badges</h3>
      <ul className="space-y-4">
        <li className="flex items-center text-xl text-gray-600">
          <span className="text-green-500 mr-2">✔</span> (รอเพิ่มชื่อใบรับรอง)
        </li>
      </ul>
    </div>

 </div>
 </div>
 `;
    content = content.substring(0, testimonialStartIdx) + certSection + content.substring(nextSectionIdx);
} else {
    console.log("Failed to replace testimonial");
}

fs.writeFileSync('src/ProfessionalPortfolio.jsx', content);
console.log("Script completed.");
