import { useEffect, useState } from "react";

import { Cell } from "@/types/cell";
import { SheetPreset } from "@/types/sheet";
import { createCells } from "@/lib/createCells";

import LabelGrid from "./LabelGrid";

interface Props {
  preset: SheetPreset;
}

export default function Editor({
  preset,
}: Props) {
  const [cells, setCells] =
    useState<Cell[]>(
      createCells(preset)
    );

  useEffect(() => {
    setCells(
      createCells(preset)
    );
  }, [preset]);

  return (
    <div className="no-print flex justify-center">
      <div className="flex flex-col items-center rounded-lg border bg-white px-4 py-3 shadow-sm">
        <LabelGrid
          preset={preset}
          cells={cells}
          setCells={setCells}
        />
      </div>
    </div>
  );
}