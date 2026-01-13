
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
// import { getWeather, WeatherData } from '../services/weatherApi'
import { useWeatherStore } from '../store/weatherStore'
import { getWeather } from '../services/weatherApi'
import { useThemeStore } from '../store/themeStore'
import type { WeatherData } from '../services/weatherApi'
import CurrentWeather from '../components/CurrentWeather'
import AirConditions from '../components/AirConditions'
import TodayForecast from '../components/TodayForecast'
import WeeklyForecast from '../components/WeeklyForecast'
import { Cloud, Star } from 'lucide-react'

export default function Home() {
    const [searchParams] = useSearchParams()
    const [city, setCity] = useState('Tirana')
    const [searchInput, setSearchInput] = useState('Tirana')
    const [loading, setLoading] = useState(false)
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

    const { addFavorite, removeFavorite, isFavorite } = useWeatherStore()
    const isDark = useThemeStore((state) => state.isDark)

    useEffect(() => {
        const cityFromUrl = searchParams.get('city')
        if (cityFromUrl) {
            setSearchInput(cityFromUrl)
            fetchWeather(cityFromUrl)
        } else {
            fetchWeather('Tirana')
        }
    }, [searchParams])

    const fetchWeather = async (cityName: string) => {
        setLoading(true)
        const data = await getWeather(cityName)
        setLoading(false)

        if (data && data.current) {
            setWeatherData(data)
            setCity(cityName)
        } else {
            alert('Qyteti nuk u gjet ose pati problem me API-në')
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchInput.trim()) {
            fetchWeather(searchInput)
        }
    }

    const toggleFavorite = () => {
        if (isFavorite(city)) {
            removeFavorite(city)
        } else {
            addFavorite(city)
        }
    }

    const containerStyle = {
        maxWidth: '1400px',
        margin: '0 auto'
    }

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        flexWrap: 'wrap' as const,
        gap: '1rem'
    }

    const titleContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem'
    }

    const titleStyle = {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: isDark ? '#e2e8f0' : '#1e293b'
    }

    const dateStyle = {
        fontSize: '0.8125rem',
        color: isDark ? 'rgba(203, 213, 225, 0.7)' : 'rgba(30, 41, 59, 0.6)',
        fontWeight: '500'
    }

    const searchFormStyle = {
        marginBottom: '1.5rem',
        display: 'flex',
        gap: '0.625rem',
        flexWrap: 'wrap' as const
    }

    const inputStyle = {
        flex: '1',
        maxWidth: '600px',
        minWidth: '250px',
        padding: '0.875rem 1.25rem',
        borderRadius: '12px',
        background: isDark
            ? 'rgba(30, 41, 59, 0.5)'
            : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',
        border: isDark
            ? '1px solid rgba(203, 213, 225, 0.15)'
            : '1px solid rgba(30, 41, 59, 0.15)',
        color: isDark ? '#e2e8f0' : '#1e293b',
        fontSize: '0.9375rem',
        outline: 'none',
        transition: 'all 0.2s',
        fontWeight: '500'
    }

    const favoriteButtonStyle = {
        padding: '0.875rem 1.25rem',
        borderRadius: '12px',
        backdropFilter: 'blur(12px)',
        border: isFavorite(city)
            ? '1px solid #fbbf24'
            : isDark
                ? '1px solid rgba(203, 213, 225, 0.15)'
                : '1px solid rgba(30, 41, 59, 0.15)',
        transition: 'all 0.2s',
        cursor: 'pointer',
        background: isFavorite(city)
            ? 'rgba(251, 191, 36, 0.2)'
            : isDark
                ? 'rgba(30, 41, 59, 0.5)'
                : 'rgba(255, 255, 255, 0.7)',
        color: isFavorite(city)
            ? '#fbbf24'
            : isDark
                ? 'rgba(203, 213, 225, 0.7)'
                : 'rgba(30, 41, 59, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const loadingStyle = {
        textAlign: 'center' as const,
        padding: '4rem 0'
    }

    const spinnerStyle = {
        display: 'inline-block',
        width: '2.5rem',
        height: '2.5rem',
        border: isDark
            ? '3px solid rgba(203, 213, 225, 0.2)'
            : '3px solid rgba(30, 41, 59, 0.2)',
        borderTopColor: isDark ? '#e2e8f0' : '#1e293b',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    }

    const loadingTextStyle = {
        color: isDark ? 'rgba(203, 213, 225, 0.7)' : 'rgba(30, 41, 59, 0.6)',
        marginTop: '0.875rem',
        fontSize: '0.875rem',
        fontWeight: '500'
    }

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1.25rem'
    }

    return (
        <div style={containerStyle}>
            {/* Header */}
            <div style={headerStyle}>
                <div style={titleContainerStyle}>
                    <Cloud size={28} style={{ color: isDark ? '#67e8f9' : '#0891b2' }} />
                    <h1 style={titleStyle}>Weather Forecasting</h1>
                </div>
                <div style={dateStyle}>
                    {new Date().toLocaleString('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    })} GMT
                </div>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} style={searchFormStyle}>
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Kërko qytet..."
                    style={inputStyle}
                    disabled={loading}
                    onFocus={(e) => {
                        e.target.style.borderColor = isDark ? '#67e8f9' : '#0891b2'
                        e.target.style.boxShadow = isDark
                            ? '0 0 0 3px rgba(103, 232, 249, 0.15)'
                            : '0 0 0 3px rgba(8, 145, 178, 0.15)'
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = isDark
                            ? 'rgba(203, 213, 225, 0.15)'
                            : 'rgba(30, 41, 59, 0.15)'
                        e.target.style.boxShadow = 'none'
                    }}
                />

                {weatherData && (
                    <button
                        type="button"
                        onClick={toggleFavorite}
                        style={favoriteButtonStyle}
                        title={isFavorite(city) ? 'Hiq nga favoritet' : 'Shto te favoritet'}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = isFavorite(city)
                                ? 'rgba(251, 191, 36, 0.3)'
                                : isDark
                                    ? 'rgba(30, 41, 59, 0.7)'
                                    : 'rgba(255, 255, 255, 0.9)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = isFavorite(city)
                                ? 'rgba(251, 191, 36, 0.2)'
                                : isDark
                                    ? 'rgba(30, 41, 59, 0.5)'
                                    : 'rgba(255, 255, 255, 0.7)'
                        }}
                    >
                        <Star
                            size={20}
                            style={{
                                fill: isFavorite(city) ? '#fbbf24' : 'none'
                            }}
                        />
                    </button>
                )}
            </form>

            {/* Loading State */}
            {loading && (
                <div style={loadingStyle}>
                    <div style={spinnerStyle}></div>
                    <p style={loadingTextStyle}>Duke kërkuar...</p>
                </div>
            )}

            {/* Weather Data */}
            {weatherData && !loading && (
                <div style={gridStyle}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.25rem'
                    }}>
                        {/* Left Column */}
                        <div style={{
                            gridColumn: 'span 2',
                            display: 'flex',
                            flexDirection: 'column' as const,
                            gap: '1.25rem'
                        }}>
                            <CurrentWeather city={city} data={weatherData.current} />
                            <AirConditions data={weatherData.current} />
                            <TodayForecast hourlyData={weatherData.hourly} />
                        </div>

                        {/* Right Column */}
                        <div>
                            <WeeklyForecast dailyData={weatherData.daily} />
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}