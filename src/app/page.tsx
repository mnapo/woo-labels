"use client";

import { useState } from "react";
import { SHEET_PRESETS } from "@/lib/presets";
import Editor from "@/components/editor/Editor";

export default function Home() {
  const [preset, setPreset] = useState(SHEET_PRESETS[0]);

  return (
    <main className="min-h-screen p-8 space-y-8">
      <Editor preset={preset} setPreset={setPreset} />
    </main>
  );
}
