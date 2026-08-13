"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";

import { Product } from "@/types/product";
import { useProducts } from "@/hooks/useProducts";

interface Category {
  id: number;
  name: string;
}

interface Props {
  onSelect: (product: Product) => void;
}

export default function ProductPicker({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const { products, loading } = useProducts(search, category);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");

        if (!response.ok) return;

        const data = await response.json();

        setCategories(data);
      } catch {
        setCategories([]);
      }
    }

    fetchCategories();
  }, []);

  function handleSelect(product: Product) {
    onSelect(product);
    setOpen(false);
  }

  function handleSearch() {
    setSearch(query);
  }

  function handleCategoryApply() {
    setCategory(selectedCategory);
  }

  return (
    <div className="relative no-print">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(value => !value)}
          className="flex shrink-0 items-center gap-2 rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
        >
          + Agregar producto

          {open ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        <div className="flex max-w-full gap-2 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory("")}
            className={`shrink-0 rounded-full border px-3 py-1 text-xs ${
              selectedCategory === ""
                ? "bg-black text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Todas
          </button>

          {categories.map(item => (
            <button
              key={item.id}
              onClick={() =>
                setSelectedCategory(item.id.toString())
              }
              className={`shrink-0 rounded-full border px-3 py-1 text-xs ${
                selectedCategory === item.id.toString()
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2">
        <button
          onClick={handleCategoryApply}
          className="rounded bg-black px-3 py-1 text-xs text-white hover:bg-gray-800"
        >
          Aplicar
        </button>
      </div>

      {open && (
        <div className="absolute left-0 z-20 mt-2 w-72 rounded-md border bg-white p-3 shadow-lg">
          <div className="flex gap-2">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Buscar producto..."
              className="flex-1 rounded border px-2 py-1 text-sm"
            />

            <button
              onClick={handleSearch}
              className="rounded border px-2"
            >
              <Search size={16} />
            </button>
          </div>

          <div className="mt-2">
            {loading && (
              <div className="text-sm text-gray-500">
                Buscando...
              </div>
            )}

            {!loading && (
              <div className="max-h-60 space-y-1 overflow-y-auto">
                {products.length > 0 ? (
                  products.map(product => (
                    <button
                      key={product.id}
                      onClick={() => handleSelect(product)}
                      className="w-full rounded px-2 py-1 text-left hover:bg-gray-100"
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
        </div>
      )}
    </div>
  );
}
