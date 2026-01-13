import { Cloud, CloudRain, CloudSnow, Sun } from 'lucide-react'

interface TodayForecastProps {
    hourlyData: {
        time: string[]
        temperature_2m: number[]
        weathercode: number[]
    }
}

export default function TodayForecast({ hourlyData }: TodayForecastProps) {
    const getWeatherIcon = (code: number, size = 24) => {
        const props = { size };
        if ([0, 1].includes(code)) return <Sun {...props} style={{ color: '#fbbf24' }} />;
        if ([2, 3].includes(code)) return <Cloud {...props} style={{ color: '#93c5fd' }} />;
        if ([45, 48, 51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
            return <CloudRain {...props} style={{ color: '#60a5fa' }} />;
        if ([71, 73, 75, 77, 85, 86].includes(code))
            return <CloudSnow {...props} style={{ color: '#bfdbfe' }} />;
        return <Cloud {...props} style={{ color: '#93c5fd' }} />;
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
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        borderRadius: '24px',
        padding: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        marginBottom: '1.5rem'
    }

    const headerStyle = {
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '1.5rem',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
        color: 'rgba(255, 255, 255, 0.8)'
    }

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '1rem'
    }

    const itemStyle = {
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        padding: '1rem',
        textAlign: 'center' as const,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.2s'
    }

    const timeStyle = {
        fontSize: '0.875rem',
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: '0.75rem',
        fontWeight: '500'
    }

    const iconContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '0.75rem'
    }

    const tempStyle = {
        fontSize: '1.25rem',
        fontWeight: '600'
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
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                        }}
                    >
                        <p style={timeStyle}>{formatTime(item.time)}</p>
                        <div style={iconContainerStyle}>
                            {getWeatherIcon(item.code, 32)}
                        </div>
                        <p style={tempStyle}>{Math.round(item.temp)}°C</p>
                    </div>
                ))}
            </div>
        </div>
    )
}