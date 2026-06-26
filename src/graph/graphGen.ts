import { NODES_DATA } from '../data/nodes'
import type { Node, Edge } from '../types'

// Rango de coordenadas de la imagen
const minX = -5.56, maxX = 4.62
const minY = -7.14, maxY = 9.36
const rangeX = maxX - minX
const rangeY = maxY - minY

// 20 puntos seleccionados de la imagen (en el orden de NODES_DATA)
const fixedPoints: [number, number][] = [
  [-5.56, -0.69], // 0
  [-4.12, -3.5],  // 1
  [-2.81, 4.5],   // 2
  [-0.41, 9.36],  // 3
  [-0.13, -7.14], // 4
  [-3.81, 2.91],  // 5
  [-2.98, -3.74], // 6
  [-1.95, 1.01],  // 7
  [-0.99, 0.94],  // 8
  [0.0, 5.39],    // 9
  [0.41, 1.41],   // 10
  [0.83, -2.62],  // 11
  [1.66, 2.71],   // 12
  [2.65, -6.18],  // 13
  [3.5, 3.68],    // 14
  [4.62, -2.68],  // 15
  [3.85, -2.78],  // 16
  [4.62, 1.51],   // 17
  [0.8, 3.12],    // 18
  [1.23, -6.53],  // 19
]

function scalePoint(x: number, y: number): { x: number; y: number } {
  const nx = (x - minX) / rangeX
  const ny = 1 - (y - minY) / rangeY // invertir Y para que arriba quede arriba
  return { x: nx, y: ny }
}

export function generateNodes(): Node[] {
  return NODES_DATA.map((data, i) => {
    const pos = fixedPoints[i]
    const { x, y } = scalePoint(pos[0], pos[1])
    return { ...data, x, y, radius: 10, mass: 1 }
  })
}

// Mapeo de punto (x,y) a índice de nodo
const pointToIndex: Record<string, number> = {}
fixedPoints.forEach((p, i) => {
  pointToIndex[`${p[0]},${p[1]}`] = i
})

// Líneas extraídas de la imagen
const lines: [number, number][][] = [
  [[-5.56, -0.69], [-3.81, 2.91], [-2.06, 6.51], [-0.41, 9.36]],
  [[-5.56, -0.69], [-2.98, -3.74], [-0.4, -6.79], [-0.13, -7.14]],
  [[-5.56, -0.69], [-1.95, 1.01], [1.66, 2.71], [3.5, 3.68]],
  [[-4.12, -3.5], [-0.13, -3.14], [3.85, -2.78], [4.62, -2.68]],
  [[-4.12, -3.5], [-0.12, -3.33], [3.87, -3.16], [4.62, -3.12]],
  [[-2.81, 4.5], [-0.99, 0.94], [0.83, -2.62], [2.65, -6.18], [-0.13, -7.14]],
  [[-2.81, 4.5], [0.8, 3.12], [3.5, 2.47]],
  [[-0.41, 9.36], [0.0, 5.39], [0.41, 1.41], [0.82, -2.56], [1.23, -6.53], [-0.13, -7.14]],
  [[-0.41, 9.36], [1.77, 5.91], [3.95, 2.46], [4.62, 1.51]],
  [[-0.13, -7.14], [2.52, -4.1], [4.62, -2.68]],
  [[3.5, 3.68], [4.25, -0.25], [4.62, -2.68]]
]

export function generateEdges(nodes: Node[]): Edge[] {
  const edges: Edge[] = []
  for (const line of lines) {
    const indices: number[] = []
    for (const p of line) {
      const key = `${p[0]},${p[1]}`
      if (pointToIndex[key] !== undefined) {
        indices.push(pointToIndex[key])
      }
    }
    for (let i = 0; i < indices.length - 1; i++) {
      const a = indices[i]
      const b = indices[i + 1]
      if (!edges.some(e => (e[0] === a && e[1] === b) || (e[0] === b && e[1] === a))) {
        edges.push([a, b])
      }
    }
  }
  return edges
}
