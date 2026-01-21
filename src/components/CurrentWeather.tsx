import { Cloud, CloudRain, CloudSnow, Sun } from 'lucide-react'
import { useThemeStore } from '../store/themeStore'

interface CurrentWeatherProps {
    city: string
    data: {
        temperature_2m: number
        apparent_temperature: number
        weathercode: number
        windspeed_10m: number
        time: string
    }
}

export default function CurrentWeather({ city, data }: CurrentWeatherProps) {
    const isDark = useThemeStore((state) => state.isDark)

    const getWeatherIcon = (code: number, size = 24) => {
        const props = { size, strokeWidth: 2 };
        if ([0, 1].includes(code)) return <Sun {...props} style={{ color: '#fbbf24' }} />;
        if ([2, 3].includes(code)) return <Cloud {...props} style={{ color: isDark ? '#93c5fd' : '#3b82f6' }} />;
        if ([45, 48, 51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
            return <CloudRain {...props} style={{ color: isDark ? '#60a5fa' : '#2563eb' }} />;
        if ([71, 73, 75, 77, 85, 86].includes(code))
            return <CloudSnow {...props} style={{ color: isDark ? '#bfdbfe' : '#60a5fa' }} />;
        return <Cloud {...props} style={{ color: isDark ? '#93c5fd' : '#3b82f6' }} />;
    }

    const getWeatherDesc = (code: number) => {
        if ([0, 1].includes(code)) return "Qiell i kthjellët";
        if ([2, 3].includes(code)) return "Pjesërisht me re";
        if ([45, 48].includes(code)) return "Me mjegull";
        if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "Me shi";
        if ([71, 73, 75, 77, 85, 86].includes(code)) return "Me dëborë";
        return "Me re";
    }

    const currentDate = new Date();
    const dayName = currentDate.toLocaleDateString('sq-AL', { weekday: 'long' });
    const dateStr = currentDate.toLocaleDateString('sq-AL', { day: 'numeric', month: 'short' });

    const containerStyle = {
        background: isDark
            ? 'rgba(30, 41, 59, 0.5)'
            : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',
        borderRadius: '20px',
        padding: '1.5rem',
        border: isDark
            ? '1px solid rgba(203, 213, 225, 0.15)'
            : '1px solid rgba(30, 41, 59, 0.12)',
        boxShadow: isDark
            ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        marginBottom: '1.25rem'
    }

    const headerStyle = {
        fontSize: '0.875rem',
        fontWeight: '600',
        marginBottom: '1.25rem',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
        color: isDark ? 'rgba(203, 213, 225, 0.6)' : 'rgba(30, 41, 59, 0.5)'
    }

    const contentStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap' as const,
        gap: '1.5rem'
    }

    const leftSideStyle = {
        flex: '1',
        minWidth: '220px'
    }

    const cityStyle = {
        fontSize: '1.75rem',
        fontWeight: 'bold',
        marginBottom: '0.375rem',
        color: isDark ? '#e2e8f0' : '#1e293b'
    }

    const dateStyle = {
        color: isDark ? 'rgba(203, 213, 225, 0.65)' : 'rgba(30, 41, 59, 0.6)',
        marginBottom: '1.25rem',
        textTransform: 'capitalize' as const,
        fontSize: '0.875rem',
        fontWeight: '500'
    }

    const tempStyle = {
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.375rem',
        marginBottom: '0.75rem'
    }

    const tempNumberStyle = {
        fontSize: '3.5rem',
        fontWeight: '300',
        lineHeight: '1',
        color: isDark ? '#f1f5f9' : '#0f172a'
    }

    const tempUnitStyle = {
        fontSize: '1.75rem',
        color: isDark ? 'rgba(203, 213, 225, 0.7)' : 'rgba(30, 41, 59, 0.6)'
    }

    const descStyle = {
        fontSize: '1rem',
        color: isDark ? 'rgba(203, 213, 225, 0.85)' : 'rgba(30, 41, 59, 0.8)',
        marginBottom: '0.375rem',
        fontWeight: '500'
    }

    const feelsLikeStyle = {
        fontSize: '0.8125rem',
        color: isDark ? 'rgba(203, 213, 225, 0.55)' : 'rgba(30, 41, 59, 0.5)',
        fontWeight: '500'
    }

    const iconContainerStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center'
    }

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>Moti Aktual</h2>

            <div style={contentStyle}>
                <div style={leftSideStyle}>
                    <h3 style={cityStyle}>{city.toUpperCase()}</h3>
                    <p style={dateStyle}>{dayName}, {dateStr}</p>

                    <div style={tempStyle}>
                        <span style={tempNumberStyle}>{Math.round(data.temperature_2m)}°</span>
                        <span style={tempUnitStyle}>C</span>
                    </div>

                    <p style={descStyle}>{getWeatherDesc(data.weathercode)}</p>
                    <p style={feelsLikeStyle}>Ndjehet si {Math.round(data.apparent_temperature)}°C</p>
                </div>

                <div style={iconContainerStyle}>
                    {getWeatherIcon(data.weathercode, 80)}
                </div>
            </div>
        </div>
    )
}