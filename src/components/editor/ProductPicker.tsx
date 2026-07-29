"use client";

import { useState } from "react";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
  onSelect: (product: Product) => void;
}

export default function ProductPicker({
  products,
  onSelect,
}: Props) {
  const [query, setQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(query.toLowerCase())
  );

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
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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

      <div className="max-h-60 overflow-y-auto space-y-1">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => onSelect(product)}
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

              <div className="text-xs text-gray-500">
                ${product.price}
              </div>
            </button>
          ))
        ) : (
          <div className="text-sm text-gray-500 p-2">
            Sin resultados
          </div>
        )}
      </div>
    </div>
  );
}