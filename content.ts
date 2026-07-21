"use client";

import { useState } from "react";
import SiteHeader from "../components/SiteHeader";
import InteractiveCourse from "./InteractiveCourse";
import SourceWorkbook from "./SourceWorkbook";

export default function WorkbookPage() {
  const [mode, setMode] = useState<"guided" | "complete">("guided");
  return (
    <main className="app-page workbook-page">
      <SiteHeader />
      <div className="workbook-modebar">
        <div className="workbook-mode-copy"><img src="/images/units/unit-06.jpg" alt="" /><div><span className="marketing-eyebrow">חוברת העבודה</span><b>בחרו דרך תרגול</b></div></div>
        <div role="tablist" aria-label="מצב תרגול">
          <button role="tab" aria-selected={mode === "guided"} onClick={() => setMode("guided")}>מסלול אינטראקטיבי</button>
          <button role="tab" aria-selected={mode === "complete"} onClick={() => setMode("complete")}>כל חוברת המקור</button>
        </div>
      </div>
      {mode === "guided" ? <InteractiveCourse /> : <SourceWorkbook />}
    </main>
  );
}
