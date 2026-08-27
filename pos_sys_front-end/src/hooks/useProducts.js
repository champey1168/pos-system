import { useCallback, useEffect, useMemo, useState } from "react";

import { productService } from "../services/productService.js";

export default function useProducts(
  initialQuery = "",
  initialCategory = "All",
) {
  const [products, setProducts] = useState(() => productService.getAll());

  const [query, setQuery] = useState(initialQuery);

  const [category, setCategory] = useState(initialCategory);

  const refresh = useCallback(async () => {
    const data = await productService.refresh();
    setProducts(data);
    return data;
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch = [product.name, product.category]
        .join(" ")
        .toLowerCase()
        .includes(normalized);

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [category, products, query]);

  return {
    products,
    filteredProducts,
    query,
    setQuery,
    category,
    setCategory,
    refresh,
  };
}
