interface LogoProps {
  variant?: 'default' | 'white'
  height?: number
  className?: string
}

export function PinnacleLogo({ variant = 'default', height = 48, className = '' }: LogoProps) {
  const w = Math.round(height * (260 / 120))

  const iconColor = variant === 'white' ? '#FFFFFF' : '#1B2D5E'
  const textColor = variant === 'white' ? '#FFFFFF' : '#1B2D5E'
  const subColor  = variant === 'white' ? '#FFFFFF' : '#B22222'
  const gapColor  = variant === 'white' ? '#B22222' : '#FFFFFF'
  const ruleColor = variant === 'white' ? 'rgba(255,255,255,0.55)' : '#1B2D5E'

  return (
    <svg
      width={120}
      height={120}
      viewBox="0 0 260 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Pinnacle Newspaper"
      role="img"
    >
      {/* Left peak */}
      <polygon points="72,8 100,52 114,36 114,52 72,52" fill={iconColor} />
      {/* Right peak */}
      <polygon points="114,4 158,52 114,52" fill={iconColor} />
      {/* Inner notch */}
      <polygon points="114,22 124,36 114,38" fill={gapColor} />
      {/* PINNACLE */}
      <text
        x="130" y="82"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="34"
        letterSpacing="3"
        fill={textColor}
      >
        PINNACLE
      </text>
      {/* Rules */}
      <line x1="14"  y1="98" x2="68"  y2="98" stroke={ruleColor} strokeWidth="1" />
      <line x1="192" y1="98" x2="246" y2="98" stroke={ruleColor} strokeWidth="1" />
      {/* NEWSPAPER */}
      <text
        x="130" y="108"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="18"
        letterSpacing="5"
        fill={subColor}
      >
        NEWSPAPER
      </text>
    </svg>
  )
}
