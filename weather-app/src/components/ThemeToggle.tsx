import { useThemeStore } from '../store/themeStore'
import { Sun, Moon } from 'lucide-react'
import { useEffect } from 'react'

export default function ThemeToggle() {
    const { isDark, toggleTheme } = useThemeStore()

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark')
            document.body.style.background = '#07122B'
        } else {
            document.documentElement.classList.remove('dark')
            document.body.style.background = 'linear-gradient(to bottom right, #EAEAEA, #F5F5F7)'
        }
    }, [isDark])

    const buttonStyle = {
        position: 'fixed' as const,
        top: '1rem',
        right: '1rem',
        zIndex: 50,
        padding: '0.75rem',
        borderRadius: '50%',
        background: isDark ? 'rgba(30, 41, 59, 0.75)' : 'rgba(229, 231, 235, 0.8)',
        color: isDark ? '#fbbf24' : '#1d4ed8', // verdhë dielli në dark | blu hëna në light
        border: 'none',
        cursor: 'pointer',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.25)',
        transition: 'all 0.25s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    return (
        <button
            style={buttonStyle}
            onClick={toggleTheme}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.12)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDark ? <Sun size={24} strokeWidth={2.2} /> : <Moon size={24} strokeWidth={2.2} />}
        </button>
    )
}