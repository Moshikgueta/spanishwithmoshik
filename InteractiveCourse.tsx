import Link from "next/link";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { content, unitVisuals } from "./content";

const exerciseTypes = [
  ["התאמה וגרירה", "מחברים בין מילים, משמעויות ומשפטים בלי לרמוז על התשובה."],
  ["השלמה בתוך המשפט", "מקלידים בדיוק במקום הקו החסר ומקבלים משוב במקום."],
  ["בחירה בהקשר", "אפשרויות מתערבבות אוטומטית כדי שהמיקום לא יסגיר את הפתרון."],
  ["סידור משפטים", "גוררים מילים או שורות ובונים משפט ודיאלוג בסדר הנכון."],
  ["מיון ותיקון טעויות", "מזהים דפוסים, מתקנים ספרדית ומבינים למה."],
  ["קריאה, כתיבה ודיבור", "משימות פתוחות, הקלטה עצמית וסיפורים קצרים מהחיים."],
];

export default function Home() {
  return (
    <main className="marketing-page">
      <SiteHeader transparent />

      <section className="hero-section">
        <div className="hero-copy">
          <span className="marketing-eyebrow">קורס ספרדית A1 מלא לדוברי עברית</span>
          <h1>ספרדית שמבינים, מתרגלים ומתחילים לדבר</h1>
          <p>
            ספר לימוד מלא, חוברת עבודה אינטראקטיבית ופרומפטים מוכנים להעתקה ל-ChatGPT,
            בחוויית לימוד ברורה, בוגרת ומהנה.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/course">מתחילים ללמוד</Link>
            <Link className="button button-secondary" href="/workbook">צפו בחוברת</Link>
          </div>
          <ul className="hero-checks" aria-label="יתרונות מרכזיים">
            <li>30 פרקים מלאים</li>
            <li>משוב מיידי</li>
            <li>מותאם למחשב ולנייד</li>
          </ul>
        </div>

        <div className="hero-product" aria-label="הספר וחוברת העבודה הדיגיטלית">
          <img className="hero-photo" src="/images/cover-collage.jpg" alt="קולאז׳ צבעוני של חוויות מהעולם דובר הספרדית" />
          <div className="hero-photo-label"><span>10</span><b>עולמות תוכן</b><small>מהמילה הראשונה ועד שיחה אמיתית</small></div>
          <div className="book-mockup">
            <span>A1</span>
            <strong>ספרדית</strong>
            <b>בלי כאב ראש</b>
            <small>הספר המלא</small>
          </div>
          <div className="workbook-mockup">
            <small>חוברת עבודה</small>
            <strong>A1</strong>
            <span>תרגול מדורג ומעשי</span>
          </div>
          <div className="lesson-mockup" dir="ltr">
            <div className="lesson-top"><b>Lección 3</b><span>40%</span></div>
            <h3>¿Cómo estás?</h3>
            <div className="audio-line"><i /> <i /> <i /> <i /> <i /> <i /></div>
            <div className="lesson-options"><span>Muy bien</span><span>Hasta luego</span></div>
            <div className="mini-progress"><span /></div>
          </div>
        </div>

        <div className="hero-proof">
          <div><span className="proof-icon">▤</span><b>ספר מלא וברור</b><small>{content.meta.bookSectionCount} חלקים ונספחים</small></div>
          <div><span className="proof-icon">↔</span><b>תרגול אינטראקטיבי</b><small>{content.meta.exerciseCount} משימות מהמקור</small></div>
          <div><span className="proof-icon">✦</span><b>פרומפטים מוכנים</b><small>מעתיקים ומתרגלים בצ&apos;אט</small></div>
        </div>
      </section>

      <section className="section package-section" id="package">
        <div className="section-heading">
          <span className="marketing-eyebrow">החבילה המלאה</span>
          <h2>לא רק דף מכירה. סביבת לימוד שלמה.</h2>
          <p>כל רכיב עובד בפני עצמו, אבל החיבור ביניהם הופך ידע לתרגול ולדיבור אמיתי.</p>
        </div>
        <div className="package-grid">
          <article className="package-card package-book">
            <div className="package-visual book-preview">
              <img src="/images/units/unit-02.jpg" alt="שיחת היכרות בבית קפה" />
              <div><small>UNIDAD 02</small><strong>Mucho gusto</strong><span>הסבר · דוגמאות · סיפור</span></div>
            </div>
            <div className="package-card-copy"><span className="package-number">01</span><h3>ספר לימוד דיגיטלי</h3><p>הסברים בעברית, דוגמאות בספרדית, טבלאות, סיפורים, חזרות ונספחים, עם ניווט נוח בין כל היחידות.</p><Link href="/book">פתחו את הספר <span>←</span></Link></div>
          </article>
          <article className="package-card package-workbook">
            <div className="package-visual practice-preview" dir="ltr">
              <div className="practice-preview-top"><span>Match the pairs</span><b>3/5</b></div>
              <div className="practice-pairs"><span>familia</span><span>משפחה</span><span className="is-active">ciudad</span><span className="is-active">עיר</span></div>
              <div className="practice-preview-progress"><i /></div>
            </div>
            <div className="package-card-copy"><span className="package-number">02</span><h3>חוברת משחקית</h3><p>גרירה, התאמה, השלמה, בחירה, סידור, מיון, תיקון טעויות, כתיבה, קריאה ודיבור עם משוב מיידי.</p><Link href="/workbook">עברו לתרגול <span>←</span></Link></div>
          </article>
          <article className="package-card package-prompts">
            <div className="package-visual prompt-preview">
              <span className="prompt-avatar">M</span>
              <div><small>פרומפט מוכן</small><p>נהל איתי שיחה קצרה בספרדית ושאל שאלה אחת בכל פעם...</p><b>העתקה בלחיצה</b></div>
            </div>
            <div className="package-card-copy"><span className="package-number">03</span><h3>פרומפטים לתרגול</h3><p>דף בונוס עם הוראות מוכנות להעתקה ל-ChatGPT. אין צורך לדעת לנסח פרומפט או להפעיל כלי AI בתוך הקורס.</p><Link href="/prompts">ראו את הפרומפטים <span>←</span></Link></div>
          </article>
        </div>
      </section>

      <section className="section visual-journey-section">
        <div className="visual-journey-heading">
          <div><span className="marketing-eyebrow">כל יחידה מרגישה כמו עולם חדש</span><h2>לא עוד מסמך ארוך. מסע שרואים וזוכרים.</h2></div>
          <p>כל שלושה פרקים נפתחים באווירה חדשה, עם צילום, צבע וסיפור שמחברים את השפה לחיים.</p>
        </div>
        <div className="unit-gallery">
          {unitVisuals.map((unit) => (
            <article className="unit-gallery-card" key={unit.number}>
              <img src={unit.image} alt="" />
              <div><span>{String(unit.number).padStart(2, "0")}</span><small>{unit.spanish}</small><h3>{unit.title}</h3><p>{unit.description}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section experience-section">
        <div className="experience-photo">
          <img src="/images/study-desk.png" alt="לומדת בוגרת מתרגלת ספרדית ליד שולחן עבודה" />
          <div className="floating-result"><b>¡Excelente!</b><span>התשובה נכונה</span></div>
        </div>
        <div className="experience-copy">
          <span className="marketing-eyebrow">תרגול שמרגיש חי</span>
          <h2>לא ממלאים דף. משתמשים בשפה.</h2>
          <p>כל תרגיל מתאים לפעולה שהלומד באמת צריך לבצע. התשובות מעורבבות, הקווים הופכים לשדות פעילים והמשוב מגיע ברגע הנכון.</p>
          <div className="exercise-type-grid">
            {exerciseTypes.map(([title, description], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section content-map-section">
        <div className="section-heading light">
          <span className="marketing-eyebrow">מההתחלה ועד A1 מלא</span>
          <h2>כל התוכן נשאר בפנים</h2>
          <p>הספר וחוברת העבודה כוללים את כל הפרקים, המיני־יחידות, הסיפורים, החזרות, המבחן והנספחים מהקבצים המקוריים.</p>
        </div>
        <div className="content-stats">
          <div><b>30</b><span>פרקים</span></div>
          <div><b>{content.meta.workbookSectionCount}</b><span>יחידות תרגול וקריאה</span></div>
          <div><b>{content.meta.exerciseCount}</b><span>משימות מקור</span></div>
          <div><b>5</b><span>נספחים</span></div>
        </div>
        <div className="content-photo-row" aria-label="נושאי הקורס">
          {unitVisuals.slice(0, 5).map((unit) => <div key={unit.number}><img src={unit.image} alt="" /><span>{unit.title}</span></div>)}
        </div>
      </section>

      <section className="section final-cta-section">
        <div>
          <span className="marketing-eyebrow">הצעד הראשון קצר</span>
          <h2>פותחים שיעור, מתרגלים ומתחילים לדבר.</h2>
        </div>
        <Link className="button button-primary" href="/course">כניסה לקורס</Link>
      </section>

      <SiteFooter />
    </main>
  );
}
