"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";

export function useProducts(query = "") {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (query) {
          params.set("q", query);
        }

        const response = await fetch(
          `/api/products?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unknown error"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();

  }, [query]);

  return {
    products,
    loading,
    error,
  };
}