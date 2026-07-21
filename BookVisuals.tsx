"use client";

import { useState } from "react";
import SiteHeader from "../components/SiteHeader";
import { unitVisuals } from "../content";

const prompts = [
  {
    category: "שיחה",
    title: "שיחת היכרות ברמת A1",
    text: "פעל כמורה סבלני לספרדית לדובר עברית ברמת A1. נהל איתי שיחת היכרות קצרה בספרדית בלבד, שאלה אחת בכל פעם. השתמש רק בברכות, שם, מדינה, עיר ומקצוע. אחרי כל תשובה שלי, תקן בעדינות רק טעות חשובה אחת והסבר אותה בעברית במשפט קצר.",
  },
  {
    category: "שיחה",
    title: "משחק תפקידים בבית קפה",
    text: "פעל כמלצר בבית קפה בעולם דובר הספרדית. אני הלקוח וברמת A1. שאל אותי מה אני רוצה להזמין, אם אני רוצה משהו נוסף, ולבסוף עזור לי לבקש את החשבון. שמור על משפטים קצרים. אם אני נתקע, תן לי שתי אפשרויות בספרדית בלי לגלות מיד איזו עדיפה.",
  },
  {
    category: "דקדוק",
    title: "SER או ESTAR",
    text: "צור לי תרגול קצר של 8 משפטים ברמת A1 על ההבדל בין SER ל-ESTAR. הצג משפט אחד בכל פעם עם קו חסר במקום הפועל. חכה לתשובה שלי, תן משוב מיידי בעברית והסבר את הסיבה במילים פשוטות. ערבב את סדר התשובות כך שלא יהיה דפוס קבוע.",
  },
  {
    category: "דקדוק",
    title: "תרגול פעלים בהווה",
    text: "תרגל איתי פעלים רגילים בספרדית בהווה ברמת A1. השתמש בפעלים hablar, trabajar, comer, vivir ו-estudiar. בכל סבב כתוב כינוי גוף ופועל בסוגריים בתוך משפט קצר. חכה שאשלים, בדוק מיד, ואז עבור למשפט הבא. בסוף הצג את שלוש הטעויות שחזרו הכי הרבה.",
  },
  {
    category: "אוצר מילים",
    title: "כרטיסיות בלי רמזי מיקום",
    text: "בחן אותי על 15 מילים בספרדית בנושא הבית והעיר ברמת A1. בכל פעם הצג מילה אחת וארבע משמעויות בעברית בסדר אקראי. אל תשים את התשובה הנכונה תמיד באותו מיקום. אחרי שאענה, תן משוב קצר ודוגמה פשוטה בספרדית.",
  },
  {
    category: "אוצר מילים",
    title: "מילים שאני באמת צריך",
    text: "שאל אותי בעברית על המטרות שלי בספרדית: נסיעה, עבודה, משפחה או שיחה יומיומית. לפי התשובה, בנה רשימה של 20 מילים וביטויים ברמת A1 עם ספרדית, תרגום ודוגמה קצרה. לאחר מכן בחן אותי בחמישה סבבים מסוגים שונים: התאמה, השלמה, בחירה, תרגום וסידור מילים.",
  },
  {
    category: "כתיבה",
    title: "תיקון טקסט בלי למחוק את הקול שלי",
    text: "אני אכתוב טקסט קצר בספרדית ברמת A1. תקן רק טעויות שמפריעות להבנה או נוגעות לנושא שלמדתי. הצג תחילה גרסה מתוקנת, אחר כך טבלה עם: מה כתבתי, התיקון, והסבר קצר בעברית. שמור על המילים והסגנון שלי ואל תשדרג את הטקסט לרמה גבוהה יותר.",
  },
  {
    category: "כתיבה",
    title: "היום שלי ב-6 משפטים",
    text: "עזור לי לכתוב שישה משפטים בספרדית ברמת A1 על היום שלי. שאל אותי שאלה אחת בעברית בכל פעם על שעת הקימה, הבוקר, עבודה או לימודים, אוכל, ערב ודבר שאני אוהב. אחרי כל תשובה, עזור לי להפוך אותה למשפט ספרדי פשוט. בסוף חבר את המשפטים לפסקה אחת.",
  },
  {
    category: "הגייה",
    title: "מאמן הגייה לקריאה בקול",
    text: "הכן לי אימון קריאה בספרדית של אמריקה הלטינית ברמת A1. התמקד ב-H שקטה, J, Ñ, C לפני E/I ו-G לפני E/I. תן בכל סבב חמש מילים ומשפט קצר. כתוב תעתיק עברי רק אחרי שאבקש עזרה. הוסף סימון של ההברה המוטעמת באותיות גדולות.",
  },
  {
    category: "קריאה",
    title: "סיפור קצר מותאם לרמה",
    text: "כתוב סיפור קצר של 90 עד 120 מילים בספרדית ברמת A1 על אדם, משפחה ושגרה יומית. השתמש רק בזמן הווה ובאוצר מילים נפוץ. אחריו שאל 5 שאלות: שתיים נכון או לא נכון, שתיים בחירה ואחת פתוחה. הצג תשובה אחת בכל פעם ותן משוב מיד אחרי שאענה.",
  },
  {
    category: "חזרה",
    title: "חזרה אישית לפי הטעויות שלי",
    text: "אני אשלח לך רשימה של טעויות שעשיתי בספרדית. מיין אותן לאוצר מילים, דקדוק, כתיב וסדר מילים. זהה שני דפוסים מרכזיים ובנה לי אימון של 10 דקות ברמת A1. אל תציג את הפתרון לפני שאענה, ערבב את מיקום התשובות, ובסוף סכם מה השתפר ומה לתרגל מחר.",
  },
  {
    category: "מבחן",
    title: "מיני מבחן A1",
    text: "צור לי מיני מבחן ספרדית A1 של 15 שאלות על היכרות, משפחה, בית, שגרה, אוכל, קניות, כיוונים ומזג אוויר. שלב בחירה, השלמה, סידור, תיקון טעות ותגובה למצב. הצג שאלה אחת בכל פעם, שמור ניקוד בלי לחשוף אותו, ובסוף הצג ציון, הסברים ותוכנית חזרה קצרה.",
  },
];

export default function PromptsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [category, setCategory] = useState("הכול");
  const categories = ["הכול", ...Array.from(new Set(prompts.map((prompt) => prompt.category)))];
  const shown = category === "הכול" ? prompts : prompts.filter((prompt) => prompt.category === category);
  async function copy(title: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(title);
    window.setTimeout(() => setCopied(null), 1800);
  }
  return (
    <main className="app-page prompts-page">
      <SiteHeader />
      <section className="prompts-hero">
        <div className="prompts-hero-copy"><span className="marketing-eyebrow">בונוס לתרגול עצמאי</span><h1>פרומפטים מוכנים ל-ChatGPT</h1><p>בוחרים משימה, מעתיקים את הטקסט ומדביקים בצ&apos;אט חדש. ה-AI אינו מובנה באתר, כך שאתם שולטים בכל שיחה.</p><div className="prompt-steps"><span><b>1</b>בוחרים</span><span><b>2</b>מעתיקים</span><span><b>3</b>מתרגלים</span></div></div>
        <div className="prompts-hero-visual"><img src="/images/units/unit-02.jpg" alt="שיחה בספרדית בבית קפה" /><div dir="ltr"><small>Tu compañero de conversación</small><b>¡Hola! ¿Cómo te llamas?</b><span>Responde en español...</span></div></div>
      </section>
      <div className="prompt-filters" role="tablist">{categories.map((item) => <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
      <section className="prompt-grid">
        {shown.map((prompt, index) => (
          <article className="prompt-card" key={prompt.title}>
            <div className="prompt-card-image"><img src={unitVisuals[index % unitVisuals.length].image} alt="" /><span>{prompt.category}</span></div>
            <header><span>{prompt.category}</span><b>{String(index + 1).padStart(2, "0")}</b></header>
            <h2>{prompt.title}</h2>
            <p>{prompt.text}</p>
            <button onClick={() => copy(prompt.title, prompt.text)}>{copied === prompt.title ? "✓ הועתק" : "העתקת הפרומפט"}</button>
          </article>
        ))}
      </section>
    </main>
  );
}
