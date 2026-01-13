import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import ThemeToggle from './components/ThemeToggle'
import { Home as HomeIcon, Star } from 'lucide-react'
import './App.css'

function App() {
    const location = useLocation()

    const appStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #1e3a8a, #1e40af, #4338ca)',
        color: 'white'
    }

    const navStyle = {
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        background: 'rgba(255, 255, 255, 0.05)'
    }

    const navContainerStyle = {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1rem'
    }

    const navLinksStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem'
    }

    const getLinkStyle = (isActive: boolean) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        transition: 'all 0.2s',
        background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
        color: isActive ? 'white' : 'rgba(255, 255, 255, 0.7)',
        fontWeight: isActive ? '600' : 'normal',
        textDecoration: 'none',
        cursor: 'pointer'
    })

    const contentStyle = {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '2rem 1rem'
    }

    return (
        <div style={appStyle}>
            <ThemeToggle />

            {/* Navigation */}
            <nav style={navStyle}>
                <div style={navContainerStyle}>
                    <div style={navLinksStyle}>
                        <Link
                            to="/"
                            style={getLinkStyle(location.pathname === '/')}
                        >
                            <HomeIcon size={20} />
                            <span>Ballina</span>
                        </Link>

                        <Link
                            to="/favorites"
                            style={getLinkStyle(location.pathname === '/favorites')}
                        >
                            <Star size={20} />
                            <span>Favoritet</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div style={contentStyle}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route
                        path="*"
                        element={
                            <div style={{ textAlign: 'center', fontSize: '1.25rem', color: '#f87171', padding: '5rem 0' }}>
                                404 – Faqja nuk u gjet
                            </div>
                        }
                    />
                </Routes>
            </div>
        </div>
    )
}

export default App