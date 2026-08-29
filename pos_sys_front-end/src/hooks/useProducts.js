import { useCallback, useEffect, useMemo, useState } from "react";

import { productService } from "../services/productService.js";

import { useSearch } from "../context/searchContext.js";

export default function useProducts(
  initialQuery = "",
  initialCategory = "All",
  external = false,
) {
  const [products, setProducts] = useState(() => productService.getAll());

  const { query: globalQuery, setQuery: setGlobalQuery } = useSearch();

  const [localQuery, setLocalQuery] = useState(initialQuery);

  const query = external ? globalQuery : localQuery;

  const setQuery = external ? setGlobalQuery : setLocalQuery;

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
