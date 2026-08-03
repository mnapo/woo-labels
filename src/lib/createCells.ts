import { Cell } from "@/types/cell";
import { SheetPreset } from "@/types/sheet";

export function createCells(
  preset: SheetPreset
): Cell[] {
  return Array.from(
    { length: preset.rows * preset.cols },
    (_, id) => ({
      id,
    })
  );
}