"use client";

import { Trash2 } from "lucide-react";

import { Cell } from "@/types/cell";

interface Props {
  cell: Cell;
  onRemove: (id: number) => void;
}

export default function LabelCell({ cell, onRemove }: Props) {
  return (
    <div className="relative h-full w-full border bg-white overflow-hidden">
      {cell.product ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-2 text-center">
          <span className="w-full break-words text-sm font-medium">
            {cell.product.name}
          </span>

          <span className="w-full break-words text-lg font-bold text-gray-700">
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