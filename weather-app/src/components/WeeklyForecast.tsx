import { Cloud, CloudRain, CloudSnow, Sun, Wind, Droplets } from 'lucide-react'

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

    const getDayName = (dateStr: string, index: number) => {
        if (index === 0) return "Sot";
        if (index === 1) return "Nesër";

        const days = ['E Diel', 'E Hënë', 'E Martë', 'E Mërkurë', 'E Enjte', 'E Premte', 'E Shtunë'];
        return days[new Date(dateStr).getDay()];
    }

    const containerStyle = {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        borderRadius: '24px',
        padding: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        position: 'sticky' as const,
        top: '2rem'
    }

    const headerStyle = {
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '1.5rem',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
        color: 'rgba(255, 255, 255, 0.8)'
    }

    const listStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1rem'
    }

    const itemStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 0.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.2s',
        borderRadius: '8px'
    }

    const leftSideStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        flex: '1',
        minWidth: '0'
    }

    const dayNameStyle = {
        fontWeight: '500',
        fontSize: '0.875rem',
        whiteSpace: 'nowrap' as const
    }

    const detailsStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
    }

    const detailItemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem'
    }

    const detailTextStyle = {
        fontSize: '0.75rem',
        color: 'rgba(255, 255, 255, 0.7)'
    }

    const tempContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginLeft: '0.75rem'
    }

    const maxTempStyle = {
        fontSize: '1.125rem',
        fontWeight: '600'
    }

    const minTempStyle = {
        fontSize: '0.875rem',
        color: 'rgba(255, 255, 255, 0.6)'
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
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent'
                        }}
                    >
                        <div style={leftSideStyle}>
                            {getWeatherIcon(dailyData.weathercode[i], 28)}
                            <span style={dayNameStyle}>{getDayName(date, i)}</span>
                        </div>

                        <div style={detailsStyle}>
                            <div style={detailItemStyle}>
                                <Droplets size={14} style={{ color: '#67e8f9' }} />
                                <span style={detailTextStyle}>
                                    {dailyData.relative_humidity_2m_max[i]}%
                                </span>
                            </div>

                            <div style={detailItemStyle}>
                                <Wind size={14} style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
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