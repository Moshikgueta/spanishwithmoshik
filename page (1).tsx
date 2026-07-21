import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <span>שפות בלי כאב ראש</span>
        <strong>ספרדית בלי כאב ראש</strong>
      </div>
      <nav aria-label="קישורים בתחתית העמוד">
        <Link href="/book">הספר</Link>
        <Link href="/workbook">תרגול</Link>
        <Link href="/prompts">פרומפטים</Link>
        <Link href="/course">הקורס שלי</Link>
      </nav>
      <p>לימוד ספרדית ברור, שימושי ומדורג לדוברי עברית.</p>
    </footer>
  );
}
