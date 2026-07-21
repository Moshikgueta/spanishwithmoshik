@import "tailwindcss";

:root {
  --ink: #101b3a;
  --muted: #68728a;
  --paper: #ffffff;
  --canvas: #f7f2e8;
  --line: #e4ded3;
  --blue: #17264f;
  --blue-dark: #101b3a;
  --blue-soft: #edf1f8;
  --coral: #ff6f61;
  --coral-soft: #fce7e2;
  --mint: #2fa979;
  --mint-soft: #eaf8f1;
  --amber: #e8a83b;
  --shadow: 0 24px 70px rgba(27, 36, 60, 0.1);
}

* { box-sizing: border-box; }

html { background: var(--canvas); }

body {
  margin: 0;
  background:
    radial-gradient(circle at 14% 2%, rgba(240, 111, 95, 0.09), transparent 24rem),
    radial-gradient(circle at 90% 88%, rgba(52, 92, 219, 0.08), transparent 28rem),
    var(--canvas);
  color: var(--ink);
  font-family: "Heebo", "Noto Sans Hebrew", Arial, sans-serif;
}

a { color: inherit; text-decoration: none; }

button, input { font: inherit; }
button { color: inherit; }

.workbook-shell { min-height: 100vh; }

.topbar {
  min-height: 86px;
  padding: 14px clamp(20px, 4vw, 64px);
  display: grid;
  grid-template-columns: minmax(260px, 1fr) minmax(300px, 520px) minmax(260px, 1fr);
  align-items: center;
  gap: 32px;
  background: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(224, 219, 208, 0.9);
  backdrop-filter: blur(16px);
  position: sticky;
  top: 0;
  z-index: 30;
}

.brand { display: flex; align-items: center; gap: 12px; }
.brand-mark {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: var(--blue);
  color: white;
  font-size: 22px;
  font-weight: 900;
  font-family: Georgia, serif;
  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.12);
}
.brand div { display: grid; gap: 2px; }
.brand strong { font-size: 16px; }
.brand span { color: var(--muted); font-size: 12px; }

.top-progress { display: grid; gap: 7px; }
.top-progress-copy { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); }
.top-progress-copy b { color: var(--blue); }
.progress-track { height: 8px; background: #e7e8ed; border-radius: 999px; overflow: hidden; }
.progress-track span { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--blue), #6381e9); transition: width 450ms ease; }

.menu-button {
  justify-self: end;
  border: 1px solid var(--line);
  background: white;
  border-radius: 12px;
  padding: 10px 14px;
  font-weight: 700;
  display: none;
}

.learning-layout {
  width: min(1440px, 100%);
  min-height: calc(100vh - 86px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
}

.chapter-panel {
  padding: 44px 28px 32px;
  border-left: 1px solid var(--line);
  background: rgba(252, 250, 246, 0.72);
  position: sticky;
  top: 86px;
  height: calc(100vh - 86px);
  overflow-y: auto;
}
.close-menu { display: none; }
.chapter-kicker, .eyebrow { color: var(--coral); font-size: 12px; font-weight: 900; letter-spacing: 0.05em; }
.chapter-panel h2 { margin: 8px 0 6px; font-size: 23px; letter-spacing: -0.03em; }
.chapter-panel > p { margin: 0 0 32px; color: var(--muted); font-size: 14px; line-height: 1.65; }
.chapter-switcher { margin: 10px 0 18px; display: grid; grid-template-columns: 34px minmax(0, 1fr) 34px; gap: 7px; }
.chapter-switcher button { border: 1px solid var(--line); border-radius: 10px; background: white; cursor: pointer; font-weight: 900; }
.chapter-switcher button:disabled { opacity: 0.3; cursor: not-allowed; }
.chapter-select { min-width: 0; width: 100%; border: 1px solid var(--line); border-radius: 10px; background: white; padding: 9px 8px; color: var(--ink); font-size: 11px; font-weight: 750; }
.section-group { padding: 16px 0; border-top: 1px solid var(--line); }
.section-title { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; font-size: 13px; }
.section-title span { color: var(--muted); font-size: 11px; }
.exercise-dots { display: flex; gap: 7px; flex-wrap: wrap; }
.exercise-dots button {
  width: 30px;
  height: 30px;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: white;
  color: var(--muted);
  font-size: 11px;
  cursor: pointer;
  transition: 180ms ease;
}
.exercise-dots button:hover { border-color: var(--blue); color: var(--blue); transform: translateY(-1px); }
.exercise-dots button.active { background: var(--blue); color: white; border-color: var(--blue); }
.exercise-dots button.done:not(.active) { background: var(--mint-soft); color: var(--mint); border-color: #bfe6d4; }
.tip-box { margin-top: 28px; padding: 17px; border-radius: 16px; background: var(--coral-soft); border: 1px solid #ffd3cc; }
.tip-box span { color: var(--coral); font-size: 11px; font-weight: 900; }
.tip-box p { margin: 7px 0 0; font-size: 12px; line-height: 1.65; }

.learning-stage { min-width: 0; padding: 32px clamp(24px, 6vw, 86px) 64px; }
.stage-progress { max-width: 900px; margin: 0 auto 18px; display: flex; align-items: center; gap: 18px; color: var(--muted); font-size: 12px; }
.stage-progress > button { width: 36px; height: 36px; border-radius: 50%; background: transparent; border: 1px solid var(--line); cursor: pointer; }
.stage-progress > button:disabled { opacity: 0.3; cursor: not-allowed; }
.step-track { display: flex; gap: 5px; flex: 1; }
.step-track span { height: 5px; flex: 1; border-radius: 999px; background: #dedfe4; }
.step-track span.done { background: var(--mint); }
.step-track span.current { background: var(--blue); }

.exercise-card, .completion-card {
  max-width: 900px;
  margin: 0 auto;
  border: 1px solid rgba(220, 216, 207, 0.95);
  border-radius: 28px;
  background: var(--paper);
  box-shadow: var(--shadow);
  overflow: hidden;
}
.exercise-heading { padding: 34px 38px 26px; display: flex; align-items: start; justify-content: space-between; gap: 28px; border-bottom: 1px solid #efede8; }
.exercise-heading h1 { margin: 8px 0 8px; font-size: clamp(27px, 4vw, 39px); letter-spacing: -0.045em; }
.exercise-heading p { margin: 0; max-width: 650px; color: var(--muted); line-height: 1.7; font-size: 15px; }
.exercise-type { flex: 0 0 auto; padding: 8px 11px; border-radius: 10px; background: var(--blue-soft); color: var(--blue); font-size: 11px; font-weight: 800; }
.type-matching { background: #fff5dd; color: #ad7415; }
.type-choice { background: var(--mint-soft); color: #247c5d; }
.type-order { background: var(--coral-soft); color: #b74f42; }

.blank-grid, .choice-list, .matching-board, .order-list { padding: 30px 38px 36px; }
.blank-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.inline-row {
  min-height: 70px;
  display: grid;
  grid-template-columns: 1fr auto minmax(120px, 1fr) auto;
  align-items: center;
  gap: 12px;
  border: 1.5px solid var(--line);
  border-radius: 15px;
  padding: 10px 14px;
  transition: border 160ms ease, background 160ms ease;
}
.inline-row:focus-within { border-color: var(--blue); box-shadow: 0 0 0 3px var(--blue-soft); }
.spanish-word { font-size: 19px; font-weight: 800; color: var(--ink); text-align: left; }
.equals { color: #a1a6b0; }
.inline-row input { min-width: 0; width: 100%; border: 0; border-bottom: 2px solid #b9bdc7; padding: 8px 3px 6px; outline: 0; background: transparent; text-align: center; color: var(--blue-dark); font-weight: 800; }
.inline-row input::placeholder { color: #aeb2bc; font-weight: 400; font-size: 12px; }
.result-mark { min-width: 22px; color: var(--mint); font-weight: 900; font-size: 13px; }
.sentence-row { grid-template-columns: minmax(0, 1fr) auto; }
.sentence-flow { min-width: 0; display: flex; align-items: baseline; justify-content: flex-start; gap: 7px; flex-wrap: wrap; font-size: 16px; font-weight: 750; text-align: left; }
.sentence-flow input { width: clamp(92px, 28%, 150px); flex: 0 1 150px; }
.answer-correct { background: var(--mint-soft) !important; border-color: #84d2b0 !important; }
.answer-wrong { background: var(--coral-soft) !important; border-color: #f2aa9f !important; }
.answer-wrong .result-mark { color: var(--coral); }

.matching-board { display: grid; grid-template-columns: 1fr 44px 1fr; align-items: stretch; }
.match-column { display: grid; align-content: start; gap: 10px; }
.column-label { margin-bottom: 3px; color: var(--muted); font-size: 11px; font-weight: 800; }
.match-card { min-height: 52px; border: 1.5px solid var(--line); background: white; border-radius: 13px; padding: 9px 13px; cursor: pointer; font-weight: 750; position: relative; transition: 150ms ease; }
.match-card:hover:not(:disabled), .match-card.selected { border-color: var(--blue); box-shadow: 0 0 0 3px var(--blue-soft); transform: translateY(-1px); }
.match-card.spanish { text-align: left; font-size: 16px; }
.match-card.paired { border-style: solid; border-color: #aebbe7; }
.pair-dot { position: absolute; width: 8px; height: 8px; border-radius: 50%; background: var(--blue); left: 10px; top: 10px; }
.linked-word { display: block; margin-top: 3px; color: var(--blue); font-size: 10px; font-weight: 500; }
.match-rail { display: grid; place-items: center; }
.match-rail span { width: 1px; height: calc(100% - 32px); background: #ece9e2; }

.choice-list { display: grid; gap: 22px; }
.choice-question { border: 0; padding: 0; margin: 0; }
.choice-question legend { width: 100%; display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.choice-question legend span { width: 25px; height: 25px; border-radius: 8px; display: grid; place-items: center; background: var(--blue-soft); color: var(--blue); font-size: 11px; }
.choice-question legend b { font-size: 15px; }
.choice-options { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.choice-card { min-height: 54px; padding: 12px 16px; border: 1.5px solid var(--line); border-radius: 13px; background: white; cursor: pointer; font-weight: 750; transition: 150ms ease; }
.choice-card:hover:not(:disabled) { border-color: #a9b8ea; background: #fafbff; }
.choice-card.selected { border-color: var(--blue); box-shadow: inset 0 0 0 1px var(--blue); background: var(--blue-soft); color: var(--blue-dark); }

.order-list { display: grid; gap: 10px; }
.order-card { display: grid; grid-template-columns: auto auto 1fr auto; gap: 13px; align-items: center; min-height: 60px; border: 1.5px solid var(--line); border-radius: 14px; background: white; padding: 8px 12px; cursor: grab; }
.drag-handle { color: #a9adb6; font-size: 19px; }
.order-number { width: 27px; height: 27px; display: grid; place-items: center; border-radius: 9px; background: var(--blue-soft); color: var(--blue); font-size: 11px; font-weight: 900; }
.order-card b { text-align: left; font-size: 14px; }
.reorder-buttons { display: flex; gap: 4px; }
.reorder-buttons button { width: 31px; height: 31px; border-radius: 8px; border: 1px solid var(--line); background: white; cursor: pointer; }
.reorder-buttons button:disabled { opacity: 0.3; cursor: not-allowed; }

.action-bar, .feedback-panel { min-height: 84px; padding: 16px 38px; border-top: 1px solid #ece9e3; display: flex; align-items: center; justify-content: space-between; gap: 22px; background: #fbfaf7; }
.action-hint { color: var(--muted); font-size: 12px; }
.primary-button, .secondary-button { border: 0; border-radius: 13px; min-width: 138px; padding: 13px 20px; font-weight: 900; cursor: pointer; transition: 160ms ease; }
.primary-button { background: var(--blue); color: white; box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.13); }
.primary-button:hover:not(:disabled) { background: var(--blue-dark); transform: translateY(-1px); }
.primary-button:disabled { background: #c9cbd2; box-shadow: none; cursor: not-allowed; }
.secondary-button { background: white; color: var(--coral); border: 1.5px solid #f3a99e; }
.feedback-panel.is-correct { background: var(--mint-soft); border-color: #b7e2cf; }
.feedback-panel.is-wrong { background: var(--coral-soft); border-color: #ffd0c9; }
.feedback-copy { display: flex; align-items: center; gap: 13px; }
.feedback-icon { width: 38px; height: 38px; border-radius: 50%; display: grid; place-items: center; background: var(--mint); color: white; font-weight: 900; }
.is-wrong .feedback-icon { background: var(--coral); }
.feedback-copy strong { font-size: 15px; }
.feedback-copy p { margin: 4px 0 0; color: #51605d; font-size: 12px; line-height: 1.55; }
.is-wrong .feedback-copy p { color: #734c47; }

.completion-card { padding: clamp(42px, 8vw, 90px); text-align: center; }
.completion-badge { width: 78px; height: 78px; margin: 0 auto 20px; border-radius: 50%; display: grid; place-items: center; background: var(--mint); color: white; font-size: 36px; box-shadow: 0 12px 28px rgba(47, 169, 121, 0.25); }
.completion-card h1 { margin: 8px 0; font-size: 55px; letter-spacing: -0.05em; }
.completion-card > p { max-width: 500px; margin: 0 auto; color: var(--muted); line-height: 1.7; }
.completion-stats { max-width: 430px; margin: 30px auto; display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--line); border-radius: 16px; overflow: hidden; }
.completion-stats div { padding: 18px; display: grid; gap: 4px; }
.completion-stats div + div { border-right: 1px solid var(--line); }
.completion-stats b { font-size: 25px; color: var(--blue); }
.completion-stats span { color: var(--muted); font-size: 11px; }
.completion-actions { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }

@media (max-width: 980px) {
  .topbar { grid-template-columns: 1fr minmax(240px, 380px) auto; }
  .menu-button { display: block; }
  .learning-layout { display: block; }
  .chapter-panel { display: none; position: fixed; z-index: 50; inset: 0 0 0 auto; top: 0; width: min(340px, 88vw); height: 100vh; background: #fcfaf6; box-shadow: -20px 0 50px rgba(22, 32, 54, 0.18); border: 0; }
  .chapter-panel.open { display: block; }
  .close-menu { display: grid; width: 34px; height: 34px; place-items: center; position: absolute; left: 20px; top: 20px; border: 1px solid var(--line); background: white; border-radius: 50%; font-size: 22px; }
}

@media (max-width: 700px) {
  .topbar { min-height: 74px; grid-template-columns: 1fr auto; padding: 11px 16px; gap: 14px; }
  .brand-mark { width: 40px; height: 40px; border-radius: 12px; }
  .brand strong { font-size: 14px; }
  .brand span { font-size: 10px; }
  .top-progress { grid-column: 1 / -1; grid-row: 2; }
  .learning-stage { padding: 20px 13px 40px; }
  .stage-progress { gap: 10px; margin-bottom: 13px; }
  .exercise-card { border-radius: 20px; }
  .exercise-heading { padding: 24px 20px 20px; display: block; }
  .exercise-heading h1 { font-size: 28px; margin-top: 7px; }
  .exercise-heading p { font-size: 13px; }
  .exercise-type { display: inline-block; margin-top: 14px; }
  .blank-grid, .choice-list, .matching-board, .order-list { padding: 20px; }
  .blank-grid { grid-template-columns: 1fr; }
  .inline-row { grid-template-columns: 1fr auto minmax(105px, 1fr) auto; min-height: 62px; }
  .sentence-row { grid-template-columns: minmax(0, 1fr) auto; }
  .sentence-flow { font-size: 14px; }
  .matching-board { grid-template-columns: 1fr 20px 1fr; padding-inline: 14px; }
  .match-card { min-height: 56px; padding: 8px; font-size: 12px; }
  .match-card.spanish { font-size: 14px; }
  .linked-word { font-size: 9px; }
  .choice-options { grid-template-columns: 1fr; }
  .order-card { grid-template-columns: auto auto 1fr; }
  .reorder-buttons { grid-column: 2 / -1; justify-content: end; }
  .action-bar, .feedback-panel { padding: 14px 20px; align-items: stretch; flex-direction: column; }
  .action-hint { text-align: center; }
  .primary-button, .secondary-button { width: 100%; }
  .feedback-copy { align-items: flex-start; }
  .feedback-icon { flex: 0 0 auto; }
  .completion-card { border-radius: 20px; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; transition: none !important; }
}

/* Premium product shell */
.site-header {
  width: 100%; min-height: 76px; padding: 12px clamp(24px, 5vw, 78px); display: grid;
  grid-template-columns: minmax(210px, 1fr) auto minmax(170px, 1fr); align-items: center; gap: 28px;
  background: rgba(247, 242, 232, 0.94); border-bottom: 1px solid rgba(16, 27, 58, 0.1);
  backdrop-filter: blur(18px); position: sticky; top: 0; z-index: 100;
}
.site-header.is-transparent { background: rgba(247, 242, 232, 0.78); }
.site-brand { display: grid; justify-self: end; gap: 1px; }
.site-brand-parent { color: var(--muted); font-size: 11px; font-weight: 700; }
.site-brand strong { color: var(--ink); font-size: 20px; letter-spacing: -0.035em; }
.site-nav { display: flex; align-items: center; justify-content: center; gap: clamp(16px, 2.2vw, 34px); }
.site-nav a { color: #34405e; font-size: 13px; font-weight: 750; position: relative; white-space: nowrap; }
.site-nav a::after { content: ""; position: absolute; height: 2px; border-radius: 2px; right: 0; left: 100%; bottom: -8px; background: var(--coral); transition: left 180ms ease; }
.site-nav a:hover::after, .site-nav a.active::after { left: 0; }
.site-cta { justify-self: start; min-width: 150px; padding: 13px 20px; border-radius: 12px; background: var(--coral); color: white; text-align: center; font-size: 13px; font-weight: 900; box-shadow: 0 10px 22px rgba(255, 111, 97, 0.2); transition: 180ms ease; }
.site-cta:hover { transform: translateY(-2px); background: #f75e50; }

.marketing-page { overflow: hidden; }
.marketing-eyebrow { color: var(--coral); font-size: 12px; font-weight: 900; letter-spacing: 0.025em; }
.button { min-height: 58px; padding: 0 28px; display: inline-flex; align-items: center; justify-content: center; border-radius: 12px; font-weight: 900; transition: 180ms ease; }
.button:hover { transform: translateY(-2px); }
.button-primary { background: var(--coral); color: white; box-shadow: 0 12px 28px rgba(255, 111, 97, 0.23); }
.button-primary:hover { background: #f45f52; box-shadow: 0 16px 32px rgba(255, 111, 97, 0.28); }
.button-secondary { border: 1.5px solid var(--blue); color: var(--blue); background: rgba(255,255,255,.42); }
.button-secondary:hover { background: var(--coral-soft); border-color: var(--coral); }

.hero-section { min-height: 820px; padding: clamp(54px, 7vw, 98px) clamp(24px, 5vw, 78px) 54px; display: grid; grid-template-columns: minmax(0, .9fr) minmax(520px, 1.1fr); grid-template-rows: 1fr auto; gap: 46px clamp(42px, 6vw, 96px); position: relative; background: linear-gradient(110deg, #fbf8f1 0%, #f7f2e8 58%, #f2eadb 100%); }
.hero-section::before { content: ""; position: absolute; width: 470px; height: 470px; border-radius: 50%; right: -260px; top: 170px; border: 90px solid rgba(169, 184, 216, .22); }
.hero-copy { align-self: center; z-index: 2; }
.hero-copy h1 { max-width: 690px; margin: 15px 0 24px; color: var(--ink); font-size: clamp(52px, 5.6vw, 86px); line-height: .98; letter-spacing: -0.07em; }
.hero-copy > p { max-width: 610px; margin: 0; color: #4d5872; font-size: clamp(18px, 1.65vw, 23px); line-height: 1.75; }
.hero-actions { margin-top: 34px; display: flex; gap: 14px; flex-wrap: wrap; }
.hero-checks { margin: 27px 0 0; padding: 0; list-style: none; display: flex; gap: 22px; flex-wrap: wrap; color: #43506c; font-size: 13px; font-weight: 750; }
.hero-checks li::before { content: "✓"; margin-left: 7px; color: var(--coral); font-weight: 900; }

.hero-product { min-height: 560px; align-self: center; position: relative; perspective: 1200px; }
.hero-photo { position: absolute; inset: 20px 0 20px 10%; width: 90%; height: 84%; object-fit: cover; border-radius: 180px 24px 24px 180px; filter: saturate(.72) contrast(.94); opacity: .31; }
.book-mockup, .workbook-mockup, .lesson-mockup { position: absolute; box-shadow: 0 30px 55px rgba(16, 27, 58, .18); transition: transform 240ms ease; }
.book-mockup:hover, .workbook-mockup:hover, .lesson-mockup:hover { transform: translateY(-5px); }
.book-mockup { width: 260px; height: 385px; left: 2%; bottom: 45px; padding: 38px 31px; border-radius: 5px 15px 15px 5px; color: #fff; background: linear-gradient(150deg, #101b3a 0 63%, #263d70 63%); border-left: 12px solid #0a1228; transform: rotate(-2deg); }
.book-mockup::after { content: ""; width: 150px; height: 150px; position: absolute; left: 0; bottom: 0; background: var(--coral); border-radius: 0 100% 0 0; }
.book-mockup span { color: var(--coral); font-size: 48px; font-weight: 950; position: relative; z-index: 1; }
.book-mockup strong, .book-mockup b, .book-mockup small { display: block; position: relative; z-index: 1; }
.book-mockup strong { margin-top: 30px; font-size: 35px; }
.book-mockup b { margin-top: 5px; font-size: 22px; }
.book-mockup small { margin-top: 82px; color: #dbe2f1; }
.workbook-mockup { width: 210px; height: 310px; left: 31%; bottom: 20px; padding: 34px 27px; border-radius: 8px 16px 16px 8px; background: #fffdf8; transform: rotate(1.5deg); border-left: 8px solid #dfd6c7; z-index: 2; }
.workbook-mockup::after { content: ""; position: absolute; left: 0; bottom: 0; width: 120px; height: 120px; background: #a9b8d8; border-radius: 0 100% 0 0; }
.workbook-mockup small, .workbook-mockup span, .workbook-mockup strong { display: block; position: relative; z-index: 1; }
.workbook-mockup small { color: var(--muted); font-weight: 800; }
.workbook-mockup strong { margin-top: 48px; color: var(--blue); font-size: 53px; }
.workbook-mockup strong::after { content: ""; width: 40px; height: 3px; display: block; margin-top: 4px; background: var(--coral); }
.workbook-mockup span { margin-top: 18px; color: #47546d; font-size: 13px; }
.lesson-mockup { width: 360px; height: 350px; right: 1%; top: 38px; padding: 27px; border-radius: 22px; background: rgba(255,255,255,.96); border: 1px solid rgba(16,27,58,.1); z-index: 3; transform: rotate(.5deg); }
.lesson-top { display: flex; justify-content: space-between; color: var(--blue); }
.lesson-top span { color: var(--coral); font-weight: 900; }
.lesson-mockup h3 { margin: 45px 0 18px; color: var(--blue); font-size: 31px; }
.audio-line { height: 40px; display: flex; align-items: center; gap: 7px; }
.audio-line i { width: 4px; height: 12px; border-radius: 4px; background: var(--coral); }
.audio-line i:nth-child(2), .audio-line i:nth-child(5) { height: 29px; }.audio-line i:nth-child(3) { height: 20px; }.audio-line i:nth-child(4) { height: 34px; }
.lesson-options { margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.lesson-options span { padding: 13px 10px; border: 1px solid #dce1eb; border-radius: 11px; text-align: center; font-size: 13px; font-weight: 800; }
.lesson-options span:first-child { color: var(--coral); border-color: var(--coral); background: var(--coral-soft); }
.mini-progress { height: 7px; margin-top: 31px; border-radius: 8px; background: #e7e9ef; overflow: hidden; }.mini-progress span { display: block; width: 42%; height: 100%; background: var(--coral); }

.hero-proof { grid-column: 1/-1; min-height: 112px; padding: 18px 30px; border: 1px solid rgba(16,27,58,.09); border-radius: 22px; background: rgba(255,255,255,.78); box-shadow: 0 22px 45px rgba(16,27,58,.08); display: grid; grid-template-columns: repeat(3,1fr); backdrop-filter: blur(12px); z-index: 4; }
.hero-proof > div { display: grid; grid-template-columns: 50px 1fr; grid-template-rows: auto auto; align-content: center; column-gap: 15px; padding: 0 35px; }
.hero-proof > div + div { border-right: 1px solid #ded9cf; }
.proof-icon { grid-row: 1/3; width: 46px; height: 46px; display: grid; place-items: center; border-radius: 50%; background: #e5eaf3; color: var(--blue); font-size: 21px; }
.hero-proof b { font-size: 16px; }.hero-proof small { color: var(--muted); margin-top: 4px; }

.section { padding: clamp(78px, 9vw, 130px) clamp(24px, 7vw, 110px); }
.section-heading { max-width: 760px; margin: 0 auto 54px; text-align: center; }
.section-heading.compact { text-align: right; margin: 0 0 32px; }
.section-heading h2 { margin: 13px 0 15px; font-size: clamp(38px, 4.8vw, 63px); line-height: 1.08; letter-spacing: -0.06em; }
.section-heading p { margin: 0; color: var(--muted); line-height: 1.75; font-size: 17px; }
.package-section { background: #fffdf8; }
.package-grid { max-width: 1240px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.package-card { min-height: 360px; padding: 32px; border-radius: 20px; border: 1px solid #e4ded3; background: #fff; display: flex; flex-direction: column; position: relative; overflow: hidden; transition: 220ms ease; }
.package-card:hover { transform: translateY(-5px); box-shadow: 0 22px 50px rgba(16,27,58,.1); }
.package-card::after { content: ""; position: absolute; width: 180px; height: 180px; border-radius: 50%; left: -85px; top: -85px; opacity: .5; }
.package-book::after { background: #a9b8d8; }.package-workbook::after { background: var(--coral-soft); }.package-prompts::after { background: #eadcc4; }
.package-number { color: var(--coral); font-weight: 950; }
.package-card h3 { margin: 74px 0 14px; font-size: 29px; letter-spacing: -0.04em; }
.package-card p { color: var(--muted); line-height: 1.72; }
.package-card a { margin-top: auto; color: var(--blue); font-weight: 900; }.package-card a span { color: var(--coral); margin-right: 8px; }

.experience-section { max-width: 1480px; margin: 0 auto; display: grid; grid-template-columns: minmax(340px,.8fr) minmax(0,1.2fr); align-items: center; gap: clamp(42px, 7vw, 100px); }
.experience-photo { min-height: 720px; position: relative; }.experience-photo img { width: 100%; height: 720px; object-fit: cover; border-radius: 24px 180px 24px 24px; filter: saturate(.8); }
.floating-result { position: absolute; right: -28px; bottom: 54px; min-width: 210px; padding: 20px 24px; border-radius: 15px; background: white; box-shadow: 0 22px 44px rgba(16,27,58,.15); border-right: 5px solid #2fa979; }.floating-result b,.floating-result span{display:block}.floating-result b{color:#217b59;font-size:20px}.floating-result span{margin-top:4px;color:var(--muted);font-size:12px}
.experience-copy > h2 { margin: 13px 0 18px; font-size: clamp(40px, 4.5vw, 64px); line-height: 1.03; letter-spacing: -0.06em; }
.experience-copy > p { color: var(--muted); font-size: 17px; line-height: 1.8; }
.exercise-type-grid { margin-top: 35px; display: grid; grid-template-columns: 1fr 1fr; gap: 0 24px; }
.exercise-type-grid article { padding: 22px 0; border-top: 1px solid #ded9d0; display: grid; grid-template-columns: 36px 1fr; gap: 12px; }
.exercise-type-grid article > span { color: var(--coral); font-weight: 900; }.exercise-type-grid h3 { margin: 0 0 6px; font-size: 16px; }.exercise-type-grid p { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.55; }

.content-map-section { background: var(--blue); color: white; text-align: center; position: relative; overflow: hidden; }
.content-map-section::after { content:"A1"; position:absolute; left:-20px; bottom:-100px; font-size:380px; line-height:1; font-weight:950; color:rgba(255,255,255,.035); }
.section-heading.light p { color: #b8c2d8; }.content-map-section .marketing-eyebrow { color: #ff8c81; }
.content-stats { max-width: 980px; margin: 0 auto 46px; display: grid; grid-template-columns: repeat(4,1fr); position:relative;z-index:1; }
.content-stats div { padding: 18px; }.content-stats div + div { border-right: 1px solid rgba(255,255,255,.15); }.content-stats b,.content-stats span { display:block; }.content-stats b { font-size: 51px; color: #fff; }.content-stats span { color: #c1cadc; font-size: 13px; }
.unit-ribbon { max-width: 1160px; margin: 0 auto; display: flex; justify-content: center; flex-wrap: wrap; gap: 9px; position:relative;z-index:1; }.unit-ribbon span { padding: 10px 17px; border: 1px solid rgba(255,255,255,.18); border-radius: 999px; color: #d8deeb; font-size: 12px; }
.final-cta-section { max-width: 1320px; margin: 0 auto; display:flex; align-items:center; justify-content:space-between; gap:40px; }.final-cta-section h2{max-width:760px;margin:10px 0 0;font-size:clamp(37px,4.3vw,61px);line-height:1.08;letter-spacing:-.06em}
.site-footer { min-height: 220px; padding: 54px clamp(24px,7vw,110px); display:grid; grid-template-columns:1fr auto 1fr; align-items:start; gap:45px; background:#0c1530;color:white; }.site-footer>div{display:grid;gap:4px}.site-footer>div span{color:#8e9bb5;font-size:11px}.site-footer>div strong{font-size:21px}.site-footer nav{display:flex;gap:24px;font-size:13px;color:#c5ccda}.site-footer p{justify-self:start;margin:0;max-width:300px;color:#8e9bb5;font-size:12px;line-height:1.6}

/* Dashboard and app pages */
.app-page { min-height: 100vh; background: var(--canvas); }
.dashboard-hero { max-width: 1280px; margin: 0 auto; padding: 72px 42px 46px; display:flex; align-items:center; justify-content:space-between; gap:40px; }.dashboard-hero h1{margin:8px 0;font-size:60px;letter-spacing:-.06em}.dashboard-hero p{margin:0;color:var(--muted);font-size:17px}
.dashboard-progress,.progress-ring { --progress:0deg; width:150px;height:150px;border-radius:50%;background:conic-gradient(var(--coral) var(--progress),#e4dfd6 0);padding:10px;flex:0 0 auto}.dashboard-progress>div,.progress-ring>div{width:100%;height:100%;display:grid;place-content:center;text-align:center;border-radius:50%;background:#fff}.dashboard-progress b,.progress-ring b{font-size:34px;color:var(--blue)}.dashboard-progress span,.progress-ring span{color:var(--muted);font-size:11px}
.dashboard-grid { max-width:1280px;margin:0 auto;padding:0 42px 70px;display:grid;grid-template-columns:1.35fr 1fr;gap:20px}.dashboard-card{min-height:255px;padding:30px;border:1px solid #ded9cf;border-radius:20px;background:#fff;display:flex;flex-direction:column;transition:200ms ease;overflow:hidden}.dashboard-card:hover{transform:translateY(-4px);box-shadow:0 20px 44px rgba(16,27,58,.09)}.dashboard-card h2{margin:18px 0 10px;font-size:27px;letter-spacing:-.04em}.dashboard-card p{margin:0;color:var(--muted);line-height:1.65}.dashboard-card>b{margin-top:auto;color:var(--blue);font-size:13px}.dashboard-card>b i{margin-right:8px;color:var(--coral);font-style:normal}.card-kicker{color:var(--coral);font-size:11px;font-weight:900}.dashboard-primary{min-height:350px;padding:40px;background:var(--blue);color:#fff;grid-row:span 2}.dashboard-primary h2{font-size:40px;margin-top:50px}.dashboard-primary p{color:#bdc6d9;max-width:510px}.dashboard-primary>b{color:white}.card-progress{height:8px;margin:35px 0 14px;border-radius:9px;background:rgba(255,255,255,.14);overflow:hidden}.card-progress span{display:block;height:100%;border-radius:9px;background:var(--coral)}.dashboard-photo{position:relative;padding:0;color:white}.dashboard-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.5) saturate(.75)}.dashboard-photo div{position:relative;z-index:1;padding:30px;display:flex;flex-direction:column;height:100%}.dashboard-photo div b{margin-top:auto;color:white;font-size:13px}
.dashboard-roadmap{max-width:1280px;margin:0 auto;padding:0 42px 90px}.roadmap-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.roadmap-grid div{min-height:92px;padding:16px;border-radius:14px;background:#fff;border:1px solid #ded9cf;display:grid;grid-template-columns:30px 1fr;align-items:center;gap:8px}.roadmap-grid span{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:var(--coral-soft);color:var(--coral);font-size:11px;font-weight:900}.roadmap-grid b{font-size:13px}

/* Digital book */
.reader-shell{max-width:1500px;margin:0 auto;display:grid;grid-template-columns:330px minmax(0,1fr);min-height:calc(100vh - 76px)}.reader-sidebar{height:calc(100vh - 76px);position:sticky;top:76px;padding:30px 22px;background:#fffdf8;border-left:1px solid #ded9cf;overflow-y:auto}.reader-close,.reader-menu-button{display:none}.reader-sidebar-heading{display:flex;align-items:center;gap:13px;margin-bottom:22px}.reader-sidebar-heading>span{width:46px;height:52px;display:grid;place-items:center;border-radius:8px;background:var(--blue);color:white;font-weight:950}.reader-sidebar-heading div{display:grid;gap:3px}.reader-sidebar-heading small{color:var(--muted)}.reader-search{height:44px;padding:0 12px;margin-bottom:18px;border:1px solid #ded9cf;border-radius:11px;background:white;display:flex;align-items:center;gap:8px}.reader-search input{min-width:0;flex:1;border:0;outline:0;background:transparent}.reader-sidebar nav{display:grid;gap:4px}.reader-sidebar nav button{width:100%;padding:10px;border:0;border-radius:10px;background:transparent;display:grid;grid-template-columns:31px 1fr;text-align:right;gap:7px;cursor:pointer}.reader-sidebar nav button:hover{background:#f2eee6}.reader-sidebar nav button.active{background:var(--blue);color:white}.reader-sidebar nav button span{width:27px;height:27px;border-radius:8px;display:grid;place-items:center;background:rgba(169,184,216,.22);font-size:10px;font-weight:900}.reader-sidebar nav button b{align-self:center;font-size:12px;line-height:1.4}.reader-content{min-width:0;padding:44px clamp(28px,6vw,90px) 70px}.reader-cover{min-height:300px;padding:52px;border-radius:24px;background:var(--blue);color:white;display:flex;align-items:flex-end;position:relative;overflow:hidden}.reader-cover.has-photo::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(16,27,58,.2),rgba(16,27,58,.93) 68%)}.reader-cover img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.reader-cover>div{position:relative;z-index:2;max-width:700px}.reader-cover span{color:#ff9187;font-size:12px;font-weight:900}.reader-cover h1{margin:9px 0 12px;font-size:clamp(36px,5vw,62px);line-height:1.08;letter-spacing:-.055em}.reader-cover p{margin:0;color:#cad1df}.reader-article{max-width:880px;margin:0 auto;padding:55px 0;font-family:"Noto Sans Hebrew","Heebo",Arial,sans-serif}.reader-article h1{font-size:39px;margin:45px 0 18px}.reader-article h2{font-size:28px;margin:42px 0 14px;color:var(--blue)}.reader-article h3{font-size:19px;margin:30px 0 10px;color:#28375b}.reader-article p{margin:0 0 16px;font-size:16px;line-height:1.95;color:#313d56}.reader-article p[dir="auto"]{unicode-bidi:plaintext}.reader-table-wrap{margin:25px 0;overflow-x:auto;border:1px solid #ddd7cd;border-radius:14px;background:white}.reader-table{width:100%;border-collapse:collapse}.reader-table th,.reader-table td{padding:12px 14px;border-bottom:1px solid #eee9e0;text-align:right;line-height:1.55;font-size:13px}.reader-table th{background:#eef1f7;color:var(--blue)}.reader-pagination,.source-pagination{padding:22px 0;border-top:1px solid #ddd7cd;display:flex;align-items:center;justify-content:space-between;gap:15px}.reader-pagination button,.source-pagination button{padding:11px 17px;border:1px solid #d8d2c8;border-radius:10px;background:white;cursor:pointer;font-weight:800}.reader-pagination button:disabled,.source-pagination button:disabled{opacity:.35}.reader-pagination span,.source-pagination span{color:var(--muted);font-size:12px}

/* Workbook modes and complete source */
.workbook-page>.site-header+.workbook-modebar{position:sticky;top:76px;z-index:80}.workbook-modebar{min-height:78px;padding:12px clamp(20px,5vw,72px);display:flex;align-items:center;justify-content:space-between;gap:24px;background:#fffdf8;border-bottom:1px solid #ddd7cd}.workbook-modebar>div:first-child{display:grid;gap:3px}.workbook-modebar>div:first-child b{font-size:16px}.workbook-modebar [role="tablist"]{padding:4px;border-radius:12px;background:#ede8df;display:flex;gap:4px}.workbook-modebar [role="tab"]{padding:10px 18px;border:0;border-radius:9px;background:transparent;cursor:pointer;font-weight:850;color:#5f687a}.workbook-modebar [role="tab"][aria-selected="true"]{background:white;color:var(--blue);box-shadow:0 3px 10px rgba(16,27,58,.1)}.workbook-page .topbar{top:154px}.workbook-page .chapter-panel{top:240px;height:calc(100vh - 240px)}
.source-workbook-shell{max-width:1500px;margin:0 auto;display:grid;grid-template-columns:320px minmax(0,1fr);min-height:calc(100vh - 154px)}.source-module-nav{height:calc(100vh - 154px);position:sticky;top:154px;padding:26px 18px;background:#fffdf8;border-left:1px solid #ded9cf;overflow:auto}.source-module-nav>div{padding:0 8px 19px;display:grid;gap:3px}.source-module-nav>div span{color:var(--coral);font-size:11px;font-weight:900}.source-module-nav>div b{font-size:15px}.source-module-nav nav{display:grid;gap:3px}.source-module-nav nav button{padding:9px 8px;border:0;border-radius:9px;background:transparent;display:grid;grid-template-columns:28px 1fr auto;align-items:center;gap:7px;text-align:right;cursor:pointer}.source-module-nav nav button:hover{background:#f1ede5}.source-module-nav nav button.active{background:var(--blue);color:white}.source-module-nav nav button>span{width:27px;height:27px;display:grid;place-items:center;border-radius:7px;background:rgba(169,184,216,.24);font-size:10px;font-weight:900}.source-module-nav nav button>b{font-size:11px;line-height:1.35}.source-module-nav nav button>small{font-size:9px;opacity:.65}.source-module-content{min-width:0;padding:45px clamp(20px,5vw,72px) 70px}.source-module-heading{max-width:940px;margin:0 auto 28px;padding:40px;border-radius:22px;background:var(--blue);color:white}.source-module-heading>span{color:#ff9187;font-size:11px;font-weight:900}.source-module-heading h1{margin:7px 0 9px;font-size:clamp(31px,4vw,48px);letter-spacing:-.05em}.source-module-heading p{margin:0;color:#bdc6d8}.source-exercise-card,.source-reading-card{max-width:940px;margin:0 auto 18px;border:1px solid #ded9cf;border-radius:20px;background:white;box-shadow:0 12px 32px rgba(16,27,58,.055);overflow:hidden}.source-exercise-card.done{border-color:#9bd1bb}.source-exercise-card>header{padding:22px 25px;border-bottom:1px solid #eee9e1;display:flex;justify-content:space-between;align-items:start;gap:18px}.source-exercise-card>header span{color:var(--coral);font-size:10px;font-weight:900}.source-exercise-card>header h2{margin:5px 0 0;font-size:20px;line-height:1.35}.source-exercise-card>header>b{flex:0 0 auto;padding:7px 10px;border-radius:8px;background:var(--blue-soft);color:var(--blue);font-size:10px}.source-exercise-card.done>header>b{background:var(--mint-soft);color:#247c5d}.source-prompt,.source-inline-prompt{margin:0;padding:26px 25px;color:#313d56;line-height:1.95;font-size:14px;unicode-bidi:plaintext}.source-inline-prompt input{width:120px;margin:0 5px;padding:5px 4px;border:0;border-bottom:2px solid #8993a8;outline:0;color:var(--blue);font-weight:800;text-align:center}.source-inline-prompt input:focus{border-color:var(--coral);background:var(--coral-soft)}.source-answer-area{display:block;width:calc(100% - 50px);min-height:110px;margin:0 25px 25px;padding:14px;border:1.5px solid #d8d2c8;border-radius:12px;outline:0;resize:vertical;line-height:1.7}.source-answer-area:focus{border-color:var(--blue);box-shadow:0 0 0 3px var(--blue-soft)}.source-action,.source-feedback{min-height:74px;padding:14px 25px;border-top:1px solid #eee9e1;background:#fbfaf7;display:flex;align-items:center;justify-content:space-between;gap:18px}.source-action span{color:var(--muted);font-size:11px}.source-action button,.source-feedback button,.speaking-practice button{padding:11px 18px;border:0;border-radius:10px;background:var(--blue);color:white;font-weight:850;cursor:pointer}.source-action button:disabled{opacity:.35;cursor:not-allowed}.source-feedback>div{min-width:0}.source-feedback b{font-size:14px}.source-feedback p{margin:5px 0 0;color:#425469;font-size:11px;line-height:1.55}.source-feedback.correct{background:var(--mint-soft)}.source-feedback.review{background:var(--coral-soft)}.source-feedback.neutral{background:#eef1f7}.source-feedback button{flex:0 0 auto;background:white;color:var(--blue);border:1px solid #cdd4e1}.source-choice-grid{padding:0 25px 25px;display:grid;grid-template-columns:repeat(2,1fr);gap:9px}.source-choice-grid button{min-height:48px;padding:10px;border:1.5px solid #ded9cf;border-radius:11px;background:white;cursor:pointer;text-align:right}.source-choice-grid button.selected{border-color:var(--coral);background:var(--coral-soft);color:#9e4037}.source-order-list{padding:0 25px 25px;display:grid;gap:8px}.source-order-list>div{min-height:53px;padding:8px 10px;border:1px solid #ddd7cd;border-radius:11px;display:grid;grid-template-columns:auto 1fr auto auto;align-items:center;gap:10px;cursor:grab}.source-order-list>div>span{color:#a1a6b1}.source-order-list b{font-size:12px}.source-order-list button{width:30px;height:30px;border:1px solid #ddd7cd;border-radius:8px;background:white}.source-matching-board{padding:0 25px 25px;display:grid;grid-template-columns:1fr 1fr;gap:20px}.source-matching-board>div{display:grid;align-content:start;gap:8px}.source-matching-board button{min-height:48px;padding:9px 12px;border:1.5px solid #ddd7cd;border-radius:10px;background:white;cursor:pointer}.source-matching-board button.selected{border-color:var(--coral);box-shadow:0 0 0 3px var(--coral-soft)}.source-matching-board button small{display:block;margin-top:3px;color:var(--coral);font-size:9px}.speaking-practice{padding:0 25px 25px}.speaking-practice .source-prompt{padding-inline:0}.speaking-practice>button{margin-left:10px}.speaking-practice>button.recording{background:var(--coral)}.speaking-practice audio{display:block;width:100%;margin:15px 0}.speaking-practice .text-complete{background:white;color:var(--blue);border:1px solid #cfd5e0}.source-reading-card{padding:35px}.source-reading-card h3{margin:28px 0 8px;font-size:20px}.source-reading-card p{line-height:1.9;color:#344058}.source-pagination{max-width:940px;margin:35px auto 0}

/* Prompts */
.prompts-hero{max-width:1280px;margin:0 auto;padding:78px 42px 46px;display:flex;align-items:end;justify-content:space-between;gap:55px}.prompts-hero>div:first-child{max-width:720px}.prompts-hero h1{margin:10px 0 16px;font-size:clamp(44px,5.6vw,76px);line-height:1;letter-spacing:-.065em}.prompts-hero p{margin:0;color:var(--muted);font-size:17px;line-height:1.75}.prompt-steps{display:flex;gap:12px;flex:0 0 auto}.prompt-steps span{width:96px;height:96px;padding:14px;border-radius:15px;background:white;border:1px solid #ded9cf;display:grid;align-content:center;gap:7px;text-align:center;font-size:11px}.prompt-steps b{font-size:21px;color:var(--coral)}.prompt-filters{max-width:1280px;margin:0 auto;padding:0 42px 26px;display:flex;gap:7px;flex-wrap:wrap}.prompt-filters button{padding:9px 15px;border:1px solid #d8d2c8;border-radius:999px;background:transparent;cursor:pointer;font-weight:750}.prompt-filters button.active{background:var(--blue);border-color:var(--blue);color:white}.prompt-grid{max-width:1280px;margin:0 auto;padding:0 42px 90px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.prompt-card{min-height:390px;padding:26px;border:1px solid #ded9cf;border-radius:18px;background:white;display:flex;flex-direction:column}.prompt-card header{display:flex;justify-content:space-between;color:var(--coral);font-size:11px;font-weight:900}.prompt-card header b{color:#b3bac9}.prompt-card h2{margin:28px 0 14px;font-size:23px;letter-spacing:-.035em}.prompt-card p{margin:0;color:#566077;font-size:13px;line-height:1.72}.prompt-card button{margin-top:auto;padding:12px;border:1.5px solid var(--blue);border-radius:10px;background:white;color:var(--blue);font-weight:900;cursor:pointer;transition:160ms ease}.prompt-card button:hover{background:var(--blue);color:white}

/* Progress */
.progress-hero{max-width:1180px;margin:0 auto;padding:78px 42px 42px;text-align:center}.progress-hero h1{margin:10px 0;font-size:clamp(43px,5.5vw,72px);letter-spacing:-.06em}.progress-hero p{margin:0;color:var(--muted)}.progress-overview{max-width:1040px;margin:0 auto 24px;padding:42px;border:1px solid #ded9cf;border-radius:22px;background:white;display:grid;grid-template-columns:210px 1fr;align-items:center;gap:55px}.progress-ring{width:190px;height:190px;padding:12px}.progress-ring b{font-size:45px}.progress-metrics{display:grid;gap:23px}.progress-metrics article{display:grid;grid-template-columns:1fr auto;gap:9px}.progress-metrics article>span{font-size:13px;font-weight:800}.progress-metrics article>b{color:var(--blue)}.progress-metrics article>div{grid-column:1/-1;height:8px;border-radius:8px;background:#e7e4dd;overflow:hidden}.progress-metrics i{display:block;height:100%;border-radius:8px;background:linear-gradient(90deg,var(--coral),#ff9a90)}.next-step-card{max-width:1040px;margin:0 auto 24px;padding:38px 42px;border-radius:22px;background:var(--blue);color:white;display:flex;justify-content:space-between;align-items:center;gap:40px}.next-step-card h2{margin:8px 0;font-size:32px}.next-step-card p{margin:0;color:#bec7d9}.achievement-grid{max-width:1040px;margin:0 auto;padding:0 0 90px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.achievement-grid article{padding:27px;border:1px solid #ded9cf;border-radius:17px;background:white}.achievement-grid article>b{font-size:28px;color:var(--coral)}.achievement-grid h3{margin:18px 0 8px}.achievement-grid p{margin:0;color:var(--muted);font-size:13px}

@media (max-width: 1120px) {
  .site-header{grid-template-columns:1fr auto}.site-nav{display:none}.hero-section{grid-template-columns:1fr 1fr}.lesson-mockup{width:320px}.hero-proof>div{padding:0 18px}.package-grid{grid-template-columns:1fr 1fr}.package-card:last-child{grid-column:1/-1}.prompt-grid{grid-template-columns:1fr 1fr}
}

@media (max-width: 840px) {
  .site-header{padding-inline:18px}.site-brand{justify-self:end}.site-cta{min-width:126px;padding-inline:14px}.hero-section{padding:52px 22px 30px;grid-template-columns:1fr;gap:20px}.hero-copy h1{font-size:54px}.hero-product{min-height:530px}.hero-photo{inset-inline:0;width:100%}.book-mockup{left:0}.workbook-mockup{left:28%}.lesson-mockup{right:0}.hero-proof{grid-template-columns:1fr;padding:10px 22px}.hero-proof>div{min-height:82px}.hero-proof>div+div{border-right:0;border-top:1px solid #ded9cf}.package-grid{grid-template-columns:1fr}.package-card:last-child{grid-column:auto}.experience-section{grid-template-columns:1fr}.experience-photo{min-height:500px}.experience-photo img{height:500px}.floating-result{right:18px}.content-stats{grid-template-columns:1fr 1fr}.content-stats div+div{border-right:0}.content-stats div:nth-child(even){border-right:1px solid rgba(255,255,255,.15)}.final-cta-section{align-items:start;flex-direction:column}.site-footer{grid-template-columns:1fr}.site-footer p{justify-self:auto}
  .dashboard-hero,.prompts-hero{padding-inline:22px}.dashboard-grid{padding-inline:22px;grid-template-columns:1fr}.dashboard-primary{grid-row:auto}.dashboard-roadmap{padding-inline:22px}.roadmap-grid{grid-template-columns:repeat(2,1fr)}.reader-shell,.source-workbook-shell{display:block}.reader-sidebar,.source-module-nav{display:none}.reader-sidebar.open{display:block;position:fixed;inset:0 0 0 auto;width:min(360px,90vw);height:100vh;z-index:150;top:0;box-shadow:-20px 0 50px rgba(16,27,58,.2)}.reader-close{display:block;position:absolute;left:20px;top:20px;width:34px;height:34px;border:1px solid #ddd7cd;border-radius:50%;background:white}.reader-menu-button{display:block;margin:18px 22px 0;padding:10px 15px;border:1px solid #ddd7cd;border-radius:10px;background:white;font-weight:800}.reader-content,.source-module-content{padding-inline:22px}.workbook-modebar{align-items:start;flex-direction:column}.workbook-modebar [role="tablist"]{width:100%}.workbook-modebar [role="tab"]{flex:1}.workbook-page .topbar{top:207px}.source-module-nav{position:static;height:auto}.prompts-hero{align-items:start;flex-direction:column}.prompt-steps{width:100%}.prompt-steps span{flex:1}.prompt-grid{padding-inline:22px}.progress-overview,.next-step-card,.achievement-grid{margin-inline:22px}.progress-overview{grid-template-columns:1fr}.progress-ring{margin:auto}.achievement-grid{grid-template-columns:1fr 1fr}
}

@media (max-width: 560px) {
  .site-header{min-height:68px}.site-brand-parent{font-size:9px}.site-brand strong{font-size:15px}.site-cta{min-width:auto;padding:11px 12px;font-size:11px}.hero-section{padding-top:38px}.hero-copy h1{font-size:43px}.hero-copy>p{font-size:16px}.button{width:100%}.hero-product{min-height:430px}.book-mockup{width:170px;height:270px;padding:22px 18px}.book-mockup span{font-size:34px}.book-mockup strong{font-size:24px;margin-top:18px}.book-mockup b{font-size:15px}.book-mockup small{margin-top:54px}.workbook-mockup{width:140px;height:230px;padding:21px 17px;left:26%}.workbook-mockup strong{font-size:38px;margin-top:30px}.lesson-mockup{width:245px;height:250px;padding:18px;top:0}.lesson-mockup h3{font-size:22px;margin:25px 0 5px}.lesson-options{margin-top:10px}.mini-progress{margin-top:15px}.hero-proof>div{padding:0}.section{padding:70px 20px}.section-heading h2,.experience-copy>h2{font-size:38px}.exercise-type-grid{grid-template-columns:1fr}.experience-photo,.experience-photo img{height:400px;min-height:400px}.content-stats b{font-size:38px}.final-cta-section h2{font-size:37px}
  .dashboard-hero{align-items:start;flex-direction:column}.dashboard-progress{width:120px;height:120px}.dashboard-grid{padding-inline:14px}.dashboard-card,.dashboard-primary{padding:25px}.dashboard-primary h2{font-size:32px}.roadmap-grid{grid-template-columns:1fr}.reader-content{padding:22px 12px 55px}.reader-cover{min-height:250px;padding:28px}.reader-cover h1{font-size:36px}.reader-article{padding:32px 8px}.reader-table th,.reader-table td{padding:9px;font-size:11px}.source-module-content{padding:28px 12px}.source-module-heading{padding:27px}.source-exercise-card>header{padding:18px;display:block}.source-exercise-card>header>b{display:inline-block;margin-top:10px}.source-prompt,.source-inline-prompt{padding:20px 18px}.source-choice-grid{grid-template-columns:1fr;padding-inline:18px}.source-matching-board{grid-template-columns:1fr;padding-inline:18px}.source-action,.source-feedback{align-items:stretch;flex-direction:column}.source-action button,.source-feedback button{width:100%}.source-answer-area{width:calc(100% - 36px);margin-inline:18px}.prompt-grid{grid-template-columns:1fr;padding-inline:14px}.prompt-card{min-height:350px}.prompt-steps span{width:auto}.progress-overview,.next-step-card,.achievement-grid{margin-inline:14px}.progress-overview{padding:28px}.next-step-card{padding:28px;align-items:stretch;flex-direction:column}.achievement-grid{grid-template-columns:1fr}.workbook-modebar{top:68px;padding-inline:14px}.workbook-page .topbar{top:199px}
}

/* Full-book visual learning engine */
.reader-screen-bar { max-width: 980px; margin: 26px auto 18px; padding: 18px 20px; border: 1px solid #ded9cf; border-radius: 18px; background: rgba(255,253,248,.94); box-shadow: 0 12px 30px rgba(16,27,58,.06); display: grid; grid-template-columns: auto minmax(130px,1fr) auto; align-items: center; gap: 18px; }
.reader-screen-bar>div:first-child { display: grid; gap: 2px; }
.reader-screen-bar>div:first-child span { color: var(--coral); font-size: 10px; font-weight: 900; }
.reader-screen-bar>div:first-child b { font-size: 12px; }
.reader-screen-track { height: 6px; border-radius: 7px; background: #e3e0da; overflow: hidden; }
.reader-screen-track i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg,var(--coral),#ff9c92); transition: width 240ms ease; }
.reader-screen-bar nav { display: flex; gap: 5px; flex-wrap: wrap; justify-content: flex-end; }
.reader-screen-bar nav button { width: 28px; height: 28px; border: 1px solid #d8d2c8; border-radius: 8px; background: white; color: var(--muted); font-size: 10px; font-weight: 900; cursor: pointer; }
.reader-screen-bar nav button.active { border-color: var(--blue); background: var(--blue); color: white; }
.reader-page-card { min-height: 440px; margin: 0 auto 18px; padding: 48px 52px; border: 1px solid #ded9cf; border-radius: 24px; background: rgba(255,255,255,.88); box-shadow: 0 20px 50px rgba(16,27,58,.07); scroll-margin-top: 100px; position: relative; }
.reader-page-label { position: absolute; top: 17px; left: 20px; max-width: 44%; overflow: hidden; color: #9ba3b2; font-size: 9px; font-weight: 800; text-overflow: ellipsis; white-space: nowrap; }
.reader-page-card h1:first-of-type,.reader-page-card h2:first-of-type,.reader-page-card h3:first-of-type { margin-top: 8px; }
.reader-screen-navigation { max-width: 980px; min-height: 90px; margin: 0 auto 28px; padding: 15px 18px; display: grid; grid-template-columns: 150px 1fr 150px; align-items: center; gap: 16px; border-radius: 18px; background: #ece6db; }
.reader-screen-navigation>button { min-height: 46px; border: 1px solid #d3ccbf; border-radius: 12px; background: white; color: var(--blue); font-weight: 900; cursor: pointer; }
.reader-screen-navigation>button:disabled { opacity: .35; cursor: not-allowed; }
.reader-screen-navigation>div { display: grid; justify-items: center; gap: 3px; text-align: center; }
.reader-screen-navigation>div span { color: var(--coral); font-size: 15px; font-weight: 950; }
.reader-screen-navigation>div small { color: var(--muted); }

.chapter-visual-board { max-width: 980px; margin: 0 auto 20px; border-radius: 28px; overflow: hidden; background: #fffdf8; border: 1px solid #ded9cf; box-shadow: 0 24px 58px rgba(16,27,58,.1); }
.chapter-visual-heading { min-height: 170px; padding: 32px 38px; display: flex; justify-content: space-between; align-items: flex-end; gap: 30px; background: linear-gradient(135deg,#101b3a,#223765); color: white; position: relative; overflow: hidden; }
.chapter-visual-heading::after { content: ""; position: absolute; width: 220px; height: 220px; left: -80px; top: -90px; border: 48px solid rgba(255,255,255,.06); border-radius: 50%; }
.chapter-visual-heading>div { position: relative; z-index: 1; }
.chapter-visual-heading span { color: #ff968c; font-size: 11px; font-weight: 900; }
.chapter-visual-heading h2 { margin: 7px 0 8px; color: white; font-size: clamp(30px,4.5vw,48px); line-height: 1; letter-spacing: -.05em; }
.chapter-visual-heading p { margin: 0; color: #c3ccdc; font-size: 13px; }
.chapter-visual-heading>strong { color: rgba(255,255,255,.2); font-size: 76px; line-height: .85; }
.chapter-feature-image { height: 330px; border-bottom: 1px solid #ded9cf; position: relative; overflow: hidden; background: #e8e1d6; }
.chapter-feature-image::after { content: ""; position: absolute; inset: 0; box-shadow: inset 0 -45px 70px rgba(16,27,58,.18); }
.chapter-feature-image img { width: 100%; height: 100%; object-fit: cover; object-position: center 40%; }
.visual-concept-grid { padding: 25px 28px; display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 10px; }
.visual-concept-grid button { min-height: 138px; padding: 17px 13px; border: 1.5px solid #ddd7cd; border-radius: 17px; background: white; display: grid; justify-items: start; align-content: start; gap: 7px; text-align: right; cursor: pointer; transition: transform 160ms ease,border 160ms ease,background 160ms ease; }
.visual-concept-grid button:hover { transform: translateY(-2px); border-color: #afbae0; }
.visual-concept-grid button.active { border-color: var(--coral); background: var(--coral-soft); box-shadow: 0 0 0 3px rgba(255,111,97,.08); }
.visual-concept-grid button>span { min-width: 42px; min-height: 33px; padding: 5px 8px; display: grid; place-items: center; border-radius: 10px; background: var(--blue-soft); color: var(--blue); font-size: 12px; font-weight: 950; direction: ltr; }
.visual-concept-grid button.active>span { background: var(--coral); color: white; }
.visual-concept-grid button>b { color: var(--blue); font: 700 16px Georgia,"Times New Roman",serif; text-align: left; }
.visual-concept-grid button>small { color: var(--muted); line-height: 1.4; }
.visual-example-line { margin: 0 28px 25px; min-height: 70px; padding: 14px 18px; border-radius: 15px; background: var(--blue-soft); display: grid; grid-template-columns: auto 1fr; align-items: center; gap: 18px; }
.visual-example-line span { padding: 6px 9px; border-radius: 8px; background: var(--blue); color: white; font-size: 9px; font-weight: 900; }
.visual-example-line b { color: var(--blue); font: 700 18px Georgia,"Times New Roman",serif; text-align: left; }
.character-guide { margin: 0 28px 25px; min-height: 150px; padding: 18px 22px 18px 18px; border-radius: 20px; display: grid; grid-template-columns: 1fr 125px; align-items: center; gap: 22px; overflow: hidden; background: #f1e9dc; position: relative; }
.character-guide::before { content: ""; position: absolute; inset: 0 auto 0 0; width: 7px; background: var(--blue); }
.character-guide.character-coral::before { background: var(--coral); }
.character-guide.character-mint::before { background: var(--mint); }
.character-guide>img { grid-column: 2; grid-row: 1; width: 112px; height: 112px; border-radius: 24px; object-fit: cover; object-position: center 20%; background: white; box-shadow: 0 10px 25px rgba(16,27,58,.12); }
.character-guide>div { grid-column: 1; grid-row: 1; }
.character-guide span { color: var(--coral); font-size: 10px; font-weight: 900; }
.character-guide b { display: block; margin-top: 4px; color: var(--blue); font-size: 15px; }
.character-guide p { margin: 8px 0 0; color: #4e5a72; font-size: 13px; line-height: 1.65; }
.visual-quick-check { margin-top: 5px; padding: 28px; border-top: 1px solid #e5dfd5; background: #fbfaf7; }
.visual-quick-check>div:first-child>span { color: var(--coral); font-size: 10px; font-weight: 900; }
.visual-quick-check h3 { margin: 5px 0 14px; font-size: 19px; }
.visual-check-options { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; }
.visual-check-options button { min-height: 48px; padding: 9px; border: 1.5px solid #d9d3c9; border-radius: 12px; background: white; color: var(--blue); font-weight: 800; cursor: pointer; }
.visual-check-options button.selected { border-color: var(--blue); background: var(--blue-soft); }
.visual-check-action { min-width: 140px; margin-top: 14px; padding: 12px 20px; border: 0; border-radius: 11px; background: var(--blue); color: white; font-weight: 900; cursor: pointer; }
.visual-check-action:disabled { opacity: .35; }
.visual-check-feedback { margin-top: 16px; padding: 16px 18px; border-radius: 14px; display: flex; justify-content: space-between; align-items: center; gap: 20px; }
.visual-quick-check.correct .visual-check-feedback { background: var(--mint-soft); color: #176848; }
.visual-quick-check.wrong .visual-check-feedback { background: var(--coral-soft); color: #9d4037; }
.visual-check-feedback p { margin: 4px 0 0; font-size: 12px; }
.visual-check-feedback button { padding: 9px 13px; border: 1px solid currentColor; border-radius: 9px; background: white; color: inherit; font-weight: 850; }
.visual-pronouns .visual-concept-grid { grid-template-columns: repeat(7,1fr); }
.visual-pronouns .visual-concept-grid button { min-height: 120px; padding-inline: 9px; }
.visual-family .visual-concept-grid button:nth-child(4) { background: var(--mint-soft); }
.visual-frequency .visual-concept-grid button { border-top-width: 7px; }
.visual-frequency .visual-concept-grid button:nth-child(1) { border-top-color: var(--mint); }
.visual-frequency .visual-concept-grid button:nth-child(2) { border-top-color: #78a990; }
.visual-frequency .visual-concept-grid button:nth-child(3) { border-top-color: var(--amber); }
.visual-frequency .visual-concept-grid button:nth-child(4) { border-top-color: var(--coral); }
.visual-weather .visual-concept-grid button>span,.visual-cafe .visual-concept-grid button>span,.visual-body .visual-concept-grid button>span { font-size: 20px; }

.reading-lab { max-width: 980px; margin: 28px auto; border: 1px solid #d7d0c5; border-radius: 28px; overflow: hidden; background: white; box-shadow: 0 25px 60px rgba(16,27,58,.11); }
.reading-lab>header { min-height: 160px; padding: 27px 34px; display: grid; grid-template-columns: 1fr 110px; align-items: center; gap: 24px; background: linear-gradient(135deg,#17264f,#294174); color: white; }
.reading-lab>header span { color: #ff998f; font-size: 10px; font-weight: 900; }
.reading-lab>header h2 { margin: 5px 0 7px; color: white; font-size: 30px; }
.reading-lab>header p { margin: 0; color: #c9d1e1; }
.reading-lab>header img { width: 100px; height: 100px; border: 4px solid rgba(255,255,255,.7); border-radius: 24px; object-fit: cover; background: white; }
.reading-lab blockquote { margin: 0; padding: 28px 34px; border: 0; background: #f3ede3; color: #253352; font: 700 17px/1.85 Georgia,"Times New Roman",serif; text-align: left; }
.reading-lab-progress { margin: 22px 34px 0; height: 7px; border-radius: 7px; background: #e4e1db; position: relative; }
.reading-lab-progress span { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg,var(--coral),#ff9c92); }
.reading-lab-progress b { position: absolute; left: 0; top: 11px; color: var(--muted); font-size: 10px; }
.reading-question-card { padding: 32px 34px 34px; }
.reading-question-card>span { color: var(--coral); font-size: 10px; font-weight: 900; }
.reading-question-card h3 { margin: 6px 0 18px; font-size: 22px; }
.reading-choice-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 9px; }
.reading-choice-grid button { min-height: 52px; padding: 11px; border: 1.5px solid #dcd6cb; border-radius: 12px; background: white; color: var(--blue); font-weight: 800; cursor: pointer; }
.reading-choice-grid button.selected { border-color: var(--coral); background: var(--coral-soft); }
.reading-blank { display: grid; grid-template-columns: 1fr 190px; align-items: center; gap: 18px; padding: 18px; border: 1px solid #ded8cd; border-radius: 14px; background: #fbfaf7; }
.reading-blank input { min-width: 0; padding: 10px 8px; border: 0; border-bottom: 2px solid var(--blue); outline: 0; background: transparent; color: var(--blue); font-weight: 900; text-align: center; }
.reading-order-list { display: grid; gap: 8px; }
.reading-order-list>div { min-height: 53px; padding: 8px 11px; border: 1px solid #ddd7cc; border-radius: 12px; display: grid; grid-template-columns: 30px 1fr 32px 32px; align-items: center; gap: 8px; }
.reading-order-list>div>span { width: 27px; height: 27px; display: grid; place-items: center; border-radius: 8px; background: var(--blue-soft); color: var(--blue); font-size: 10px; font-weight: 900; }
.reading-order-list button { width: 30px; height: 30px; border: 1px solid #d8d2c8; border-radius: 8px; background: white; }
.reading-check-button { min-width: 150px; margin-top: 17px; padding: 12px 18px; border: 0; border-radius: 11px; background: var(--blue); color: white; font-weight: 900; }
.reading-check-button:disabled { opacity: .35; }
.reading-feedback { margin-top: 18px; padding: 17px 19px; border-radius: 14px; display: flex; justify-content: space-between; align-items: center; gap: 22px; }
.reading-feedback.correct { background: var(--mint-soft); color: #1b6e50; }
.reading-feedback.wrong { background: var(--coral-soft); color: #9c4138; }
.reading-feedback p { margin: 4px 0 0; font-size: 12px; }
.reading-feedback button { padding: 10px 14px; border: 1px solid currentColor; border-radius: 9px; background: white; color: inherit; font-weight: 900; }
.reading-complete { min-height: 350px; padding: 48px; display: grid; place-items: center; align-content: center; text-align: center; background: linear-gradient(145deg,#eaf8f1,#fffdf8); }
.reading-complete-mark { width: 70px; height: 70px; display: grid; place-items: center; border-radius: 50%; background: var(--mint); color: white; font-size: 34px; }
.reading-complete>span:not(.reading-complete-mark) { margin-top: 15px; color: #227657; font-weight: 900; }
.reading-complete h2 { margin: 5px 0; color: var(--blue); font-size: 46px; }
.reading-complete p { max-width: 520px; color: var(--muted); }
.reading-complete button { margin-top: 12px; padding: 11px 17px; border: 1px solid var(--blue); border-radius: 10px; background: white; color: var(--blue); font-weight: 900; }

/* Richer interactive exercise families */
.type-memory { background: #ede8fa; color: #6850a3; }
.type-visual-choice { background: #e7f5f1; color: #21765d; }
.type-dialogue { background: #fff0ec; color: #aa4c40; }
.type-error { background: #fff2db; color: #9a6614; }
.type-sentence { background: #e9edf8; color: #314c91; }
.type-timeline { background: #edf5e9; color: #4e773e; }
.memory-board { padding: 30px 38px; display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; background: linear-gradient(145deg,#f4efe6,#faf8f3); }
.memory-board button { aspect-ratio: 1.25; min-height: 92px; padding: 13px; border: 1.5px solid #d7d0c4; border-radius: 16px; background: linear-gradient(145deg,#17264f,#263c70); color: white; cursor: pointer; transform-style: preserve-3d; transition: transform 220ms ease,background 220ms ease,border 220ms ease; }
.memory-board button:hover:not(:disabled) { transform: translateY(-3px) rotate(.5deg); }
.memory-board button>span { font-size: 22px; opacity: .48; }
.memory-board button>b { display: none; font-size: 13px; line-height: 1.35; }
.memory-board button.open { transform: rotateY(180deg); border-color: #9ba9d8; background: white; color: var(--blue); }
.memory-board button.open>span { display: none; }
.memory-board button.open>b { display: block; transform: rotateY(180deg); }
.memory-board button.matched { border-color: #6ec29c; background: var(--mint-soft); color: #1d6e50; opacity: 1; }
.memory-status { min-height: 82px; padding: 15px 38px; border-top: 1px solid #e5dfd6; background: #fbfaf7; display: flex; align-items: center; justify-content: space-between; gap: 22px; }
.memory-status>div { display: grid; gap: 4px; }
.memory-status span { color: var(--muted); font-size: 11px; }
.memory-status button { min-width: 130px; padding: 12px 18px; border: 0; border-radius: 11px; background: var(--blue); color: white; font-weight: 900; }
.memory-status button:disabled { opacity: .3; }
.memory-status.complete { background: var(--mint-soft); }
.choice-visual-choice .choice-card { min-height: 70px; padding-right: 55px; position: relative; text-align: right; }
.choice-visual-choice .choice-card::before { content: "◉"; position: absolute; right: 15px; top: 50%; translate: 0 -50%; width: 28px; height: 28px; display: grid; place-items: center; border-radius: 9px; background: var(--blue-soft); color: var(--blue); }
.choice-visual-choice .choice-card:nth-child(2)::before { content: "◆"; }
.choice-visual-choice .choice-card:nth-child(3)::before { content: "▲"; }
.choice-visual-choice .choice-card:nth-child(4)::before { content: "●"; }
.choice-dialogue .choice-card { border-radius: 18px 5px 18px 18px; background: #fffaf7; }
.choice-dialogue .choice-card:nth-child(even) { border-radius: 5px 18px 18px 18px; background: #f6f8fc; }
.choice-error .choice-question { padding: 16px; border: 1px solid #e6dfd4; border-right: 5px solid var(--amber); border-radius: 14px; background: #fffdf8; }
.sentence-builder-grid { grid-template-columns: 1fr; }
.sentence-builder-grid .inline-row { min-height: 82px; border-right: 5px solid #8ba0da; background: #fafbff; }
.order-timeline { position: relative; }
.order-timeline::before { content: ""; position: absolute; right: 54px; top: 30px; bottom: 36px; width: 2px; background: #cfd8c8; }
.order-timeline .order-card { padding-right: 18px; position: relative; }
.order-timeline .order-number { z-index: 1; border: 3px solid white; background: #5f8a4d; color: white; }

@media (max-width: 1100px) {
  .visual-pronouns .visual-concept-grid { grid-template-columns: repeat(4,1fr); }
  .visual-concept-grid { grid-template-columns: repeat(2,1fr); }
}

@media (max-width: 700px) {
  .reader-screen-bar { grid-template-columns: 1fr; margin-inline: 0; }
  .reader-screen-bar nav { justify-content: flex-start; }
  .reader-page-card { min-height: 360px; padding: 40px 20px 25px; }
  .reader-screen-navigation { grid-template-columns: 1fr 1fr; }
  .reader-screen-navigation>div { grid-row: 1; grid-column: 1/-1; }
  .chapter-visual-heading { min-height: 190px; padding: 28px 23px; }
  .chapter-visual-heading>strong { font-size: 54px; }
  .chapter-feature-image { height: 245px; }
  .visual-concept-grid,.visual-pronouns .visual-concept-grid { grid-template-columns: repeat(2,1fr); padding-inline: 17px; }
  .visual-concept-grid button { min-height: 125px; }
  .visual-example-line { margin-inline: 17px; grid-template-columns: 1fr; }
  .character-guide { margin-inline: 17px; grid-template-columns: 1fr 82px; padding: 15px; }
  .character-guide>img { width: 76px; height: 76px; border-radius: 18px; }
  .visual-quick-check { padding: 22px 17px; }
  .visual-check-options { grid-template-columns: 1fr 1fr; }
  .visual-check-feedback,.reading-feedback { align-items: stretch; flex-direction: column; }
  .reading-lab>header { grid-template-columns: 1fr 75px; padding: 23px 20px; }
  .reading-lab>header img { width: 70px; height: 70px; border-radius: 18px; }
  .reading-lab blockquote { padding: 23px 20px; font-size: 15px; }
  .reading-lab-progress { margin-inline: 20px; }
  .reading-question-card { padding: 30px 20px 24px; }
  .reading-choice-grid { grid-template-columns: 1fr; }
  .reading-blank { grid-template-columns: 1fr; }
  .memory-board { grid-template-columns: repeat(3,1fr); padding-inline: 18px; }
  .memory-status { padding-inline: 18px; }
}

@media (max-width: 480px) {
  .memory-board { grid-template-columns: repeat(2,1fr); }
  .memory-board button { min-height: 82px; }
  .memory-status { align-items: stretch; flex-direction: column; }
  .memory-status button { width: 100%; }
}

/* Image-led premium visual system */
.hero-photo { inset: 0 0 10px 5%; width: 95%; height: 95%; border-radius: 32px 180px 32px 32px; opacity: .52; filter: saturate(.9) contrast(.95); }
.hero-photo-label { position: absolute; right: 5%; bottom: 22px; z-index: 4; width: 190px; min-height: 130px; padding: 20px; border-radius: 20px; background: rgba(16,27,58,.94); color: white; box-shadow: 0 22px 48px rgba(16,27,58,.25); backdrop-filter: blur(8px); }
.hero-photo-label span,.hero-photo-label b,.hero-photo-label small { display: block; }
.hero-photo-label span { color: var(--coral); font-size: 35px; font-weight: 950; line-height: 1; }
.hero-photo-label b { margin-top: 8px; font-size: 16px; }
.hero-photo-label small { margin-top: 5px; color: #bdc7db; line-height: 1.45; }

.package-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); align-items: stretch; }
.package-card { min-height: 590px; padding: 0; border-radius: 26px; }
.package-card::after { display: none; }
.package-visual { height: 260px; flex: 0 0 auto; position: relative; overflow: hidden; background: #e8e4dc; }
.package-card-copy { min-height: 330px; padding: 27px 30px 30px; display: flex; flex-direction: column; }
.package-card h3 { margin: 16px 0 11px; font-size: 27px; }
.package-card p { margin: 0; font-size: 14px; }
.package-card a { margin-top: auto; padding-top: 22px; }
.book-preview img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.63) saturate(.82); }
.book-preview::after { content: ""; position: absolute; inset: 0; background: linear-gradient(0deg, rgba(16,27,58,.9), rgba(16,27,58,.05) 70%); }
.book-preview>div { position: absolute; inset: auto 24px 23px; z-index: 1; color: white; }
.book-preview small,.book-preview strong,.book-preview span { display: block; }
.book-preview small { color: #ff958c; font-size: 10px; font-weight: 900; letter-spacing: .12em; }
.book-preview strong { margin-top: 4px; font: 700 29px Georgia, serif; }
.book-preview span { margin-top: 5px; color: #d9dfeb; font-size: 11px; }
.practice-preview { padding: 25px; background: linear-gradient(145deg, #17264f, #263c70); color: white; }
.practice-preview-top { display: flex; justify-content: space-between; align-items: center; font-size: 12px; }
.practice-preview-top b { color: #ff958c; }
.practice-pairs { margin-top: 31px; display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
.practice-pairs span { min-height: 45px; display: grid; place-items: center; border: 1px solid rgba(255,255,255,.18); border-radius: 12px; background: rgba(255,255,255,.08); font-size: 12px; font-weight: 800; }
.practice-pairs .is-active { border-color: #ff9187; background: rgba(255,111,97,.18); }
.practice-preview-progress { height: 6px; margin-top: 25px; border-radius: 6px; background: rgba(255,255,255,.14); overflow: hidden; }
.practice-preview-progress i { display: block; width: 62%; height: 100%; border-radius: inherit; background: var(--coral); }
.prompt-preview { padding: 30px 24px; display: grid; grid-template-columns: 48px 1fr; gap: 14px; background: linear-gradient(145deg, #f4ede1, #fffdf8); }
.prompt-avatar { width: 46px; height: 46px; display: grid; place-items: center; border-radius: 15px; background: var(--coral); color: white; font-family: Georgia, serif; font-size: 21px; font-weight: 900; }
.prompt-preview>div { padding: 17px; border-radius: 5px 18px 18px 18px; background: white; box-shadow: 0 15px 35px rgba(16,27,58,.1); }
.prompt-preview small { color: var(--coral); font-weight: 900; }
.prompt-preview p { margin: 8px 0 12px; color: #46516a; font-size: 12px; line-height: 1.65; }
.prompt-preview b { color: var(--blue); font-size: 10px; }

.visual-journey-section { background: #f1e8d9; }
.visual-journey-heading { max-width: 1280px; margin: 0 auto 42px; display: grid; grid-template-columns: 1.2fr .8fr; align-items: end; gap: 60px; }
.visual-journey-heading h2 { max-width: 760px; margin: 12px 0 0; font-size: clamp(40px, 4.6vw, 64px); line-height: 1.04; letter-spacing: -.06em; }
.visual-journey-heading>p { margin: 0; color: var(--muted); font-size: 16px; line-height: 1.75; }
.unit-gallery { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 13px; }
.unit-gallery-card { min-height: 360px; border-radius: 22px; position: relative; overflow: hidden; background: var(--blue); color: white; box-shadow: 0 16px 35px rgba(16,27,58,.13); transition: transform 220ms ease, box-shadow 220ms ease; }
.unit-gallery-card:nth-child(2),.unit-gallery-card:nth-child(4),.unit-gallery-card:nth-child(7),.unit-gallery-card:nth-child(9) { transform: translateY(18px); }
.unit-gallery-card:hover { transform: translateY(-5px); box-shadow: 0 24px 48px rgba(16,27,58,.22); }
.unit-gallery-card img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: saturate(.82); }
.unit-gallery-card::after { content: ""; position: absolute; inset: 0; background: linear-gradient(0deg, rgba(9,18,42,.96), rgba(9,18,42,.06) 72%); }
.unit-gallery-card>div { position: absolute; z-index: 1; inset: auto 20px 20px; text-align: right; }
.unit-gallery-card>div>span { position: absolute; left: 0; bottom: 0; color: rgba(255,255,255,.35); font-size: 38px; font-weight: 950; }
.unit-gallery-card small { color: #ff988f; font-family: Georgia, serif; }
.unit-gallery-card h3 { margin: 4px 0; font-size: 19px; }
.unit-gallery-card p { max-width: 150px; margin: 0; color: #c6cfde; font-size: 10px; line-height: 1.45; }
.content-photo-row { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; position: relative; z-index: 2; }
.content-photo-row div { height: 150px; border-radius: 16px; overflow: hidden; position: relative; }
.content-photo-row img { width: 100%; height: 100%; object-fit: cover; filter: saturate(.72) brightness(.65); }
.content-photo-row span { position: absolute; inset: auto 14px 13px; text-align: right; color: white; font-size: 12px; font-weight: 900; }

.dashboard-hero { max-width: 1280px; min-height: 390px; margin-top: 42px; padding: 0; border-radius: 30px; overflow: hidden; position: relative; color: white; box-shadow: 0 30px 70px rgba(16,27,58,.18); }
.dashboard-hero::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(16,27,58,.25), rgba(16,27,58,.96) 68%); }
.dashboard-hero>img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.dashboard-hero-copy { max-width: 720px; padding: 58px; position: relative; z-index: 2; }
.dashboard-hero h1 { margin: 8px 0; color: white; font-size: clamp(50px,6vw,78px); }
.dashboard-hero p { color: #cbd3e2; }
.dashboard-quick-stats { margin-top: 28px; display: flex; gap: 22px; flex-wrap: wrap; color: #c9d0df; font-size: 11px; }
.dashboard-quick-stats b { color: white; font-size: 18px; }
.dashboard-progress { margin-left: 48px; position: relative; z-index: 2; background: conic-gradient(var(--coral) var(--progress),rgba(255,255,255,.18) 0); }
.dashboard-grid { padding-top: 38px; }
.dashboard-card { border-radius: 24px; position: relative; }
.dashboard-card>*:not(.dashboard-card-watermark) { position: relative; z-index: 1; }
.dashboard-card-watermark { position: absolute; inset: 0 48% 0 0; width: 52%; height: 100%; object-fit: cover; opacity: .2; mask-image: linear-gradient(90deg, #000, transparent); }
.dashboard-primary { background: linear-gradient(145deg,#111c3b,#1b2e5f); }
.dashboard-media-card { min-height: 270px; padding: 0; display: grid; grid-template-columns: 42% 58%; }
.dashboard-media-card>img { width: 100%; height: 100%; object-fit: cover; }
.dashboard-media-card>div { padding: 25px; display: flex; flex-direction: column; }
.dashboard-media-card>div>b { margin-top: auto; color: var(--blue); font-size: 12px; }
.dashboard-prompt-card { background: #fffaf2; }
.dashboard-chat-bubble { max-width: 220px; margin-right: auto; padding: 13px 16px; border-radius: 16px 4px 16px 16px; background: var(--coral-soft); color: #9c4038; font: 700 14px Georgia, serif; direction: ltr; }
.roadmap-grid { grid-template-columns: repeat(5, 1fr); gap: 13px; }
.roadmap-grid article { min-height: 270px; border-radius: 20px; overflow: hidden; position: relative; background: #fff; border: 1px solid #ded9cf; }
.roadmap-grid article>img { width: 100%; height: 150px; object-fit: cover; }
.roadmap-grid article>div { padding: 15px; position: relative; display: grid; }
.roadmap-grid article span { position: absolute; left: 13px; top: -29px; width: 44px; height: 44px; border: 4px solid white; background: var(--coral); color: white; }
.roadmap-grid article small { color: var(--coral); font: 700 11px Georgia,serif; }
.roadmap-grid article b { margin-top: 4px; font-size: 14px; }
.roadmap-grid article p { margin: 5px 0 0; color: var(--muted); font-size: 10px; line-height: 1.45; }

.reader-sidebar { background: linear-gradient(180deg,#fffdf8,#f2eadf); }
.reader-sidebar nav button { min-height: 48px; grid-template-columns: 40px 1fr; align-items: center; }
.reader-sidebar nav button img { width: 38px; height: 38px; border-radius: 10px; object-fit: cover; }
.reader-sidebar nav button.active img { outline: 2px solid #ff8d83; outline-offset: 2px; }
.reader-cover { min-height: 430px; padding: 55px; }
.reader-cover.has-photo::after { background: linear-gradient(90deg, rgba(16,27,58,.15), rgba(16,27,58,.97) 76%); }
.reader-cover-number { position: absolute; z-index: 2; left: 34px; top: 23px; color: rgba(255,255,255,.62)!important; font-size: 70px!important; font-weight: 950; line-height: 1; }
.reader-cover-meta { display: flex; align-items: center; gap: 10px; }
.reader-cover-meta small { padding-right: 10px; border-right: 1px solid rgba(255,255,255,.24); color: #d2d9e7; font-family: Georgia,serif; }
.reader-cover-progress { width: min(430px,100%); height: 5px; margin-top: 25px; border-radius: 5px; background: rgba(255,255,255,.17); position: relative; }
.reader-cover-progress i { display: block; height: 100%; border-radius: inherit; background: var(--coral); }
.reader-cover-progress small { position: absolute; left: 0; top: 10px; color: #bec7d7; }
.reader-article { max-width: 920px; }
.reader-article>p:first-child { font-size: 19px; color: #263655; }
.reader-article h2 { padding: 13px 17px; border-right: 5px solid var(--coral); border-radius: 10px; background: linear-gradient(90deg,transparent,#eef1f7); }
.reader-callout { margin: 25px 0!important; padding: 20px 22px; border-radius: 16px; }
.reader-tip { border-right: 5px solid var(--amber); background: #fff5dd; }
.reader-example { border-right: 5px solid var(--coral); background: var(--coral-soft); }
.reader-spanish-line { padding: 13px 17px; border-radius: 12px; background: white; box-shadow: 0 8px 24px rgba(16,27,58,.06); color: var(--blue)!important; font-family: Georgia, "Times New Roman", serif; font-size: 18px!important; direction: ltr; text-align: left; }

.workbook-modebar { min-height: 86px; }
.workbook-mode-copy { display: flex!important; grid-template-columns: none!important; align-items: center; gap: 13px; }
.workbook-mode-copy img { width: 54px; height: 54px; object-fit: cover; border-radius: 14px; }
.workbook-mode-copy>div { display: grid; gap: 3px; }
.workbook-page .topbar { top: 162px; }
.workbook-page .chapter-panel { top: 248px; height: calc(100vh - 248px); }
.chapter-panel-visual { height: 120px; margin: 13px 0 15px; border-radius: 16px; overflow: hidden; position: relative; }
.chapter-panel-visual img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.72) saturate(.8); }
.chapter-panel-visual span { position: absolute; inset: auto 12px 10px; color: white; font-size: 10px; font-weight: 900; }
.exercise-scene { max-width: 900px; height: 150px; margin: 0 auto 15px; border-radius: 22px; overflow: hidden; position: relative; display: flex; align-items: end; color: white; }
.exercise-scene::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg,rgba(16,27,58,.15),rgba(16,27,58,.92) 75%); }
.exercise-scene img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.exercise-scene>div { padding: 24px 28px; display: grid; position: relative; z-index: 1; }
.exercise-scene>div span { color: #ff998f; font-size: 10px; font-weight: 900; letter-spacing: .12em; }
.exercise-scene>div b { margin-top: 2px; font: 700 22px Georgia,serif; }
.exercise-scene>div small { margin-top: 4px; color: #c9d2e1; }
.exercise-scene>strong { position: absolute; z-index: 1; left: 25px; top: 20px; color: rgba(255,255,255,.52); font-size: 45px; }
.source-module-heading { min-height: 260px; padding: 0; position: relative; display: flex; align-items: end; overflow: hidden; }
.source-module-heading::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg,rgba(16,27,58,.1),rgba(16,27,58,.96) 72%); }
.source-module-heading>img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.source-module-heading>div { padding: 38px 40px; position: relative; z-index: 1; }
.source-module-heading>div>span { color: #ff9187; font-size: 11px; font-weight: 900; }
.source-module-heading>div>small { margin-right: 9px; color: #cbd4e3; font-family: Georgia,serif; }

.prompts-hero { min-height: 570px; margin-top: 35px; padding: 0 42px 0 0; align-items: center; border-radius: 28px; overflow: hidden; background: var(--blue); color: white; box-shadow: 0 28px 65px rgba(16,27,58,.17); }
.prompts-hero-copy { width: 54%; padding: 50px 42px 50px 0; }
.prompts-hero h1 { color: white; }
.prompts-hero p { color: #c2cbdb; }
.prompts-hero-visual { width: 46%; align-self: stretch; position: relative; }
.prompts-hero-visual>img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.72) saturate(.78); }
.prompts-hero-visual::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg,transparent,rgba(16,27,58,.7)); }
.prompts-hero-visual>div { position: absolute; z-index: 1; left: 35px; right: 35px; bottom: 35px; padding: 21px; border-radius: 18px 5px 18px 18px; background: rgba(255,255,255,.94); color: var(--blue); box-shadow: 0 20px 50px rgba(0,0,0,.18); }
.prompts-hero-visual small,.prompts-hero-visual b,.prompts-hero-visual span { display: block; }
.prompts-hero-visual small { color: var(--coral); }
.prompts-hero-visual b { margin-top: 7px; font-size: 18px; }
.prompts-hero-visual span { margin-top: 6px; color: var(--muted); font-size: 11px; }
.prompt-steps { margin-top: 28px; }
.prompt-steps span { width: 88px; height: 78px; border-color: rgba(255,255,255,.13); background: rgba(255,255,255,.08); color: #d2d9e6; }
.prompt-filters { padding-top: 36px; }
.prompt-card { min-height: 500px; padding: 0 25px 25px; overflow: hidden; border-radius: 22px; transition: transform 180ms ease, box-shadow 180ms ease; }
.prompt-card:hover { transform: translateY(-4px); box-shadow: 0 22px 46px rgba(16,27,58,.11); }
.prompt-card-image { height: 150px; margin: 0 -25px 21px; position: relative; }
.prompt-card-image img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.7) saturate(.78); }
.prompt-card-image span { position: absolute; right: 17px; bottom: 14px; padding: 6px 9px; border-radius: 8px; background: var(--coral); color: white; font-size: 10px; font-weight: 900; }
.prompt-card h2 { margin-top: 19px; }

.progress-hero { max-width: 1180px; min-height: 360px; margin-top: 38px; padding: 0; border-radius: 28px; overflow: hidden; position: relative; display: grid; place-items: center; color: white; }
.progress-hero::after { content: ""; position: absolute; inset: 0; background: rgba(16,27,58,.76); }
.progress-hero>img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: saturate(.78); }
.progress-hero>div { max-width: 820px; padding: 40px; position: relative; z-index: 1; }
.progress-hero h1 { color: white; }
.progress-hero p { color: #ced5e2; }
.progress-overview { margin-top: 28px; }
.progress-journey { max-width: 1180px; margin: 58px auto 28px; }
.progress-journey>div:first-child h2 { margin: 8px 0 25px; font-size: 34px; }
.progress-unit-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 12px; }
.progress-unit-grid article { height: 180px; border-radius: 18px; overflow: hidden; position: relative; background: var(--blue); }
.progress-unit-grid article::after { content: ""; position: absolute; inset: 0; background: linear-gradient(0deg,rgba(16,27,58,.94),rgba(16,27,58,.05)); }
.progress-unit-grid article.complete { outline: 3px solid var(--mint); outline-offset: 2px; }
.progress-unit-grid img { width: 100%; height: 100%; object-fit: cover; filter: saturate(.72); }
.progress-unit-grid article>div { position: absolute; z-index: 1; inset: auto 14px 13px; color: white; display: grid; }
.progress-unit-grid span { position: absolute; left: 0; bottom: 0; color: #ff9b92; font-weight: 900; }
.progress-unit-grid small { color: #ff9b92; font: 700 10px Georgia,serif; }
.progress-unit-grid b { margin-top: 3px; font-size: 12px; }

@media (max-width: 1120px) {
  .unit-gallery { grid-template-columns: repeat(3,1fr); }
  .package-grid { grid-template-columns: repeat(2,1fr); }
  .package-card:last-child { grid-column: 1/-1; }
  .roadmap-grid,.progress-unit-grid { grid-template-columns: repeat(3,1fr); }
}

@media (max-width: 840px) {
  .hero-photo-label { right: 0; }
  .visual-journey-heading { grid-template-columns: 1fr; gap: 18px; }
  .unit-gallery { grid-template-columns: repeat(2,1fr); }
  .unit-gallery-card:nth-child(n) { transform: none; }
  .content-photo-row { grid-template-columns: repeat(2,1fr); }
  .content-photo-row div:last-child { grid-column: 1/-1; }
  .dashboard-hero { margin: 24px 22px 0; min-height: 480px; align-items: end; }
  .dashboard-hero::after { background: linear-gradient(0deg,rgba(16,27,58,.97),rgba(16,27,58,.16)); }
  .dashboard-hero-copy { padding: 35px; }
  .dashboard-progress { position: absolute; left: 25px; top: 25px; margin: 0; width: 120px; height: 120px; }
  .roadmap-grid,.progress-unit-grid { grid-template-columns: repeat(2,1fr); }
  .reader-cover { min-height: 360px; }
  .workbook-page .topbar { top: 216px; }
  .prompts-hero { margin-inline: 22px; padding: 0; flex-direction: column-reverse; }
  .prompts-hero-copy,.prompts-hero-visual { width: 100%; }
  .prompts-hero-copy { padding: 35px; }
  .prompts-hero-visual { min-height: 320px; }
  .progress-hero { margin-inline: 22px; }
  .progress-journey { margin-inline: 22px; }
}

@media (max-width: 560px) {
  .hero-photo { border-radius: 25px 90px 25px 25px; }
  .hero-photo-label { width: 150px; min-height: 105px; padding: 15px; bottom: 0; }
  .hero-photo-label span { font-size: 26px; }
  .hero-photo-label b { font-size: 13px; }
  .package-grid,.unit-gallery { grid-template-columns: 1fr; }
  .package-card:last-child { grid-column: auto; }
  .package-card { min-height: 540px; }
  .package-visual { height: 225px; }
  .visual-journey-heading h2 { font-size: 38px; }
  .unit-gallery-card { min-height: 300px; }
  .content-photo-row { grid-template-columns: 1fr; }
  .content-photo-row div:last-child { grid-column: auto; }
  .dashboard-hero { margin-inline: 14px; min-height: 520px; }
  .dashboard-hero-copy { padding: 25px; }
  .dashboard-quick-stats { gap: 12px; }
  .dashboard-media-card { grid-template-columns: 1fr; }
  .dashboard-media-card>img { height: 150px; }
  .roadmap-grid,.progress-unit-grid { grid-template-columns: 1fr 1fr; }
  .roadmap-grid article { min-height: 230px; }
  .roadmap-grid article>img { height: 120px; }
  .reader-cover { min-height: 390px; padding: 28px; }
  .reader-cover-number { font-size: 48px!important; }
  .reader-cover-meta { align-items: start; flex-direction: column; }
  .reader-cover-meta small { padding: 0; border: 0; }
  .reader-spanish-line { font-size: 16px!important; }
  .workbook-mode-copy img { display: none; }
  .workbook-page .topbar { top: 207px; }
  .exercise-scene { height: 120px; border-radius: 18px; }
  .exercise-scene>div { padding: 18px; }
  .source-module-heading { min-height: 220px; }
  .source-module-heading>div { padding: 27px; }
  .prompts-hero { margin-inline: 14px; }
  .prompts-hero-visual { min-height: 250px; }
  .prompts-hero-visual>div { left: 18px; right: 18px; bottom: 18px; }
  .progress-hero { min-height: 390px; margin-inline: 14px; }
  .progress-journey { margin-inline: 14px; }
  .progress-unit-grid article { height: 145px; }
}
