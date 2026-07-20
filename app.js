(() => {
  "use strict";

  const STORAGE_KEY = "spanish-with-moshik-workbook-v1";
  const app = document.getElementById("workbook-app");
  const kindLabels = {
    matching: "התאמה",
    choice: "בחירה",
    fill: "השלמה",
    correction: "תיקון טעויות",
    ordering: "סידור משפטים",
    reading: "הבנת הנקרא",
    open: "כתיבה אישית",
    practice: "תרגול"
  };

  let data = null;
  let activeUnit = 1;
  let activeLessonId = "chapter-01";
  let sidebarOpen = false;
  let saved = readSaved();
  const revealed = {};
  const hints = {};

  function readSaved() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
    } catch (_) {
      return {};
    }
  }

  function storeSaved() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch (_) {
      // The workbook still works for the current page if storage is blocked.
    }
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalize(value) {
    return String(value || "")
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim();
  }

  function bigrams(value) {
    const text = normalize(value).replace(/\s+/g, " ");
    if (text.length < 2) return [text];
    return Array.from({ length: text.length - 1 }, (_, index) => text.slice(index, index + 2));
  }

  function similarity(answer, model) {
    const a = normalize(answer);
    const b = normalize(model);
    if (!a || !b) return 0;
    if (a === b || (a.length > 8 && b.includes(a))) return 1;
    const aPairs = bigrams(a);
    const bPairs = [...bigrams(b)];
    let matches = 0;
    for (const pair of aPairs) {
      const index = bPairs.indexOf(pair);
      if (index >= 0) {
        matches += 1;
        bPairs.splice(index, 1);
      }
    }
    return (2 * matches) / Math.max(1, aPairs.length + bigrams(b).length);
  }

  function feedbackCopy(status) {
    if (status === "empty") return "כתבו תשובה לפני הבדיקה.";
    if (status === "correct") return "מצוין — התשובה תואמת לפתרון.";
    if (status === "partial") return "כמעט. חלקים רבים נכונים; בדקו סדר, כתיב או סעיף חסר.";
    if (status === "retry") return "עדיין יש פער מהפתרון. נסו שוב או פתחו את התשובה המודרכת.";
    if (status === "self") return "התשובה נשמרה. עברו על רשימת הבדיקה וסמנו כשהיא מוכנה.";
    return "";
  }

  function getLesson() {
    return data.lessons.find((item) => item.id === activeLessonId) || data.lessons[0];
  }

  function getExercise(id) {
    for (const lesson of data.lessons) {
      const exercise = lesson.exercises.find((item) => item.id === id);
      if (exercise) return exercise;
    }
    return null;
  }

  function completedCount(exercises) {
    return exercises.filter((exercise) => saved[exercise.id]?.completed).length;
  }

  function lessonLabel(lesson) {
    if (lesson.kind === "test") return "מבחן";
    if (lesson.kind !== "chapter") return "קריאה";
    return lesson.title.match(/פרק\s*\d+/)?.[0] || lesson.title;
  }

  function brand(subtitle) {
    return `<a class="brand" href="./index.html" aria-label="Spanish with Moshik — דף הבית">
      <span class="brand-mark">M</span>
      <span><strong>Spanish with Moshik</strong><small>${escapeHTML(subtitle)}</small></span>
    </a>`;
  }

  function renderUnit(unit) {
    const exercises = data.lessons.filter((item) => item.unit === unit.number).flatMap((item) => item.exercises);
    const percent = Math.round((completedCount(exercises) / Math.max(1, exercises.length)) * 100);
    return `<button data-action="select-unit" data-unit="${unit.number}" class="${activeUnit === unit.number ? "active" : ""}">
      <span>${String(unit.number).padStart(2, "0")}</span>
      <span><b>${escapeHTML(unit.title)}</b><small>${percent}% הושלם</small></span>
      <i style="--progress:${percent}%"></i>
    </button>`;
  }

  function renderExercise(exercise, index) {
    const response = saved[exercise.id] || { answer: "", completed: false, status: "idle" };
    const prompt = String(exercise.prompt || "").split("\n").filter(Boolean).map((line) => `<p>${escapeHTML(line)}</p>`).join("");
    const itemCount = String(exercise.model_answer || "").split(/·|\n/).filter((item) => item.trim()).length;
    const feedback = response.status !== "idle"
      ? `<div class="feedback feedback-${response.status}" role="status"><span aria-hidden="true">${response.status === "correct" ? "✓" : response.status === "partial" || response.status === "self" ? "◐" : "!"}</span><p>${feedbackCopy(response.status)}</p></div>`
      : "";
    const hint = hints[exercise.id]
      ? `<div class="hint-panel"><b>רמז</b><p>${exercise.model_answer ? `בפתרון יש בערך ${Math.max(1, itemCount)} חלקים. בדקו שלא דילגתם על אף סעיף.` : "חזרו למילות המפתח בהוראה ובדקו שכל חלק קיבל תשובה."}</p></div>`
      : "";
    const model = revealed[exercise.id]
      ? `<div class="model-answer"><div><span>פתרון והשוואה</span><small>ניסוחים מקבילים ונכונים מתקבלים גם הם.</small></div><p>${escapeHTML(exercise.model_answer || "זו משימה פתוחה. בדקו שעניתם לכל ההנחיות ושמרתם על מבנה משפט תקין.")}</p>${response.completed ? "" : `<button data-action="complete" data-id="${escapeHTML(exercise.id)}">השוויתי והבנתי ✓</button>`}</div>`
      : "";

    return `<article class="exercise-card ${response.completed ? "is-complete" : ""}" data-card-id="${escapeHTML(exercise.id)}">
      <header>
        <div class="exercise-number">${String(index + 1).padStart(2, "0")}</div>
        <div><span>${escapeHTML(kindLabels[exercise.kind] || "תרגול")}</span><h2>${escapeHTML(exercise.title)}</h2></div>
        ${response.completed ? '<div class="complete-badge">הושלם ✓</div>' : ""}
      </header>
      <div class="exercise-prompt">${prompt}</div>
      <label class="answer-box">
        <span>${exercise.is_open ? "התשובה שלכם" : "כתבו את התשובות לפי הסדר"}</span>
        <textarea data-answer-id="${escapeHTML(exercise.id)}" placeholder="${exercise.is_open ? "כתבו כאן בספרדית…" : "לדוגמה: 1. ... · 2. ... · 3. ..."}" rows="${exercise.is_open || exercise.kind === "reading" ? 6 : 4}" spellcheck="false">${escapeHTML(response.answer)}</textarea>
        <small data-count-id="${escapeHTML(exercise.id)}">${String(response.answer || "").length} תווים · נשמר אוטומטית</small>
      </label>
      ${feedback}${hint}${model}
      <footer class="exercise-actions">
        <button class="check-button" data-action="check" data-id="${escapeHTML(exercise.id)}">בדיקת תשובה</button>
        <button data-action="hint" data-id="${escapeHTML(exercise.id)}">${hints[exercise.id] ? "סגירת רמז" : "רמז"}</button>
        <button data-action="reveal" data-id="${escapeHTML(exercise.id)}">${revealed[exercise.id] ? "הסתרת פתרון" : "הצגת פתרון"}</button>
        <button class="reset-button" data-action="reset" data-id="${escapeHTML(exercise.id)}">איפוס</button>
      </footer>
    </article>`;
  }

  function render() {
    const lesson = getLesson();
    activeLessonId = lesson.id;
    activeUnit = lesson.unit;
    const unitLessons = data.lessons.filter((item) => item.unit === activeUnit);
    const allExercises = data.lessons.flatMap((item) => item.exercises);
    const overallPercent = Math.round((completedCount(allExercises) / Math.max(1, data.stats.exercises)) * 100);
    const lessonDone = completedCount(lesson.exercises);
    const lessonPercent = Math.round((lessonDone / Math.max(1, lesson.exercises.length)) * 100);

    app.className = "workbook-app";
    app.innerHTML = `<header class="workbook-header">
      ${brand("חוברת התרגול האינטראקטיבית")}
      <nav aria-label="מעבר בין חלקי האתר"><a href="./index.html">דף הבית</a><a href="./cover.html">ספר הלימוד</a><span class="current-product">חוברת התרגול</span></nav>
      <div class="overall-progress" aria-label="התקדמות כוללת ${overallPercent}%"><span><b>${overallPercent}%</b><small>התקדמות כוללת</small></span><div><i style="width:${overallPercent}%"></i></div></div>
      <button class="sidebar-toggle" data-action="toggle-sidebar" aria-expanded="${sidebarOpen}">יחידות</button>
    </header>
    <div class="workbook-shell">
      <aside class="workbook-sidebar ${sidebarOpen ? "is-open" : ""}">
        <div class="sidebar-heading"><p>חוברת תרגול A1</p><h2>בחרו יחידה</h2></div>
        <div class="unit-list">${data.units.map(renderUnit).join("")}</div>
        <div class="sidebar-tip"><span>טיפ</span><p>למדו קודם את הפרק המקביל בספר, ואז פתרו כאן בלי להציץ.</p></div>
      </aside>
      <section class="workbook-main">
        <div class="lesson-selector"><span>יחידה ${activeUnit}</span><div>${unitLessons.map((item) => `<button data-action="select-lesson" data-lesson="${escapeHTML(item.id)}" class="${item.id === activeLessonId ? "active" : ""}">${escapeHTML(lessonLabel(item))}<small>${completedCount(item.exercises)}/${item.exercises.length}</small></button>`).join("")}</div></div>
        <section class="lesson-hero"><div><p class="eyebrow">יחידה ${lesson.unit} · ${escapeHTML(lesson.unit_title)}</p><h1>${escapeHTML(lesson.title)}</h1><p>${lesson.exercises.length} פעילויות · התשובות נשמרות אוטומטית במכשיר הזה</p></div><div class="lesson-progress-ring" style="--lesson-progress:${lessonPercent * 3.6}deg"><span><b>${lessonPercent}%</b><small>${lessonDone}/${lesson.exercises.length}</small></span></div></section>
        ${lesson.intro.length ? `<section class="lesson-intro"><span>לפני שמתחילים</span>${lesson.intro.map((line) => `<p>${escapeHTML(line)}</p>`).join("")}</section>` : ""}
        <div class="exercise-list">${lesson.exercises.map(renderExercise).join("")}</div>
        <section class="lesson-complete-card"><div><span>סיום הפרק</span><h2>${lessonDone === lesson.exercises.length ? "הפרק הושלם — כל הכבוד!" : `נשארו עוד ${lesson.exercises.length - lessonDone} פעילויות`}</h2><p>אפשר לחזור לכל תשובה בכל שלב. ההתקדמות נשמרת בדפדפן הזה.</p></div><button data-action="next-lesson">לפרק הבא <span>←</span></button></section>
      </section>
    </div>`;
  }

  function checkAnswer(exercise) {
    const answer = String(saved[exercise.id]?.answer || "").trim();
    if (!answer) {
      saved[exercise.id] = { answer: "", completed: false, status: "empty" };
    } else if (exercise.is_open) {
      const enoughDetail = normalize(answer).split(" ").filter(Boolean).length >= 4;
      saved[exercise.id] = { answer, completed: saved[exercise.id]?.completed || false, status: enoughDetail ? "self" : "retry" };
    } else {
      const score = similarity(answer, exercise.model_answer);
      const status = score >= 0.66 ? "correct" : score >= 0.24 ? "partial" : "retry";
      saved[exercise.id] = { answer, completed: status === "correct" || saved[exercise.id]?.completed || false, status };
    }
    storeSaved();
    render();
  }

  app.addEventListener("input", (event) => {
    const textarea = event.target.closest("textarea[data-answer-id]");
    if (!textarea) return;
    const id = textarea.dataset.answerId;
    saved[id] = { answer: textarea.value, completed: saved[id]?.completed || false, status: "idle" };
    const counter = app.querySelector(`[data-count-id="${CSS.escape(id)}"]`);
    if (counter) counter.textContent = `${textarea.value.length} תווים · נשמר אוטומטית`;
    storeSaved();
  });

  app.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    const id = button.dataset.id;

    if (action === "toggle-sidebar") {
      sidebarOpen = !sidebarOpen;
      render();
      return;
    }
    if (action === "select-unit") {
      activeUnit = Number(button.dataset.unit);
      activeLessonId = data.lessons.find((item) => item.unit === activeUnit)?.id || activeLessonId;
      sidebarOpen = false;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (action === "select-lesson") {
      activeLessonId = button.dataset.lesson;
      sidebarOpen = false;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (action === "next-lesson") {
      const index = data.lessons.findIndex((item) => item.id === activeLessonId);
      if (data.lessons[index + 1]) {
        activeLessonId = data.lessons[index + 1].id;
        activeUnit = data.lessons[index + 1].unit;
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const exercise = getExercise(id);
    if (!exercise) return;
    if (action === "check") checkAnswer(exercise);
    if (action === "hint") { hints[id] = !hints[id]; render(); }
    if (action === "reveal") { revealed[id] = !revealed[id]; render(); }
    if (action === "complete") {
      saved[id] = { answer: saved[id]?.answer || "", completed: true, status: saved[id]?.status === "idle" || !saved[id]?.status ? "self" : saved[id].status };
      storeSaved();
      render();
    }
    if (action === "reset") {
      delete saved[id];
      revealed[id] = false;
      hints[id] = false;
      storeSaved();
      render();
    }
  });

  fetch("./workbook-data.json")
    .then((response) => {
      if (!response.ok) throw new Error("Workbook data could not be loaded");
      return response.json();
    })
    .then((workbook) => {
      data = workbook;
      activeLessonId = workbook.lessons[0]?.id || activeLessonId;
      activeUnit = workbook.lessons[0]?.unit || 1;
      render();
    })
    .catch(() => {
      app.className = "workbook-loading";
      app.innerHTML = `${brand("חוברת התרגול האינטראקטיבית")}<p>לא הצלחנו לטעון את החוברת. ודאו שכל קובצי ה־ZIP הועלו יחד ושמרו על שמות התיקיות.</p><a class="button button-primary" href="./index.html">חזרה לדף הבית</a>`;
    });
})();
