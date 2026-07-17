const fs = require('fs');
let profJsx = fs.readFileSync('src/ProfessionalPortfolio.jsx', 'utf8');

// Fix "More About Me" button
profJsx = profJsx.replace(
    'className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text:3xl text-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 :ring-primary-900"',
    'className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 rounded-md"'
);

// Fix "Contact Me!" button
profJsx = profJsx.replace(
    'className="inline-flex items-center justify-center px-5 py-4 text-base font-medium text:3xl text-center text-gray-900 border-4 border-green-300 hover:bg-green-100 focus:ring-4 focus:ring-gray-100 :bg-green-700 :ring-gray-800"',
    'className="inline-flex items-center justify-center px-5 py-4 text-base font-medium text-center text-slate-800 border-2 border-slate-300 hover:bg-slate-100 focus:ring-4 focus:ring-slate-100 rounded-md"'
);

fs.writeFileSync('src/ProfessionalPortfolio.jsx', profJsx);
console.log("Fixed button styles in ProfessionalPortfolio.jsx");
