import { useState } from 'react';
import { quizQuestions, categories } from '../data/quiz';
import styles from './Quiz.module.css';

const loadProgress = () => JSON.parse(localStorage.getItem('dslrmc_progress')) || { completedModules: [], quizBestScore: null };
const saveProgress = (data) => localStorage.setItem('dslrmc_progress', JSON.stringify(data));

export default function Quiz() {
  const [phase, setPhase] = useState('setup'); // setup | playing | results
  const [selectedCats, setSelectedCats] = useState(new Set(categories));
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [chosen, setChosen] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [bestScore, setBestScore] = useState(() => loadProgress().quizBestScore);

  const toggleCat = (cat) => {
    const next = new Set(selectedCats);
    next.has(cat) ? next.delete(cat) : next.add(cat);
    if (next.size > 0) setSelectedCats(next);
  };

  const startQuiz = () => {
    const pool = quizQuestions.filter(q => selectedCats.has(q.category));
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrent(0);
    setAnswers({});
    setChosen(null);
    setShowExplanation(false);
    setPhase('playing');
  };

  const handleAnswer = (idx) => {
    if (chosen !== null) return;
    setChosen(idx);
    setShowExplanation(true);
    setAnswers(a => ({ ...a, [questions[current].id]: idx }));
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setChosen(null);
      setShowExplanation(false);
    } else {
      // Calculate final score and save if best
      const finalScore = Object.entries({ ...answers, [questions[current].id]: chosen }).filter(([qid, ans]) => {
        const q = quizQuestions.find(q => q.id === Number(qid));
        return q && ans === q.answer;
      }).length;
      const pct = Math.round((finalScore / questions.length) * 100);
      const p = loadProgress();
      if (!p.quizBestScore || pct > p.quizBestScore.pct) {
        const newBest = { score: finalScore, total: questions.length, pct };
        p.quizBestScore = newBest;
        saveProgress(p);
        setBestScore(newBest);
      }
      setPhase('results');
    }
  };

  const score = Object.entries(answers).filter(([id, ans]) => {
    const q = quizQuestions.find(q => q.id === Number(id));
    return q && ans === q.answer;
  }).length;

  if (phase === 'setup') return <SetupScreen categories={categories} selected={selectedCats} onToggle={toggleCat} onStart={startQuiz} total={quizQuestions.filter(q => selectedCats.has(q.category)).length} bestScore={bestScore} />;
  if (phase === 'results') return <ResultsScreen score={score} total={questions.length} answers={answers} questions={questions} onRetry={() => setPhase('setup')} />;

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="page" style={{ maxWidth: 720 }}>
      {/* Header */}
      <div className={`${styles.quizHeader} fade-up`}>
        <div className={styles.quizProgress}>
          <span className={styles.quizCount}>{current + 1} / {questions.length}</span>
          <div className="progress-bar" style={{ flex: 1 }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.quizScore}>
            {Object.values(answers).filter((ans, i) => {
              const qid = Object.keys(answers)[i];
              const qItem = quizQuestions.find(q => q.id === Number(qid));
              return qItem && ans === qItem.answer;
            }).length} correct
          </span>
        </div>
      </div>

      {/* Question card */}
      <div className={`${styles.questionCard} scale-in`} key={current}>
        <div className={styles.qMeta}>
          <span className={`badge badge-${q.difficulty.toLowerCase()}`}>{q.difficulty}</span>
          <span className={styles.qCategory}>{q.category}</span>
        </div>
        <h2 className={styles.qText}>{q.question}</h2>

        <div className={styles.options}>
          {q.options.map((opt, i) => {
            const state = chosen === null ? 'idle'
              : i === q.answer ? 'correct'
              : i === chosen ? 'wrong'
              : 'dim';
            return (
              <button
                key={i}
                className={`${styles.option} ${styles[`option-${state}`]}`}
                onClick={() => handleAnswer(i)}
                disabled={chosen !== null}
              >
                <span className={styles.optLetter}>{['A','B','C','D'][i]}</span>
                <span className={styles.optText}>{opt}</span>
                {state === 'correct' && <span className={styles.optIcon}>✓</span>}
                {state === 'wrong' && <span className={styles.optIcon}>✗</span>}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className={`${styles.explanation} ${chosen === q.answer ? styles.explCorrect : styles.explWrong}`}>
            <strong>{chosen === q.answer ? '✓ Correct!' : '✗ Not quite.'}</strong>
            <p>{q.explanation}</p>
          </div>
        )}

        {chosen !== null && (
          <button className="btn btn-primary" onClick={next} style={{ marginTop: 20, alignSelf: 'flex-end' }}>
            {current < questions.length - 1 ? 'Next Question →' : 'See Results →'}
          </button>
        )}
      </div>
    </div>
  );
}

function SetupScreen({ categories, selected, onToggle, onStart, total, bestScore }) {
  return (
    <div className="page" style={{ maxWidth: 700 }}>
      <div className="page-header fade-up">
        <h1>◆ Knowledge Quiz</h1>
        <p>Test your DSLR knowledge across all topics. Select categories and start!</p>
      </div>

      <div className={`${styles.setupCard} fade-up-1`}>
        <h3 className={styles.setupTitle}>Choose Categories</h3>
        <div className={styles.catGrid}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.catBtn} ${selected.has(cat) ? styles.catActive : ''}`}
              onClick={() => onToggle(cat)}
            >
              {selected.has(cat) ? '✓ ' : ''}{cat}
            </button>
          ))}
        </div>

        <div className={styles.setupInfo}>
          <span>{total} questions available</span>
          <span>~{Math.ceil(total * 0.5)} min</span>
        </div>

        <button className="btn btn-primary" onClick={onStart} disabled={total === 0} style={{ width: '100%', justifyContent: 'center', padding: '15px' }}>
          Start Quiz ({total} Questions) →
        </button>
      </div>

      {bestScore && (
        <div className={`${styles.bestScore} fade-up-2`}>
          <span className={styles.bestScoreIcon}>🏆</span>
          <div>
            <div className={styles.bestScoreLabel}>Your Best Score</div>
            <div className={styles.bestScoreVal}>{bestScore.pct}% — {bestScore.score}/{bestScore.total} correct</div>
          </div>
        </div>
      )}

      <div className={`${styles.setupTips} fade-up-2`}>
        {[
          { icon: '◈', text: 'Answers are explained after each question' },
          { icon: '◆', text: 'Questions are randomly shuffled each time' },
          { icon: '△', text: 'Covers Beginner through Advanced topics' },
        ].map((t, i) => (
          <div key={i} className={styles.setupTip}>
            <span style={{ color: 'var(--accent2)', fontSize: 18 }}>{t.icon}</span>
            <span>{t.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultsScreen({ score, total, answers, questions, onRetry }) {
  const pct = Math.round((score / total) * 100);
  const grade = pct >= 90 ? { label: 'Expert! 🏆', color: '#f5a623' }
    : pct >= 75 ? { label: 'Advanced 🌟', color: '#22c55e' }
    : pct >= 60 ? { label: 'Intermediate 📈', color: '#22d3ee' }
    : pct >= 40 ? { label: 'Keep Practicing 📚', color: '#7c6ff7' }
    : { label: 'Keep Learning 💪', color: '#ef4444' };

  return (
    <div className="page" style={{ maxWidth: 700 }}>
      <div className={`${styles.results} fade-up`}>
        <div className={styles.scoreCircle} style={{ borderColor: grade.color }}>
          <span className={styles.scoreNum} style={{ color: grade.color }}>{pct}%</span>
          <span className={styles.scoreLabel}>Score</span>
        </div>
        <h2 className={styles.gradeLabel} style={{ color: grade.color }}>{grade.label}</h2>
        <p className={styles.scoreSub}>{score} out of {total} correct</p>

        <button className="btn btn-primary" onClick={onRetry} style={{ marginTop: 8 }}>
          Try Again →
        </button>
      </div>

      <div className={`${styles.reviewList} fade-up-1`}>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>Review Answers</h3>
        {questions.map((q, i) => {
          const userAns = answers[q.id];
          const correct = userAns === q.answer;
          return (
            <div key={q.id} className={`${styles.reviewItem} ${correct ? styles.reviewCorrect : styles.reviewWrong}`}>
              <div className={styles.reviewTop}>
                <span className={styles.reviewIcon}>{correct ? '✓' : '✗'}</span>
                <span className={styles.reviewQ}>{q.question}</span>
              </div>
              <div className={styles.reviewAnswers}>
                {!correct && <p className={styles.reviewYours}>Your answer: <strong>{q.options[userAns]}</strong></p>}
                <p className={styles.reviewCorrectAns}>Correct: <strong>{q.options[q.answer]}</strong></p>
                {!correct && <p className={styles.reviewExpl}>{q.explanation}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
