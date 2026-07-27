// src/App.tsx
import React from "react";
import Nav from '../components/layout/LightNav';
import Footer from '../components/layout/LightFooter';

import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Activities from '../components/sections/Activities';
import Certifications from '../components/sections/Certifications';
import Contact from '../components/sections/Contact';

import '../particles.css'; 
import '../ProfessionalPortfolio.css';

const ProfessionalPortfolio = ({ onToggleTheme }) => {
 return (
 <div className="professional-layout">
 <Nav onToggleTheme={onToggleTheme} />
 <main id="home" className="w-full">
 {/* Floating light elements contained within the hero section */} 

 <div className="light x1"></div>
 <div className="light x2"></div>
 <div className="light x3"></div>
 <div className="light x4"></div>
 <div className="light x5"></div>
 <div className="light x6"></div>
 <div className="light x7"></div>
 <div className="light x8"></div>
 <div className="light x9"></div>
 
 {/* #### HERO SECTION #### */}
 
  <section className="min-h-screen w-full flex flex-col items-center justify-center pt-24 pb-28 md:pt-0 md:pb-0 relative">

 <div className="grid max-w-screen-xl px-4 py-8 mx-auto gap-12 lg:gap-16 xl:gap-20 lg:py-32 lg:grid-cols-12 relative z-10">
 <div className="mr-auto place-self-center lg:col-span-7">
 <h1
 id="dynamicHeadline"
 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl "
 >
 Securing the Future with{" "}
 <span id="dynamicWords" className="text-emerald-600 font-bold">
 Cybersecurity & AI
 </span>
 </h1>

 <p className="max-w-2xl mb-6 font-bold text-slate-600 lg:mb-8 text-3xl ">
 Computer Science Student passionate about Offensive Security, Network Analysis, and AI-driven defense systems. Looking for an internship opportunity in Cyber Security.

 </p>
 <a
 href="#about"
 className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 rounded-md"
 >
 More About Me
 <svg
 className="w-5 h-5 ml-2 -mr-1"
 fill="currentColor"
 viewBox="0 0 20 20"
 xmlns="http://www.w3.org/2000/svg"
 >
 <path
 fillRule="evenodd"
 d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
 clipRule="evenodd"
 />
 </svg>
 </a>
 </div>
 <div 
 id="hacker-logo" 
 className="lg:col-span-5 flex relative z-10 justify-center lg:justify-end items-center"
 >
 <img
 src="/profile_pic.jpg"
 alt="Chanwit Loeyos"
 className="rounded-full shadow-2xl object-cover w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[380px] aspect-square border-4 border-slate-200 transition-all duration-300"
 />
 </div>
 </div>
 
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 w-full flex justify-center pointer-events-none">
          <div className="flex flex-col items-center animate-bounce text-slate-500 cursor-pointer pointer-events-auto" onClick={() => document.getElementById('about').scrollIntoView({behavior: 'smooth'})}>
            <span className="text-sm font-bold mb-2">Scroll Down</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      <About isDark={false} />
      <Skills isDark={false} />
      <Projects isDark={false} />
      <Activities isDark={false} />
      <Certifications isDark={false} />
      <Contact isDark={false} />
      
</main>
 <Footer />
 </div>
 );
};

export default ProfessionalPortfolio;
