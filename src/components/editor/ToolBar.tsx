"use client";

import { SheetPreset } from "@/types/sheet";

import SheetSelector from "./SheetSelector";
import PrintButton from "./PrintButton";

interface Props {
  value: SheetPreset;
  onChange: (preset: SheetPreset) => void;
}

export default function Toolbar({ value, onChange }: Props) {
  return (
    <div className="flex items-center">
      <SheetSelector value={value} onChange={onChange} />

      <div className="mx-4 h-8 w-px bg-gray-300" />

      <PrintButton />
    </div>
  );
}