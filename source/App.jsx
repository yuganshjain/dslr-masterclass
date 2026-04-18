import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Modules from './pages/Modules';
import ModuleDetail from './pages/ModuleDetail';
import Simulators from './pages/Simulators';
import Quiz from './pages/Quiz';
import Tools from './pages/Tools';
import Cameras from './pages/Cameras';
import CheatSheet from './pages/CheatSheet';
import Glossary from './pages/Glossary';
import './App.css';

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/modules/:id" element={<ModuleDetail />} />
          <Route path="/simulators" element={<Simulators />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/cameras" element={<Cameras />} />
          <Route path="/cheatsheet" element={<CheatSheet />} />
          <Route path="/glossary" element={<Glossary />} />
        </Routes>
      </main>
      <footer style={{
        textAlign: 'center',
        padding: '24px',
        color: 'var(--text3)',
        fontSize: '13px',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg2)'
      }}>
        📷 DSLR Masterclass — Built for photographers, by photographers · 2025
      </footer>
    </>
  );
}
