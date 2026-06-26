import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha: number
}

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const count = 60
    const parts: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.08,
      r: 0.5 + Math.random() * 1.2,
      alpha: 0.03 + Math.random() * 0.07,
    }))

    let rafId: number

    function tick() {
      const W = (canvas!.width = window.innerWidth)
      const H = (canvas!.height = window.innerHeight)

      const grd = ctx!.createRadialGradient(
        W * 0.6, H * 0.4, 0,
        W * 0.6, H * 0.4, Math.max(W, H) * 0.8,
      )
      grd.addColorStop(0, '#14161e')
      grd.addColorStop(1, '#0b0b0e')
      ctx!.fillStyle = grd
      ctx!.fillRect(0, 0, W, H)

      parts.forEach((p) => {
        p.x = (p.x + p.vx + W) % W
        p.y = (p.y + p.vy + H) % H
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(140,150,220,${p.alpha})`
        ctx!.fill()
      })

      rafId = requestAnimationFrame(tick)
    }

    tick()
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
