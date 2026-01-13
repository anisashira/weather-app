import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
// import { getWeather, WeatherData } from '../services/weatherApi'
import { useWeatherStore } from '../store/weatherStore'
import { getWeather } from '../services/weatherApi'
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
        marginBottom: '2rem',
        flexWrap: 'wrap' as const,
        gap: '1rem'
    }

    const titleContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
    }

    const titleStyle = {
        fontSize: '1.875rem',
        fontWeight: 'bold'
    }

    const dateStyle = {
        fontSize: '0.875rem',
        color: 'rgba(255, 255, 255, 0.7)'
    }

    const searchFormStyle = {
        marginBottom: '2rem',
        display: 'flex',
        gap: '0.75rem',
        flexWrap: 'wrap' as const
    }

    const inputStyle = {
        flex: '1',
        maxWidth: '600px',
        minWidth: '250px',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'white',
        fontSize: '1rem',
        outline: 'none',
        transition: 'all 0.2s'
    }

    const favoriteButtonStyle = {
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.2s',
        cursor: 'pointer',
        background: isFavorite(city) ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255, 255, 255, 0.1)',
        borderColor: isFavorite(city) ? '#fbbf24' : 'rgba(255, 255, 255, 0.2)',
        color: isFavorite(city) ? '#fbbf24' : 'rgba(255, 255, 255, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const loadingStyle = {
        textAlign: 'center' as const,
        padding: '5rem 0'
    }

    const spinnerStyle = {
        display: 'inline-block',
        width: '3rem',
        height: '3rem',
        border: '4px solid rgba(255, 255, 255, 0.2)',
        borderTopColor: 'white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    }

    const loadingTextStyle = {
        color: 'rgba(255, 255, 255, 0.7)',
        marginTop: '1rem'
    }

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1.5rem'
    }

    const leftColumnStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1.5rem'
    }

    return (
        <div style={containerStyle}>
            {/* Header */}
            <div style={headerStyle}>
                <div style={titleContainerStyle}>
                    <Cloud size={32} style={{ color: '#67e8f9' }} />
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
                        e.target.style.borderColor = '#67e8f9'
                        e.target.style.boxShadow = '0 0 0 2px rgba(103, 232, 249, 0.2)'
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
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
                                : 'rgba(255, 255, 255, 0.15)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = isFavorite(city)
                                ? 'rgba(251, 191, 36, 0.2)'
                                : 'rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        <Star
                            size={24}
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
                        gap: '1.5rem'
                    }}>
                        {/* Left Column */}
                        <div style={{ gridColumn: 'span 2', ...leftColumnStyle }}>
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