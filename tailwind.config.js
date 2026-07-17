/** @type {import('tailwindcss').Config} */
export default {
  important: '.professional-layout', // Scope tailwind exclusively to the Light Mode component
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      sans: ['"Anonymous Pro"', 'monospace'],
    },
    extend: {},
  },
  plugins: [],
};
