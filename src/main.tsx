import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { useThemeStore } from './store/themeStore'

const Root = () => {
    const isDark = useThemeStore((state) => state.isDark)

    useEffect(() => {
        // Apliko dark mode në document
        if (isDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDark])

    return <App />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </React.StrictMode>
)