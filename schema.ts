import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ספרדית בלי כאב ראש | ספר וקורס אינטראקטיבי A1",
  description: "ספר מלא, חוברת תרגול אינטראקטיבית ופרומפטים מוכנים ללימוד ספרדית עם ChatGPT.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
