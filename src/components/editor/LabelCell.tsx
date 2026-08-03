"use client";

import { Trash2 } from "lucide-react";

import { Cell } from "@/types/cell";

interface Props {
  cell: Cell;
  onRemove: (id: number) => void;
}

export default function LabelCell({ cell, onRemove }: Props) {
  return (
    <div className="relative">
      <div
        className="
          aspect-[2/1]
          w-full
          border
          bg-white
          flex
          flex-col
          items-center
          justify-center
          gap-1
          p-2
          text-center
        "
      >
        {cell.product ? (
          <>
            <span className="text-sm font-medium">
              {cell.product.name}
            </span>

            <span className="text-xs text-gray-600">
              ${cell.product.price}
            </span>

            <button
              onClick={() => onRemove(cell.id)}
              className="absolute right-1 top-1 text-gray-400 hover:text-gray-700"
            >
              <Trash2 size={14} />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}