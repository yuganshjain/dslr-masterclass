function Badge({ kind = 'beginner', children }) {
  const map = {
    beginner:     { bg: 'rgba(34,197,94,0.12)',  c: '#22c55e' },
    intermediate: { bg: 'rgba(245,166,35,0.12)', c: '#f5a623' },
    advanced:     { bg: 'rgba(239,68,68,0.12)',  c: '#ef4444' },
  };
  const s = map[kind] || map.beginner;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '4px 10px',
      borderRadius: 20, fontSize: 12, fontWeight: 600, letterSpacing: 0.3,
      background: s.bg, color: s.c,
    }}>{children}</span>
  );
}
Object.assign(window, { Badge });
