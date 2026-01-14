import { useState, useEffect } from 'react'
import { getWeather, type WeatherData } from '../services/weatherApi'

interface UseWeatherReturn {
    data: WeatherData | null
    loading: boolean
    error: string | null
    refetch: () => void
}

export function useWeather(city: string, autoFetch: boolean = true): UseWeatherReturn {
    const [data, setData] = useState<WeatherData | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchWeather = async () => {
        if (!city.trim()) {
            setError('Ju lutem shkruani një qytet')
            return
        }

        setLoading(true)
        setError(null)

        try {
            const weatherData = await getWeather(city)

            if (weatherData) {
                setData(weatherData)
                setError(null)
            } else {
                setData(null)
                setError(`Qyteti "${city}" nuk u gjet`)
            }
        } catch (err) {
            setData(null)
            setError('Problem me API-në. Provoni përsëri.')
            console.error('Error fetching weather:', err)
        } finally {
            setLoading(false)
        }
    }

    // Auto-fetch kur ndryshon qyteti (nëse autoFetch është true)
    useEffect(() => {
        if (autoFetch && city) {
            fetchWeather()
        }
    }, [city, autoFetch])

    return {
        data,
        loading,
        error,
        refetch: fetchWeather
    }
}