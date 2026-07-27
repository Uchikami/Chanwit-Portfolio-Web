# Separate Dark Mode and Light Mode Architecture

The goal is to completely separate the codebase for Dark Mode (Hacker Theme) and Light Mode (Professional Theme). This ensures that UI, UX, and CSS changes in one mode will never accidentally break or affect the other mode.

## Proposed Changes

We will refactor `App.jsx` to act purely as a "Theme Switcher" and delegate all layout and component rendering to two entirely separate wrapper components.

### 1. Create Portfolio Wrappers
- **[NEW] [HackerPortfolio.jsx](file:///f:/For%20Code/Web-Port/src/HackerPortfolio.jsx)**
  Will contain the entire layout, Matrix/Glitch effects, and components currently used in the Dark Mode. It will import its own scoped CSS.
- **[NEW] [ProfessionalPortfolio.jsx](file:///f:/For%20Code/Web-Port/src/ProfessionalPortfolio.jsx)**
  Will be the blank canvas for the new Light Mode. It will have its own scoped CSS to prevent generic class names (like `.section-title`) from leaking into the Hacker theme.

### 2. Restructure Components
To keep things organized, we will place new Light Mode components in a dedicated folder:
- `src/components/` (Current Hacker components remain here so we don't break existing imports)
- `src/components/light/` (New Light Mode components like `LightNavbar`, `LightHero`, etc.)

### 3. Update Root App
- **[MODIFY] [App.jsx](file:///f:/For%20Code/Web-Port/src/App.jsx)**
  Remove all component imports (Hero, About, etc.) and instead just import `HackerPortfolio` and `ProfessionalPortfolio`. Conditionally render one of them based on the `isDark` state.

## User Review Required

> [!WARNING]
> It appears that previous work on the Light Mode (e.g., LightNavbar, LightHero) has been lost from the filesystem, likely due to a git reset. After applying this architectural separation, I will need to rebuild the Light Mode foundations. Are you okay with me rebuilding the Light Mode sections we had previously (Clean Tech theme)?

## Verification Plan
1. Ensure the Hacker Theme functions exactly as before with no visual regressions.
2. Toggle to Light Mode and verify it renders the completely isolated `ProfessionalPortfolio` environment without any Hacker theme CSS bleeding over.
