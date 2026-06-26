import { useRef } from 'react'
import { Particles } from './components/Particles'
import { Hero } from './components/Hero'
import { IcebergGraph } from './components/IcebergGraph'
import { Tooltip } from './components/Tooltip'
import { Footer } from './components/Footer'
import { useIceberg } from './hooks/useIceberg'

export default function App() {
  const svgRef = useRef<SVGSVGElement>(null)

  const {
    nodes,
    edges,
    tooltip,
    hoveredNode,
    dragging,
    startDrag,
    startDragTouch,
    handleNodeMouseEnter,
    handleNodeMouseLeave,
  } = useIceberg(svgRef)

  return (
    <>
      <Particles />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flex: 1,
          minHeight: 0,
        }}
      >
        <Hero />

        <div
          style={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <IcebergGraph
            svgRef={svgRef}
            nodes={nodes}
            edges={edges}
            hoveredNode={hoveredNode}
            dragging={dragging}
            onNodeMouseEnter={handleNodeMouseEnter}
            onNodeMouseLeave={handleNodeMouseLeave}
            onNodeMouseDown={startDrag}
            onNodeTouchStart={startDragTouch}
          />
        </div>
      </div>

      <Footer />

      <Tooltip tooltip={tooltip} />

      <style>{`
        @media (max-width: 1024px) {
          .hero { width: 100% !important; }
          div[style*="flex: 1"] > div[style*="flex: 1"] {
            height: 50vh;
            flex: none;
          }
          div[style*="zIndex: 1"][style*="display: flex"] {
            flex-direction: column !important;
          }
        }
        @media (max-width: 640px) {
          div[style*="zIndex: 1"][style*="display: flex"] > div:last-child {
            height: 44vh !important;
          }
        }
      `}</style>
    </>
  )
}
