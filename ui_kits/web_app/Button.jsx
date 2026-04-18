function Button({ variant = 'primary', children, onClick, style }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '12px 24px', borderRadius: 8, fontSize: 15, fontWeight: 600,
    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
    transition: 'all 0.2s ease', ...style,
  };
  const styles = {
    primary:   { ...base, background: '#7c6ff7', color: '#fff' },
    secondary: { ...base, background: '#16161f', color: '#eeeef8', border: '1px solid #252535' },
    ghost:     { ...base, background: 'transparent', color: '#9898b8', border: '1px solid #252535' },
  };
  const [h, setH] = React.useState(false);
  const hoverOverrides = {
    primary:   { background: '#9d97ff', boxShadow: '0 4px 16px rgba(124,111,247,0.4)', transform: 'translateY(-1px)' },
    secondary: { background: '#1a1a26', borderColor: '#353550' },
    ghost:     { background: '#16161f', color: '#eeeef8' },
  };
  return (
    <button
      style={h ? { ...styles[variant], ...hoverOverrides[variant] } : styles[variant]}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      onClick={onClick}
    >{children}</button>
  );
}
Object.assign(window, { Button });
