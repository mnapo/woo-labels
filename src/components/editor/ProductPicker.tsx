"use client";

import { Product } from "@/types/product";
import { MOCK_PRODUCTS } from "@/lib/products";

interface Props {
  onSelect: (product: Product) => void;
}

export default function ProductPicker({
  onSelect,
}: Props) {
  return (
    <div
      className="
        absolute
        z-10
        mt-2
        w-64
        rounded-md
        border
        bg-white
        shadow-lg
        p-2
      "
    >
      <input
        placeholder="Buscar producto..."
        className="
          w-full
          border
          rounded
          px-2
          py-1
          mb-2
        "
      />

      <div className="space-y-1">
        {MOCK_PRODUCTS.map((product) => (
          <button
            key={product.id}
            onClick={() =>
              onSelect(product)
            }
            className="
              w-full
              text-left
              rounded
              px-2
              py-1
              hover:bg-gray-100
            "
          >
            <div className="text-sm">
              {product.name}
            </div>

            <div className="
              text-xs
              text-gray-500
            ">
              ${product.price}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}