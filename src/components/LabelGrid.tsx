"use client";

import { Cell, SheetPreset } from "@/types/sheet";

import LabelCell from "./LabelCell";

interface Props {
  preset: SheetPreset;
  cells: Cell[];
  onRemove: (id: number) => void;
}

export default function LabelGrid({ preset, cells, onRemove }: Props) {
  return (
    <div
      className="grid w-full max-w-4xl"
      style={{ gridTemplateColumns: `repeat(${preset.cols}, 1fr)` }}
    >
      {cells.map(cell => (
        <LabelCell key={cell.id} cell={cell} onRemove={onRemove} />
      ))}
    </div>
  );
}