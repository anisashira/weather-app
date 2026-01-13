import { useState } from 'react'
import { useWeatherStore } from '../store/weatherStore'
import { getWeather } from '../services/weatherApi'
import { Star, Trash2, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface FavoriteWithWeather {
    name: string
    addedAt: string
    temperature?: number
    weathercode?: number
}

export default function Favorites() {
    const { favorites, removeFavorite } = useWeatherStore()
    const [favoritesWithWeather, setFavoritesWithWeather] = useState<FavoriteWithWeather[]>([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // Ngarko motin për favoritet (opsionale)
    const loadWeatherForFavorites = async () => {
        setLoading(true)
        const updated = await Promise.all(
            favorites.map(async (fav) => {
                const weather = await getWeather(fav.name)
                return {
                    ...fav,
                    temperature: weather?.current.temperature_2m,
                    weathercode: weather?.current.weathercode
                }
            })
        )
        setFavoritesWithWeather(updated)
        setLoading(false)
    }

    const handleRemove = (cityName: string) => {
        if (confirm(`Dëshiron të heqësh "${cityName}" nga favoritet?`)) {
            removeFavorite(cityName)
            setFavoritesWithWeather(prev => prev.filter(f => f.name !== cityName))
        }
    }

    const handleViewWeather = (cityName: string) => {
        // Kthehu te Home dhe kërko për këtë qytet
        navigate(`/?city=${encodeURIComponent(cityName)}`)
    }

    // Empty state
    if (favorites.length === 0) {
        const emptyContainerStyle = {
            textAlign: 'center' as const,
            padding: '5rem 2rem'
        }

        const emptyIconStyle = {
            margin: '0 auto 1.5rem',
            color: 'rgba(251, 191, 36, 0.5)'
        }

        const emptyTitleStyle = {
            fontSize: '1.875rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: 'rgba(255, 255, 255, 0.9)'
        }

        const emptyTextStyle = {
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '2rem',
            lineHeight: '1.75'
        }

        const emptyButtonStyle = {
            padding: '0.75rem 1.5rem',
            background: 'rgba(59, 130, 246, 0.8)',
            borderRadius: '12px',
            fontWeight: '500',
            transition: 'all 0.2s',
            cursor: 'pointer',
            border: 'none',
            color: 'white',
            fontSize: '1rem'
        }

        return (
            <div style={emptyContainerStyle}>
                <Star size={80} style={emptyIconStyle} />
                <h2 style={emptyTitleStyle}>Asnjë favorit</h2>
                <p style={emptyTextStyle}>
                    Nuk ke shtuar ende asnjë qytet si favorit.
                    <br />
                    Kërko një qytet dhe shtyp yllin ⭐ për ta ruajtur!
                </p>
                <button
                    onClick={() => navigate('/')}
                    style={emptyButtonStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 1)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.8)'
                    }}
                >
                    Shko te Kërkimi
                </button>
            </div>
        )
    }

    // Styles
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

    const loadButtonStyle = {
        padding: '0.75rem 1.5rem',
        background: 'rgba(59, 130, 246, 0.8)',
        borderRadius: '12px',
        fontSize: '0.875rem',
        transition: 'all 0.2s',
        cursor: 'pointer',
        border: 'none',
        color: 'white',
        fontWeight: '500'
    }

    const loadingStyle = {
        textAlign: 'center' as const,
        padding: '2.5rem 0'
    }

    const spinnerStyle = {
        display: 'inline-block',
        width: '2.5rem',
        height: '2.5rem',
        border: '4px solid rgba(255, 255, 255, 0.2)',
        borderTopColor: 'white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    }

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem'
    }

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        borderRadius: '24px',
        padding: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s'
    }

    const cardHeaderStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '1rem'
    }

    const cityNameContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    }

    const cityNameStyle = {
        fontSize: '1.5rem',
        fontWeight: '600'
    }

    const tempContainerStyle = {
        marginBottom: '1rem'
    }

    const tempStyle = {
        fontSize: '3rem',
        fontWeight: '300',
        lineHeight: '1'
    }

    const dateTextStyle = {
        fontSize: '0.875rem',
        color: 'rgba(255, 255, 255, 0.6)',
        marginBottom: '1rem'
    }

    const buttonsContainerStyle = {
        display: 'flex',
        gap: '0.5rem'
    }

    const viewButtonStyle = {
        flex: '1',
        padding: '0.75rem 1rem',
        background: 'rgba(59, 130, 246, 0.8)',
        borderRadius: '12px',
        fontSize: '0.875rem',
        transition: 'all 0.2s',
        cursor: 'pointer',
        border: 'none',
        color: 'white',
        fontWeight: '500'
    }

    const deleteButtonStyle = {
        padding: '0.75rem 1rem',
        background: 'rgba(239, 68, 68, 0.8)',
        borderRadius: '12px',
        fontSize: '0.875rem',
        transition: 'all 0.2s',
        cursor: 'pointer',
        border: 'none',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return (
        <div style={containerStyle}>
            {/* Header */}
            <div style={headerStyle}>
                <div style={titleContainerStyle}>
                    <Star size={32} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                    <h1 style={titleStyle}>Favoritet ({favorites.length})</h1>
                </div>

                {favorites.length > 0 && !loading && (
                    <button
                        onClick={loadWeatherForFavorites}
                        style={loadButtonStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(59, 130, 246, 1)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.8)'
                        }}
                    >
                        Ngarko motin
                    </button>
                )}
            </div>

            {/* Loading State */}
            {loading && (
                <div style={loadingStyle}>
                    <div style={spinnerStyle}></div>
                </div>
            )}

            {/* Favorites Grid */}
            <div style={gridStyle}>
                {(favoritesWithWeather.length > 0 ? favoritesWithWeather : favorites).map((fav) => (
                    <div
                        key={fav.name}
                        style={cardStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                            e.currentTarget.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                            e.currentTarget.style.transform = 'translateY(0)'
                        }}
                    >
                        {/* Card Header */}
                        <div style={cardHeaderStyle}>
                            <div style={cityNameContainerStyle}>
                                <MapPin size={20} style={{ color: '#67e8f9' }} />
                                <h3 style={cityNameStyle}>{fav.name}</h3>
                            </div>
                            <Star size={20} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                        </div>

                        {/* Temperature */}
                        {fav.temperature !== undefined ? (
                            <div style={tempContainerStyle}>
                                <div style={tempStyle}>
                                    {Math.round(fav.temperature)}°
                                    <span style={{ fontSize: '1.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>C</span>
                                </div>
                            </div>
                        ) : (
                            <div style={{ ...tempContainerStyle, height: '3rem' }}></div>
                        )}

                        {/* Date Added */}
                        <div style={dateTextStyle}>
                            Shtuar më: {new Date(fav.addedAt).toLocaleDateString('sq-AL', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        })}
                        </div>

                        {/* Action Buttons */}
                        <div style={buttonsContainerStyle}>
                            <button
                                onClick={() => handleViewWeather(fav.name)}
                                style={viewButtonStyle}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(59, 130, 246, 1)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.8)'
                                }}
                            >
                                Shiko motin
                            </button>
                            <button
                                onClick={() => handleRemove(fav.name)}
                                style={deleteButtonStyle}
                                title="Hiq nga favoritet"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(239, 68, 68, 1)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.8)'
                                }}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}