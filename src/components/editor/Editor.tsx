"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { createCells } from "@/lib/createCells";
import { Cell } from "@/types/cell";
import { Product } from "@/types/product";
import { SheetPreset } from "@/types/sheet";
import { LabelConfig } from "@/types/label";

import LabelGrid from "./LabelGrid";
import ProductPicker from "./ProductPicker";
import ToolBar from "./ToolBar";

interface Props {
  preset: SheetPreset;
  setPreset: Dispatch<SetStateAction<SheetPreset>>;
}

export default function Editor({ preset, setPreset }: Props) {
  const [cells, setCells] = useState<Cell[]>(createCells(preset));

  const [config, setConfig] = useState<LabelConfig>({
    fontSize: "medium",
    layout: "vertical",
    showBarcode: true,
  });

  useEffect(() => {
    setCells(current => {
      const total = preset.rows * preset.cols;

      if (total === current.length) return current;

      return Array.from({ length: total }, (_, id) => ({
        id,
        product: current[id]?.product,
      }));
    });
  }, [preset]);

  function assignNextProduct(product: Product) {
    setCells(current => {
      const index = current.findIndex(cell => !cell.product);

      if (index === -1) return current;

      return current.map((cell, i) =>
        i === index ? { ...cell, product } : cell
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

  function updateCell(
    id: number,
    customName: string,
    customPrice: string
  ) {
    setCells(current =>
      current.map(cell =>
        cell.id === id
          ? {
              ...cell,
              customName: customName || undefined,
              customPrice: customPrice || undefined,
            }
          : cell
      )
    );
  }

  return (
    <>
      <div className="no-print sticky top-0 z-20 flex justify-center bg-white/90 py-2 backdrop-blur">
        <div className="flex flex-col items-center rounded-lg border bg-white px-4 py-3 shadow-sm">
          <ToolBar
            value={preset}
            onChange={setPreset}
            config={config}
            setConfig={setConfig}
          />

          <hr className="my-4 w-full" />

          <ProductPicker onSelect={assignNextProduct} />
        </div>
      </div>

      <div className="print-area h-screen">
        <LabelGrid
          preset={preset}
          cells={cells}
          config={config}
          onRemove={removeProduct}
          onUpdate={updateCell}
        />
      </div>
    </>
  );
}
