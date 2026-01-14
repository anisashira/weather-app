import {
    WeatherDataSchema,
    GeocodingResponseSchema,
    type WeatherData
} from '../schemas/weatherSchema'

export type { WeatherData }

export async function getWeather(city: string): Promise<WeatherData | null> {
    try {
        // Step 1: Geocoding - Merr koordinatat e qytetit
        const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        )

        if (!geoRes.ok) {
            console.error('Geocoding API request failed:', geoRes.status)
            return null
        }

        const geoDataRaw = await geoRes.json()

        // Validate geocoding response
        const geoValidation = GeocodingResponseSchema.safeParse(geoDataRaw)

        if (!geoValidation.success) {
            console.error('Geocoding validation error:', geoValidation.error.issues)
            return null
        }

        const geoData = geoValidation.data

        if (!geoData.results?.[0]) {
            console.error('Qyteti nuk u gjet')
            return null
        }

        const { latitude, longitude } = geoData.results[0]

        // Step 2: Weather API - Merr të dhënat e motit
        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?` +
            `latitude=${latitude}&longitude=${longitude}` +
            `&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m,relativehumidity_2m,visibility,pressure_msl` +
            `&hourly=temperature_2m,weathercode,relativehumidity_2m` +
            `&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max,relative_humidity_2m_max` +
            `&timezone=auto&forecast_days=7`
        )

        if (!weatherRes.ok) {
            console.error('Weather API request failed:', weatherRes.status)
            return null
        }

        const weatherDataRaw = await weatherRes.json()

        // Validate weather response
        const weatherValidation = WeatherDataSchema.safeParse(weatherDataRaw)

        if (!weatherValidation.success) {
            console.error('Weather validation error:', weatherValidation.error.issues)
            return null
        }

        return weatherValidation.data

    } catch (error) {
        console.error('Gabim gjatë marrjes së motit:', error)
        return null
    }
}