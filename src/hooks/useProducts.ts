"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";

export function useProducts(
  query = ""
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          limit: "10",
        });

        if (query) {
          params.set("q", query);
        }

        const response = await fetch(
          `/api/products?${params.toString()}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch products"
          );
        }

        const data = await response.json();

        setProducts(data);
      } catch (err) {
        if (
          err instanceof DOMException &&
          err.name === "AbortError"
        ) {
          return;
        }

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

    return () => {
      controller.abort();
    };
  }, [query]);

  return {
    products,
    loading,
    error,
  };
}