import { useState } from 'react';
import { Link } from 'react-router-dom';
import { modules } from '../data/modules';
import styles from './Modules.module.css';

const loadProgress = () => JSON.parse(localStorage.getItem('dslrmc_progress')) || { completedModules: [], quizBestScore: null };

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function Modules() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [completedModules] = useState(() => loadProgress().completedModules);

  const filtered = modules.filter(m => {
    const matchesDiff = filter === 'All' || m.difficulty === filter;
    const matchesSearch = !search || m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.summary.toLowerCase().includes(search.toLowerCase());
    return matchesDiff && matchesSearch;
  });

  return (
    <div className="page">
      <div className="page-header fade-up">
        <h1>All Learning Modules</h1>
        <p>Master every aspect of DSLR photography with our comprehensive, structured lessons</p>
      </div>

      {/* Filters */}
      <div className={`${styles.controls} fade-up-1`}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>⌕</span>
          <input
            className={styles.search}
            type="text"
            placeholder="Search modules..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button className={styles.clearSearch} onClick={() => setSearch('')}>✕</button>}
        </div>
        <div className={styles.filters}>
          {difficulties.map(d => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`${styles.filter} ${filter === d ? styles.active : ''}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className={`${styles.count} fade-up-2`}>
        {filtered.length} module{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.map((mod, i) => (
          <Link
            key={mod.id}
            to={`/modules/${mod.id}`}
            className={`${styles.card} fade-up-${(i % 3) + 1}`}
          >
            {completedModules.includes(mod.id) && (
              <div className={styles.completeBadge}>✓ Done</div>
            )}
            <div className={styles.cardTop}>
              <div className={styles.iconWrap} style={{ background: mod.gradient }}>
                <span className={styles.icon}>{mod.icon}</span>
              </div>
              <div className={styles.meta}>
                <span className={`badge badge-${mod.difficulty.toLowerCase()}`}>{mod.difficulty}</span>
                <span className={styles.duration}>⏱ {mod.duration}</span>
              </div>
            </div>

            <div className={styles.cardBody}>
              <h3 className={styles.title}>{mod.title}</h3>
              <p className={styles.subtitle}>{mod.subtitle}</p>
              <p className={styles.summary}>{mod.summary}</p>
            </div>

            <div className={styles.topics}>
              {mod.topics.map(t => (
                <span key={t} className={styles.topic}>{t}</span>
              ))}
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.sections}>{mod.sections.length} sections</span>
              <span className={styles.arrow}>Start →</span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={styles.empty}>
          <p>🔍 No modules match your search. Try a different term.</p>
          <button onClick={() => { setSearch(''); setFilter('All'); }} className="btn btn-ghost">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
