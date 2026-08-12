"use client";

import { LabelConfig } from "@/types/label";
import { Cell } from "@/types/cell";
import { SheetPreset } from "@/types/sheet";

import LabelCell from "./LabelCell";

interface Props {
  preset: SheetPreset;
  cells: Cell[];
  config: LabelConfig;
  onRemove: (id: number) => void;
  onUpdate: (id: number, customName: string, customPrice: string) => void;
}

export default function LabelGrid({ preset, cells, config, onRemove, onUpdate }: Props) {
  return (
    <div
      className="relative grid h-full w-full overflow-hidden"
      style={{
        gridTemplateColumns: `repeat(${preset.cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${preset.rows}, minmax(0, 1fr))`,
      }}
    >
      {cells.map(cell => (
        <LabelCell
          key={cell.id}
          cell={cell}
          config={config}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ))}

      {Array.from({ length: preset.rows - 1 }, (_, row) =>
        Array.from({ length: preset.cols - 1 }, (_, col) => (
          <div
            key={`${row}-${col}`}
            className="pointer-events-none absolute z-10"
            style={{
              left: `${((col + 1) / preset.cols) * 100}%`,
              top: `${((row + 1) / preset.rows) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative h-4 w-4">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-black" />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
