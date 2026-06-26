export function Hero() {
  return (
    <section
      className="hero"
      aria-label="Presentación de PIRE"
      style={{
        width: '38%',
        minWidth: 280,
        padding: 'clamp(48px, 6vw, 80px) clamp(28px, 4vw, 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.22em',
          color: '#8b9cf4',
          textTransform: 'uppercase',
          marginBottom: 56,
        }}
      >
        PIRE
      </div>

      <h1
        style={{
          fontSize: 'clamp(20px, 2.2vw, 30px)',
          fontWeight: 300,
          lineHeight: 1.48,
          color: '#f0f0f2',
          letterSpacing: '-0.02em',
          marginBottom: 36,
        }}
      >
        Lo que sostiene un sistema<br />
        rara vez es lo que más se ve.
      </h1>

      <p
        style={{
          fontSize: 14,
          fontWeight: 300,
          lineHeight: 1.85,
          color: '#6b6e7e',
          marginBottom: 64,
          maxWidth: 340,
        }}
      >
        Como un iceberg, las organizaciones muestran solo
        una parte de lo que las define.
        <br /><br />
        Procesos, decisiones, relaciones, incentivos y creencias
        permanecen bajo la superficie, condicionando todo lo que emerge.
      </p>

      <span
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.18em',
          color: '#3a3d4e',
          textTransform: 'uppercase',
        }}
      >
        Próximamente
      </span>
    </section>
  )
}
