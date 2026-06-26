interface Props {
  svgWidth: number
  svgHeight: number
}

export function WaterLine({ svgWidth, svgHeight }: Props) {
  const wy = 0.5 * svgHeight

  return (
    <g aria-hidden="true">
      {/* Glow layer */}
      <line
        x1={-20}
        y1={wy}
        x2={svgWidth + 20}
        y2={wy}
        stroke="rgba(60,110,200,0.10)"
        strokeWidth={8}
      />
      {/* Main line */}
      <line
        x1={-20}
        y1={wy}
        x2={svgWidth + 20}
        y2={wy}
        stroke="rgba(80,130,220,0.28)"
        strokeWidth={1}
      />
    </g>
  )
}
