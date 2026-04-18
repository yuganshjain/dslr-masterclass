import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { modules, getModule } from '../data/modules';
import styles from './ModuleDetail.module.css';

const loadProgress = () => JSON.parse(localStorage.getItem('dslrmc_progress')) || { completedModules: [], quizBestScore: null };
const saveProgress = (data) => localStorage.setItem('dslrmc_progress', JSON.stringify(data));

export default function ModuleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mod = getModule(id);
  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const [moduleComplete, setModuleComplete] = useState(() => loadProgress().completedModules.includes(id));

  if (!mod) {
    return (
      <div className="page" style={{ textAlign: 'center', paddingTop: 80 }}>
        <h2>Module not found</h2>
        <Link to="/modules" className="btn btn-primary" style={{ marginTop: 20 }}>← Back to Modules</Link>
      </div>
    );
  }

  const currentIndex = modules.findIndex(m => m.id === id);
  const prev = modules[currentIndex - 1];
  const next = modules[currentIndex + 1];

  const markDone = (i) => setCompleted(c => new Set([...c, i]));
  const progress = Math.round((completed.size / mod.sections.length) * 100);

  const completeModule = () => {
    markDone(activeSection);
    if (!moduleComplete) {
      const p = loadProgress();
      if (!p.completedModules.includes(id)) p.completedModules.push(id);
      saveProgress(p);
      setModuleComplete(true);
    }
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <Link to="/modules" className={styles.back}>← All Modules</Link>

        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarIcon} style={{ background: mod.gradient }}>
            {mod.icon}
          </div>
          <div>
            <h3 className={styles.sidebarTitle}>{mod.title}</h3>
            <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
              <span className={`badge badge-${mod.difficulty.toLowerCase()}`}>{mod.difficulty}</span>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>⏱ {mod.duration}</span>
            </div>
          </div>
        </div>

        <div className={styles.progress}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--text3)' }}>Progress</span>
            <span style={{ fontSize: 12, color: 'var(--accent2)', fontWeight: 600 }}>{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <nav className={styles.sectionNav}>
          {mod.sections.map((s, i) => (
            <button
              key={i}
              className={`${styles.navItem} ${activeSection === i ? styles.navActive : ''} ${completed.has(i) ? styles.navDone : ''}`}
              onClick={() => setActiveSection(i)}
            >
              <span className={styles.navNum}>
                {completed.has(i) ? '✓' : i + 1}
              </span>
              <span className={styles.navLabel}>{s.title}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarTopics}>
          <p style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 10 }}>Topics Covered</p>
          {mod.topics.map(t => (
            <span key={t} className={styles.topicTag}>{t}</span>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        <div className={styles.contentHeader} style={{ borderColor: mod.color + '30' }}>
          <div className={styles.sectionProgress}>
            Section {activeSection + 1} of {mod.sections.length}
          </div>
          <h1 className={styles.sectionTitle}>{mod.sections[activeSection].title}</h1>
          <div className={styles.moduleTag} style={{ color: mod.color, background: mod.color + '15', border: `1px solid ${mod.color}30` }}>
            {mod.icon} {mod.title}
          </div>
        </div>

        <div className={styles.content}>
          <ContentRenderer content={mod.sections[activeSection].content} />
        </div>

        <div className={styles.sectionActions}>
          {activeSection > 0 && (
            <button className="btn btn-ghost" onClick={() => setActiveSection(a => a - 1)}>
              ← Previous Section
            </button>
          )}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
            {!completed.has(activeSection) && (
              <button className="btn btn-secondary" onClick={() => markDone(activeSection)}>
                ✓ Mark Complete
              </button>
            )}
            {activeSection < mod.sections.length - 1 ? (
              <button className="btn btn-primary" onClick={() => { markDone(activeSection); setActiveSection(a => a + 1); }}>
                Next Section →
              </button>
            ) : (
              <button className="btn btn-primary" onClick={completeModule} style={{ background: moduleComplete ? 'var(--green2)' : 'var(--green)' }}>
                {moduleComplete ? '✓ Module Complete!' : '✓ Complete Module'}
              </button>
            )}
          </div>
        </div>

        {/* Key Takeaways */}
        {activeSection === mod.sections.length - 1 && (
          <div className={styles.takeaways}>
            <h3 className={styles.takeawaysTitle}>⚡ Key Takeaways</h3>
            <ul className={styles.takeawaysList}>
              {mod.keyTakeaways.map((t, i) => (
                <li key={i} className={styles.takeaway}>
                  <span className={styles.takeawayDot} style={{ background: mod.color }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation between modules */}
        <div className={styles.moduleNav}>
          {prev && (
            <Link to={`/modules/${prev.id}`} className={styles.moduleNavCard}>
              <span className={styles.moduleNavDir}>← Previous Module</span>
              <span className={styles.moduleNavTitle}>{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link to={`/modules/${next.id}`} className={`${styles.moduleNavCard} ${styles.moduleNavNext}`}>
              <span className={styles.moduleNavDir}>Next Module →</span>
              <span className={styles.moduleNavTitle}>{next.title}</span>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

function ContentRenderer({ content }) {
  const lines = content.split('\n');
  const elements = [];
  let i = 0;
  let tableBuffer = [];
  let inTable = false;

  while (i < lines.length) {
    const line = lines[i];

    // Table detection
    if (line.trim().startsWith('|')) {
      tableBuffer.push(line);
      inTable = true;
      i++;
      continue;
    } else if (inTable) {
      elements.push(<TableRenderer key={elements.length} rows={tableBuffer} />);
      tableBuffer = [];
      inTable = false;
    }

    // Headings
    if (line.startsWith('**') && line.endsWith('**') && !line.slice(2,-2).includes('**')) {
      elements.push(<h4 key={i} className={styles.contentH4}>{line.slice(2,-2)}</h4>);
    }
    // Bullet points
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      const items = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={elements.length} className={styles.contentList}>
          {items.map((item, j) => <li key={j}><InlineFormat text={item} /></li>)}
        </ul>
      );
      continue;
    }
    // Numbered list
    else if (/^\d+\./.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\./.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s*/, ''));
        i++;
      }
      elements.push(
        <ol key={elements.length} className={styles.contentOl}>
          {items.map((item, j) => <li key={j}><InlineFormat text={item} /></li>)}
        </ol>
      );
      continue;
    }
    // Empty line = paragraph break
    else if (line.trim() === '') {
      // skip
    }
    // Regular paragraph
    else {
      elements.push(<p key={i} className={styles.contentP}><InlineFormat text={line} /></p>);
    }

    i++;
  }

  if (inTable && tableBuffer.length) {
    elements.push(<TableRenderer key={elements.length} rows={tableBuffer} />);
  }

  return <div className={styles.contentBody}>{elements}</div>;
}

function InlineFormat({ text }) {
  // Handle **bold** and `code`
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={i} className={styles.inlineCode}>{part.slice(1, -1)}</code>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function TableRenderer({ rows }) {
  const validRows = rows.filter(r => !r.includes('---'));
  if (validRows.length < 2) return null;
  const headers = validRows[0].split('|').filter(Boolean).map(h => h.trim());
  const dataRows = validRows.slice(1).map(r => r.split('|').filter(Boolean).map(c => c.trim()));
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {dataRows.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j}><InlineFormat text={cell} /></td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
