# 🌐 Chanwit Loeyos - Web Portfolio

Welcome to the source code of my personal web portfolio! This project is designed to showcase my skills, projects, and passion for **Cybersecurity** and **Artificial Intelligence**.

The portfolio features a unique **Dual-Theme Design**:
- ☀️ **Professional Mode (Light):** A clean, corporate-style layout perfect for recruiters and professional networking.
- 🌙 **Hacker Mode (Dark):** An immersive, terminal-inspired cyberpunk interface complete with glitch effects, Matrix rain, and typing animations for a true hacker aesthetic.

## ✨ Features

- **Dual Persona Themes:** Seamlessly toggle between "Professional" and "Hacker" modes with custom transition animations and sound effects.
- **Smooth Scrolling:** Integrated with [Lenis](https://lenis.studiofreight.com/) for a buttery-smooth scrolling experience.
- **Dynamic UI Components:** Custom-built React components for interactive sections like Skills, Projects (terminal-style directories), Activities, and Certifications.
- **Responsive Design:** Fully optimized for desktop, tablet, and mobile viewing.
- **Performance Focused:** Built on Vite for lightning-fast HMR and optimized production builds.

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & Custom Vanilla CSS (for complex terminal animations)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Animation & Scroll:** [Lenis](https://github.com/studio-freight/lenis) (Smooth Scroll)
- **Linting:** [Oxlint](https://oxc-project.github.io/)

## 📂 Project Structure

The project has been meticulously organized into logical directories for maintainability:

```text
src/
├── pages/                  # Main route pages
│   ├── ProfessionalPortfolio.jsx  # Light Theme Root
│   └── HackerPortfolio.jsx        # Dark Theme Root
├── components/             
│   ├── layout/             # Shared layout components (Navbar, Footer)
│   ├── sections/           # Page sections (Hero, About, Projects, etc.)
│   └── ui/                 # Reusable UI effects (HackerCursor, MatrixRain)
├── App.jsx                 # Theme State Manager & Lenis Initializer
├── index.css               # Global Tailwind directives
├── App.css                 # Base resets and variables
└── ProfessionalPortfolio.css # Specific overrides for Light Mode
```

## 🚀 Getting Started

To run this project locally on your machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone https://github.com/Uchikami/Web-Portfolio.git
   cd Web-Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 👨‍💻 Author

**Chanwit Loeyos**
- **GitHub:** [@Uchikami](https://github.com/Uchikami)
- **LinkedIn:** [Chanwit Loeyos](https://www.linkedin.com/in/chanwit-loeyos-b54a202a0/)

---
*Built with ❤️ and a lot of caffeine.*
