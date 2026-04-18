function ModuleCard({ mod, onOpen }) {
  const [h, setH] = React.useState(false);
  return (
    <a onClick={onOpen}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: '#13131c', border: `1px solid ${h ? '#353550' : '#252535'}`,
        borderRadius: 14, padding: 22,
        display: 'flex', flexDirection: 'column', gap: 14,
        transition: 'all 0.25s ease', textDecoration: 'none',
        cursor: 'pointer', position: 'relative', overflow: 'hidden',
        transform: h ? 'translateY(-3px)' : 'none',
        boxShadow: h ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14, background: mod.gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, filter: 'brightness(2.5)',
        }}>{mod.icon}</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <Badge kind={mod.difficulty.toLowerCase()}>{mod.difficulty}</Badge>
          <span style={{ fontSize: 12, color: '#55556a' }}>⏱ {mod.duration}</span>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#eeeef8', marginBottom: 4, letterSpacing: -0.3 }}>{mod.title}</h3>
        <p style={{ fontSize: 13, color: '#9d97ff', marginBottom: 10, fontWeight: 500 }}>{mod.subtitle}</p>
        <p style={{ fontSize: 13, color: '#9898b8', lineHeight: 1.55 }}>{mod.summary}</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {mod.topics.map(t => (
          <span key={t} style={{
            padding: '3px 10px', background: '#16161f',
            border: '1px solid #252535', borderRadius: 20,
            fontSize: 11, color: '#55556a', fontWeight: 500,
          }}>{t}</span>
        ))}
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 10, borderTop: '1px solid #252535',
      }}>
        <span style={{ fontSize: 12, color: '#55556a' }}>{mod.sections} sections</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#9d97ff',
          transform: h ? 'translateX(4px)' : 'none', transition: 'transform 0.2s' }}>Start →</span>
      </div>
    </a>
  );
}
Object.assign(window, { ModuleCard });
