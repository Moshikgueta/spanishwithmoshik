"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import { content, unitVisuals } from "../content";

export default function CourseDashboard() {
  const [interactiveDone, setInteractiveDone] = useState(0);
  const [sourceDone, setSourceDone] = useState(0);
  const [lastBook, setLastBook] = useState("מתחילים מההתחלה");

  useEffect(() => {
    const restore = window.requestAnimationFrame(() => {
      try {
        const interactive = JSON.parse(localStorage.getItem("moshik-workbook-progress") || "[]");
        const source = JSON.parse(localStorage.getItem("moshik-source-progress") || "[]");
        setInteractiveDone(Array.isArray(interactive) ? interactive.length : 0);
        setSourceDone(Array.isArray(source) ? source.length : 0);
        setLastBook(localStorage.getItem("moshik-book-last-title") || "מתחילים מההתחלה");
      } catch {
        // The dashboard still works if local storage is disabled.
      }
    });
    return () => window.cancelAnimationFrame(restore);
  }, []);

  const totalInteractive = 300;
  const overall = Math.min(100, Math.round(((interactiveDone + sourceDone) / (totalInteractive + content.meta.exerciseCount)) * 100));

  return (
    <main className="app-page dashboard-page">
      <SiteHeader />
      <section className="dashboard-hero">
        <img src="/images/cover-collage.jpg" alt="רגעים מהעולם דובר הספרדית" />
        <div className="dashboard-hero-copy">
          <span className="marketing-eyebrow">¡Hola! ממשיכים מכאן</span>
          <h1>הקורס שלך</h1>
          <p>כל הספר, התרגול והפרומפטים במקום אחד. ההתקדמות נשמרת במכשיר הזה.</p>
          <div className="dashboard-quick-stats"><span><b>30</b> פרקים</span><span><b>{content.meta.exerciseCount}</b> משימות מקור</span><span><b>10</b> יחידות</span></div>
        </div>
        <div className="dashboard-progress" style={{ "--progress": `${overall * 3.6}deg` } as React.CSSProperties}>
          <div><b>{overall}%</b><span>התקדמות כוללת</span></div>
        </div>
      </section>

      <section className="dashboard-grid">
        <Link className="dashboard-card dashboard-primary" href="/workbook">
          <img className="dashboard-card-watermark" src="/images/units/unit-06.jpg" alt="" />
          <span className="card-kicker">המשך תרגול</span>
          <h2>חוברת העבודה האינטראקטיבית</h2>
          <p>30 פרקים עם השלמה, התאמה, בחירה, סידור ומשוב מיידי.</p>
          <div className="card-progress"><span style={{ width: `${Math.min(100, Math.round(interactiveDone / totalInteractive * 100))}%` }} /></div>
          <b>{interactiveDone} תרגילים הושלמו <i>←</i></b>
        </Link>

        <Link className="dashboard-card dashboard-media-card" href="/book">
          <img src="/images/units/unit-02.jpg" alt="שיחה בבית קפה" />
          <div><span className="card-kicker">הספר המלא</span><h2>חוזרים להסבר</h2><p>{lastBook}</p><b>פתיחת הקורא הדיגיטלי <i>←</i></b></div>
        </Link>

        <Link className="dashboard-card dashboard-prompt-card" href="/prompts">
          <div className="dashboard-chat-bubble">¿Qué te gusta hacer?</div>
          <span className="card-kicker">בונוס</span><h2>תרגול עם ChatGPT</h2><p>פרומפטים מוכנים לשיחה, אוצר מילים, דקדוק, תיקון כתיבה ומשחקי תפקידים.</p><b>בחירת פרומפט <i>←</i></b>
        </Link>

        <Link className="dashboard-card dashboard-photo" href="/progress">
          <img src="/images/city-plaza.png" alt="רחבה עירונית תוססת בעולם דובר הספרדית" />
          <div><span className="card-kicker">תמונת מצב</span><h2>{sourceDone} משימות מקור הושלמו</h2><b>לכל ההתקדמות <i>←</i></b></div>
        </Link>
      </section>

      <section className="dashboard-roadmap">
        <div className="section-heading compact">
          <span className="marketing-eyebrow">מפת הדרך</span>
          <h2>עשרה שלבים. יעד אחד ברור.</h2>
        </div>
        <div className="roadmap-grid">
          {unitVisuals.map((unit) => (
            <article key={unit.number}>
              <img src={unit.image} alt="" />
              <div><span>{String(unit.number).padStart(2, "0")}</span><small>{unit.spanish}</small><b>{unit.title}</b><p>{unit.description}</p></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
