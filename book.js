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

  loadVoices();
  if ("speechSynthesis" in window) window.speechSynthesis.addEventListener?.("voiceschanged", loadVoices);
  addAudioButtons();
  markCurrentPage();
  setupMenu();
  updateProgress();
  document.addEventListener("scroll", updateProgress, { passive: true });
})();
