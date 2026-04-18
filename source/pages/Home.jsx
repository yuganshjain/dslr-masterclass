import { Link } from 'react-router-dom';
import { modules } from '../data/modules';
import styles from './Home.module.css';

const stats = [
  { value: '11', label: 'Learning Modules', icon: '◈' },
  { value: '20', label: 'Quiz Questions', icon: '◆' },
  { value: '50+', label: 'Glossary Terms', icon: '◎' },
  { value: '3', label: 'Simulators', icon: '◉' },
];

const featuredModules = modules.slice(0, 6);

export default function Home() {
  return (
    <div className={styles.home}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={`${styles.heroBadge} fade-up`}>
            <span>📷</span> Complete DSLR Learning Platform
          </div>
          <h1 className={`${styles.heroTitle} fade-up-1`}>
            Master Your DSLR<br />
            <span className="gradient-text">From Zero to Pro</span>
          </h1>
          <p className={`${styles.heroSub} fade-up-2`}>
            Interactive lessons, visual simulators, and hands-on quizzes covering every DSLR feature.
            No fluff — just the knowledge you need to take stunning photos.
          </p>
          <div className={`${styles.heroCta} fade-up-3`}>
            <Link to="/modules" className="btn btn-primary">
              Start Learning →
            </Link>
            <Link to="/simulators" className="btn btn-secondary">
              Try Simulators
            </Link>
          </div>
        </div>

        {/* Camera Diagram */}
        <div className={`${styles.cameraViz} fade-up-2`}>
          <CameraVisualization />
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statsSection}>
        {stats.map((s, i) => (
          <div key={i} className={`${styles.statCard} fade-up-${i + 1}`}>
            <div className={styles.statIcon}>{s.icon}</div>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Learning Path */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Your Learning Path</h2>
          <p>From camera basics to advanced techniques — everything in logical order</p>
        </div>
        <div className={styles.modulesGrid}>
          {featuredModules.map((mod, i) => (
            <Link key={mod.id} to={`/modules/${mod.id}`} className={`${styles.moduleCard} fade-up-${(i % 3) + 1}`}>
              <div className={styles.moduleIconWrap} style={{ background: mod.gradient }}>
                <span className={styles.moduleIcon}>{mod.icon}</span>
              </div>
              <div className={styles.moduleInfo}>
                <div className={styles.moduleMeta}>
                  <span className={`badge badge-${mod.difficulty.toLowerCase()}`}>{mod.difficulty}</span>
                  <span className={styles.moduleDuration}>{mod.duration}</span>
                </div>
                <h3 className={styles.moduleTitle}>{mod.title}</h3>
                <p className={styles.moduleSummary}>{mod.summary}</p>
              </div>
              <div className={styles.moduleArrow}>→</div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link to="/modules" className="btn btn-secondary">
            View All {modules.length} Modules →
          </Link>
        </div>
      </section>

      {/* Simulators */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Interactive Simulators</h2>
          <p>Learn by doing — adjust settings and see results in real time</p>
        </div>
        <div className={styles.simGrid}>
          {[
            { icon: '△', title: 'Exposure Triangle', desc: 'Adjust aperture, shutter, and ISO together. See how they balance to achieve correct exposure.', color: '#7c6ff7', path: '/simulators' },
            { icon: '◎', title: 'Depth of Field', desc: 'Visualize how aperture, focal length, and distance combine to control background blur.', color: '#f5a623', path: '/simulators' },
            { icon: '◑', title: 'Scene Simulator', desc: 'Pick a scene and see which camera settings produce which creative results.', color: '#22d3ee', path: '/simulators' },
          ].map((sim, i) => (
            <Link key={i} to={sim.path} className={`${styles.simCard} fade-up-${i + 1}`}>
              <div className={styles.simIcon} style={{ color: sim.color }}>{sim.icon}</div>
              <h3>{sim.title}</h3>
              <p>{sim.desc}</p>
              <span className={styles.simCta} style={{ color: sim.color }}>Try now →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className={styles.quickLinks}>
        {[
          { icon: '◆', title: 'Test Your Knowledge', desc: '20 questions across all DSLR topics', link: '/quiz', label: 'Take Quiz', color: 'var(--accent)' },
          { icon: '◇', title: 'Quick Reference', desc: 'Settings cheatsheet for any situation', link: '/cheatsheet', label: 'View Cheatsheet', color: 'var(--gold)' },
          { icon: '◎', title: 'Glossary', desc: '50+ photography terms explained', link: '/glossary', label: 'Browse Terms', color: 'var(--cyan)' },
        ].map((q, i) => (
          <div key={i} className={`${styles.quickCard} fade-up-${i + 1}`}>
            <span className={styles.quickIcon} style={{ color: q.color }}>{q.icon}</span>
            <div>
              <h3>{q.title}</h3>
              <p>{q.desc}</p>
            </div>
            <Link to={q.link} className="btn btn-ghost" style={{ marginLeft: 'auto', flexShrink: 0 }}>
              {q.label} →
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}

function CameraVisualization() {
  return (
    <div className={styles.camera}>
      <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" className={styles.cameraSvg}>
        {/* Camera body */}
        <rect x="20" y="60" width="280" height="160" rx="16" fill="#1a1a2e" stroke="#2a2a4a" strokeWidth="2"/>
        {/* Top plate */}
        <rect x="60" y="40" width="200" height="28" rx="8" fill="#1a1a2e" stroke="#2a2a4a" strokeWidth="2"/>
        {/* Hot shoe */}
        <rect x="140" y="34" width="60" height="10" rx="3" fill="#252540"/>
        {/* Viewfinder hump */}
        <rect x="120" y="26" width="80" height="18" rx="6" fill="#1a1a2e" stroke="#2a2a4a" strokeWidth="1.5"/>
        {/* Lens barrel */}
        <circle cx="130" cy="145" r="62" fill="#111128" stroke="#2a2a4a" strokeWidth="2"/>
        <circle cx="130" cy="145" r="50" fill="#0d0d20" stroke="#333360" strokeWidth="1.5"/>
        <circle cx="130" cy="145" r="38" fill="#080812" stroke="#444480" strokeWidth="1"/>
        {/* Lens aperture blades */}
        {[0,45,90,135,180,225,270,315].map((angle, i) => (
          <line key={i}
            x1={130 + 18 * Math.cos(angle * Math.PI/180)}
            y1={145 + 18 * Math.sin(angle * Math.PI/180)}
            x2={130 + 32 * Math.cos((angle + 22) * Math.PI/180)}
            y2={145 + 32 * Math.sin((angle + 22) * Math.PI/180)}
            stroke="#7c6ff7" strokeWidth="1.5" strokeOpacity="0.7"
          />
        ))}
        <circle cx="130" cy="145" r="14" fill="#1a1a3a" stroke="#7c6ff7" strokeWidth="1"/>
        <circle cx="130" cy="145" r="6" fill="#7c6ff7" fillOpacity="0.5"/>
        {/* Shutter button */}
        <circle cx="245" cy="46" r="10" fill="#7c6ff7" stroke="#9d97ff" strokeWidth="1.5"/>
        <circle cx="245" cy="46" r="6" fill="#9d97ff" fillOpacity="0.5"/>
        {/* Mode dial */}
        <circle cx="82" cy="46" r="14" fill="#1e1e38" stroke="#2a2a4a" strokeWidth="1.5"/>
        {['M','A','S','P'].map((label, i) => (
          <text key={i}
            x={82 + 9 * Math.cos((i * 90 - 45) * Math.PI/180)}
            y={46 + 9 * Math.sin((i * 90 - 45) * Math.PI/180) + 3}
            textAnchor="middle" fontSize="5" fill="#9d97ff" fontFamily="Inter"
          >{label}</text>
        ))}
        {/* LCD Screen */}
        <rect x="210" y="90" width="75" height="55" rx="4" fill="#0a0a20" stroke="#2a2a4a" strokeWidth="1"/>
        <rect x="213" y="93" width="69" height="49" rx="3" fill="#061018" stroke="#1a3040" strokeWidth="0.5"/>
        {/* LCD content */}
        <text x="247" y="110" textAnchor="middle" fontSize="7" fill="#22d3ee" fontFamily="JetBrains Mono">f/2.8</text>
        <text x="247" y="122" textAnchor="middle" fontSize="6" fill="#f5a623" fontFamily="JetBrains Mono">1/250</text>
        <text x="247" y="133" textAnchor="middle" fontSize="6" fill="#e879f9" fontFamily="JetBrains Mono">ISO 400</text>
        {/* Control buttons */}
        {[0,1,2,3].map(i => (
          <rect key={i} x={215} y={160 + i * 14} width="10" height="10" rx="2" fill="#1e1e38" stroke="#2a2a4a" strokeWidth="1"/>
        ))}
        {/* D-pad */}
        <circle cx="270" cy="175" r="16" fill="#1a1a30" stroke="#2a2a4a" strokeWidth="1"/>
        <circle cx="270" cy="175" r="6" fill="#252545"/>
        <text x="270" y="163" textAnchor="middle" fontSize="7" fill="#555580">▲</text>
        <text x="270" y="192" textAnchor="middle" fontSize="7" fill="#555580">▼</text>
        <text x="259" y="179" textAnchor="middle" fontSize="7" fill="#555580">◀</text>
        <text x="282" y="179" textAnchor="middle" fontSize="7" fill="#555580">▶</text>
        {/* Focus mode dial */}
        <rect x="22" y="120" width="24" height="55" rx="6" fill="#1a1a30" stroke="#2a2a4a" strokeWidth="1"/>
        <text x="34" y="140" textAnchor="middle" fontSize="6" fill="#9d97ff" fontFamily="Inter">AF-C</text>
        <text x="34" y="151" textAnchor="middle" fontSize="6" fill="#555580" fontFamily="Inter">AF-S</text>
        <text x="34" y="162" textAnchor="middle" fontSize="6" fill="#555580" fontFamily="Inter">MF</text>
        {/* Strap lugs */}
        <rect x="20" y="80" width="8" height="20" rx="3" fill="#0d0d1a" stroke="#2a2a4a" strokeWidth="1"/>
        <rect x="292" y="80" width="8" height="20" rx="3" fill="#0d0d1a" stroke="#2a2a4a" strokeWidth="1"/>
      </svg>

      {/* Floating labels */}
      <div className={styles.camLabel} style={{ top: '8%', left: '28%' }}>
        <span className={styles.camLabelDot} style={{ background: '#f5a623' }} />
        <span>f/2.8</span>
      </div>
      <div className={styles.camLabel} style={{ top: '28%', right: '10%' }}>
        <span className={styles.camLabelDot} style={{ background: '#22d3ee' }} />
        <span>1/250s</span>
      </div>
      <div className={styles.camLabel} style={{ bottom: '20%', right: '12%' }}>
        <span className={styles.camLabelDot} style={{ background: '#e879f9' }} />
        <span>ISO 400</span>
      </div>
    </div>
  );
}
