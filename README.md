# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),![img.png](img.png)
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

🌤️ Weather Forecast App (React)
A modern React + TypeScript weather application demonstrating scalable component architecture, 
state management with Zustand, and clean UI patterns.

🔗 Live Demo: (add deployment link)
📦 Repository: (this repo)

⚛️ React-Focused Features
Built with React 19 and TypeScript
Extensive use of React Hooks (useState, useEffect, custom hooks)
Custom hook (useWeather) for data fetching and logic separation
Zustand for global state management
React Router for client-side navigation
Lazy-loaded routes for performance optimization

Application Features
Real-time weather data
7-day & hourly forecast
City search with geocoding
Favorites system with persistence
Dark / Light theme toggle
Fully responsive UI

Architecture & Best Practices
Component-based, reusable UI design
Clear separation of concerns:
UI components
Hooks (business logic)
API services
Global state
Type-safe API responses using Zod
Memoization to prevent unnecessary re-renders
LocalStorage synchronization for theme & favorites

Tech Stack
React 19
TypeScript
Vite
Zustand
React Router
Zod
Open-Meteo API
Vitest + React Testing Library

Testing
Unit tests for:
Theme toggle logic
Custom React hooks
Focus on predictable state and UI behavior

src/
├── components/   // Reusable React components
├── hooks/        // Custom React hooks
├── pages/        // Route-based pages
├── store/        // Zustand state
├── services/     // API layer
├── schemas/      // Zod validation

Why This Project?
Built to showcase:
Real-world React application structure
State management beyond basic hooks
Clean separation of logic and UI
Performance-aware React development
Testing mindset in frontend projects

Anisa Shira
React / Frontend Developer
GitHub: https://github.com/yourusername
LinkedIn: https://linkedin.com/in/yourprofile