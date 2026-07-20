(() => {
  "use strict";

  const toast = document.querySelector(".toast");
  let toastTimer;
  let activeButton = null;
  let voices = [];

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  }

  function loadVoices() {
    if (!("speechSynthesis" in window)) return;
    voices = window.speechSynthesis.getVoices();
  }

  function spanishVoice() {
    const preferred = ["es-MX", "es-US", "es-ES", "es-AR", "es-CO"];
    for (const language of preferred) {
      const match = voices.find((voice) => voice.lang.toLowerCase() === language.toLowerCase());
      if (match) return match;
    }
    return voices.find((voice) => voice.lang.toLowerCase().startsWith("es")) || null;
  }

  function cleanSpeechText(element) {
    const copy = element.cloneNode(true);
    copy.querySelectorAll("button").forEach((button) => button.remove());
    let text = copy.textContent.replace(/\s+/g, " ").trim();
    if (text.includes("—")) text = text.split("—", 1)[0].trim();
    return text;
  }

  function resetAudio() {
    if (activeButton) {
      activeButton.classList.remove("is-playing");
      activeButton.setAttribute("aria-pressed", "false");
      activeButton = null;
    }
  }

  function speak(element, button) {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      showToast("הדפדפן הזה אינו תומך בהשמעת טקסט. נסו Chrome, Edge או Safari.");
      return;
    }
    const text = cleanSpeechText(element);
    if (!text) return;
    if (activeButton === button && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      resetAudio();
      return;
    }
    window.speechSynthesis.cancel();
    resetAudio();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.rate = 0.88;
    utterance.pitch = 1;
    const voice = spanishVoice();
    if (voice) utterance.voice = voice;
    utterance.onend = resetAudio;
    utterance.onerror = () => {
      resetAudio();
      showToast("לא הצלחנו להפעיל את הקול. בדקו שעוצמת הקול פתוחה ונסו שוב.");
    };
    activeButton = button;
    button.classList.add("is-playing");
    button.setAttribute("aria-pressed", "true");
    window.speechSynthesis.speak(utterance);
  }

  function addAudioButtons() {
    const candidates = document.querySelectorAll(".spanish-keyword, .spanish-block, .es-text, .es-cell");
    candidates.forEach((element) => {
      if (element.dataset.audioReady === "true") return;
      if (element.closest(".sr-only")) return;
      if (element.closest(".audio-button")) return;
      const text = cleanSpeechText(element);
      if (text.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g, "").length < 2) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "audio-button";
      button.textContent = "🔊";
      button.setAttribute("aria-label", `השמעת הגייה בספרדית: ${text}`);
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        speak(element, button);
      });
      element.dataset.audioReady = "true";
      element.append(button);
    });
  }

  function markCurrentPage() {
    const file = decodeURIComponent(location.pathname.split("/").pop() || "");
    document.querySelectorAll("#book-menu a").forEach((link) => {
      if (decodeURIComponent(link.getAttribute("href") || "") === file) link.setAttribute("aria-current", "page");
    });
  }

  function setupMenu() {
    const button = document.querySelector(".menu-button");
    const menu = document.querySelector("#book-menu");
    if (!button || !menu) return;
    button.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target) && event.target !== button) {
        menu.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
      }
    });
  }

  function updateProgress() {
    const root = document.documentElement;
    const maximum = Math.max(1, root.scrollHeight - root.clientHeight);
    const percent = Math.min(100, Math.max(0, (root.scrollTop / maximum) * 100));
    const bar = document.querySelector(".read-progress span");
    if (bar) bar.style.width = `${percent}%`;
  }

  const storage = {
    get(key, fallback = null) {
      try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
      } catch (_) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (_) {
        showToast("הדפדפן לא הצליח לשמור את ההתקדמות במכשיר.");
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (_) {}
    },
  };

  function normalized(value) {
    return String(value || "")
      .trim()
      .toLocaleLowerCase("es")
      .replace(/[¿¡.,;:!?"“”'’()\[\]{}]/g, "")
      .replace(/\s+/g, " ");
  }

  function withoutAccents(value) {
    return normalized(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function completionKey(id) {
    return `swh:complete:${id}`;
  }

  function answersKey(id) {
    return `swh:answers:${id}`;
  }

  function markComplete(card, complete) {
    const id = card.dataset.exerciseId;
    if (!id) return;
    storage.set(completionKey(id), Boolean(complete));
    card.classList.toggle("is-complete", Boolean(complete));
    updateLearningProgress();
  }

  function parseAccepted(field) {
    try {
      return JSON.parse(field.dataset.accepted || "[]");
    } catch (_) {
      return [];
    }
  }

  function gradeField(field) {
    const row = field.closest(".interactive-row");
    const feedback = row?.querySelector(".row-feedback");
    const value = field.value;
    const accepted = parseAccepted(field);
    const exact = accepted.some((answer) => normalized(answer) === normalized(value));
    const near = !exact && value.trim() && accepted.some((answer) => withoutAccents(answer) === withoutAccents(value));
    row?.classList.remove("is-correct", "is-near", "is-wrong");
    if (exact) {
      row?.classList.add("is-correct");
      if (feedback) feedback.textContent = "נכון!";
      return "correct";
    }
    if (near) {
      row?.classList.add("is-near");
      if (feedback) feedback.textContent = "כמעט נכון — בדקו סימני הטעמה או פיסוק.";
      return "near";
    }
    row?.classList.add("is-wrong");
    if (feedback) feedback.textContent = value.trim() ? "עדיין לא. נסו שוב או פתחו רמז." : "כתבו תשובה לפני הבדיקה.";
    return "wrong";
  }

  function saveInteractiveAnswers(card) {
    const values = [...card.querySelectorAll(".student-answer")].map((field) => field.value);
    storage.set(answersKey(card.dataset.exerciseId), values);
  }

  function setupAutoExercise(card) {
    const id = card.dataset.exerciseId;
    const fields = [...card.querySelectorAll(".student-answer")];
    const saved = storage.get(answersKey(id), []);
    fields.forEach((field, index) => {
      if (saved[index] !== undefined) field.value = saved[index];
      field.addEventListener("input", () => saveInteractiveAnswers(card));
      field.addEventListener("change", () => saveInteractiveAnswers(card));
    });
    if (storage.get(completionKey(id), false)) card.classList.add("is-complete");

    card.querySelector(".check-answer")?.addEventListener("click", () => {
      const results = fields.map(gradeField);
      const correct = results.filter((result) => result === "correct").length;
      const near = results.filter((result) => result === "near").length;
      const feedback = card.querySelector(".exercise-feedback");
      saveInteractiveAnswers(card);
      if (correct === fields.length) {
        feedback.textContent = "מצוין — כל התשובות נכונות. התרגיל נשמר כהושלם.";
        markComplete(card, true);
      } else if (correct + near === fields.length) {
        feedback.textContent = "המשמעות נכונה. תקנו את סימני ההטעמה או הפיסוק המסומנים בצהוב.";
        markComplete(card, false);
      } else {
        feedback.textContent = `${correct} מתוך ${fields.length} נכונות. תקנו את השורות המסומנות ונסו שוב.`;
        markComplete(card, false);
      }
    });

    card.querySelector(".hint-answer")?.addEventListener("click", () => {
      const panel = card.querySelector(".hint-panel");
      panel.hidden = !panel.hidden;
    });
    card.querySelector(".show-answer")?.addEventListener("click", () => {
      const panel = card.querySelector(".answer-panel");
      panel.hidden = !panel.hidden;
    });
    card.querySelector(".reset-exercise")?.addEventListener("click", () => {
      fields.forEach((field) => {
        field.value = "";
        field.closest(".interactive-row")?.classList.remove("is-correct", "is-near", "is-wrong");
        const feedback = field.closest(".interactive-row")?.querySelector(".row-feedback");
        if (feedback) feedback.textContent = "";
      });
      card.querySelectorAll(".hint-panel,.answer-panel").forEach((panel) => { panel.hidden = true; });
      const feedback = card.querySelector(".exercise-feedback");
      if (feedback) feedback.textContent = "";
      storage.remove(answersKey(id));
      storage.remove(completionKey(id));
      card.classList.remove("is-complete");
      updateLearningProgress();
    });
  }

  function setupSelfPractice(card) {
    const id = card.dataset.exerciseId;
    const textarea = card.querySelector(".self-answer");
    const checks = [...card.querySelectorAll('.self-checklist input[type="checkbox"]')];
    const saved = storage.get(answersKey(id), { text: "", checks: [] });
    textarea.value = saved.text || "";
    checks.forEach((check, index) => { check.checked = Boolean(saved.checks?.[index]); });
    if (storage.get(completionKey(id), false)) card.classList.add("is-complete");

    const save = () => storage.set(answersKey(id), { text: textarea.value, checks: checks.map((check) => check.checked) });
    textarea.addEventListener("input", save);
    checks.forEach((check) => check.addEventListener("change", save));
    card.querySelector(".complete-self")?.addEventListener("click", () => {
      const feedback = card.querySelector(".exercise-feedback");
      save();
      if (textarea.value.trim().length < 5) {
        feedback.textContent = "כתבו לפחות משפט קצר אחד לפני שמסמנים את המשימה כהושלמה.";
        markComplete(card, false);
        return;
      }
      const unchecked = checks.filter((check) => !check.checked).length;
      if (unchecked) {
        feedback.textContent = "התשובה נשמרה. השלימו גם את שלוש בדיקות העצמאות כדי לסיים את המשימה.";
        markComplete(card, false);
        return;
      }
      feedback.textContent = "התשובה נשמרה והמשימה סומנה כהושלמה.";
      markComplete(card, true);
    });
    card.querySelector(".reset-exercise")?.addEventListener("click", () => {
      textarea.value = "";
      checks.forEach((check) => { check.checked = false; });
      const feedback = card.querySelector(".exercise-feedback");
      if (feedback) feedback.textContent = "";
      storage.remove(answersKey(id));
      storage.remove(completionKey(id));
      card.classList.remove("is-complete");
      updateLearningProgress();
    });
  }

  function setupProgressChecklist(card) {
    const id = card.dataset.exerciseId;
    const checks = [...card.querySelectorAll('input[type="checkbox"]')];
    const saved = storage.get(answersKey(id), []);
    checks.forEach((check, index) => { check.checked = Boolean(saved[index]); });
    const refresh = () => {
      const completed = checks.filter((check) => check.checked).length;
      const status = card.querySelector(".check-progress");
      if (status) status.textContent = `${completed} מתוך ${checks.length} סומנו`;
      storage.set(answersKey(id), checks.map((check) => check.checked));
      markComplete(card, checks.length > 0 && completed === checks.length);
    };
    checks.forEach((check) => check.addEventListener("change", refresh));
    refresh();
  }

  function updateLearningProgress() {
    const items = [...document.querySelectorAll("[data-exercise-id]")];
    const chip = document.querySelector(".progress-chip");
    if (!chip || !items.length) return;
    const complete = items.filter((item) => storage.get(completionKey(item.dataset.exerciseId), false)).length;
    const percent = Math.round((complete / items.length) * 100);
    chip.hidden = false;
    const value = chip.querySelector("b");
    if (value) value.textContent = `${percent}%`;
    chip.title = `${complete} מתוך ${items.length} פעילויות הושלמו בעמוד הזה`;
  }

  function setupInteractiveLearning() {
    document.querySelectorAll(".interactive-exercise").forEach(setupAutoExercise);
    document.querySelectorAll(".self-practice").forEach(setupSelfPractice);
    document.querySelectorAll(".progress-checklist").forEach(setupProgressChecklist);
    updateLearningProgress();
  }

  loadVoices();
  if ("speechSynthesis" in window) window.speechSynthesis.addEventListener?.("voiceschanged", loadVoices);
  addAudioButtons();
  markCurrentPage();
  setupMenu();
  setupInteractiveLearning();
  updateProgress();
  document.addEventListener("scroll", updateProgress, { passive: true });
})();
