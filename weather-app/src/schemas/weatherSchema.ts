import { z } from 'zod'

// Schema për Current Weather
export const CurrentWeatherSchema = z.object({
    temperature_2m: z.number(),
    apparent_temperature: z.number(),
    weathercode: z.number().int().min(0).max(99),
    windspeed_10m: z.number().min(0),
    relativehumidity_2m: z.number().int().min(0).max(100),
    visibility: z.number().min(0),
    pressure_msl: z.number().min(0),
    time: z.string()
})

// Schema për Hourly Weather
export const HourlyWeatherSchema = z.object({
    time: z.array(z.string()),
    temperature_2m: z.array(z.number()),
    weathercode: z.array(z.number().int()),
    relativehumidity_2m: z.array(z.number().int())
})

// Schema për Daily Weather
export const DailyWeatherSchema = z.object({
    time: z.array(z.string()),
    temperature_2m_max: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
    weathercode: z.array(z.number().int()),
    windspeed_10m_max: z.array(z.number()),
    relative_humidity_2m_max: z.array(z.number().int())
})

// Schema për të gjithë Weather Data
export const WeatherDataSchema = z.object({
    current: CurrentWeatherSchema,
    hourly: HourlyWeatherSchema,
    daily: DailyWeatherSchema
})

// Schema për Geocoding Response
export const GeocodingResultSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
    name: z.string().optional(),
    country: z.string().optional()
})

export const GeocodingResponseSchema = z.object({
    results: z.array(GeocodingResultSchema).optional()
})

// Export types nga schemas
export type WeatherData = z.infer<typeof WeatherDataSchema>
export type CurrentWeather = z.infer<typeof CurrentWeatherSchema>
export type HourlyWeather = z.infer<typeof HourlyWeatherSchema>
export type DailyWeather = z.infer<typeof DailyWeatherSchema>
export type GeocodingResult = z.infer<typeof GeocodingResultSchema>