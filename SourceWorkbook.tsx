"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/course", label: "הקורס" },
  { href: "/book", label: "הספר" },
  { href: "/workbook", label: "חוברת העבודה" },
  { href: "/prompts", label: "פרומפטים ל-ChatGPT" },
  { href: "/progress", label: "התקדמות" },
];

export default function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const pathname = usePathname();
  return (
    <header className={`site-header ${transparent ? "is-transparent" : ""}`}>
      <Link className="site-brand" href="/" aria-label="ספרדית בלי כאב ראש, דף הבית">
        <span className="site-brand-parent">שפות בלי כאב ראש</span>
        <strong>ספרדית בלי כאב ראש</strong>
      </Link>
      <nav className="site-nav" aria-label="ניווט ראשי">
        {links.map((link) => (
          <Link className={pathname === link.href ? "active" : ""} href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <Link className="site-cta" href="/course">מתחילים ללמוד</Link>
    </header>
  );
}
