"use client";

import { Plus } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: string;
};

interface Props {
  product?: Product;
  onClick: () => void;
}

export default function LabelCell({
  product,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
        aspect-[2/1]
        border
        bg-white
        hover:bg-gray-50
        transition
        flex
        flex-col
        items-center
        justify-center
        gap-1
        p-2
        text-center
      "
    >
      {product ? (
        <>
          <span className="
            text-sm
            font-medium
            line-clamp-2
          ">
            {product.name}
          </span>

          <span className="
            text-xs
            text-gray-600
          ">
            ${product.price}
          </span>
        </>
      ) : (
        <>
          <Plus
            size={20}
            className="text-gray-400"
          />

          <span className="
            text-xs
            text-gray-500
          ">
            Agregar producto
          </span>
        </>
      )}
    </button>
  );
}