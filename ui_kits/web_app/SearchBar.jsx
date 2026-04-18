function SearchBar({ value, onChange }) {
  return (
    <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
      <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#55556a', fontSize: 18 }}>⌕</span>
      <input
        type="text" placeholder="Search modules..."
        value={value} onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', padding: '11px 40px', background: '#13131c',
          border: '1px solid #252535', borderRadius: 8, color: '#eeeef8',
          fontSize: 15, outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = '#7c6ff7'}
        onBlur={e => e.target.style.borderColor = '#252535'}
      />
      {value && (
        <button onClick={() => onChange('')} style={{
          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', color: '#55556a', cursor: 'pointer', fontSize: 14, padding: 4,
        }}>✕</button>
      )}
    </div>
  );
}

function FilterChips({ value, onChange, options }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map(o => {
        const active = o === value;
        return (
          <button key={o} onClick={() => onChange(o)} style={{
            padding: '8px 16px', borderRadius: 20,
            border: `1px solid ${active ? '#7c6ff7' : '#252535'}`,
            background: active ? '#7c6ff7' : '#13131c',
            color: active ? '#fff' : '#9898b8',
            fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.2s',
          }}>{o}</button>
        );
      })}
    </div>
  );
}
Object.assign(window, { SearchBar, FilterChips });
