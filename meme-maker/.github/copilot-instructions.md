# Copilot Instructions for meme-maker

## Project Overview
- **Stack:** React + TypeScript + Vite
- **Entry Point:** `src/main.tsx` (mounts `App.tsx`)
- **Build Tool:** Vite (`vite.config.ts`)
- **Styling:** CSS modules (`App.css`, `index.css`)
- **Assets:** Static files in `public/` and `src/assets/`

## Architecture & Patterns
- **Single-page app**: All logic is in `src/`, with `App.tsx` as the main component.
- **Component structure:** Keep UI logic in React components. Use functional components and hooks.
- **TypeScript:** Strict typing is encouraged. See `tsconfig.json` and `tsconfig.app.json` for config.
- **ESLint:** Custom rules in `eslint.config.js`. Type-aware linting is recommended (see README for config).
- **React Compiler:** Enabled for improved performance and HMR (see README for details).

## Developer Workflows
- **Start dev server:** `npm run dev` (uses Vite)
- **Build for production:** `npm run build`
- **Preview build:** `npm run preview`
- **Lint:** `npm run lint` (uses ESLint config in `eslint.config.js`)
- **No test setup detected**: Add tests in `src/` if needed; update instructions if test framework is added.

## Conventions & Integration
- **File naming:** Use `.tsx` for React components, `.ts` for logic.
- **Assets:** Place images in `public/` for static serving, or `src/assets/` for imports.
- **Config files:**
  - `vite.config.ts`: Vite build and plugin config
  - `eslint.config.js`: ESLint rules (see README for advanced setup)
  - `tsconfig*.json`: TypeScript config
- **External dependencies:**
  - React, Vite, ESLint (see `package.json`)
  - Optional: `eslint-plugin-react-x`, `eslint-plugin-react-dom` for advanced linting

## Examples
- See `src/App.tsx` for main component pattern
- See `vite.config.ts` for build customization
- See README for ESLint and TypeScript setup examples

## Tips for AI Agents
- Follow the strict TypeScript and ESLint conventions described in README.
- Reference `src/App.tsx` for component structure and entry point.
- Use Vite commands for build and dev workflows.
- Update this file if new workflows or conventions are added.

---
**Feedback:** If any section is unclear or missing, please specify what needs improvement or what new patterns should be documented.
