import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Favorite {
    name: string
    addedAt: string
}

interface WeatherStore {
    favorites: Favorite[]
    addFavorite: (city: string) => void
    removeFavorite: (city: string) => void
    isFavorite: (city: string) => boolean
    clearAllFavorites: () => void
}

export const useWeatherStore = create<WeatherStore>()(
    persist(
        (set, get) => ({
            favorites: [],

            // Shto një qytet te favoritet
            addFavorite: (city) => {
                const exists = get().favorites.some(
                    f => f.name.toLowerCase() === city.toLowerCase()
                )

                if (!exists && city.trim()) {
                    set(state => ({
                        favorites: [
                            ...state.favorites,
                            {
                                name: city,
                                addedAt: new Date().toISOString()
                            }
                        ]
                    }))
                }
            },

            // Hiq një qytet nga favoritet
            removeFavorite: (city) => {
                set(state => ({
                    favorites: state.favorites.filter(
                        f => f.name.toLowerCase() !== city.toLowerCase()
                    )
                }))
            },

            // Kontrollo nëse një qytet është favorit
            isFavorite: (city) => {
                return get().favorites.some(
                    f => f.name.toLowerCase() === city.toLowerCase()
                )
            },

            // Pastro të gjithë favoritet (opsionale)
            clearAllFavorites: () => {
                if (confirm('Dëshiron të fshish të gjithë favoritet?')) {
                    set({ favorites: [] })
                }
            }
        }),
        {
            name: 'weather-favorites', // Emri në localStorage
        }
    )
)