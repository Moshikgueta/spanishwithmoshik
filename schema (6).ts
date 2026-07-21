"use client";

import { useEffect, useMemo, useState } from "react";
import { type ChapterVisualSpec, characters, type ReadingQuestion, type ReadingQuiz } from "./visual-data";

function seededShuffle<T>(values: T[], seed: string) {
  const next = [...values];
  let state = Array.from(seed).reduce((total, character) => Math.imul(total ^ character.charCodeAt(0), 16777619), 2166136261) >>> 0;
  for (let index = next.length - 1; index > 0; index -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const target = state % (index + 1);
    [next[index], next[target]] = [next[target], next[index]];
  }
  if (next.length > 1 && next.every((item, index) => item === values[index])) next.push(next.shift() as T);
  return next;
}

export function ChapterVisual({ spec }: { spec: ChapterVisualSpec }) {
  const [active, setActive] = useState(0);
  const progressKey = `moshik-book-visual-${spec.number}`;
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const character = characters[spec.character];
  const options = useMemo(() => seededShuffle(spec.check.options, `visual-${spec.number}`), [spec]);
  const correct = answer === spec.check.answer;
  const featureImage = spec.kind === "pronouns"
    ? "/images/characters/pronoun-gestures.webp"
    : spec.kind === "character"
      ? "/images/characters/character-lineup.webp"
      : spec.kind === "timeline" || spec.kind === "calendar" || spec.kind === "cafe"
        ? "/images/characters/daily-life-strip.webp"
        : null;

  useEffect(() => {
    const restore = window.requestAnimationFrame(() => {
      if (localStorage.getItem(progressKey) === "complete") {
        setAnswer(spec.check.answer);
        setChecked(true);
      }
    });
    return () => window.cancelAnimationFrame(restore);
  }, [progressKey, spec.check.answer]);

  useEffect(() => {
    if (checked && correct) localStorage.setItem(progressKey, "complete");
  }, [checked, correct, progressKey]);

  return (
    <section className={`chapter-visual-board visual-${spec.kind}`} aria-label={`עזר חזותי: ${spec.title}`}>
      <header className="chapter-visual-heading">
        <div><span>{spec.kicker}</span><h2>{spec.title}</h2><p>{spec.instruction}</p></div>
        <strong>{String(spec.number).padStart(2, "0")}</strong>
      </header>

      {featureImage && <div className="chapter-feature-image"><img src={featureImage} alt={`הדמויות מדגימות את הנושא ${spec.title}`} /></div>}

      <div className="visual-concept-grid">
        {spec.items.map((item, index) => (
          <button className={active === index ? "active" : ""} onClick={() => setActive(index)} key={`${item.spanish}-${index}`}>
            <span>{item.symbol}</span><b dir="ltr">{item.spanish}</b><small>{item.hebrew}</small>
          </button>
        ))}
      </div>

      <div className="visual-example-line" aria-live="polite">
        <span>דוגמה חיה</span><b dir="ltr">{spec.items[active].example}</b>
      </div>

      <aside className={`character-guide character-${character.color}`}>
        <img src={character.image} alt={`הדמות ${character.name}`} />
        <div><span>{character.name} מלווה את הפרק</span><b>{character.role}</b><p>{spec.characterLine}</p></div>
      </aside>

      <div className={`visual-quick-check ${checked ? correct ? "correct" : "wrong" : ""}`}>
        <div><span>בדיקת הבנה של 20 שניות</span><h3>{spec.check.prompt}</h3></div>
        <div className="visual-check-options">
          {options.map((option) => <button disabled={checked} className={answer === option ? "selected" : ""} onClick={() => setAnswer(option)} key={option} dir="auto">{option}</button>)}
        </div>
        {!checked ? <button className="visual-check-action" disabled={!answer} onClick={() => setChecked(true)}>בדיקה</button> : (
          <div className="visual-check-feedback" role="status"><b>{correct ? "¡Excelente!" : "כמעט. נסו שוב."}</b><p>{spec.check.explanation}</p>{!correct && <button onClick={() => { setAnswer(""); setChecked(false); }}>ניסיון נוסף</button>}</div>
        )}
      </div>
    </section>
  );
}

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f.,!?¿¡]/g, "").trim().toLowerCase();
}

function readStoredProgress(key: string, maximum: number) {
  if (typeof window === "undefined") return { index: 0, score: 0 };
  const saved = localStorage.getItem(key);
  if (!saved) return { index: 0, score: 0 };
  try {
    const progress = JSON.parse(saved) as { index?: number; score?: number };
    return { index: Math.min(progress.index ?? 0, maximum), score: Math.min(progress.score ?? 0, maximum) };
  } catch {
    localStorage.removeItem(key);
    return { index: 0, score: 0 };
  }
}

function OrderQuestion({ question, checked, onChange }: { question: Extract<ReadingQuestion, { type: "order" }>; checked: boolean; onChange: (value: string[]) => void }) {
  const [items, setItems] = useState(() => seededShuffle(question.items, question.prompt));
  function move(from: number, to: number) {
    if (checked || to < 0 || to >= items.length) return;
    setItems((current) => {
      const next = [...current];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      onChange(next);
      return next;
    });
  }
  return <div className="reading-order-list">{items.map((item, index) => <div key={item}><span>{index + 1}</span><b>{item}</b><button disabled={checked || index === 0} onClick={() => move(index, index - 1)}>↑</button><button disabled={checked || index === items.length - 1} onClick={() => move(index, index + 1)}>↓</button></div>)}</div>;
}

export function ReadingLab({ quiz }: { quiz: ReadingQuiz }) {
  const progressKey = `moshik-reading-${quiz.title}`;
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState<string | string[]>("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const question = quiz.questions[Math.min(index, quiz.questions.length - 1)];
  const character = characters[quiz.character];
  const options = useMemo(() => question.type === "choice" || question.type === "truefalse" ? seededShuffle(question.options, `${quiz.title}-${index}`) : [], [quiz.title, index, question]);
  const isCorrect = question.type === "order"
    ? Array.isArray(value) && question.answer.every((item, position) => value[position] === item)
    : typeof value === "string" && normalize(value) === normalize(question.answer);
  const finished = index >= quiz.questions.length;

  useEffect(() => {
    const restore = window.requestAnimationFrame(() => {
      const progress = readStoredProgress(progressKey, quiz.questions.length);
      setIndex(progress.index);
      setScore(progress.score);
    });
    return () => window.cancelAnimationFrame(restore);
  }, [progressKey, quiz.questions.length]);

  if (finished) return (
    <section className="reading-lab reading-complete">
      <span className="reading-complete-mark">✓</span><span>הבנת הנקרא הושלמה</span><h2>{score} מתוך {quiz.questions.length}</h2><p>{score === quiz.questions.length ? "קראתם מדויק וזיהיתם את כל הפרטים." : "חזרו לטקסט ונסו לזהות את המילים שעזרו להגיע לתשובה."}</p>
      <button onClick={() => { setIndex(0); setValue(""); setChecked(false); setScore(0); localStorage.removeItem(progressKey); }}>תרגול נוסף</button>
    </section>
  );

  function next() {
    const nextScore = score + (isCorrect ? 1 : 0);
    const nextIndex = index + 1;
    setScore(nextScore);
    setIndex(nextIndex);
    localStorage.setItem(progressKey, JSON.stringify({ index: nextIndex, score: nextScore }));
    setValue("");
    setChecked(false);
  }

  return (
    <section className="reading-lab" aria-label="מעבדת הבנת הנקרא">
      <header><div><span>מעבדת קריאה אינטראקטיבית</span><h2>{quiz.title}</h2><p>קוראים, מזהים רמזים ועונים מיד. אין צורך לנחש.</p></div><img src={character.image} alt={character.name} /></header>
      <blockquote dir="ltr">{quiz.excerpt}</blockquote>
      <div className="reading-lab-progress"><span style={{ width: `${(index + 1) / quiz.questions.length * 100}%` }} /><b>{index + 1}/{quiz.questions.length}</b></div>
      <article className="reading-question-card">
        <span>{question.type === "truefalse" ? "נכון או לא נכון" : question.type === "blank" ? "השלמה מהטקסט" : question.type === "order" ? "סידור מידע" : "בחירה לפי הטקסט"}</span>
        <h3>{question.prompt}</h3>
        {(question.type === "choice" || question.type === "truefalse") && <div className="reading-choice-grid">{options.map((option) => <button disabled={checked} className={value === option ? "selected" : ""} onClick={() => setValue(option)} key={option} dir="auto">{option}</button>)}</div>}
        {question.type === "blank" && <label className="reading-blank"><span dir="auto">{question.prompt}</span><input value={typeof value === "string" ? value : ""} disabled={checked} onChange={(event) => setValue(event.target.value)} placeholder="הקלידו את המילה" dir="auto" /></label>}
        {question.type === "order" && <OrderQuestion question={question} checked={checked} onChange={setValue} />}
        {!checked ? <button className="reading-check-button" disabled={!value || (Array.isArray(value) && !value.length)} onClick={() => setChecked(true)}>בדיקת תשובה</button> : <div className={`reading-feedback ${isCorrect ? "correct" : "wrong"}`} role="status"><div><b>{isCorrect ? "נכון מאוד" : "כדאי לבדוק שוב"}</b><p>{question.explanation}</p></div><button onClick={isCorrect ? next : () => { setValue(""); setChecked(false); }}>{isCorrect ? "לשאלה הבאה" : "ניסיון נוסף"}</button></div>}
      </article>
    </section>
  );
}
