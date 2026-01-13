import { Wind, Droplets, Eye, Gauge } from 'lucide-react'
import { useThemeStore } from '../store/themeStore'

interface AirConditionsProps {
    data: {
        windspeed_10m: number
        relativehumidity_2m: number
        visibility: number
        pressure_msl: number
    }
}

export default function AirConditions({ data }: AirConditionsProps) {
    const isDark = useThemeStore((state) => state.isDark)

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
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '1.25rem'
    }

    const itemStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.625rem'
    }

    const iconBoxStyle = (color: string) => ({
        padding: '0.625rem',
        background: isDark ? `${color}20` : `${color}15`,
        borderRadius: '10px',
        flexShrink: 0
    })

    const labelStyle = {
        fontSize: '0.8125rem',
        color: isDark ? 'rgba(203, 213, 225, 0.6)' : 'rgba(30, 41, 59, 0.55)',
        marginBottom: '0.1875rem',
        fontWeight: '500'
    }

    const valueStyle = {
        fontSize: '1.25rem',
        fontWeight: '600',
        color: isDark ? '#e2e8f0' : '#1e293b'
    }

    const unitStyle = {
        fontSize: '0.875rem',
        marginLeft: '0.1875rem',
        color: isDark ? 'rgba(203, 213, 225, 0.7)' : 'rgba(30, 41, 59, 0.6)'
    }

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>Kushtet e Ajrit</h2>

            <div style={gridStyle}>
                {/* Era */}
                <div style={itemStyle}>
                    <div style={iconBoxStyle('#06b6d4')}>
                        <Wind style={{ color: isDark ? '#67e8f9' : '#0891b2' }} size={20} strokeWidth={2} />
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
                        <Droplets style={{ color: isDark ? '#93c5fd' : '#2563eb' }} size={20} strokeWidth={2} />
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
                        <Eye style={{ color: isDark ? '#c4b5fd' : '#7c3aed' }} size={20} strokeWidth={2} />
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
                        <Gauge style={{ color: isDark ? '#a5b4fc' : '#4f46e5' }} size={20} strokeWidth={2} />
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