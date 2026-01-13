import { Wind, Droplets, Eye, Gauge } from 'lucide-react'

interface AirConditionsProps {
    data: {
        windspeed_10m: number
        relativehumidity_2m: number
        visibility: number
        pressure_msl: number
    }
}

export default function AirConditions({ data }: AirConditionsProps) {
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1.5rem'
    }

    const itemStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem'
    }

    const iconBoxStyle = (color: string) => ({
        padding: '0.75rem',
        background: `${color}33`,
        borderRadius: '12px'
    })

    const labelStyle = {
        fontSize: '0.875rem',
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: '0.25rem'
    }

    const valueStyle = {
        fontSize: '1.5rem',
        fontWeight: '600'
    }

    const unitStyle = {
        fontSize: '1rem',
        marginLeft: '0.25rem'
    }

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>Kushtet e Ajrit</h2>

            <div style={gridStyle}>
                {/* Era */}
                <div style={itemStyle}>
                    <div style={iconBoxStyle('#06b6d4')}>
                        <Wind style={{ color: '#67e8f9' }} size={24} />
                    </div>
                    <div>
                        <p style={labelStyle}>Era</p>
                        <p style={valueStyle}>
                            {data.windspeed_10m.toFixed(1)}
                            <span style={unitStyle}>km/h</span>
                        </p>
                    </div>
                </div>

                {/* Lagështia */}
                <div style={itemStyle}>
                    <div style={iconBoxStyle('#3b82f6')}>
                        <Droplets style={{ color: '#93c5fd' }} size={24} />
                    </div>
                    <div>
                        <p style={labelStyle}>Lagështia</p>
                        <p style={valueStyle}>
                            {data.relativehumidity_2m}
                            <span style={unitStyle}>%</span>
                        </p>
                    </div>
                </div>

                {/* Dukshmëria */}
                <div style={itemStyle}>
                    <div style={iconBoxStyle('#8b5cf6')}>
                        <Eye style={{ color: '#c4b5fd' }} size={24} />
                    </div>
                    <div>
                        <p style={labelStyle}>Dukshmëria</p>
                        <p style={valueStyle}>
                            {(data.visibility / 1000).toFixed(1)}
                            <span style={unitStyle}>km</span>
                        </p>
                    </div>
                </div>

                {/* Presioni */}
                <div style={itemStyle}>
                    <div style={iconBoxStyle('#6366f1')}>
                        <Gauge style={{ color: '#a5b4fc' }} size={24} />
                    </div>
                    <div>
                        <p style={labelStyle}>Presioni</p>
                        <p style={valueStyle}>
                            {data.pressure_msl}
                            <span style={unitStyle}>hPa</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}