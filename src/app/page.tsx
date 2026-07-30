"use client";

import { useState } from "react";
import { SHEET_PRESETS } from "@/lib/presets";
import SheetSelector from "@/components/SheetSelector";
import LabelGrid from "@/components/LabelGrid";
import PrintButton from "@/components/editor/PrintButton"
import { useProducts } from "@/hooks/useProducts";

export default function Home() {
  const appTitle = process.env.NEXT_PUBLIC_APP_TITLE || "Woo Labels";
  const [preset, setPreset] = useState(SHEET_PRESETS[0]);
  const { products } = useProducts();

  return (
    <main className="
      min-h-screen
      p-8
      space-y-8
    ">

      <div className="no-print">
        <h1 className="text-3xl font-bold">
          {appTitle}
        </h1>
        <Editor>
          <SheetSelector
            value={preset}
            onChange={setPreset}
          />
          <div className="mx-4 h-8 w-px bg-gray-300" />
          <PrintButton />
        </Editor>
      </div>
      
      <div className="w-full flex justify-center">
        <div className="w-full max-w-5xl">
              <LabelGrid
                preset={preset}
                products={products}
              />
            </div>
      </div>

    </main>
  );
}