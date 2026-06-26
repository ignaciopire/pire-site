import { useState, useCallback, useRef, useEffect } from 'react'
import type { Node, Edge, TooltipState } from '../types'
import { generateNodes, generateEdges } from '../graph/graphGen'
import { applyCenterOfMass, propagateDrag } from '../graph/buoyancy'

const INITIAL_TOOLTIP: TooltipState = {
  visible: false,
  label: '',
  desc: '',
  x: 0,
  y: 0,
}

export function useIceberg(svgRef: React.RefObject<SVGSVGElement>) {
  const [nodes, setNodes] = useState<Node[]>(() => {
    const generated = generateNodes()
    return applyCenterOfMass(generated)
  })

  const [edges] = useState<Edge[]>(() => {
    const generated = generateNodes()
    return generateEdges(applyCenterOfMass(generated))
  })

  const [tooltip, setTooltip] = useState<TooltipState>(INITIAL_TOOLTIP)
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)

  const dragging = useRef<number | null>(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const nodesRef = useRef<Node[]>(nodes)

  useEffect(() => {
    nodesRef.current = nodes
  }, [nodes])

  const getSvgCoords = useCallback(
    (clientX: number, clientY: number): { nx: number; ny: number } => {
      const rect = svgRef.current?.getBoundingClientRect()
      if (!rect) return { nx: 0, ny: 0 }
      return {
        nx: (clientX - rect.left) / rect.width,
        ny: (clientY - rect.top) / rect.height,
      }
    },
    [svgRef],
  )

  const handleNodeMouseEnter = useCallback(
    (i: number, clientX: number, clientY: number) => {
      setHoveredNode(i)
      setTooltip({
        visible: true,
        label: nodesRef.current[i].label,
        desc: nodesRef.current[i].desc,
        x: clientX,
        y: clientY,
      })
    },
    [],
  )

  const handleNodeMouseLeave = useCallback(() => {
    setHoveredNode(null)
    setTooltip((t) => ({ ...t, visible: false }))
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (tooltip.visible) {
        setTooltip((t) => ({ ...t, x: e.clientX, y: e.clientY }))
      }

      if (dragging.current === null) return

      const { nx, ny } = getSvgCoords(e.clientX, e.clientY)
      const clampedX = Math.max(0.02, Math.min(0.98, nx + dragOffset.current.x))
      const clampedY = Math.max(0.02, Math.min(0.98, ny + dragOffset.current.y))

      const idx = dragging.current
      const current = nodesRef.current
      const dx = clampedX - current[idx].x
      const dy = clampedY - current[idx].y

      let updated = propagateDrag(current, idx, dx, dy)
      updated = updated.map((n, i) =>
        i === idx ? { ...n, x: clampedX, y: clampedY } : n,
      )
      updated = applyCenterOfMass(updated)

      nodesRef.current = updated
      setNodes(updated)
    },
    [getSvgCoords, tooltip.visible],
  )

  const handleMouseUp = useCallback(() => {
    if (dragging.current !== null) {
      dragging.current = null
    }
  }, [])

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (dragging.current === null) return
      e.preventDefault()
      const t = e.touches[0]
      const { nx, ny } = getSvgCoords(t.clientX, t.clientY)
      const clampedX = Math.max(0.02, Math.min(0.98, nx + dragOffset.current.x))
      const clampedY = Math.max(0.02, Math.min(0.98, ny + dragOffset.current.y))

      const idx = dragging.current
      const current = nodesRef.current
      const dx = clampedX - current[idx].x
      const dy = clampedY - current[idx].y

      let updated = propagateDrag(current, idx, dx, dy)
      updated = updated.map((n, i) =>
        i === idx ? { ...n, x: clampedX, y: clampedY } : n,
      )
      updated = applyCenterOfMass(updated)

      nodesRef.current = updated
      setNodes(updated)
    },
    [getSvgCoords],
  )

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp, handleTouchMove])

  const startDrag = useCallback(
    (e: React.MouseEvent, i: number) => {
      e.preventDefault()
      const { nx, ny } = getSvgCoords(e.clientX, e.clientY)
      dragOffset.current = {
        x: nodesRef.current[i].x - nx,
        y: nodesRef.current[i].y - ny,
      }
      dragging.current = i
      setTooltip((t) => ({ ...t, visible: false }))
    },
    [getSvgCoords],
  )

  const startDragTouch = useCallback(
    (e: React.TouchEvent, i: number) => {
      e.preventDefault()
      const t = e.touches[0]
      const { nx, ny } = getSvgCoords(t.clientX, t.clientY)
      dragOffset.current = {
        x: nodesRef.current[i].x - nx,
        y: nodesRef.current[i].y - ny,
      }
      dragging.current = i
    },
    [getSvgCoords],
  )

  return {
    nodes,
    edges,
    tooltip,
    hoveredNode,
    dragging,
    startDrag,
    startDragTouch,
    handleNodeMouseEnter,
    handleNodeMouseLeave,
  }
}
