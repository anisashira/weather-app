import { Cloud, CloudRain, CloudSnow, Sun, Wind, Droplets } from 'lucide-react'
import { useThemeStore } from '../store/themeStore'

interface WeeklyForecastProps {
    dailyData: {
        time: string[]
        temperature_2m_max: number[]
        temperature_2m_min: number[]
        weathercode: number[]
        windspeed_10m_max: number[]
        relative_humidity_2m_max: number[]
    }
}

export default function WeeklyForecast({ dailyData }: WeeklyForecastProps) {
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

    const getDayName = (dateStr: string, index: number) => {
        if (index === 0) return "Sot";
        if (index === 1) return "Nesër";

        const days = ['E Diel', 'E Hënë', 'E Martë', 'E Mërkurë', 'E Enjte', 'E Premte', 'E Shtunë'];
        return days[new Date(dateStr).getDay()];
    }

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
        position: 'sticky' as const,
        top: '1.5rem'
    }

    const headerStyle = {
        fontSize: '0.875rem',
        fontWeight: '600',
        marginBottom: '1.25rem',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
        color: isDark ? 'rgba(203, 213, 225, 0.6)' : 'rgba(30, 41, 59, 0.5)'
    }

    const listStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '0.75rem'
    }

    const itemStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.625rem 0.375rem',
        borderBottom: isDark
            ? '1px solid rgba(203, 213, 225, 0.08)'
            : '1px solid rgba(30, 41, 59, 0.08)',
        transition: 'all 0.2s',
        borderRadius: '8px'
    }

    const leftSideStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
        flex: '1',
        minWidth: '0'
    }

    const dayNameStyle = {
        fontWeight: '600',
        fontSize: '0.8125rem',
        whiteSpace: 'nowrap' as const,
        color: isDark ? '#e2e8f0' : '#1e293b'
    }

    const detailsStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem'
    }

    const detailItemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.1875rem'
    }

    const detailTextStyle = {
        fontSize: '0.6875rem',
        color: isDark ? 'rgba(203, 213, 225, 0.65)' : 'rgba(30, 41, 59, 0.6)',
        fontWeight: '500'
    }

    const tempContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.4375rem',
        marginLeft: '0.625rem'
    }

    const maxTempStyle = {
        fontSize: '1rem',
        fontWeight: '600',
        color: isDark ? '#e2e8f0' : '#1e293b'
    }

    const minTempStyle = {
        fontSize: '0.8125rem',
        color: isDark ? 'rgba(203, 213, 225, 0.55)' : 'rgba(30, 41, 59, 0.5)',
        fontWeight: '500'
    }

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>Parashikimi Javor</h2>

            <div style={listStyle}>
                {dailyData.time.map((date, i) => (
                    <div
                        key={i}
                        style={itemStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark
                                ? 'rgba(51, 65, 85, 0.3)'
                                : 'rgba(248, 250, 252, 0.8)'
                            e.currentTarget.style.transform = 'translateX(2px)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent'
                            e.currentTarget.style.transform = 'translateX(0)'
                        }}
                    >
                        <div style={leftSideStyle}>
                            {getWeatherIcon(dailyData.weathercode[i], 24)}
                            <span style={dayNameStyle}>{getDayName(date, i)}</span>
                        </div>

                        <div style={detailsStyle}>
                            <div style={detailItemStyle}>
                                <Droplets size={13} style={{ color: isDark ? '#67e8f9' : '#0891b2' }} strokeWidth={2} />
                                <span style={detailTextStyle}>
                                    {dailyData.relative_humidity_2m_max[i]}%
                                </span>
                            </div>

                            <div style={detailItemStyle}>
                                <Wind size={13} style={{ color: isDark ? 'rgba(203, 213, 225, 0.7)' : 'rgba(30, 41, 59, 0.6)' }} strokeWidth={2} />
                                <span style={detailTextStyle}>
                                    {dailyData.windspeed_10m_max[i].toFixed(0)}
                                </span>
                            </div>
                        </div>

                        <div style={tempContainerStyle}>
                            <span style={maxTempStyle}>
                                {Math.round(dailyData.temperature_2m_max[i])}°
                            </span>
                            <span style={minTempStyle}>
                                {Math.round(dailyData.temperature_2m_min[i])}°
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}