"use client";

import { useEffect, useState } from "react";

import { Cell } from "@/types/cell";
import { Product } from "@/types/product";
import { SheetPreset } from "@/types/sheet";
import { createCells } from "@/lib/createCells";

import Toolbar from "./ToolBar";
import LabelGrid from "./LabelGrid";
import ProductPicker from "./ProductPicker";

interface Props {
  preset: SheetPreset;
  setPreset: React.Dispatch<React.SetStateAction<SheetPreset>>;
}

export default function Editor({ preset }: Props) {
  const [cells, setCells] = useState<Cell[]>(createCells(preset));

  useEffect(() => {
    setCells(createCells(preset));
  }, [preset]);

  function assignNextProduct(product: Product) {
    setCells(current => {
      const index = current.findIndex(cell => !cell.product);

      if (index === -1) return current;

      return current.map((cell, i) =>
        i === index
          ? { ...cell, product }
          : cell
      );
    });
  }

  function removeProduct(id: number) {
    setCells(current =>
      current.map(cell =>
        cell.id === id
          ? { ...cell, product: undefined }
          : cell
      )
    );
  }

  return (
    <div className="no-print">
      <div className="flex flex-col items-center rounded-lg border bg-white px-4 py-3 shadow-sm">
        <ProductPicker onSelect={assignNextProduct} />

        <hr className="my-4 w-full" />

        <Toolbar value={preset} onChange={setPreset} />
      </div>

      <div className="mt-6 flex justify-center">
        <LabelGrid
          preset={preset}
          cells={cells}
          onRemove={removeProduct}
        />
      </div>
    </div>
  );
}