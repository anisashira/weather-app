Weather Forecasting App
A modern, feature-rich weather application built with React, TypeScript, and Zustand. 
Demonstrates best practices in component architecture, state management, API integration, and testing.

Links

Live Demo: https://weatherapp-3212.netlify.app/
Repository: https://github.com/anisashira/weather-app


--Features
Core Functionality

- City Search - Real-time weather search for any location worldwide
- Current Weather - Temperature, humidity, wind speed, visibility, and atmospheric pressure
- 7-Day Forecast - Extended weather predictions with min/max temperatures
- Hourly Forecast - Next 6 hours of detailed weather data
- Favorites System - Save and manage favorite cities with persistent storage

--UI/UX

- Dark/Light Mode - Automatic system preference detection + manual toggle
- Fully Responsive - Optimized for mobile, tablet, and desktop devices
- Modern Design - Glassmorphism effects, smooth animations, and hover states
- Accessible - ARIA labels and semantic HTML

--Technical

- Lazy Loading - Code-splitting with React.lazy and Suspense
- Local Storage - Persistent theme preferences and favorites
- Type Safety - Full TypeScript implementation
- Schema Validation - API response validation with Zod
-  Unit Tested - Vitest + React Testing Library

-- Tech Stack
Category     Technologies
Frontend     React 18, TypeScript
Build        ToolVite
API          Open-Meteo API (Geocoding + Forecast)
Testing      Vitest, React Testing Library, @testing-library/user-event
Icons        Lucide React
Styling      CSS-in-JS (Inline Styles with dynamic theming)


--Installation
# Navigate to project directory
cd weather-app

# Install dependencies
npm install

# Start development server
npm run dev

Available Scripts
bash# Development
npm run dev          # Start dev server with hot reload

# Build
npm run build        # Create optimized production build
npm run preview      # Preview production build locally

# Testing
npm test             # Run tests once
npm run test:watch   # Run tests in watch mode
npm run test:ui      # Open Vitest UI

# Linting
npm run lint         # Run ESLint


Architecture & Design Decisions
Component Architecture

Separation of Concerns: UI components, pages, hooks, and services are cleanly separated
Reusable Components: All components accept props and can be used in different contexts
Custom Hooks: Business logic abstracted into useWeather hook
Lazy Loading: Favorites page is lazy-loaded for better performance

State Management Strategy

Zustand for global state (theme preferences, favorites list)
Persist Middleware for automatic localStorage synchronization
Local State (useState) for component-specific UI state
Custom Hooks for encapsulating data fetching and side effects

API Integration

Service Layer: All API calls abstracted in weatherApi.ts
Schema Validation: Every API response validated with Zod schemas
Error Handling: Graceful error states with user-friendly messages
Type Safety: TypeScript types derived from Zod schemas

Why Inline Styles Instead of Tailwind?
This project uses inline styles with dynamic theme values for:

Dynamic Theming: Direct access to theme state for real-time style updates
Component Colocation: Styles live with components, no context switching
Type Safety: Full TypeScript autocomplete for style objects
Zero Build Overhead: No CSS parsing or purging needed


Features in Detail
Dark/Light Mode

Detects system preference automatically on first load
Manual toggle persists user choice in localStorage
Smooth transitions between themes
All components respond dynamically to theme changes

Favorites System

Add/remove cities with star button
Favorites persist across browser sessions
Optional: Load current weather for all favorites at once
Navigate to home page with pre-filled city from favorites

Error Handling

User-friendly error messages (e.g., "City not found")
Loading states with spinners
Graceful degradation if API is unavailable
Form validation for empty inputs

Anisa Shira
React / Frontend Developer

GitHub: https://github.com/anisashira
LinkedIn: https://www.linkedin.com/in/anisa-shira-67ba78299/
Email: anisashira15@gmail.com
