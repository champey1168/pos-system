import { defaultProducts } from "../data/products.js";

import { api } from "./api.js";

let cache = null;

function snapshot() {
  return cache || [];
}

export const productService = {
  getAll() {
    return snapshot();
  },

  getById(id) {
    return snapshot().find((product) => `${product.id}` === `${id}`);
  },

  async refresh() {
    try {
      const data = await api.get("/products?onlyActive=1");
      cache = data;
    } catch {
      if (cache === null) {
        cache = defaultProducts;
      }
    }
    return snapshot();
  },

  async save(product) {
    const created = await api.post("/products", {
      ...product,
      customizable: Boolean(product.customizable),
    });
    cache = [created, ...snapshot()];
    return created;
  },

  async update(id, updates) {
    const updated = await api.put(`/products/${id}`, {
      ...updates,
      customizable: Boolean(updates.customizable),
    });
    cache = snapshot().map((p) => (`${p.id}` === `${id}` ? updated : p));
    return updated;
  },

  async remove(id) {
    await api.delete(`/products/${id}`);
    cache = snapshot().filter((p) => `${p.id}` !== `${id}`);
  },

  search(query = "", category = "All") {
    const normalized = query.trim().toLowerCase();
    return snapshot().filter((product) => {
      const matchesQuery = [product.name, product.category]
        .join(" ")
        .toLowerCase()
        .includes(normalized);
      const matchesCategory =
        category === "All" || product.category === category;
      return matchesQuery && matchesCategory && product.status !== "Deleted";
    });
  },

  async replaceAll(products) {
    cache = products;
    return snapshot();
  },

  async reset() {
    cache = defaultProducts;
    return snapshot();
  },

  raw() {
    return snapshot();
  },
};
