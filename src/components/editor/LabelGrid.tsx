"use client";

import { LabelConfig } from "./Editor";
import { Cell, SheetPreset } from "@/types/sheet";

import LabelCell from "./LabelCell";

interface Props {
  preset: SheetPreset;
  cells: Cell[];
  config: LabelConfig;
  onRemove: (id: number) => void;
}

export default function LabelGrid({ preset, cells, config, onRemove }: Props) {
  return (
    <div
      className="grid h-full w-full overflow-hidden"
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
        />
      ))}
    </div>
  );
}