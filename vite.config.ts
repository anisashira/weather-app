/// <reference types="vitest" />
import { defineConfig } from 'vite'
// @ts-expect-error - TypeScript config issue with project references
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// @ts-expect-error - Vitest types loaded via reference directive
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
    },
})