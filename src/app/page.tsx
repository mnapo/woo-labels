"use client";

import { useState } from "react";
import { SHEET_PRESETS } from "@/lib/presets";
import SheetSelector from "@/components/SheetSelector";
import LabelGrid from "@/components/LabelGrid";
import PrintButton from "@/components/editor/PrintButton"
import { useProducts } from "@/hooks/useProducts";

export default function Home() {

  const [preset, setPreset] =
    useState(SHEET_PRESETS[0]);

  const {
    products,
    loading,
    error
  } = useProducts();

  return (
    <main className="
      min-h-screen
      p-8
      space-y-8
    ">

      <div className="no-print">
        <h1 className="text-3xl font-bold">
          Woo Labels
        </h1>

        <SheetSelector
          value={preset}
          onChange={setPreset}
        />

        <PrintButton />
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