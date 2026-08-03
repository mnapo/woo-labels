"use client";

import { SHEET_PRESETS } from "@/lib/presets";
import { SheetPreset } from "@/types/sheet";

interface Props {
  value: SheetPreset;
  onChange: (preset: SheetPreset) => void;
}

export default function SheetSelector({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex gap-3">
      {SHEET_PRESETS.map((preset) => (
        <button
          key={preset.id}
          onClick={() => onChange(preset)}
          className={`
            rounded border px-4 py-2
            ${
              value.id === preset.id
                ? "bg-black text-white"
                : "bg-white"
            }
          `}
        >
          {preset.name}
        </button>
      ))}
    </div>
  );
}