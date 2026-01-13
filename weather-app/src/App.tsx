import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import ThemeToggle from './components/ThemeToggle'
import { Home as HomeIcon, Star } from 'lucide-react'
import { useThemeStore } from './store/themeStore'

function App() {
    const location = useLocation()
    const isDark = useThemeStore((state) => state.isDark)

    const appStyle = {
        minHeight: '100vh',
        background: isDark
            ? '#07122B'
            : 'linear-gradient(to bottom right, #EAEAEA, #F5F5F7)',
        color: isDark ? '#cbd5e1' : '#1e293b',
        transition: 'background 0.4s ease, color 0.35s ease',
    }

    const navStyle = {
        borderBottom: `1px solid ${isDark ? 'rgba(203, 213, 225, 0.08)' : 'rgba(30, 41, 59, 0.12)'}`,
        backdropFilter: 'blur(12px)',
        background: isDark ? 'rgba(15, 23, 42, 0.45)' : 'rgba(255, 255, 255, 0.45)',
        position: 'sticky' as const,
        top: 0,
        zIndex: 40,
        transition: 'all 0.3s ease',
    }

    const navContainerStyle = {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1rem',
    }

    const getLinkStyle = (isActive: boolean) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        transition: 'all 0.25s ease',
        background: isActive
            ? isDark
                ? 'rgba(203, 213, 225, 0.15)'
                : 'rgba(30, 41, 59, 0.12)'
            : 'transparent',
        color: isActive
            ? isDark
                ? '#e2e8f0'
                : '#1e293b'
            : isDark
                ? '#94a3b8'          // gri-blu e errët → shumë më e lexueshme në dark
                : 'rgba(30, 41, 59, 0.75)',
        fontWeight: isActive ? '600' : '500',
        textDecoration: 'none',
        cursor: 'pointer',
    })

    const mainStyle = {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '2rem 1rem',
    }

    return (
        <div style={appStyle}>
            <ThemeToggle />

            {/* Navigation */}
            <nav style={navStyle}>
                <div style={navContainerStyle}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1.5rem',
                        }}
                    >
                        <Link to="/" style={getLinkStyle(location.pathname === '/')}>
                            <HomeIcon size={20} />
                          Kreu
                        </Link>

                        <Link to="/favorites" style={getLinkStyle(location.pathname === '/favorites')}>
                            <Star size={20} />
                            Favoritet
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main style={mainStyle}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route
                        path="*"
                        element={
                            <div
                                style={{
                                    textAlign: 'center',
                                    fontSize: '1.5rem',
                                    color: isDark ? '#fca5a5' : '#ef4444',
                                    padding: '6rem 1rem',
                                }}
                            >
                                404 – Faqja nuk u gjet
                            </div>
                        }
                    />
                </Routes>
            </main>
        </div>
    )
}

export default App