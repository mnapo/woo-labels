"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { Cell } from "@/types/cell";
import { LabelConfig } from "@/types/label";
import Barcode from "./Barcode";
import CellEditor from "./CellEditor";

interface Props {
  cell: Cell;
  config: LabelConfig;
  onRemove: (id: number) => void;
  onUpdate: (
    id: number,
    customName: string,
    customPrice: string
  ) => void;
}

export default function LabelCell({ cell, config, onRemove, onUpdate }: Props) {
  const fontClass = {
    small: "text-sm",
    medium: "text-base",
    large: "text-xl",
  }[config.fontSize];

  const priceClass = {
    small: "text-base",
    medium: "text-xl",
    large: "text-2xl",
  }[config.fontSize];

  const [editing, setEditing] = useState(false);

  const name = cell.customName ?? cell.product?.name;
  const price = cell.customPrice ?? cell.product?.price;

  return (
    <div className="relative h-full w-full overflow-hidden border border-gray-200 bg-white">
      {cell.product ? (
        <div
          className={`flex h-full w-full items-center justify-center gap-2 p-2 ${
            config.layout === "vertical"
              ? "flex-col"
              : "flex-row"
          }`}
        >
          <span
            className={`break-words text-center font-medium ${
              config.layout === "horizontal" ? "flex-[0.4]" : ""
            } ${fontClass}`}
          >
            {name}
          </span>

          <span
            className={`break-words text-center font-bold text-black ${
              config.layout === "horizontal" ? "flex-[0.6]" : ""
            } ${priceClass}`}
          >
            ${price}
          </span>

          {config.showBarcode && cell.product.barcode && (
            <Barcode value={cell.product.barcode} />
          )}

          <CellEditor
            open={editing}
            name={name ?? ""}
            price={price ?? ""}
            onClose={() => setEditing(false)}
            onSave={(customName, customPrice) =>
              onUpdate(cell.id, customName, customPrice)
            }
          />

          <button
            onClick={() => setEditing(true)}
            className="no-print absolute right-6 top-1 text-gray-400 hover:text-gray-700"
          >
            <Pencil size={14} />
          </button>

          <button
            onClick={() => onRemove(cell.id)}
            className="no-print absolute right-1 top-1 text-gray-400 hover:text-gray-700"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-xs text-gray-300">
          Vacía
        </div>
      )}
    </div>
  );
}
