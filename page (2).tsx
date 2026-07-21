"use client";

import { DragEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { chapterSeeds, type ChapterSeed } from "../chapter-data";
import { unitForChapter } from "../content";

type Pair = { id: string; left: string; right: string };
type BlankItem = {
  prompt: string;
  answer: string;
  accepted?: string[];
  note?: string;
};
type ChoiceQuestion = {
  prompt: string;
  options: string[];
  answer: string;
};

type Exercise = {
  id: string;
  section: string;
  number: number;
  title: string;
  instruction: string;
  kind: "blanks" | "matching" | "choice" | "order" | "memory" | "visual-choice" | "dialogue" | "sentence" | "error" | "timeline";
  explanation: string;
  items?: BlankItem[];
  pairs?: Pair[];
  questions?: ChoiceQuestion[];
  order?: string[];
};

const chapterOneExercises: Exercise[] = [
  {
    id: "silent-h",
    section: "אותיות וצלילים",
    number: 1,
    title: "האות H לא נשמעת",
    instruction: "כתבו את התעתיק העברי ישירות בתוך כל מילה.",
    kind: "blanks",
    explanation: "בספרדית האות H אינה נשמעת. לכן hola מתחילה בצליל א, לא בצליל ה.",
    items: [
      { prompt: "hola", answer: "אולה" },
      { prompt: "hotel", answer: "אוטל" },
      { prompt: "hombre", answer: "אומברה" },
      { prompt: "historia", answer: "איסטוריה" },
    ],
  },
  {
    id: "sound-j",
    section: "אותיות וצלילים",
    number: 2,
    title: "J נשמעת כמו ח",
    instruction: "גררו כל מילה אל התעתיק שלה. בטלפון אפשר לבחור מילה ואז לבחור התאמה.",
    kind: "matching",
    explanation: "ברוב סוגי הספרדית האות J נהגית כמו ח חזקה בעברית.",
    pairs: [
      { id: "jose", left: "José", right: "חוֹסֶה" },
      { id: "jugar", left: "jugar", right: "חוּגָאר" },
      { id: "joven", left: "joven", right: "חוֹבֶן" },
      { id: "trabajo", left: "trabajo", right: "טְרָבָּחוֹ" },
    ],
  },
  {
    id: "sound-enye",
    section: "אותיות וצלילים",
    number: 3,
    title: "איך קוראים Ñ?",
    instruction: "בחרו את הקריאה הנכונה לכל מילה.",
    kind: "choice",
    explanation: "האות Ñ נשמעת כמו ני. למשל, niño נקראת ניניו.",
    questions: [
      { prompt: "España", options: ["אספנה", "אספניה"], answer: "אספניה" },
      { prompt: "niño", options: ["נינו", "ניניו"], answer: "ניניו" },
      { prompt: "mañana", options: ["מאנאנה", "מניאנה"], answer: "מניאנה" },
    ],
  },
  {
    id: "sound-c",
    section: "אותיות וצלילים",
    number: 4,
    title: "הצליל של C",
    instruction: "השלימו ק או ס בתוך השורה, בדיוק במקום החסר.",
    kind: "blanks",
    explanation: "לפני a, o, u האות C נשמעת ק. לפני e, i היא נשמעת ס בספרדית של אמריקה הלטינית.",
    items: [
      { prompt: "casa", answer: "ק" },
      { prompt: "comida", answer: "ק" },
      { prompt: "cena", answer: "ס" },
      { prompt: "cinco", answer: "ס" },
      { prompt: "cuatro", answer: "ק" },
    ],
  },
  {
    id: "sound-g",
    section: "אותיות וצלילים",
    number: 5,
    title: "הצליל של G",
    instruction: "השלימו ג או ח בתוך כל מילה.",
    kind: "blanks",
    explanation: "לפני a, o, u האות G נשמעת ג. לפני e, i היא נשמעת ח.",
    items: [
      { prompt: "gato", answer: "ג" },
      { prompt: "gusto", answer: "ג" },
      { prompt: "gente", answer: "ח" },
      { prompt: "Argentina", answer: "ח" },
    ],
  },
  {
    id: "sound-q",
    section: "אותיות וצלילים",
    number: 6,
    title: "Q וה-U השקטה",
    instruction: "כתבו את התעתיק ישירות לצד המילה.",
    kind: "blanks",
    explanation: "בצירופים que ו-qui לא שומעים את ה-U. queso מתחילה בצליל קֶה.",
    items: [
      { prompt: "queso", answer: "קסו", accepted: ["קֶסוֹ"] },
      { prompt: "quiero", answer: "קיירו", accepted: ["קירו", "קְיֶרוֹ"] },
      { prompt: "quién", answer: "קיין", accepted: ["קין", "קְיֶן"] },
    ],
  },
  {
    id: "first-words",
    section: "מילים ראשונות",
    number: 7,
    title: "מילים שימושיות ראשונות",
    instruction: "התאימו בין הספרדית לעברית באמצעות גרירה או הקשה.",
    kind: "matching",
    explanation: "אלה מילות בסיס שיופיעו שוב ושוב בפרקים הבאים.",
    pairs: [
      { id: "hola", left: "hola", right: "שלום" },
      { id: "amigo", left: "amigo", right: "חבר" },
      { id: "casa", left: "casa", right: "בית" },
      { id: "agua", left: "agua", right: "מים" },
      { id: "familia", left: "familia", right: "משפחה" },
      { id: "libro", left: "libro", right: "ספר" },
      { id: "gracias", left: "gracias", right: "תודה" },
      { id: "quiero", left: "quiero", right: "אני רוצה" },
    ],
  },
  {
    id: "survival-phrases",
    section: "משפטי הישרדות",
    number: 8,
    title: "משפטים שמצילים שיחה",
    instruction: "חברו כל ביטוי בספרדית למשמעות שלו.",
    kind: "matching",
    explanation: "כדאי לזהות את המשפטים האלה מיד, בלי לתרגם כל מילה בנפרד.",
    pairs: [
      { id: "hi", left: "Hola", right: "שלום" },
      { id: "thanks", left: "Gracias", right: "תודה" },
      { id: "please", left: "Por favor", right: "בבקשה" },
      { id: "understand", left: "No entiendo", right: "אני לא מבין" },
      { id: "later", left: "Hasta luego", right: "נתראה אחר כך" },
      { id: "sorry", left: "Perdón", right: "סליחה" },
      { id: "welcome", left: "De nada", right: "אין בעד מה" },
    ],
  },
  {
    id: "right-phrase",
    section: "משפטי הישרדות",
    number: 9,
    title: "מה אומרים עכשיו?",
    instruction: "בחרו את המשפט הטבעי ביותר בכל מצב.",
    kind: "choice",
    explanation: "בחרו לפי המטרה של הדובר: להודות, לבקש, או להסביר שלא הבנתם.",
    questions: [
      { prompt: "רוצים להגיד תודה", options: ["Gracias", "No entiendo"], answer: "Gracias" },
      { prompt: "לא מבינים", options: ["No entiendo", "Hasta luego"], answer: "No entiendo" },
      { prompt: "רוצים שמישהו יחזור", options: ["¿Puedes repetir?", "Soy de Israel"], answer: "¿Puedes repetir?" },
      { prompt: "רוצים לבקש בנימוס", options: ["Por favor", "Muy bien"], answer: "Por favor" },
    ],
  },
  {
    id: "dialogue-order",
    section: "דיאלוג קצר",
    number: 10,
    title: "בנו את הדיאלוג",
    instruction: "גררו את המשפטים לסדר הגיוני. אפשר גם להשתמש בחצים.",
    kind: "order",
    explanation: "השיחה מתחילה בברכה, ממשיכה בבקשת הבהרה, ומסתיימת בתודה ובתגובה.",
    order: [
      "Hola.",
      "No entiendo. ¿Puedes repetir?",
      "Sí, claro.",
      "Gracias.",
      "De nada.",
    ],
  },
];

type Chapter = {
  number: number;
  title: string;
  subtitle: string;
  exercises: Exercise[];
};

function hashSeed(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededShuffle<T>(items: T[], seed: string) {
  const next = [...items];
  let state = hashSeed(seed) || 1;
  for (let index = next.length - 1; index > 0; index -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const target = state % (index + 1);
    [next[index], next[target]] = [next[target], next[index]];
  }
  if (next.length > 1 && next.every((item, index) => item === items[index])) {
    next.push(next.shift() as T);
  }
  return next;
}

function buildPairs(entries: { left: string; right: string }[], prefix: string): Pair[] {
  return entries.map((entry, index) => ({ id: `${prefix}-${index + 1}`, ...entry }));
}

function vocabularyQuestions(seed: ChapterSeed, start = 0, count = 4): ChoiceQuestion[] {
  const entries = seed.vocabulary.slice(start, start + count);
  const allAnswers = seed.vocabulary.map((entry) => entry.right);
  return entries.map((entry, index) => ({
    prompt: `מה המשמעות של ${entry.left}?`,
    answer: entry.right,
    options: [entry.right, ...allAnswers.filter((answer) => answer !== entry.right)].slice(0, 3 + (index % 2)),
  }));
}

function grammarQuestions(seed: ChapterSeed): ChoiceQuestion[] {
  const answers = Array.from(new Set(seed.blanks.map((item) => item.answer)));
  return seed.blanks.slice(0, 4).map((item) => ({
    prompt: item.prompt,
    answer: item.answer,
    options: [item.answer, ...answers.filter((answer) => answer !== item.answer)].slice(0, Math.min(4, answers.length)),
  }));
}

function buildChapterExercises(seed: ChapterSeed): Exercise[] {
  const prefix = `chapter-${seed.number}`;
  const reverseVocabulary = seed.vocabulary.map((entry) => ({ left: entry.right, right: entry.left }));
  return [
    {
      id: `${prefix}-1`, section: "אוצר מילים", number: 1, title: "חברו בין המילים",
      instruction: "גררו כל כרטיס אל המשמעות המתאימה. בטלפון אפשר להתאים באמצעות שתי הקשות.",
      kind: "matching", explanation: seed.explanation, pairs: buildPairs(seed.vocabulary, `${prefix}-vocab`),
    },
    {
      id: `${prefix}-2`, section: "אוצר מילים", number: 2, title: "בחרו את המשמעות",
      instruction: "בחרו את המשמעות הנכונה. מיקום התשובות משתנה ואינו מרמז על הפתרון.",
      kind: "visual-choice", explanation: seed.explanation, questions: vocabularyQuestions(seed),
    },
    {
      id: `${prefix}-3`, section: "תרגול מודרך", number: 3, title: "התאימו את המבנה",
      instruction: "חברו בין כל רמז לצורה הספרדית המתאימה.",
      kind: "memory", explanation: seed.explanation, pairs: buildPairs(seed.grammar, `${prefix}-grammar`),
    },
    {
      id: `${prefix}-4`, section: "תרגול מודרך", number: 4, title: "השלימו במקום החסר",
      instruction: "כתבו את התשובה בדיוק בתוך הקו החסר.",
      kind: "blanks", explanation: seed.explanation, items: seed.blanks.slice(0, 3),
    },
    {
      id: `${prefix}-5`, section: "תרגול מודרך", number: 5, title: "בחרו לפי ההקשר",
      instruction: "קראו כל מצב ובחרו את האפשרות הטבעית והנכונה.",
      kind: "dialogue", explanation: seed.explanation, questions: seed.choices.slice(0, 2),
    },
    {
      id: `${prefix}-6`, section: "שימוש בהקשר", number: 6, title: "מהעברית לספרדית",
      instruction: "התאימו את המשמעות בעברית לביטוי בספרדית.",
      kind: "matching", explanation: seed.explanation, pairs: buildPairs(reverseVocabulary, `${prefix}-reverse`),
    },
    {
      id: `${prefix}-7`, section: "שימוש בהקשר", number: 7, title: "השלמה עצמאית",
      instruction: "השלימו כל משפט ישירות במקום החסר.",
      kind: "sentence", explanation: seed.explanation, items: seed.blanks.slice(3),
    },
    {
      id: `${prefix}-8`, section: "שימוש בהקשר", number: 8, title: "בדיקת דקדוק",
      instruction: "בחרו את הצורה שמשלימה כל משפט. סדר האפשרויות עורבב.",
      kind: "error", explanation: seed.explanation, questions: grammarQuestions(seed),
    },
    {
      id: `${prefix}-9`, section: "בדיקת שליטה", number: 9, title: "סדרו את הרצף",
      instruction: "גררו את השורות לרצף הגיוני. אפשר גם להשתמש בחצים.",
      kind: "timeline", explanation: seed.explanation, order: seed.order,
    },
    {
      id: `${prefix}-10`, section: "בדיקת שליטה", number: 10, title: "אתגר סיום הפרק",
      instruction: "ענו בלי להסתמך על מיקום האפשרות. כל התשובות מסודרות מחדש.",
      kind: "choice", explanation: seed.explanation,
      questions: [...seed.choices.slice(2), ...vocabularyQuestions(seed, 4, 2)],
    },
  ];
}

const chapters: Chapter[] = [
  {
    number: 1,
    title: "מתחילים עם ספרדית",
    subtitle: "אותיות, מילים ראשונות ומשפטים שימושיים.",
    exercises: chapterOneExercises,
  },
  ...chapterSeeds.map((seed) => ({
    number: seed.number,
    title: seed.title,
    subtitle: seed.subtitle,
    exercises: buildChapterExercises(seed),
  })),
];

function stripMarks(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f\u0591-\u05c7]/g, "")
    .replace(/[.?!¿¡,]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase();
}

function isAccepted(value: string, item: BlankItem) {
  return [item.answer, ...(item.accepted ?? [])].some(
    (answer) => stripMarks(answer) === stripMarks(value),
  );
}

function Feedback({
  checked,
  correct,
  score,
  total,
  explanation,
  onCheck,
  onRetry,
  onContinue,
  disabled,
}: {
  checked: boolean;
  correct: boolean;
  score: number;
  total: number;
  explanation: string;
  onCheck: () => void;
  onRetry: () => void;
  onContinue: () => void;
  disabled: boolean;
}) {
  if (!checked) {
    return (
      <div className="action-bar">
        <span className="action-hint">אפשר לשנות את התשובות עד הבדיקה</span>
        <button className="primary-button" onClick={onCheck} disabled={disabled}>
          בדיקת תשובה
        </button>
      </div>
    );
  }

  return (
    <div className={`feedback-panel ${correct ? "is-correct" : "is-wrong"}`} role="status">
      <div className="feedback-copy">
        <span className="feedback-icon" aria-hidden="true">{correct ? "✓" : "!"}</span>
        <div>
          <strong>{correct ? "¡Excelente! הכול נכון" : `${score} מתוך ${total} נכונים`}</strong>
          <p>{correct ? "אפשר להתקדם לתרגיל הבא." : explanation}</p>
        </div>
      </div>
      <button className={correct ? "primary-button" : "secondary-button"} onClick={correct ? onContinue : onRetry}>
        {correct ? "המשך" : "נסו שוב"}
      </button>
    </div>
  );
}

function InlineBlanks({ exercise, onComplete }: { exercise: Exercise; onComplete: () => void }) {
  const items = exercise.items ?? [];
  const [values, setValues] = useState<string[]>(() => items.map(() => ""));
  const [checked, setChecked] = useState(false);
  const results = values.map((value, index) => isAccepted(value, items[index]));
  const score = results.filter(Boolean).length;

  return (
    <>
      <div className={`blank-grid ${exercise.kind === "sentence" ? "sentence-builder-grid" : ""}`}>
        {items.map((item, index) => {
          const hasInlineSlot = item.prompt.includes("___");
          const [before, after = ""] = item.prompt.split("___");
          const answerInput = (
            <input
              aria-label={`תשובה עבור ${item.prompt}`}
              dir="auto"
              value={values[index]}
              disabled={checked}
              onChange={(event) => {
                const next = [...values];
                next[index] = event.target.value;
                setValues(next);
              }}
              placeholder="הקלידו"
              autoComplete="off"
            />
          );

          return (
            <label
              className={`inline-row ${hasInlineSlot ? "sentence-row" : ""} ${checked ? (results[index] ? "answer-correct" : "answer-wrong") : ""}`}
              key={`${item.prompt}-${index}`}
            >
              {hasInlineSlot ? (
                <span className="sentence-flow" dir="ltr">
                  <span>{before}</span>
                  {answerInput}
                  <span>{after}</span>
                </span>
              ) : (
                <>
                  <span className="spanish-word" dir="ltr">{item.prompt}</span>
                  <span className="equals">=</span>
                  {answerInput}
                </>
              )}
              {checked && <span className="result-mark" aria-label={results[index] ? "נכון" : "לא נכון"}>{results[index] ? "✓" : "×"}</span>}
            </label>
          );
        })}
      </div>
      <Feedback
        checked={checked}
        correct={score === items.length}
        score={score}
        total={items.length}
        explanation={exercise.explanation}
        disabled={values.some((value) => !value.trim())}
        onCheck={() => setChecked(true)}
        onRetry={() => setChecked(false)}
        onContinue={onComplete}
      />
    </>
  );
}

function Matching({ exercise, onComplete }: { exercise: Exercise; onComplete: () => void }) {
  const pairs = useMemo(() => exercise.pairs ?? [], [exercise.pairs]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const rightOptions = useMemo(() => seededShuffle(pairs, `${exercise.id}-matching-options`), [exercise.id, pairs]);
  const score = pairs.filter((pair) => matches[pair.id] === pair.right).length;

  function connect(leftId: string, right: string) {
    if (checked) return;
    setMatches((current) => {
      const next = { ...current };
      for (const key of Object.keys(next)) {
        if (next[key] === right) delete next[key];
      }
      next[leftId] = right;
      return next;
    });
    setSelected(null);
  }

  function onDrop(event: DragEvent<HTMLButtonElement>, right: string) {
    event.preventDefault();
    const leftId = event.dataTransfer.getData("text/plain");
    if (leftId) connect(leftId, right);
  }

  return (
    <>
      <div className="matching-board">
        <div className="match-column" aria-label="קבוצה ראשונה">
          <span className="column-label">קבוצה א</span>
          {pairs.map((pair) => {
            const isRight = checked && matches[pair.id] === pair.right;
            const isWrong = checked && matches[pair.id] && !isRight;
            return (
              <button
                key={pair.id}
                className={`match-card spanish ${selected === pair.id ? "selected" : ""} ${isRight ? "answer-correct" : ""} ${isWrong ? "answer-wrong" : ""}`}
                draggable={!checked}
                onDragStart={(event) => event.dataTransfer.setData("text/plain", pair.id)}
                onClick={() => !checked && setSelected(selected === pair.id ? null : pair.id)}
                dir="auto"
              >
                {pair.left}
                {matches[pair.id] && <span className="pair-dot" aria-label="הותאם" />}
              </button>
            );
          })}
        </div>

        <div className="match-rail" aria-hidden="true"><span /></div>

        <div className="match-column" aria-label="קבוצה שנייה">
          <span className="column-label">קבוצה ב</span>
          {rightOptions.map((pair) => {
            const linkedId = Object.keys(matches).find((key) => matches[key] === pair.right);
            const linkedPair = pairs.find((item) => item.id === linkedId);
            const isRight = checked && linkedPair?.right === pair.right && linkedPair?.id === pair.id;
            const isWrong = checked && Boolean(linkedId) && !isRight;
            return (
              <button
                key={pair.right}
                className={`match-card ${linkedId ? "paired" : ""} ${isRight ? "answer-correct" : ""} ${isWrong ? "answer-wrong" : ""}`}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => onDrop(event, pair.right)}
                onClick={() => selected && connect(selected, pair.right)}
                disabled={checked}
              >
                {pair.right}
                {linkedId && <span className="linked-word" dir="auto">{linkedPair?.left}</span>}
              </button>
            );
          })}
        </div>
      </div>
      <Feedback
        checked={checked}
        correct={score === pairs.length}
        score={score}
        total={pairs.length}
        explanation={exercise.explanation}
        disabled={Object.keys(matches).length !== pairs.length}
        onCheck={() => setChecked(true)}
        onRetry={() => setChecked(false)}
        onContinue={onComplete}
      />
    </>
  );
}

function MemoryMatch({ exercise, onComplete }: { exercise: Exercise; onComplete: () => void }) {
  const pairs = useMemo(() => exercise.pairs ?? [], [exercise.pairs]);
  const deck = useMemo(() => seededShuffle(pairs.flatMap((pair) => [
    { id: `${pair.id}-left`, pairId: pair.id, value: pair.left, side: "spanish" },
    { id: `${pair.id}-right`, pairId: pair.id, value: pair.right, side: "hebrew" },
  ]), `${exercise.id}-memory`), [exercise.id, pairs]);
  const [openCards, setOpenCards] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [locked, setLocked] = useState(false);

  function flip(card: (typeof deck)[number]) {
    if (locked || matched.includes(card.pairId) || openCards.includes(card.id)) return;
    if (!openCards.length) { setOpenCards([card.id]); return; }
    const first = deck.find((item) => item.id === openCards[0]);
    const nextOpen = [openCards[0], card.id];
    setOpenCards(nextOpen);
    if (first?.pairId === card.pairId && first.side !== card.side) {
      window.setTimeout(() => { setMatched((current) => [...current, card.pairId]); setOpenCards([]); }, 280);
    } else {
      setLocked(true);
      window.setTimeout(() => { setOpenCards([]); setLocked(false); }, 720);
    }
  }

  const complete = matched.length === pairs.length;
  return (
    <>
      <div className="memory-board">
        {deck.map((card) => {
          const visible = openCards.includes(card.id) || matched.includes(card.pairId);
          return <button className={`${visible ? "open" : ""} ${matched.includes(card.pairId) ? "matched" : ""}`} onClick={() => flip(card)} key={card.id} disabled={matched.includes(card.pairId)}><span>?</span><b dir="auto">{visible ? card.value : ""}</b></button>;
        })}
      </div>
      <div className={`memory-status ${complete ? "complete" : ""}`}><div><b>{complete ? "כל הזוגות נמצאו" : `${matched.length} מתוך ${pairs.length} זוגות`}</b><span>{complete ? "הזיכרון עבד. אפשר להתקדם." : "הפכו שני כרטיסים וחפשו את הקשר."}</span></div><button disabled={!complete} onClick={onComplete}>המשך</button></div>
    </>
  );
}

function MultipleChoice({ exercise, onComplete }: { exercise: Exercise; onComplete: () => void }) {
  const questions = useMemo(() => exercise.questions ?? [], [exercise.questions]);
  const optionSets = useMemo(
    () => questions.map((question, index) => seededShuffle(question.options, `${exercise.id}-question-${index}`)),
    [exercise.id, questions],
  );
  const [answers, setAnswers] = useState<string[]>(() => questions.map(() => ""));
  const [checked, setChecked] = useState(false);
  const results = answers.map((answer, index) => answer === questions[index].answer);
  const score = results.filter(Boolean).length;

  return (
    <>
      <div className={`choice-list choice-${exercise.kind}`}>
        {questions.map((question, questionIndex) => (
          <fieldset className="choice-question" key={`${question.prompt}-${questionIndex}`}>
            <legend>
              <span>{questionIndex + 1}</span>
              <b dir={/[A-Za-zÁ-ÿ¿¡]/.test(question.prompt) ? "ltr" : "rtl"}>{question.prompt}</b>
            </legend>
            <div className="choice-options">
              {optionSets[questionIndex].map((option) => {
                const chosen = answers[questionIndex] === option;
                const right = checked && option === question.answer;
                const wrong = checked && chosen && option !== question.answer;
                return (
                  <button
                    type="button"
                    key={option}
                    className={`choice-card ${chosen ? "selected" : ""} ${right ? "answer-correct" : ""} ${wrong ? "answer-wrong" : ""}`}
                    disabled={checked}
                    onClick={() => {
                      const next = [...answers];
                      next[questionIndex] = option;
                      setAnswers(next);
                    }}
                    dir={/[A-Za-zÁ-ÿ¿¡]/.test(option) ? "ltr" : "rtl"}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <Feedback
        checked={checked}
        correct={score === questions.length}
        score={score}
        total={questions.length}
        explanation={exercise.explanation}
        disabled={answers.some((answer) => !answer)}
        onCheck={() => setChecked(true)}
        onRetry={() => setChecked(false)}
        onContinue={onComplete}
      />
    </>
  );
}

function Ordering({ exercise, onComplete }: { exercise: Exercise; onComplete: () => void }) {
  const correctOrder = useMemo(() => exercise.order ?? [], [exercise.order]);
  const initial = useMemo(
    () => seededShuffle(correctOrder, `${exercise.id}-order-options`),
    [correctOrder, exercise.id],
  );
  const [items, setItems] = useState(initial);
  const [checked, setChecked] = useState(false);
  const score = items.filter((item, index) => item === correctOrder[index]).length;

  function move(from: number, to: number) {
    if (checked || to < 0 || to >= items.length) return;
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setItems(next);
  }

  return (
    <>
      <div className={`order-list order-${exercise.kind}`}>
        {items.map((item, index) => {
          const right = checked && item === correctOrder[index];
          return (
            <div
              key={item}
              className={`order-card ${right ? "answer-correct" : checked ? "answer-wrong" : ""}`}
              draggable={!checked}
              onDragStart={(event) => event.dataTransfer.setData("text/plain", String(index))}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => move(Number(event.dataTransfer.getData("text/plain")), index)}
            >
              <span className="drag-handle" aria-hidden="true">⠿</span>
              <span className="order-number">{index + 1}</span>
              <b dir="ltr">{item}</b>
              <span className="reorder-buttons">
                <button aria-label="הזז למעלה" disabled={checked || index === 0} onClick={() => move(index, index - 1)}>↑</button>
                <button aria-label="הזז למטה" disabled={checked || index === items.length - 1} onClick={() => move(index, index + 1)}>↓</button>
              </span>
            </div>
          );
        })}
      </div>
      <Feedback
        checked={checked}
        correct={score === correctOrder.length}
        score={score}
        total={correctOrder.length}
        explanation={exercise.explanation}
        disabled={false}
        onCheck={() => setChecked(true)}
        onRetry={() => setChecked(false)}
        onContinue={onComplete}
      />
    </>
  );
}

function ExerciseCard({ exercise, onComplete }: { exercise: Exercise; onComplete: () => void }) {
  let content: ReactNode;
  if (exercise.kind === "matching") content = <Matching exercise={exercise} onComplete={onComplete} />;
  else if (exercise.kind === "memory") content = <MemoryMatch exercise={exercise} onComplete={onComplete} />;
  else if (["choice", "visual-choice", "dialogue", "error"].includes(exercise.kind)) content = <MultipleChoice exercise={exercise} onComplete={onComplete} />;
  else if (["order", "timeline"].includes(exercise.kind)) content = <Ordering exercise={exercise} onComplete={onComplete} />;
  else content = <InlineBlanks exercise={exercise} onComplete={onComplete} />;

  return (
    <article className="exercise-card" key={exercise.id}>
      <header className="exercise-heading">
        <div>
          <span className="eyebrow">{exercise.section} · תרגיל {exercise.number}</span>
          <h1>{exercise.title}</h1>
          <p>{exercise.instruction}</p>
        </div>
        <span className={`exercise-type type-${exercise.kind}`}>
          {exercise.kind === "matching" ? "התאמה" : exercise.kind === "memory" ? "משחק זיכרון" : exercise.kind === "visual-choice" ? "בחירה חזותית" : exercise.kind === "dialogue" ? "תגובה בדיאלוג" : exercise.kind === "error" ? "בלש טעויות" : exercise.kind === "timeline" ? "ציר זמן" : exercise.kind === "choice" ? "בחירה" : exercise.kind === "order" ? "סידור" : exercise.kind === "sentence" ? "בניית משפט" : "השלמה"}
        </span>
      </header>
      {content}
    </article>
  );
}

export default function Home() {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const restoreProgress = window.requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem("moshik-workbook-progress");
        if (saved) setCompleted(JSON.parse(saved));
      } catch {
        // The workbook remains usable when browser storage is unavailable.
      }
    });
    return () => window.cancelAnimationFrame(restoreProgress);
  }, []);

  const currentChapter = chapters[chapterIndex];
  const currentUnit = unitForChapter(currentChapter.number);
  const currentExercises = currentChapter.exercises;
  const current = currentExercises[index];
  const sections = Array.from(new Set(currentExercises.map((exercise) => exercise.section)));
  const completedInChapter = currentExercises.filter((exercise) => completed.includes(exercise.id)).length;
  const progress = Math.round((completedInChapter / currentExercises.length) * 100);
  const allExerciseCount = chapters.reduce((total, chapter) => total + chapter.exercises.length, 0);
  const overallCompleted = chapters.reduce(
    (total, chapter) => total + chapter.exercises.filter((exercise) => completed.includes(exercise.id)).length,
    0,
  );

  function openChapter(nextChapterIndex: number) {
    if (nextChapterIndex < 0 || nextChapterIndex >= chapters.length) return;
    setChapterIndex(nextChapterIndex);
    setIndex(0);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function finishCurrent() {
    const exercise = currentExercises[index];
    if (!exercise) return;
    const nextCompleted = completed.includes(exercise.id) ? completed : [...completed, exercise.id];
    setCompleted(nextCompleted);
    try {
      window.localStorage.setItem("moshik-workbook-progress", JSON.stringify(nextCompleted));
    } catch {
      // Progress saving is an enhancement, never a blocker.
    }
    setIndex((current) => current + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="workbook-shell" dir="rtl">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">M</span>
          <div>
            <strong>ספרדית עם מושיק</strong>
            <span>חוברת תרגול אינטראקטיבית</span>
          </div>
        </div>
        <div className="top-progress" aria-label={`${progress}% מהפרק הושלמו`}>
          <div className="top-progress-copy"><span>התקדמות בפרק</span><b>{progress}%</b></div>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
        </div>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>
          תוכן הפרק
        </button>
      </header>

      <div className="learning-layout">
        <aside className={`chapter-panel ${menuOpen ? "open" : ""}`}>
          <button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="סגירת תפריט">×</button>
          <span className="chapter-kicker">פרק {currentChapter.number} מתוך {chapters.length}</span>
          <div className="chapter-panel-visual"><img src={currentUnit.image} alt="" /><span>יחידה {currentUnit.number}</span></div>
          <div className="chapter-switcher">
            <button disabled={chapterIndex === 0} onClick={() => openChapter(chapterIndex - 1)} aria-label="הפרק הקודם">→</button>
            <select
              className="chapter-select"
              aria-label="בחירת פרק"
              value={chapterIndex}
              onChange={(event) => openChapter(Number(event.target.value))}
            >
              {chapters.map((chapter, chapterPosition) => (
                <option value={chapterPosition} key={chapter.number}>פרק {chapter.number}: {chapter.title}</option>
              ))}
            </select>
            <button disabled={chapterIndex === chapters.length - 1} onClick={() => openChapter(chapterIndex + 1)} aria-label="הפרק הבא">←</button>
          </div>
          <h2>{currentChapter.title}</h2>
          <p>{currentChapter.subtitle}</p>
          <nav aria-label="תרגילי הפרק">
            {sections.map((section) => {
              const sectionExercises = currentExercises.filter((exercise) => exercise.section === section);
              const done = sectionExercises.filter((exercise) => completed.includes(exercise.id)).length;
              return (
                <div className="section-group" key={section}>
                  <div className="section-title"><b>{section}</b><span>{done}/{sectionExercises.length}</span></div>
                  <div className="exercise-dots">
                    {sectionExercises.map((exercise) => {
                      const exerciseIndex = currentExercises.findIndex((item) => item.id === exercise.id);
                      return (
                        <button
                          key={exercise.id}
                          className={`${exerciseIndex === index ? "active" : ""} ${completed.includes(exercise.id) ? "done" : ""}`}
                          aria-label={`מעבר לתרגיל ${exercise.number} בפרק ${currentChapter.number}`}
                          onClick={() => { setIndex(exerciseIndex); setMenuOpen(false); }}
                        >
                          {completed.includes(exercise.id) ? "✓" : exercise.number}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>
          <div className="tip-box">
            <span>הטיפ של מושיק</span>
            <p>טעיתם? זה מצוין. קראו את ההסבר, נסו שוב ורק אז המשיכו.</p>
          </div>
        </aside>

        <section className="learning-stage">
          {current ? (
            <>
              <div className="exercise-scene">
                <img src={currentUnit.image} alt="" />
                <div><span>UNIDAD {String(currentUnit.number).padStart(2, "0")}</span><b>{currentUnit.spanish}</b><small>{currentUnit.description}</small></div>
                <strong>{String(currentChapter.number).padStart(2, "0")}</strong>
              </div>
              <div className="stage-progress">
                <button disabled={index === 0} onClick={() => setIndex((value) => value - 1)} aria-label="התרגיל הקודם">→</button>
                <div className="step-track" aria-hidden="true">
                  {currentExercises.map((exercise, exerciseIndex) => (
                    <span key={exercise.id} className={`${exerciseIndex === index ? "current" : ""} ${completed.includes(exercise.id) ? "done" : ""}`} />
                  ))}
                </div>
                <span>{index + 1} מתוך {currentExercises.length}</span>
              </div>
              <ExerciseCard exercise={current} onComplete={finishCurrent} key={current.id} />
            </>
          ) : (
            <section className="completion-card">
              <span className="completion-badge">✓</span>
              <span className="eyebrow">פרק {currentChapter.number} הושלם</span>
              <h1>¡Muy bien!</h1>
              <p>
                {chapterIndex < chapters.length - 1
                  ? `סיימתם את ${currentChapter.title}. אפשר להמשיך לפרק הבא.`
                  : "סיימתם את כל פרקי חוברת התרגול האינטראקטיבית."}
              </p>
              <div className="completion-stats">
                <div><b>{overallCompleted}</b><span>תרגילים הושלמו</span></div>
                <div><b>{allExerciseCount}</b><span>תרגילים בחוברת</span></div>
              </div>
              <div className="completion-actions">
                {chapterIndex < chapters.length - 1 && (
                  <button className="primary-button" onClick={() => openChapter(chapterIndex + 1)}>
                    המשך לפרק {chapters[chapterIndex + 1].number}
                  </button>
                )}
                <button className="secondary-button" onClick={() => setIndex(0)}>תרגול נוסף בפרק</button>
              </div>
            </section>
          )}
        </section>
      </div>
    </main>
  );
}
