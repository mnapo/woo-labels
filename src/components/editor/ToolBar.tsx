"use client";

import SheetSelector from "./SheetSelector";
import PrintButton from "./PrintButton";

export default function Toolbar() {
  return (
    <div className="flex items-center">
      <SheetSelector />

      <div className="mx-4 h-8 w-px bg-gray-300" />

      <PrintButton />
    </div>
  );
}