import type { Node } from '../types'

const WATER_LINE = 0.5

/**
 * Recenter all nodes vertically so the center of mass sits exactly
 * at the water line (y = 0.5), simulating Archimedes' principle.
 */
export function applyCenterOfMass(nodes: Node[]): Node[] {
  const cy = nodes.reduce((sum, n) => sum + n.y, 0) / nodes.length
  const dy = WATER_LINE - cy

  return nodes.map((n) => ({
    ...n,
    y: Math.max(0.02, Math.min(0.98, n.y + dy)),
  }))
}

/**
 * Propagate a drag movement from one node to all others.
 * Influence decreases with the square of Euclidean distance.
 */
export function propagateDrag(
  nodes: Node[],
  movedIdx: number,
  dx: number,
  dy: number,
): Node[] {
  return nodes.map((nd, i) => {
    if (i === movedIdx) return nd
    const ddx = nd.x - nodes[movedIdx].x
    const ddy = nd.y - nodes[movedIdx].y
    const dist2 = ddx * ddx + ddy * ddy
    const factor = 1 / (1 + 10 * dist2)
    return {
      ...nd,
      x: Math.max(0.02, Math.min(0.98, nd.x + dx * factor)),
      y: Math.max(0.02, Math.min(0.98, nd.y + dy * factor)),
    }
  })
}
