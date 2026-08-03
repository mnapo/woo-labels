"use client";

import { Cell, SheetPreset } from "@/types/sheet";
import LabelCell from "./LabelCell";

interface Props {
  preset: SheetPreset;
  cells: Cell[];
  setCells: React.Dispatch<React.SetStateAction<Cell[]>>;
}

export default function LabelGrid({ preset, cells, setCells }: Props) {

  const [activeCell, setActiveCell] = React.useState<number | null>(null);

  function updateCell(id: number, product: Cell["product"]) {
    setCells(current =>
      current.map(cell =>
        cell.id === id
          ? { ...cell, product }
          : cell
      )
    );
  }

  return (
    <div
      className="grid w-full max-w-4xl"
      style={{ gridTemplateColumns: `repeat(${preset.cols}, 1fr)` }}
    >
      {cells.map(cell => (
        <LabelCell
          key={cell.id}
          product={cell.product}
          open={activeCell === cell.id}
          onOpen={() => setActiveCell(cell.id)}
          onClose={() => setActiveCell(null)}
          onSelectProduct={(product) => {
            updateCell(cell.id, product);
            setActiveCell(null);
          }}
        />
      ))}
    </div>
  );
}