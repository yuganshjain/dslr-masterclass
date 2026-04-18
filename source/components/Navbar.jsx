import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const navItems = [
  { path: '/', label: 'Home', icon: '⌂' },
  { path: '/modules', label: 'Learn', icon: '◈' },
  { path: '/simulators', label: 'Simulate', icon: '◉' },
  { path: '/quiz', label: 'Quiz', icon: '◆' },
  { path: '/tools', label: 'Tools', icon: '⚙' },
  { path: '/cameras', label: 'Cameras', icon: '📷' },
  { path: '/cheatsheet', label: 'Cheatsheet', icon: '◇' },
  { path: '/glossary', label: 'Glossary', icon: '◎' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoIcon}>📷</span>
          <span className={styles.logoText}>DSLR<span className={styles.logoAccent}>Masterclass</span></span>
        </NavLink>

        <div className={styles.links}>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.linkIcon}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          className={`${styles.burger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `${styles.mobileLink} ${isActive ? styles.active : ''}`}
            >
              <span>{item.icon}</span> {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
