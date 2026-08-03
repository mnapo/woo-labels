"use client";

import { useEffect, useState } from "react";

import { Cell } from "@/types/cell";
import { Product } from "@/types/product";
import { SheetPreset } from "@/types/sheet";
import { createCells } from "@/lib/createCells";

import LabelGrid from "./LabelGrid";
import ProductPicker from "./ProductPicker";

interface Props {
  preset: SheetPreset;
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

      const next = [...current];

      next[index] = {
        ...next[index],
        product,
      };

      return next;
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
    <div className="no-print flex justify-center">
      <div className="flex flex-col items-center rounded-lg border bg-white px-4 py-3 shadow-sm">
        <ProductPicker onSelect={assignNextProduct} />

        <hr className="my-4 w-full" />

        <LabelGrid preset={preset} cells={cells} onRemove={removeProduct} />
      </div>
    </div>
  );
}