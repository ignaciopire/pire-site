import { useRef, useEffect, useState } from 'react'
import type { Node, Edge } from '../types'
import { WaterLine } from './WaterLine'

interface Props {
  nodes: Node[]
  edges: Edge[]
  hoveredNode: number | null
  dragging: React.MutableRefObject<number | null>
  onNodeMouseEnter: (i: number, clientX: number, clientY: number) => void
  onNodeMouseLeave: () => void
  onNodeMouseDown: (e: React.MouseEvent, i: number) => void
  onNodeTouchStart: (e: React.TouchEvent, i: number) => void
  svgRef: React.RefObject<SVGSVGElement>
}

function useSvgSize(svgRef: React.RefObject<SVGSVGElement>) {
  const [size, setSize] = useState({ w: 600, h: 700 })
  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        setSize({ w: e.contentRect.width, h: e.contentRect.height })
      }
    })
    ro.observe(el)
    setSize({ w: el.clientWidth, h: el.clientHeight })
    return () => ro.disconnect()
  }, [svgRef])
  return size
}

export function IcebergGraph({
  nodes,
  edges,
  hoveredNode,
  dragging,
  onNodeMouseEnter,
  onNodeMouseLeave,
  onNodeMouseDown,
  onNodeTouchStart,
  svgRef,
}: Props) {
  const { w: svgW, h: svgH } = useSvgSize(svgRef)

  function toSVG(nx: number, ny: number) {
    return { x: nx * svgW, y: ny * svgH }
  }

  const connectedToHovered = new Set<number>()
  if (hoveredNode !== null) {
    edges.forEach(([a, b]) => {
      if (a === hoveredNode) connectedToHovered.add(b)
      if (b === hoveredNode) connectedToHovered.add(a)
    })
  }

  return (
    <svg
      ref={svgRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Grafo interactivo del iceberg organizacional. Arrastrá los nodos para explorar cómo las partes del sistema se relacionan entre sí."
      role="img"
    >
      <defs>
        <radialGradient id="nodeGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#3a3f5a" />
          <stop offset="100%" stopColor="#1c1e2d" />
        </radialGradient>
        <radialGradient id="nodeGradHov" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#6a72aa" />
          <stop offset="100%" stopColor="#2a2f4e" />
        </radialGradient>
      </defs>

      {/* Edges */}
      <g aria-hidden="true">
        {edges.map(([a, b], i) => {
          const pa = toSVG(nodes[a].x, nodes[a].y)
          const pb = toSVG(nodes[b].x, nodes[b].y)
          const isHighlighted =
            hoveredNode !== null && (a === hoveredNode || b === hoveredNode)
          return (
            <line
              key={i}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke={
                isHighlighted
                  ? 'rgba(139,156,244,0.55)'
                  : 'rgba(100,110,160,0.18)'
              }
              strokeWidth={isHighlighted ? 1.5 : 1}
              style={{ transition: 'stroke 0.25s ease, stroke-width 0.25s ease' }}
            />
          )
        })}
      </g>

      {/* Water line */}
      <WaterLine svgWidth={svgW} svgHeight={svgH} />

      {/* Nodes */}
      <g>
        {nodes.map((nd, i) => {
          const p = toSVG(nd.x, nd.y)
          const isHovered = hoveredNode === i
          const isDragging = dragging.current === i

          return (
            <g
              key={nd.id}
              transform={`translate(${p.x},${p.y})`}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              onMouseEnter={(e) => onNodeMouseEnter(i, e.clientX, e.clientY)}
              onMouseLeave={onNodeMouseLeave}
              onMouseDown={(e) => onNodeMouseDown(e, i)}
              onTouchStart={(e) => onNodeTouchStart(e, i)}
              role="button"
              aria-label={`${nd.label}: ${nd.desc}`}
              tabIndex={0}
            >
              <circle
                cx={0}
                cy={0}
                r={isHovered ? nd.radius * 1.4 : nd.radius}
                fill={isHovered ? 'url(#nodeGradHov)' : 'url(#nodeGrad)'}
                stroke={
                  isHovered
                    ? 'rgba(139,156,244,0.8)'
                    : 'rgba(74,79,110,0.7)'
                }
                strokeWidth={1}
                style={{ transition: 'r 0.25s ease, stroke 0.25s ease, fill 0.25s ease' }}
              />
              <text
                x={0}
                y={0}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isHovered ? 'rgba(220,225,255,0.9)' : 'rgba(180,185,210,0)'}
                fontSize={10}
                fontFamily="Inter, sans-serif"
                fontWeight={400}
                style={{ transition: 'fill 0.25s ease', userSelect: 'none', pointerEvents: 'none' }}
                aria-hidden="true"
              >
                {nd.label}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
