"use client";

import { DragEvent, useEffect, useMemo, useRef, useState } from "react";
import { content, unitForChapter, type ContentBlock, type SourceExercise } from "../content";

const typeLabels: Record<SourceExercise["kind"], string> = {
  speaking: "דיבור והקלטה",
  matching: "התאמה",
  sorting: "מיון",
  ordering: "סידור",
  truefalse: "נכון או לא נכון",
  correction: "תיקון טעויות",
  choice: "בחירה",
  blanks: "השלמה",
  writing: "כתיבה",
  reading: "הבנת הנקרא",
  checklist: "בדיקה עצמית",
  challenge: "אתגר",
  practice: "תרגול",
};

function hash(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function shuffle<T>(values: T[], seed: string) {
  const next = [...values];
  let state = hash(seed) || 1;
  for (let index = next.length - 1; index > 0; index -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const target = state % (index + 1);
    [next[index], next[target]] = [next[target], next[index]];
  }
  if (next.length > 1 && next.every((item, index) => item === values[index])) next.push(next.shift() as T);
  return next;
}

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f\u0591-\u05c7]/g, "").replace(/[.,;:!?¿¡()[\]"']/g, "").replace(/\s+/g, " ").trim().toLowerCase();
}

function InlineBlanks({ exercise, onDone }: { exercise: SourceExercise; onDone: () => void }) {
  const pieces = exercise.prompt.split(/(_{3,})/g);
  const blankCount = pieces.filter((piece) => /^_{3,}$/.test(piece)).length;
  const [values, setValues] = useState(() => Array.from({ length: blankCount }, () => ""));
  const [checked, setChecked] = useState(false);
  const official = normalize(exercise.answer);
  const accepted = exercise.answer && values.length > 0 && values.every((value) => value.trim() && official.includes(normalize(value)));
  return (
    <>
      <div className="source-inline-prompt" dir="auto">
        {pieces.map((piece, index) => {
          if (!/^_{3,}$/.test(piece)) return <span key={index}>{piece}</span>;
          const position = pieces.slice(0, index).filter((value) => /^_{3,}$/.test(value)).length;
          return <input key={index} value={values[position]} disabled={checked} aria-label={`השלמה ${position + 1}`} onChange={(event) => setValues((current) => current.map((value, itemIndex) => itemIndex === position ? event.target.value : value))} />;
        })}
      </div>
      <PracticeFeedback exercise={exercise} checked={checked} correct={accepted} disabled={values.some((value) => !value.trim())} onCheck={() => { setChecked(true); onDone(); }} onRetry={() => setChecked(false)} />
    </>
  );
}

function optionTokens(prompt: string) {
  const matches = [...prompt.matchAll(/(?:^|\s)([אבגדהוזחטיכלמנסעפצקרשת])\.\s*([^אבגדהוזחטיכלמנסעפצקרשת]+?)(?=(?:\s[אבגדהוזחטיכלמנסעפצקרשת]\.\s)|$)/g)];
  return Array.from(new Set(matches.map((match) => `${match[1]}. ${match[2].trim()}`).filter((item) => item.length < 150))).slice(0, 18);
}

function ChoicePractice({ exercise, onDone }: { exercise: SourceExercise; onDone: () => void }) {
  const options = useMemo(() => shuffle(optionTokens(exercise.prompt), exercise.id), [exercise]);
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  if (options.length < 2) return <OpenPractice exercise={exercise} onDone={onDone} />;
  return (
    <>
      <p className="source-prompt" dir="auto">{exercise.prompt.replace(/(?:^|\s)[אבגדהוזחטיכלמנסעפצקרשת]\.\s*[^אבגדהוזחטיכלמנסעפצקרשת]+?(?=(?:\s[אבגדהוזחטיכלמנסעפצקרשת]\.\s)|$)/g, " ")}</p>
      <div className="source-choice-grid">
        {options.map((option) => <button className={selected.includes(option) ? "selected" : ""} disabled={checked} key={option} onClick={() => setSelected((current) => current.includes(option) ? current.filter((item) => item !== option) : [...current, option])}>{option}</button>)}
      </div>
      <PracticeFeedback exercise={exercise} checked={checked} correct={false} disabled={!selected.length} neutral onCheck={() => { setChecked(true); onDone(); }} onRetry={() => setChecked(false)} />
    </>
  );
}

function orderTokens(prompt: string) {
  const arrow = prompt.split("→")[0];
  const slash = arrow.split("/").map((item) => item.trim()).filter((item) => item.length > 1 && item.length < 100);
  return slash.length >= 3 ? slash.slice(-10) : [];
}

function OrderingPractice({ exercise, onDone }: { exercise: SourceExercise; onDone: () => void }) {
  const source = useMemo(() => orderTokens(exercise.prompt), [exercise]);
  const [items, setItems] = useState(() => shuffle(source, exercise.id));
  const [checked, setChecked] = useState(false);
  if (source.length < 3) return <OpenPractice exercise={exercise} onDone={onDone} />;
  function move(from: number, to: number) {
    if (to < 0 || to >= items.length || checked) return;
    setItems((current) => { const next = [...current]; const [item] = next.splice(from, 1); next.splice(to, 0, item); return next; });
  }
  return (
    <>
      <p className="source-prompt">סדרו את הכרטיסים. המיקום ההתחלתי משתנה בכל תרגיל.</p>
      <div className="source-order-list">
        {items.map((item, index) => <div draggable={!checked} onDragStart={(event) => event.dataTransfer.setData("text/plain", String(index))} onDragOver={(event) => event.preventDefault()} onDrop={(event) => move(Number(event.dataTransfer.getData("text/plain")), index)} key={`${item}-${index}`}><span>⠿</span><b dir="auto">{item}</b><button onClick={() => move(index, index - 1)} disabled={index === 0 || checked}>↑</button><button onClick={() => move(index, index + 1)} disabled={index === items.length - 1 || checked}>↓</button></div>)}
      </div>
      <PracticeFeedback exercise={exercise} checked={checked} correct={false} disabled={false} neutral onCheck={() => { setChecked(true); onDone(); }} onRetry={() => setChecked(false)} />
    </>
  );
}

function MatchingPractice({ exercise, onDone }: { exercise: SourceExercise; onDone: () => void }) {
  const raw = useMemo(() => optionTokens(exercise.prompt), [exercise]);
  const right = useMemo(() => shuffle(raw, `${exercise.id}-right`), [exercise.id, raw]);
  const left = useMemo(() => {
    const beforeOptions = exercise.prompt.split(/\sא\.\s/)[0];
    return beforeOptions.split("/").map((item) => item.trim()).filter((item) => /[A-Za-zÁ-ÿ¿¡]/.test(item) && item.length < 80).slice(-Math.min(10, right.length));
  }, [exercise.prompt, right.length]);
  const [active, setActive] = useState<number | null>(null);
  const [pairs, setPairs] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  if (left.length < 2 || right.length < 2) return <OpenPractice exercise={exercise} onDone={onDone} />;

  function connect(index: number, value: string) {
    setPairs((current) => ({ ...current, [index]: value }));
    setActive(null);
  }
  function drop(event: DragEvent<HTMLButtonElement>, value: string) {
    const index = Number(event.dataTransfer.getData("text/plain"));
    if (Number.isFinite(index)) connect(index, value);
  }
  return (
    <>
      <p className="source-prompt">גררו או בחרו כרטיס משמאל ואז התאמה מימין.</p>
      <div className="source-matching-board">
        <div>{left.map((item, index) => <button draggable={!checked} onDragStart={(event) => event.dataTransfer.setData("text/plain", String(index))} onClick={() => setActive(index)} className={active === index ? "selected" : ""} disabled={checked} key={`${item}-${index}`} dir="auto">{item}<small>{pairs[index] || "בחרו התאמה"}</small></button>)}</div>
        <div>{right.map((item) => <button onDragOver={(event) => event.preventDefault()} onDrop={(event) => drop(event, item)} onClick={() => active !== null && connect(active, item)} disabled={checked} key={item}>{item}</button>)}</div>
      </div>
      <PracticeFeedback exercise={exercise} checked={checked} correct={false} disabled={Object.keys(pairs).length < left.length} neutral onCheck={() => { setChecked(true); onDone(); }} onRetry={() => setChecked(false)} />
    </>
  );
}

function OpenPractice({ exercise, onDone }: { exercise: SourceExercise; onDone: () => void }) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const official = normalize(exercise.answer);
  const correct = Boolean(official && value.trim() && official.includes(normalize(value)));
  return (
    <>
      <p className="source-prompt" dir="auto">{exercise.prompt}</p>
      <textarea className="source-answer-area" value={value} disabled={checked} onChange={(event) => setValue(event.target.value)} placeholder="כתבו את התשובה כאן..." dir="auto" />
      <PracticeFeedback exercise={exercise} checked={checked} correct={correct} neutral={!exercise.answer} disabled={!value.trim()} onCheck={() => { setChecked(true); onDone(); }} onRetry={() => setChecked(false)} />
    </>
  );
}

function SpeakingPractice({ exercise, onDone }: { exercise: SourceExercise; onDone: () => void }) {
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [audio, setAudio] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  async function toggle() {
    if (recording && recorder.current) { recorder.current.stop(); setRecording(false); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const next = new MediaRecorder(stream);
      chunks.current = [];
      next.ondataavailable = (event) => chunks.current.push(event.data);
      next.onstop = () => { setAudio(URL.createObjectURL(new Blob(chunks.current, { type: next.mimeType }))); stream.getTracks().forEach((track) => track.stop()); onDone(); };
      next.start(); recorder.current = next; setRecording(true); setMessage("");
    } catch { setMessage("לא ניתן לפתוח את המיקרופון. אפשר לקרוא בקול ולסמן שסיימתם."); }
  }
  return (
    <div className="speaking-practice">
      <p className="source-prompt" dir="auto">{exercise.prompt}</p>
      <button className={recording ? "recording" : ""} onClick={toggle}>{recording ? "עצירת הקלטה" : "התחלת הקלטה"}</button>
      {audio && <audio controls src={audio} />}
      {message && <p>{message}</p>}
      {!audio && !recording && <button className="text-complete" onClick={onDone}>קראתי בקול וסיימתי</button>}
    </div>
  );
}

function PracticeFeedback({ exercise, checked, correct, neutral = false, disabled, onCheck, onRetry }: { exercise: SourceExercise; checked: boolean; correct: boolean; neutral?: boolean; disabled: boolean; onCheck: () => void; onRetry: () => void }) {
  if (!checked) return <div className="source-action"><span>אפשר לערוך לפני הבדיקה</span><button disabled={disabled} onClick={onCheck}>בדיקת תשובה</button></div>;
  return (
    <div className={`source-feedback ${neutral ? "neutral" : correct ? "correct" : "review"}`}>
      <div><b>{neutral ? "השוו לפתרון" : correct ? "¡Excelente! תשובה נכונה" : "כדאי לבדוק שוב"}</b><p>{exercise.answer || "זו משימה פתוחה. עברו על ההנחיות ובדקו שהשלמתם את כל החלקים."}</p></div>
      <button onClick={onRetry}>עריכה נוספת</button>
    </div>
  );
}

function SourceExerciseCard({ exercise, done, onDone }: { exercise: SourceExercise; done: boolean; onDone: () => void }) {
  let body;
  if (exercise.kind === "blanks") body = <InlineBlanks exercise={exercise} onDone={onDone} />;
  else if (exercise.kind === "choice" || exercise.kind === "truefalse") body = <ChoicePractice exercise={exercise} onDone={onDone} />;
  else if (exercise.kind === "ordering") body = <OrderingPractice exercise={exercise} onDone={onDone} />;
  else if (exercise.kind === "matching" || exercise.kind === "sorting") body = <MatchingPractice exercise={exercise} onDone={onDone} />;
  else if (exercise.kind === "speaking") body = <SpeakingPractice exercise={exercise} onDone={onDone} />;
  else body = <OpenPractice exercise={exercise} onDone={onDone} />;
  return <article className={`source-exercise-card ${done ? "done" : ""}`}><header><div><span>תרגיל {exercise.number}</span><h2>{exercise.title}</h2></div><b>{done ? "✓ הושלם" : typeLabels[exercise.kind]}</b></header>{body}</article>;
}

function ReadingBlock({ block }: { block: ContentBlock }) {
  if (block.type === "table") return <div className="reader-table-wrap"><table className="reader-table"><tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
  if (block.level > 0) return <h3>{block.text}</h3>;
  return <p dir="auto">{block.text}</p>;
}

export default function SourceWorkbook() {
  const sections = content.workbookSections.filter((section) => section.title !== "חלק ב: חוברת תרגול");
  const [sectionIndex, setSectionIndex] = useState(1);
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => {
    const restore = window.requestAnimationFrame(() => {
      try { setDone(JSON.parse(localStorage.getItem("moshik-source-progress") || "[]")); } catch { /* optional */ }
    });
    return () => window.cancelAnimationFrame(restore);
  }, []);
  const current = sections[sectionIndex] || sections[0];
  const nearbyChapter = current.number
    ?? sections.slice(sectionIndex).find((section) => section.number)?.number
    ?? [...sections.slice(0, sectionIndex)].reverse().find((section) => section.number)?.number
    ?? 1;
  const currentUnit = unitForChapter(nearbyChapter);
  const exercises = current.exercises || [];
  function complete(id: string) { setDone((currentDone) => { const next = currentDone.includes(id) ? currentDone : [...currentDone, id]; localStorage.setItem("moshik-source-progress", JSON.stringify(next)); return next; }); }
  function open(index: number) { setSectionIndex(index); window.scrollTo({ top: 0, behavior: "smooth" }); }
  return (
    <div className="source-workbook-shell">
      <aside className="source-module-nav">
        <div><span>החוברת המלאה</span><b>{content.meta.exerciseCount} משימות מקור</b></div>
        <nav>{sections.map((section, index) => <button className={index === sectionIndex ? "active" : ""} onClick={() => open(index)} key={section.id}><span>{section.number ?? "•"}</span><b>{section.title}</b><small>{(section.exercises || []).filter((exercise) => done.includes(exercise.id)).length}/{(section.exercises || []).length}</small></button>)}</nav>
      </aside>
      <section className="source-module-content">
        <header className="source-module-heading"><img src={currentUnit.image} alt="" /><div><span>{current.kind === "story" ? "סיפור וקריאה" : current.kind === "mini" ? "מיני־יחידה" : current.number ? `פרק ${current.number}` : "חוברת המקור"}</span><small>{currentUnit.spanish}</small><h1>{current.title}</h1><p>{exercises.length ? `${exercises.length} משימות מסוגים שונים, עם פתרונות ומשוב.` : "כל הטקסט והמשימות מהחוברת המקורית."}</p></div></header>
        {exercises.length ? exercises.map((exercise) => <SourceExerciseCard exercise={exercise} done={done.includes(exercise.id)} onDone={() => complete(exercise.id)} key={exercise.id} />) : <article className="source-reading-card">{current.blocks.slice(1).map((block, index) => <ReadingBlock block={block} key={index} />)}</article>}
        <footer className="source-pagination"><button disabled={sectionIndex === 0} onClick={() => open(sectionIndex - 1)}>היחידה הקודמת</button><span>{sectionIndex + 1} מתוך {sections.length}</span><button disabled={sectionIndex === sections.length - 1} onClick={() => open(sectionIndex + 1)}>היחידה הבאה</button></footer>
      </section>
    </div>
  );
}
