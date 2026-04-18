function StatsRow() {
  const stats = [
    { value: '11', label: 'Learning Modules', icon: '◈' },
    { value: '20', label: 'Quiz Questions', icon: '◆' },
    { value: '50+', label: 'Glossary Terms', icon: '◎' },
    { value: '3', label: 'Simulators', icon: '◉' },
  ];
  return (
    <section style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
      padding: '0 40px 60px', maxWidth: 1200, margin: '0 auto',
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          background: '#13131c', border: '1px solid #252535', borderRadius: 14,
          padding: '24px 20px', textAlign: 'center', transition: 'all 0.2s',
        }}>
          <div style={{ fontSize: 22, marginBottom: 10, color: '#9d97ff' }}>{s.icon}</div>
          <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1, color: '#eeeef8', marginBottom: 4 }}>{s.value}</div>
          <div style={{ fontSize: 13, color: '#55556a', fontWeight: 500 }}>{s.label}</div>
        </div>
      ))}
    </section>
  );
}
Object.assign(window, { StatsRow });
