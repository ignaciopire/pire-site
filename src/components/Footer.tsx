export function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(16px, 2vw, 28px) clamp(28px, 5vw, 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '0.5px solid rgba(255,255,255,0.05)',
        background: 'rgba(11,11,14,0.7)',
        backdropFilter: 'blur(10px)',
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: '#8b9cf4',
            textTransform: 'uppercase',
          }}
        >
          PIRE
        </div>
        <div
          style={{
            fontSize: 11,
            color: '#3a3d4e',
            marginTop: 2,
            fontWeight: 300,
          }}
        >
          Consultoría en cambio organizacional
        </div>
      </div>
      <a
        href="mailto:contacto@pire.ar"
        style={{
          fontSize: 12,
          color: '#6b6e7e',
          textDecoration: 'none',
          letterSpacing: '0.01em',
        }}
      >
        contacto@pire.ar
      </a>
    </footer>
  )
}
