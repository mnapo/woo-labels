"use client";

import { LabelConfig } from "@/types/label";
import { SheetPreset } from "@/types/sheet";
import { Cell } from "@/types/cell";

import LabelCell from "./LabelCell";

interface Props {
  preset: SheetPreset;
  cells: Cell[];
  config: LabelConfig;
  onRemove: (id: number) => void;
  onUpdate: (
    id: number,
    customName: string,
    customPrice: string
  ) => void;
}

export default function LabelGrid({
  preset,
  cells,
  config,
  onRemove,
  onUpdate,
}: Props) {
  return (
    <>
      <div
        className="hidden h-full w-full overflow-hidden sm:grid"
        style={{
          gridTemplateColumns: `repeat(${preset.cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${preset.rows}, minmax(0, 1fr))`,
        }}
      >
        {cells.map((cell, index) => {
          const row = Math.floor(index / preset.cols);
          const col = index % preset.cols;

          const drawTop = row > 0;
          const drawLeft = col > 0;

          return (
            <div key={cell.id} className="relative h-full w-full">
              {drawTop && (
                <>
                  <div className="absolute left-1/2 top-0 h-[25%] w-px -translate-x-1/2 bg-gray-300" />
                  <div className="absolute left-[37.5%] top-0 h-px w-[25%] bg-gray-300" />
                </>
              )}

              {drawLeft && (
                <>
                  <div className="absolute left-0 top-1/2 h-px w-[25%] -translate-y-1/2 bg-gray-300" />
                  <div className="absolute left-0 top-[37.5%] h-[25%] w-px bg-gray-300" />
                </>
              )}

              <LabelCell
                cell={cell}
                config={config}
                onRemove={onRemove}
                onUpdate={onUpdate}
              />
            </div>
          );
        })}
      </div>

      <div className="flex w-full flex-col gap-2 sm:hidden">
        {cells.map(cell => (
          <div
            key={cell.id}
            className="min-h-24 w-full overflow-hidden rounded border bg-white"
          >
            <LabelCell
              cell={cell}
              config={config}
              onRemove={onRemove}
              onUpdate={onUpdate}
            />
          </div>
        ))}
      </div>
    </>
  );
}
