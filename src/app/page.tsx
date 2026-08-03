"use client";

import { useState } from "react";
import { SHEET_PRESETS } from "@/lib/presets";
import Editor from "@/components/editor/Editor";
import SheetSelector from "@/components/SheetSelector";
import PrintButton from "@/components/editor/PrintButton"

export default function Home() {
  const appTitle = process.env.NEXT_PUBLIC_APP_TITLE || "Woo Labels";
  const [preset, setPreset] = useState(SHEET_PRESETS[0]);

  return (
    <main className="min-h-screen p-8 space-y-8">
      <div className="no-print">
        <h1 className="text-3xl font-bold">
          {appTitle}
        </h1>
        <Editor preset={preset} />
        <SheetSelector value={preset} onChange={setPreset} />
        <div className="mx-4 h-8 w-px bg-gray-300" />
        <PrintButton />
      </div>
    </main>
  );
}