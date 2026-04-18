function Navbar({ active, onNav }) {
  const items = [
    { path: '/', label: 'Home', icon: '⌂' },
    { path: '/modules', label: 'Learn', icon: '◈' },
    { path: '/simulators', label: 'Simulate', icon: '◉' },
    { path: '/quiz', label: 'Quiz', icon: '◆' },
    { path: '/tools', label: 'Tools', icon: '⚙' },
    { path: '/cheatsheet', label: 'Cheatsheet', icon: '◇' },
    { path: '/glossary', label: 'Glossary', icon: '◎' },
  ];
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(8,8,14,0.92)', backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid #252535',
      boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', gap: 32 }}>
        <a onClick={() => onNav('/')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <span style={{ fontSize: 22 }}>📷</span>
          <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: -0.3 }}>
            DSLR<span style={{ color: '#9d97ff' }}>Masterclass</span>
          </span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
          {items.map(it => {
            const isActive = active === it.path;
            return (
              <a key={it.path} onClick={() => onNav(it.path)} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 8,
                fontSize: 14, fontWeight: 500, cursor: 'pointer',
                color: isActive ? '#9d97ff' : '#9898b8',
                background: isActive ? 'rgba(124,111,247,0.12)' : 'transparent',
                transition: 'all 0.2s ease', whiteSpace: 'nowrap',
              }}>
                <span style={{ fontSize: 13, opacity: 0.8 }}>{it.icon}</span>
                {it.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
Object.assign(window, { Navbar });
