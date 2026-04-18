function CameraSvg() {
  return (
    <svg viewBox="0 0 320 240" style={{ width: '100%', height: 'auto' }}>
      <rect x="20" y="60" width="280" height="160" rx="16" fill="#1a1a2e" stroke="#2a2a4a" strokeWidth="2"/>
      <rect x="60" y="40" width="200" height="28" rx="8" fill="#1a1a2e" stroke="#2a2a4a" strokeWidth="2"/>
      <rect x="140" y="34" width="60" height="10" rx="3" fill="#252540"/>
      <rect x="120" y="26" width="80" height="18" rx="6" fill="#1a1a2e" stroke="#2a2a4a" strokeWidth="1.5"/>
      <circle cx="130" cy="145" r="62" fill="#111128" stroke="#2a2a4a" strokeWidth="2"/>
      <circle cx="130" cy="145" r="50" fill="#0d0d20" stroke="#333360" strokeWidth="1.5"/>
      <circle cx="130" cy="145" r="38" fill="#080812" stroke="#444480" strokeWidth="1"/>
      {[0,45,90,135,180,225,270,315].map((angle, i) => (
        <line key={i}
          x1={130 + 18 * Math.cos(angle * Math.PI/180)}
          y1={145 + 18 * Math.sin(angle * Math.PI/180)}
          x2={130 + 32 * Math.cos((angle + 22) * Math.PI/180)}
          y2={145 + 32 * Math.sin((angle + 22) * Math.PI/180)}
          stroke="#7c6ff7" strokeWidth="1.5" strokeOpacity="0.7"/>
      ))}
      <circle cx="130" cy="145" r="14" fill="#1a1a3a" stroke="#7c6ff7" strokeWidth="1"/>
      <circle cx="130" cy="145" r="6" fill="#7c6ff7" fillOpacity="0.5"/>
      <circle cx="245" cy="46" r="10" fill="#7c6ff7" stroke="#9d97ff" strokeWidth="1.5"/>
      <rect x="210" y="90" width="75" height="55" rx="4" fill="#0a0a20" stroke="#2a2a4a"/>
      <text x="247" y="110" textAnchor="middle" fontSize="7" fill="#22d3ee" fontFamily="JetBrains Mono">f/2.8</text>
      <text x="247" y="122" textAnchor="middle" fontSize="6" fill="#f5a623" fontFamily="JetBrains Mono">1/250</text>
      <text x="247" y="133" textAnchor="middle" fontSize="6" fill="#e879f9" fontFamily="JetBrains Mono">ISO 400</text>
      <circle cx="270" cy="175" r="16" fill="#1a1a30" stroke="#2a2a4a"/>
      <circle cx="270" cy="175" r="6" fill="#252545"/>
      <text x="270" y="163" textAnchor="middle" fontSize="7" fill="#555580">▲</text>
      <text x="270" y="192" textAnchor="middle" fontSize="7" fill="#555580">▼</text>
    </svg>
  );
}

function HudLabel({ color, children, style }) {
  return (
    <div style={{
      position: 'absolute', display: 'flex', alignItems: 'center', gap: 6,
      background: 'rgba(13,13,26,0.85)', border: '1px solid #252535',
      borderRadius: 20, padding: '5px 12px', fontSize: 12, fontWeight: 600,
      fontFamily: 'JetBrains Mono, monospace', backdropFilter: 'blur(10px)',
      color: '#eeeef8', whiteSpace: 'nowrap', ...style,
    }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: color }}/>
      {children}
    </div>
  );
}

function Hero({ onNav }) {
  return (
    <section style={{
      minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 60, padding: '60px 40px 80px', maxWidth: 1200, margin: '0 auto', position: 'relative',
    }}>
      <div style={{ flex: 1, maxWidth: 580 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 16px', borderRadius: 30,
          background: 'rgba(124,111,247,0.1)', border: '1px solid rgba(124,111,247,0.25)',
          color: '#9d97ff', fontSize: 13, fontWeight: 600, marginBottom: 24, letterSpacing: 0.3,
        }}>
          <span>📷</span> Complete DSLR Learning Platform
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: -2, marginBottom: 20 }}>
          Master Your DSLR<br/>
          <span className="gradient-text">From Zero to Pro</span>
        </h1>
        <p style={{ fontSize: 18, color: '#9898b8', lineHeight: 1.65, marginBottom: 36, maxWidth: 480 }}>
          Interactive lessons, visual simulators, and hands-on quizzes covering every DSLR feature.
          No fluff — just the knowledge you need to take stunning photos.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button onClick={() => onNav('/modules')}>Start Learning →</Button>
          <Button variant="secondary" onClick={() => onNav('/simulators')}>Try Simulators</Button>
        </div>
      </div>
      <div style={{ flex: '0 0 380px', position: 'relative', filter: 'drop-shadow(0 20px 60px rgba(124,111,247,0.2))' }}>
        <CameraSvg />
        <HudLabel color="#f5a623" style={{ top: '8%', left: '28%' }}>f/2.8</HudLabel>
        <HudLabel color="#22d3ee" style={{ top: '28%', right: '10%' }}>1/250s</HudLabel>
        <HudLabel color="#e879f9" style={{ bottom: '20%', right: '12%' }}>ISO 400</HudLabel>
      </div>
    </section>
  );
}
Object.assign(window, { Hero, CameraSvg, HudLabel });
