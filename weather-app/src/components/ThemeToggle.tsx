import { useThemeStore } from '../store/themeStore'
import { Sun, Moon } from 'lucide-react' // nëse ke instaluar lucide-react, ose përdor emoji

// Nëse nuk ke lucide-react, instaloje me:
// npm install lucide-react

export default function ThemeToggle() {
    const { isDark, toggleTheme } = useThemeStore()

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 z-50 p-3 rounded-full bg-gray-200 dark:bg-gray-700
                 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600
                 transition-all shadow-lg"
            aria-label="Ndrysho temën"
        >
            {isDark ? (
                <Sun size={24} className="text-yellow-400" />
            ) : (
                <Moon size={24} className="text-indigo-600" />
            )}
        </button>
    )
}