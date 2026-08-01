"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Product } from "@/types/product";
import { useProducts } from "@/hooks/useProducts";

interface Props {
  onSelect: (product: Product) => void;
}

export default function ProductPicker({
  onSelect,
}: Props) {
  const [query, setQuery] =
    useState("");

  const [search, setSearch] =
    useState("");

  const {
    products,
    loading,
  } = useProducts(search);

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
        no-print
      "
    >
      <div className="flex gap-2 mb-2">
        <input
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearch(query);
            }
          }}
          placeholder="Buscar producto..."
          className="
            flex-1
            border
            rounded
            px-2
            py-1
          "
        />

        <button
          onClick={() =>
            setSearch(query)
          }
          className="
            border
            rounded
            px-2
          "
        >
          <Search size={16} />
        </button>
      </div>

      {loading && (
        <div className="text-sm text-gray-500">
          Buscando...
        </div>
      )}

      {!loading && (
        <div
          className="
            max-h-60
            overflow-y-auto
            space-y-1
          "
        >
          {products.length > 0 ? (
            products.map((product) => (
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

                <div className="text-xs text-gray-500">
                  ${product.price}
                </div>
              </button>
            ))
          ) : (
            <div className="text-sm text-gray-500">
              Sin resultados
            </div>
          )}
        </div>
      )}
    </div>
  );
}