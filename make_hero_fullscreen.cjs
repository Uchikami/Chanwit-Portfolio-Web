const fs = require('fs');

let profJsx = fs.readFileSync('src/ProfessionalPortfolio.jsx', 'utf8');

// Replace the opening section tag
profJsx = profJsx.replace(
    '<section className="pt-20 md:pt-0">',
    '<section className="min-h-screen w-full flex items-center justify-center pt-20 md:pt-0 relative">'
);

// Replace the closing section tag of the hero
const heroCloseRegex = /<\/section>\s*<About isDark=\{false\} \/>/;
const newHeroClose = `
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce text-slate-500 cursor-pointer" onClick={() => document.getElementById('about').scrollIntoView({behavior: 'smooth'})}>
          <span className="text-sm font-bold mb-2">Scroll Down</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      <About isDark={false} />`;

profJsx = profJsx.replace(heroCloseRegex, newHeroClose);

fs.writeFileSync('src/ProfessionalPortfolio.jsx', profJsx);
console.log("Updated Hero Section to full screen with scroll indicator!");
