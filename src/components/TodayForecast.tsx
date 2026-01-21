import { Cloud, CloudRain, CloudSnow, Sun } from 'lucide-react'
import { useThemeStore } from '../store/themeStore'

interface TodayForecastProps {
    hourlyData: {
        time: string[]
        temperature_2m: number[]
        weathercode: number[]
    }
}

export default function TodayForecast({ hourlyData }: TodayForecastProps) {
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

    const formatTime = (timeStr: string) => {
        return new Date(timeStr).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
    }

    const currentHour = new Date().getHours()
    const todayForecast = hourlyData.time
        .slice(currentHour, currentHour + 6)
        .map((time, i) => ({
            time,
            temp: hourlyData.temperature_2m[currentHour + i],
            code: hourlyData.weathercode[currentHour + i]
        }))

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

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: '0.875rem'
    }

    const itemStyle = {
        background: isDark
            ? 'rgba(51, 65, 85, 0.4)'
            : 'rgba(248, 250, 252, 0.8)',
        borderRadius: '12px',
        padding: '0.875rem',
        textAlign: 'center' as const,
        border: isDark
            ? '1px solid rgba(203, 213, 225, 0.08)'
            : '1px solid rgba(30, 41, 59, 0.08)',
        transition: 'all 0.2s'
    }

    const timeStyle = {
        fontSize: '0.8125rem',
        color: isDark ? 'rgba(203, 213, 225, 0.65)' : 'rgba(30, 41, 59, 0.6)',
        marginBottom: '0.625rem',
        fontWeight: '600'
    }

    const iconContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '0.625rem'
    }

    const tempStyle = {
        fontSize: '1.125rem',
        fontWeight: '600',
        color: isDark ? '#e2e8f0' : '#1e293b'
    }

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>Parashikimi i Sotëm</h2>

            <div style={gridStyle}>
                {todayForecast.map((item, i) => (
                    <div
                        key={i}
                        style={itemStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark
                                ? 'rgba(51, 65, 85, 0.6)'
                                : 'rgba(241, 245, 249, 1)'
                            e.currentTarget.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = isDark
                                ? 'rgba(51, 65, 85, 0.4)'
                                : 'rgba(248, 250, 252, 0.8)'
                            e.currentTarget.style.transform = 'translateY(0)'
                        }}
                    >
                        <p style={timeStyle}>{formatTime(item.time)}</p>
                        <div style={iconContainerStyle}>
                            {getWeatherIcon(item.code, 28)}
                        </div>
                        <p style={tempStyle}>{Math.round(item.temp)}°C</p>
                    </div>
                ))}
            </div>
        </div>
    )
}