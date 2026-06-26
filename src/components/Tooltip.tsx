import type { TooltipState } from '../types'

interface Props {
  tooltip: TooltipState
}

export function Tooltip({ tooltip }: Props) {
  const OFFSET_X = 16
  const OFFSET_Y = -10
  const APPROX_W = 200
  const APPROX_H = 60

  let x = tooltip.x + OFFSET_X
  let y = tooltip.y + OFFSET_Y

  if (x + APPROX_W > window.innerWidth - 10) x = tooltip.x - APPROX_W - 12
  if (y + APPROX_H > window.innerHeight - 10) y = tooltip.y - APPROX_H - 8

  return (
    <div
      role="tooltip"
      aria-live="polite"
      style={{
        position: 'fixed',
        left: x,
        top: y,
        pointerEvents: 'none',
        zIndex: 100,
        background: 'rgba(14,16,26,0.95)',
        border: '0.5px solid rgba(139,156,244,0.25)',
        borderRadius: 8,
        padding: '10px 14px',
        backdropFilter: 'blur(12px)',
        maxWidth: APPROX_W,
        opacity: tooltip.visible ? 1 : 0,
        transform: tooltip.visible ? 'translateY(0)' : 'translateY(4px)',
        transition: 'opacity 0.22s ease, transform 0.22s ease',
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: '#8b9cf4',
          marginBottom: 4,
          letterSpacing: '0.04em',
        }}
      >
        {tooltip.label}
      </div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 300,
          color: '#6b6e7e',
          lineHeight: 1.6,
        }}
      >
        {tooltip.desc}
      </div>
    </div>
  )
}
