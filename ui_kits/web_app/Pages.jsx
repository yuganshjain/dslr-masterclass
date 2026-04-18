function HomePage({ onNav }) {
  const sims = [
    { icon:'△', title:'Exposure Triangle', desc:'Adjust aperture, shutter, and ISO together. See how they balance to achieve correct exposure.', color:'#7c6ff7', path:'/simulators' },
    { icon:'◎', title:'Depth of Field', desc:'Visualize how aperture, focal length, and distance combine to control background blur.', color:'#f5a623', path:'/simulators' },
    { icon:'◑', title:'Scene Simulator', desc:'Pick a scene and see which camera settings produce which creative results.', color:'#22d3ee', path:'/simulators' },
  ];
  const quicks = [
    { icon:'◆', title:'Test Your Knowledge', desc:'20 questions across all DSLR topics', link:'/quiz', label:'Take Quiz', color:'#7c6ff7' },
    { icon:'◇', title:'Quick Reference', desc:'Settings cheatsheet for any situation', link:'/cheatsheet', label:'View Cheatsheet', color:'#f5a623' },
    { icon:'◎', title:'Glossary', desc:'50+ photography terms explained', link:'/glossary', label:'Browse Terms', color:'#22d3ee' },
  ];
  return (
    <div>
      <Hero onNav={onNav} />
      <StatsRow />
      <section style={{ padding:'0 40px 80px', maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <h2 style={{ fontSize:32, fontWeight:800, letterSpacing:-0.8, marginBottom:10 }}>Your Learning Path</h2>
          <p style={{ color:'#9898b8', fontSize:16 }}>From camera basics to advanced techniques — everything in logical order</p>
        </div>
        <ModuleGrid modules={SAMPLE_MODULES} onOpen={m => onNav('/modules/'+m.id, m)} />
        <div style={{ textAlign:'center', marginTop:32 }}>
          <Button variant="secondary" onClick={() => onNav('/modules')}>View All 11 Modules →</Button>
        </div>
      </section>
      <section style={{ padding:'0 40px 80px', maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <h2 style={{ fontSize:32, fontWeight:800, letterSpacing:-0.8, marginBottom:10 }}>Interactive Simulators</h2>
          <p style={{ color:'#9898b8', fontSize:16 }}>Learn by doing — adjust settings and see results in real time</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
          {sims.map((s,i) => <SimCard key={i} sim={s} onOpen={() => onNav(s.path)} />)}
        </div>
      </section>
      <section style={{ background:'#0f0f18', borderTop:'1px solid #252535', borderBottom:'1px solid #252535', padding:'32px 40px' }}>
        {quicks.map((q,i) => <QuickLink key={i} q={q} onNav={onNav} />)}
      </section>
    </div>
  );
}

function ModulesPage({ onNav }) {
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState('All');
  const filtered = SAMPLE_MODULES.filter(m => {
    const md = filter === 'All' || m.difficulty === filter;
    const ms = !search || m.title.toLowerCase().includes(search.toLowerCase());
    return md && ms;
  });
  return (
    <div style={{ maxWidth:1200, margin:'0 auto', padding:'40px 24px 80px' }}>
      <div style={{ marginBottom:48, textAlign:'center' }}>
        <h1 style={{ fontSize:'clamp(28px,5vw,48px)', fontWeight:800, letterSpacing:-1, marginBottom:12, lineHeight:1.15 }}>All Learning Modules</h1>
        <p style={{ fontSize:17, color:'#9898b8', maxWidth:560, margin:'0 auto', lineHeight:1.6 }}>
          Master every aspect of DSLR photography with our comprehensive, structured lessons
        </p>
      </div>
      <div style={{ display:'flex', gap:16, marginBottom:20, flexWrap:'wrap', alignItems:'center' }}>
        <SearchBar value={search} onChange={setSearch} />
        <FilterChips value={filter} onChange={setFilter} options={['All','Beginner','Intermediate','Advanced']} />
      </div>
      <p style={{ fontSize:13, color:'#55556a', marginBottom:24 }}>
        {filtered.length} module{filtered.length !== 1 ? 's' : ''} found
      </p>
      <ModuleGrid modules={filtered} onOpen={m => onNav('/modules/'+m.id, m)} />
    </div>
  );
}

function ModuleDetailPage({ mod, onNav }) {
  const m = mod || SAMPLE_MODULES[1];
  return (
    <div style={{ maxWidth:900, margin:'0 auto', padding:'40px 24px 80px' }}>
      <a onClick={() => onNav('/modules')} style={{ fontSize:13, color:'#9898b8', cursor:'pointer' }}>← All modules</a>
      <div style={{ display:'flex', alignItems:'center', gap:18, marginTop:20, marginBottom:18 }}>
        <div style={{ width:64, height:64, borderRadius:16, background:m.gradient,
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, filter:'brightness(2.5)' }}>{m.icon}</div>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
            <Badge kind={m.difficulty.toLowerCase()}>{m.difficulty}</Badge>
            <span style={{ fontSize:12, color:'#55556a' }}>⏱ {m.duration}</span>
          </div>
          <h1 style={{ fontSize:36, fontWeight:800, letterSpacing:-1 }}>{m.title}</h1>
          <p style={{ fontSize:14, color:'#9d97ff', marginTop:4 }}>{m.subtitle}</p>
        </div>
      </div>
      <p style={{ fontSize:17, color:'#9898b8', lineHeight:1.65, marginBottom:32 }}>{m.summary}</p>
      <div style={{ marginBottom:24 }}>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'#55556a', fontFamily:'JetBrains Mono', marginBottom:6, letterSpacing:0.3 }}>
          <span>PROGRESS</span><span>1/{m.sections}</span>
        </div>
        <div style={{ height:4, background:'#252535', borderRadius:2, overflow:'hidden' }}>
          <div style={{ height:'100%', borderRadius:2, background:'linear-gradient(90deg,#7c6ff7,#22d3ee)', width:`${100/m.sections}%` }}/>
        </div>
      </div>
      {Array.from({length:m.sections}).map((_,i) => (
        <div key={i} style={{
          background:'#13131c', border:'1px solid #252535', borderRadius:14,
          padding:20, marginBottom:12, display:'flex', alignItems:'center', gap:14,
        }}>
          <div style={{ width:32, height:32, borderRadius:'50%', background: i===0?'#7c6ff7':'#252535',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, fontFamily:'JetBrains Mono', color:i===0?'#fff':'#55556a' }}>{i===0?'✓':i+1}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15, fontWeight:600, color:'#eeeef8' }}>Section {i+1}</div>
            <div style={{ fontSize:13, color:'#9898b8' }}>A chunk of the lesson goes here.</div>
          </div>
          <span style={{ fontSize:12, color:'#55556a' }}>{i===0?'Done':'4 min'}</span>
        </div>
      ))}
      <div style={{ marginTop:24 }}>
        <Button onClick={() => onNav('/quiz')}>Take the Quiz →</Button>
      </div>
    </div>
  );
}

function QuizPage({ onNav }) {
  const [answer, setAnswer] = React.useState(null);
  const q = {
    q: 'A larger aperture (e.g. f/1.8) gives you…',
    opts: [
      { label:'Shallower depth of field', correct:true },
      { label:'Deeper depth of field', correct:false },
      { label:'No change to depth of field', correct:false },
      { label:'A faster shutter speed automatically', correct:false },
    ],
  };
  return (
    <div style={{ maxWidth:720, margin:'0 auto', padding:'40px 24px 80px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'#55556a', fontFamily:'JetBrains Mono', marginBottom:8, letterSpacing:0.3 }}>
        <span>QUESTION 3 / 20</span><span>SCORE 2/3</span>
      </div>
      <div style={{ height:4, background:'#252535', borderRadius:2, overflow:'hidden', marginBottom:32 }}>
        <div style={{ height:'100%', borderRadius:2, background:'linear-gradient(90deg,#7c6ff7,#22d3ee)', width:'15%' }}/>
      </div>
      <h2 style={{ fontSize:26, fontWeight:800, letterSpacing:-0.5, marginBottom:24 }}>{q.q}</h2>
      <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:28 }}>
        {q.opts.map((o,i) => {
          const selected = answer === i;
          const revealed = answer !== null;
          let bg = '#13131c', bc = '#252535', col = '#eeeef8';
          if (revealed) {
            if (o.correct) { bg = 'rgba(34,197,94,0.12)'; bc = '#22c55e'; col = '#22c55e'; }
            else if (selected) { bg = 'rgba(239,68,68,0.12)'; bc = '#ef4444'; col = '#ef4444'; }
          } else if (selected) { bc = '#7c6ff7'; }
          return (
            <button key={i} onClick={() => setAnswer(i)} disabled={revealed}
              style={{
                textAlign:'left', padding:'16px 20px', borderRadius:12,
                background:bg, border:`1px solid ${bc}`, color:col,
                fontSize:15, fontWeight:500, fontFamily:'inherit', cursor: revealed?'default':'pointer',
                transition:'all 0.2s',
              }}>
              <span style={{ fontFamily:'JetBrains Mono', fontSize:13, color:'#55556a', marginRight:10 }}>{String.fromCharCode(65+i)}.</span>
              {o.label}
            </button>
          );
        })}
      </div>
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <Button variant="ghost" onClick={() => onNav('/modules')}>Exit quiz</Button>
        <Button onClick={() => { setAnswer(null); }}>{answer!==null?'Next question →':'Skip →'}</Button>
      </div>
    </div>
  );
}
Object.assign(window, { HomePage, ModulesPage, ModuleDetailPage, QuizPage });
