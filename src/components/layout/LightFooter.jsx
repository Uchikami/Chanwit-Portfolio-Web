import React from "react";

const LightFooter = () => {

  return (
    <>
      

      {/* Footer Content */}
      <footer className="bg-white py-4 border-t border-gray-200">
        <div className="max-w-screen-xl mx-auto p-4 md:flex md:items-center md:justify-between">
          <div className="flex flex-col sm:text-left text-center">
            <span className="text-sm text-gray-500">
              © {new Date().getFullYear()} Chanwit Loeyos. All Rights Reserved.
            </span>
            <span className="text-xs text-gray-400 mt-1">
              Theme inspired by <a href="https://github.com/Dan-Duran/hak3r" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-gray-600">Dan-Duran/hak3r</a>
            </span>
          </div>
          <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 sm:mt-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default LightFooter;
