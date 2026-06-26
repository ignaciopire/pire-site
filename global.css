import type { Node, Edge } from '../types'
import { NODES_DATA } from './nodes'

function seededRand(seed: number): () => number {
  let s = seed
  return function () {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

export function generateNodes(): Node[] {
  const rng = seededRand((Date.now() % 99991) + 1)
  const n = NODES_DATA.length

  return NODES_DATA.map((data, i) => {
    const t = i / (n - 1)
    const isAbove = t < 0.25

    const rawY = isAbove
      ? 0.05 + t * 1.2 * (rng() * 0.1 + 0.9)
      : 0.25 + (t - 0.25) * 1.3 * (rng() * 0.1 + 0.9)

    const y = Math.min(0.97, rawY + (rng() - 0.5) * 0.07)

    const spreadFactor = isAbove
      ? 0.12 + (y - 0.05) * 0.6
      : 0.18 + (y - 0.3) * 1.1

    const centerX = 0.5 + (rng() - 0.5) * 0.04
    const x = Math.max(0.04, Math.min(0.96, centerX + (rng() - 0.5) * 2 * spreadFactor))
    const radius = 8 + rng() * 5

    return { ...data, x, y, radius, mass: 1 }
  })
}

export function generateEdges(nodes: Node[]): Edge[] {
  const rng = seededRand(42)
  const edges: Edge[] = []
  const n = nodes.length

  // Chain connectivity guarantee
  for (let i = 0; i < n - 1; i++) {
    edges.push([i, i + 1])
  }

  // Proximity-based extra edges
  for (let i = 0; i < n; i++) {
    for (let j = i + 2; j < n; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 0.25 && rng() < 0.35) {
        edges.push([i, j])
      }
    }
  }

  return edges
}
