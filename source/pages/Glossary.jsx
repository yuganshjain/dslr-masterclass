import { useState, useMemo } from 'react';
import { glossaryTerms, glossaryCategories } from '../data/glossary';
import styles from './Glossary.module.css';

export default function Glossary() {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');

  const filtered = useMemo(() => {
    return glossaryTerms.filter(t => {
      const matchesCat = activeCat === 'All' || t.category === activeCat;
      const matchesSearch = !search ||
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.definition.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [search, activeCat]);

  // Group by first letter
  const grouped = useMemo(() => {
    const g = {};
    filtered.forEach(t => {
      const letter = t.term[0].toUpperCase();
      if (!g[letter]) g[letter] = [];
      g[letter].push(t);
    });
    return g;
  }, [filtered]);

  const letters = Object.keys(grouped).sort();

  return (
    <div className="page">
      <div className="page-header fade-up">
        <h1>◎ Photography Glossary</h1>
        <p>{glossaryTerms.length}+ essential photography terms explained simply and clearly</p>
      </div>

      {/* Search + Filter */}
      <div className={`${styles.controls} fade-up-1`}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>⌕</span>
          <input
            className={styles.search}
            type="text"
            placeholder="Search terms..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button className={styles.clear} onClick={() => setSearch('')}>✕</button>}
        </div>
      </div>

      <div className={`${styles.catRow} fade-up-2`}>
        <button
          className={`${styles.catBtn} ${activeCat === 'All' ? styles.catActive : ''}`}
          onClick={() => setActiveCat('All')}
        >
          All ({glossaryTerms.length})
        </button>
        {glossaryCategories.map(cat => (
          <button
            key={cat}
            className={`${styles.catBtn} ${activeCat === cat ? styles.catActive : ''}`}
            onClick={() => setActiveCat(cat)}
          >
            {cat} ({glossaryTerms.filter(t => t.category === cat).length})
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className={`${styles.resultCount} fade-up-2`}>
        {filtered.length} term{filtered.length !== 1 ? 's' : ''}
        {(search || activeCat !== 'All') ? ` matching "${search || activeCat}"` : ''}
      </p>

      {/* Terms */}
      {letters.length === 0 ? (
        <div className={styles.empty}>
          <p>No terms match your search.</p>
          <button onClick={() => { setSearch(''); setActiveCat('All'); }} className="btn btn-ghost">Clear Filters</button>
        </div>
      ) : (
        <div className={styles.termsContainer}>
          {letters.map(letter => (
            <div key={letter} className={`${styles.letterGroup} fade-up`}>
              <div className={styles.letterHeader}>{letter}</div>
              <div className={styles.termsList}>
                {grouped[letter].map(term => (
                  <div key={term.term} className={styles.termCard}>
                    <div className={styles.termTop}>
                      <h3 className={styles.termName}>{term.term}</h3>
                      <span className={styles.termCat}>{term.category}</span>
                    </div>
                    <p className={styles.termDef}>{term.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
