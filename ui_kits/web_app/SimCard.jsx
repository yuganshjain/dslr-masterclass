function SimCard({ sim, onOpen }) {
  const [h, setH] = React.useState(false);
  return (
    <a onClick={onOpen} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{
      background: '#13131c', border: `1px solid ${h?'#353550':'#252535'}`,
      borderRadius: 14, padding: '28px 24px',
      display: 'flex', flexDirection: 'column', gap: 12,
      textDecoration: 'none', transition: 'all 0.25s ease',
      transform: h ? 'translateY(-3px)' : 'none',
      boxShadow: h ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
      cursor: 'pointer',
    }}>
      <div style={{ fontSize: 32, color: sim.color }}>{sim.icon}</div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#eeeef8', letterSpacing: -0.3 }}>{sim.title}</h3>
      <p style={{ fontSize: 14, color: '#9898b8', lineHeight: 1.55 }}>{sim.desc}</p>
      <span style={{ fontSize: 14, fontWeight: 600, marginTop: 'auto', color: sim.color }}>Try now →</span>
    </a>
  );
}

function QuickLink({ q, onNav }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 20,
      padding: '20px 24px', maxWidth: 1200, margin: '0 auto', width: '100%',
      borderBottom: '1px solid #252535', transition: 'background 0.2s',
    }}>
      <span style={{ fontSize: 26, flexShrink: 0, color: q.color }}>{q.icon}</span>
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{q.title}</h3>
        <p style={{ fontSize: 13, color: '#9898b8' }}>{q.desc}</p>
      </div>
      <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
        <Button variant="ghost" onClick={() => onNav(q.link)}>{q.label} →</Button>
      </div>
    </div>
  );
}
Object.assign(window, { SimCard, QuickLink });
