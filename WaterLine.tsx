export interface NodeData {
  id: number
  label: string
  desc: string
}

export interface Node extends NodeData {
  x: number
  y: number
  radius: number
  mass: number
}

export type Edge = [number, number]

export interface TooltipState {
  visible: boolean
  label: string
  desc: string
  x: number
  y: number
}
