import { Cloud, CloudRain, CloudSnow, Sun } from 'lucide-react'

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

    const contentStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap' as const,
        gap: '2rem'
    }

    const leftSideStyle = {
        flex: '1',
        minWidth: '250px'
    }

    const cityStyle = {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem'
    }

    const dateStyle = {
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: '1.5rem',
        textTransform: 'capitalize' as const
    }

    const tempStyle = {
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.5rem',
        marginBottom: '1rem'
    }

    const tempNumberStyle = {
        fontSize: '4.5rem',
        fontWeight: '300',
        lineHeight: '1'
    }

    const tempUnitStyle = {
        fontSize: '2rem',
        color: 'rgba(255, 255, 255, 0.7)'
    }

    const descStyle = {
        fontSize: '1.125rem',
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: '0.5rem'
    }

    const feelsLikeStyle = {
        fontSize: '0.875rem',
        color: 'rgba(255, 255, 255, 0.6)'
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
                    {getWeatherIcon(data.weathercode, 100)}
                </div>
            </div>
        </div>
    )
}