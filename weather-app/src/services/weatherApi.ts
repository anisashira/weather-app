export interface WeatherData {
    current: {
        temperature_2m: number
        apparent_temperature: number
        weathercode: number
        windspeed_10m: number
        relativehumidity_2m: number
        visibility: number
        pressure_msl: number
        time: string
    }
    hourly: {
        time: string[]
        temperature_2m: number[]
        weathercode: number[]
        relativehumidity_2m: number[]
    }
    daily: {
        time: string[]
        temperature_2m_max: number[]
        temperature_2m_min: number[]
        weathercode: number[]
        windspeed_10m_max: number[]
        relative_humidity_2m_max: number[]
    }
}

export async function getWeather(city: string): Promise<WeatherData | null> {
    try {
        const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        )
        const geoData = await geoRes.json()

        if (!geoData.results?.[0]) {
            console.error('Qyteti nuk u gjet')
            return null
        }

        const { latitude, longitude } = geoData.results[0]

        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?` +
            `latitude=${latitude}&longitude=${longitude}` +
            `&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m,relativehumidity_2m,visibility,pressure_msl` +
            `&hourly=temperature_2m,weathercode,relativehumidity_2m` +
            `&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max,relative_humidity_2m_max` +
            `&timezone=auto&forecast_days=7`
        )

        const weatherData = await weatherRes.json()
        return weatherData
    } catch (error) {
        console.error('Gabim gjatë marrjes së motit:', error)
        return null
    }
}