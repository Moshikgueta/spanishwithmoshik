"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import { content, unitVisuals } from "../content";

export default function ProgressPage() {
  const [guided, setGuided] = useState<string[]>([]);
  const [source, setSource] = useState<string[]>([]);
  useEffect(() => {
    const restore = window.requestAnimationFrame(() => {
      try {
        setGuided(JSON.parse(localStorage.getItem("moshik-workbook-progress") || "[]"));
        setSource(JSON.parse(localStorage.getItem("moshik-source-progress") || "[]"));
      } catch { /* optional */ }
    });
    return () => window.cancelAnimationFrame(restore);
  }, []);
  const guidedTotal = 300;
  const sourceTotal = content.meta.exerciseCount;
  const totalDone = guided.length + source.length;
  const total = guidedTotal + sourceTotal;
  const overall = Math.round(totalDone / total * 100);
  const guidedChapters = new Set(guided.map((id) => id.match(/chapter-(\d+)/)?.[1]).filter(Boolean));
  return (
    <main className="app-page progress-page">
      <SiteHeader />
      <section className="progress-hero"><img src="/images/cover-collage.jpg" alt="רגעים מהמסע בספרדית" /><div><span className="marketing-eyebrow">התקדמות אישית</span><h1>{overall ? `כבר השלמתם ${overall}%` : "המסע מתחיל בתרגיל הראשון"}</h1><p>הנתונים נשמרים בדפדפן שלכם. אפשר לחזור לכל פרק ולתרגל שוב בכל זמן.</p></div></section>
      <section className="progress-overview">
        <div className="progress-ring" style={{ "--progress": `${overall * 3.6}deg` } as React.CSSProperties}><div><b>{overall}%</b><span>מהתרגול</span></div></div>
        <div className="progress-metrics">
          <article><span>מסלול אינטראקטיבי</span><b>{guided.length}/{guidedTotal}</b><div><i style={{ width: `${guided.length / guidedTotal * 100}%` }} /></div></article>
          <article><span>משימות חוברת המקור</span><b>{source.length}/{sourceTotal}</b><div><i style={{ width: `${source.length / sourceTotal * 100}%` }} /></div></article>
          <article><span>פרקים שהתחלתם</span><b>{guidedChapters.size}/30</b><div><i style={{ width: `${guidedChapters.size / 30 * 100}%` }} /></div></article>
        </div>
      </section>
      <section className="next-step-card"><div><span className="marketing-eyebrow">הצעד הבא</span><h2>{guided.length ? "המשיכו מהתרגיל הבא" : "התחילו בפרק 1"}</h2><p>תרגול קצר ורציף עדיף על מפגש ארוך פעם בשבוע.</p></div><Link className="button button-primary" href="/workbook">לתחילת התרגול</Link></section>
      <section className="progress-journey">
        <div><span className="marketing-eyebrow">מפת המסע</span><h2>רואים את הדרך, יחידה אחר יחידה</h2></div>
        <div className="progress-unit-grid">{unitVisuals.map((unit) => {
          const start = (unit.number - 1) * 3 + 1;
          const unitDone = [start, start + 1, start + 2].filter((chapter) => guidedChapters.has(String(chapter))).length;
          return <article className={unitDone === 3 ? "complete" : ""} key={unit.number}><img src={unit.image} alt="" /><div><span>{unitDone === 3 ? "✓" : unitDone + "/3"}</span><small>{unit.spanish}</small><b>{unit.title}</b></div></article>;
        })}</div>
      </section>
      <section className="achievement-grid"><article><b>🔥</b><h3>רצף למידה</h3><p>חזרו מחר כדי לבנות הרגל.</p></article><article><b>✓</b><h3>{totalDone} משימות</h3><p>כל השלמה מקרבת אתכם לדיבור.</p></article><article><b>30</b><h3>יעד A1</h3><p>השלימו את כל הפרקים והמבחן המסכם.</p></article></section>
    </main>
  );
}
