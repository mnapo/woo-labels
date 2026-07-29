"use client";

import { useState } from "react";
import { SHEET_PRESETS } from "@/lib/presets";
import SheetSelector from "@/components/SheetSelector";
import LabelGrid from "@/components/LabelGrid";

export default function Home() {

  const [preset, setPreset] =
    useState(SHEET_PRESETS[0]);

  return (
    <main className="
      min-h-screen
      p-8
      space-y-8
    ">

      <h1 className="text-3xl font-bold">
        Woo Labels
      </h1>

      <SheetSelector
        value={preset}
        onChange={setPreset}
      />

      <LabelGrid
        preset={preset}
      />

    </main>
  );
}