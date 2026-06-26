import type { Node, Edge } from '../types'

const WATER_LINE = 0.5

export function applyCenterOfMass(nodes: Node[], fixedIndices: Set<number>): Node[] {
  const movable = nodes.filter((_, i) => !fixedIndices.has(i))
  if (movable.length === 0) return nodes
  const cy = movable.reduce((sum, n) => sum + n.y, 0) / movable.length
  const dy = WATER_LINE - cy
  return nodes.map((n, i) => {
    if (fixedIndices.has(i)) return n
    return { ...n, y: Math.max(0.02, Math.min(0.98, n.y + dy)) }
  })
}

export function propagateDrag(
  nodes: Node[],
  edges: Edge[],
  movedIdx: number,
  dx: number,
  dy: number,
  fixedIndices: Set<number>
): Node[] {
  const neighbors = new Set<number>()
  edges.forEach(([a, b]) => {
    if (a === movedIdx) neighbors.add(b)
    if (b === movedIdx) neighbors.add(a)
  })

  return nodes.map((nd, i) => {
    if (fixedIndices.has(i)) return nd // nodos fijos no se mueven
    if (i === movedIdx) {
      return {
        ...nd,
        x: Math.max(0.02, Math.min(0.98, nd.x + dx)),
        y: Math.max(0.02, Math.min(0.98, nd.y + dy)),
      }
    }
    if (neighbors.has(i)) {
      // factor 0.5 para un movimiento más suave
      return {
        ...nd,
        x: Math.max(0.02, Math.min(0.98, nd.x + dx * 0.5)),
        y: Math.max(0.02, Math.min(0.98, nd.y + dy * 0.5)),
      }
    }
    return nd
  })
}
