import { useState } from 'react'
import { useWeatherStore } from '../store/weatherStore'
import { useThemeStore } from '../store/themeStore'
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
    const isDark = useThemeStore((state) => state.isDark)
    const [favoritesWithWeather, setFavoritesWithWeather] = useState<FavoriteWithWeather[]>([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // Ngarko motin për favoritet
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
        navigate(`/?city=${encodeURIComponent(cityName)}`)
    }

    // Empty state
    if (favorites.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '5rem 2rem'
            }}>
                <Star
                    size={80}
                    style={{
                        margin: '0 auto 1.5rem',
                        color: 'rgba(251, 191, 36, 0.5)',
                        display: 'block'
                    }}
                />
                <h2 style={{
                    fontSize: '1.875rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: isDark ? 'rgba(226, 232, 240, 0.9)' : '#1e293b'
                }}>
                    Asnjë favorit
                </h2>
                <p style={{
                    fontSize: '1.125rem',
                    color: isDark ? 'rgba(203, 213, 225, 0.6)' : 'rgba(30, 41, 59, 0.6)',
                    marginBottom: '2rem',
                    lineHeight: '1.75'
                }}>
                    Nuk ke shtuar ende asnjë qytet si favorit.
                    <br />
                    Kërko një qytet dhe shtyp yllin ⭐ për ta ruajtur!
                </p>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: isDark ? 'rgba(59, 130, 246, 0.7)' : 'rgba(59, 130, 246, 0.85)',
                        borderRadius: '12px',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                        border: 'none',
                        color: 'white',
                        fontSize: '1rem'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = isDark ? 'rgba(59, 130, 246, 0.9)' : 'rgba(59, 130, 246, 1)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = isDark ? 'rgba(59, 130, 246, 0.7)' : 'rgba(59, 130, 246, 0.85)'
                    }}
                >
                    Shko te Kërkimi
                </button>
            </div>
        )
    }

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem'
                }}>
                    <Star
                        size={28}
                        style={{ color: '#fbbf24', fill: '#fbbf24' }}
                        strokeWidth={2}
                    />
                    <h1 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: isDark ? '#e2e8f0' : '#1e293b'
                    }}>
                        Favoritet ({favorites.length})
                    </h1>
                </div>

                {favorites.length > 0 && !loading && (
                    <button
                        onClick={loadWeatherForFavorites}
                        style={{
                            padding: '0.625rem 1.25rem',
                            background: isDark ? 'rgba(59, 130, 246, 0.7)' : 'rgba(59, 130, 246, 0.85)',
                            borderRadius: '12px',
                            fontSize: '0.8125rem',
                            transition: 'all 0.2s',
                            cursor: 'pointer',
                            border: 'none',
                            color: 'white',
                            fontWeight: '600'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark ? 'rgba(59, 130, 246, 0.9)' : 'rgba(59, 130, 246, 1)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = isDark ? 'rgba(59, 130, 246, 0.7)' : 'rgba(59, 130, 246, 0.85)'
                        }}
                    >
                        Ngarko motin
                    </button>
                )}
            </div>

            {/* Loading State */}
            {loading && (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <div style={{
                        display: 'inline-block',
                        width: '2rem',
                        height: '2rem',
                        border: isDark
                            ? '3px solid rgba(203, 213, 225, 0.2)'
                            : '3px solid rgba(30, 41, 59, 0.2)',
                        borderTopColor: isDark ? '#e2e8f0' : '#1e293b',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                </div>
            )}

            {/* Favorites Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.25rem'
            }}>
                {(favoritesWithWeather.length > 0 ? favoritesWithWeather : favorites).map((fav: FavoriteWithWeather) => (
                    <div
                        key={fav.name}
                        style={{
                            background: isDark
                                ? 'rgba(30, 41, 59, 0.5)'
                                : 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(12px)',
                            borderRadius: '20px',
                            padding: '1.25rem',
                            border: isDark
                                ? '1px solid rgba(203, 213, 225, 0.15)'
                                : '1px solid rgba(30, 41, 59, 0.12)',
                            boxShadow: isDark
                                ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                                : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark
                                ? 'rgba(30, 41, 59, 0.7)'
                                : 'rgba(255, 255, 255, 0.9)'
                            e.currentTarget.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = isDark
                                ? 'rgba(30, 41, 59, 0.5)'
                                : 'rgba(255, 255, 255, 0.7)'
                            e.currentTarget.style.transform = 'translateY(0)'
                        }}
                    >
                        {/* Card Header */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            marginBottom: '0.875rem'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4375rem'
                            }}>
                                <MapPin
                                    size={18}
                                    style={{ color: isDark ? '#67e8f9' : '#0891b2' }}
                                    strokeWidth={2}
                                />
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '600',
                                    color: isDark ? '#e2e8f0' : '#1e293b'
                                }}>
                                    {fav.name}
                                </h3>
                            </div>
                            <Star
                                size={18}
                                style={{ color: '#fbbf24', fill: '#fbbf24' }}
                                strokeWidth={2}
                            />
                        </div>

                        {/* Temperature */}
                        <div style={{ marginBottom: '0.875rem' }}>
                            {fav.temperature !== undefined ? (
                                <div style={{
                                    fontSize: '2.5rem',
                                    fontWeight: '300',
                                    lineHeight: '1',
                                    color: isDark ? '#f1f5f9' : '#0f172a'
                                }}>
                                    {Math.round(fav.temperature)}°
                                    <span style={{
                                        fontSize: '1.25rem',
                                        color: isDark ? 'rgba(203, 213, 225, 0.7)' : 'rgba(30, 41, 59, 0.6)'
                                    }}>
                                        C
                                    </span>
                                </div>
                            ) : (
                                <div style={{ height: '2.5rem' }}></div>
                            )}
                        </div>

                        {/* Date Added */}
                        <div style={{
                            fontSize: '0.8125rem',
                            color: isDark ? 'rgba(203, 213, 225, 0.55)' : 'rgba(30, 41, 59, 0.5)',
                            marginBottom: '0.875rem',
                            fontWeight: '500'
                        }}>
                            Shtuar më: {new Date(fav.addedAt).toLocaleDateString('sq-AL', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        })}
                        </div>

                        {/* Action Buttons */}
                        <div style={{
                            display: 'flex',
                            gap: '0.4375rem'
                        }}>
                            <button
                                onClick={() => handleViewWeather(fav.name)}
                                style={{
                                    flex: '1',
                                    padding: '0.625rem 0.875rem',
                                    background: isDark ? 'rgba(59, 130, 246, 0.7)' : 'rgba(59, 130, 246, 0.85)',
                                    borderRadius: '10px',
                                    fontSize: '0.8125rem',
                                    transition: 'all 0.2s',
                                    cursor: 'pointer',
                                    border: 'none',
                                    color: 'white',
                                    fontWeight: '600'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = isDark
                                        ? 'rgba(59, 130, 246, 0.9)'
                                        : 'rgba(59, 130, 246, 1)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = isDark
                                        ? 'rgba(59, 130, 246, 0.7)'
                                        : 'rgba(59, 130, 246, 0.85)'
                                }}
                            >
                                Shiko motin
                            </button>
                            <button
                                onClick={() => handleRemove(fav.name)}
                                style={{
                                    padding: '0.625rem 0.875rem',
                                    background: isDark ? 'rgba(239, 68, 68, 0.7)' : 'rgba(239, 68, 68, 0.85)',
                                    borderRadius: '10px',
                                    fontSize: '0.8125rem',
                                    transition: 'all 0.2s',
                                    cursor: 'pointer',
                                    border: 'none',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                title="Hiq nga favoritet"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = isDark
                                        ? 'rgba(239, 68, 68, 0.9)'
                                        : 'rgba(239, 68, 68, 1)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = isDark
                                        ? 'rgba(239, 68, 68, 0.7)'
                                        : 'rgba(239, 68, 68, 0.85)'
                                }}
                            >
                                <Trash2 size={15} strokeWidth={2} />
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