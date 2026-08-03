"use client";

import { Trash2 } from "lucide-react";

import { Cell } from "@/types/cell";
import { LabelConfig } from "./Editor";

interface Props {
  cell: Cell;
  config: LabelConfig;
  onRemove: (id: number) => void;
}

export default function LabelCell({ cell, config, onRemove }: Props) {
  const fontClass = {
    small: "text-sm",
    medium: "text-base",
    large: "text-xl",
  }[config.fontSize];

  return (
    <div className="relative h-full w-full overflow-hidden border bg-white">
      {cell.product ? (
        <div className={`flex h-full w-full items-center justify-center gap-2 p-2 ${config.layout === "vertical" ? "flex-col" : "flex-row"}`}>
          <span className={`break-words text-center font-medium ${fontClass}`}>
            {cell.product.name}
          </span>

          <span className={`break-words text-center font-bold text-gray-700 ${fontClass}`}>
            ${cell.product.price}
          </span>

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
}"use client";

import { Trash2 } from "lucide-react";

import { Cell } from "@/types/cell";
import { LabelConfig } from "./Editor";

interface Props {
  cell: Cell;
  config: LabelConfig;
  onRemove: (id: number) => void;
}

export default function LabelCell({ cell, config, onRemove }: Props) {
  const fontClass = {
    small: "text-sm",
    medium: "text-base",
    large: "text-xl",
  }[config.fontSize];

  return (
    <div className="relative h-full w-full overflow-hidden border bg-white">
      {cell.product ? (
        <div className={`flex h-full w-full items-center justify-center gap-2 p-2 ${config.layout === "vertical" ? "flex-col" : "flex-row"}`}>
          <span className={`break-words text-center font-medium ${fontClass}`}>
            {cell.product.name}
          </span>

          <span className={`break-words text-center font-bold text-gray-700 ${fontClass}`}>
            ${cell.product.price}
          </span>

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