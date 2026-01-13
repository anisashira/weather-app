import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
    isDark: boolean
    toggleTheme: () => void
    setDark: (dark: boolean) => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            // Default: kontrollo preferencën e sistemit
            isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,

            // Toggle ndërmjet dark/light
            toggleTheme: () => set((state) => ({ isDark: !state.isDark })),

            // Set direkt dark ose light
            setDark: (dark) => set({ isDark: dark }),
        }),
        {
            name: 'weather-theme-storage', // Emri në localStorage
        }
    )
)