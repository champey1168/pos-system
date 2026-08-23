import { defaultProducts } from "../data/products.js";

import { ensureStorage, readStorage, writeStorage } from "../Utils/storage.js";

const KEY = "coffee_pos_products";

export const productService = {
  getAll() {
    return ensureStorage(KEY, defaultProducts);
  },

  getById(id) {
    return this.getAll().find((product) => product.id === id);
  },

  save(product) {
    const products = this.getAll();

    const saved = {
      ...product,
      id: product.id || `p-${Date.now()}`,
      price: Number(product.price),
      cost: Number(product.cost),
      stock: Number(product.stock),
    };

    writeStorage(KEY, [saved, ...products]);

    return saved;
  },

  update(id, updates) {
    const updated = {
      ...updates,
      id,
      price: Number(updates.price),
      cost: Number(updates.cost),
      stock: Number(updates.stock),
    };

    writeStorage(
      KEY,
      this.getAll().map((product) => (product.id === id ? updated : product)),
    );
    return updated;
  },

  remove(id) {
    writeStorage(
      KEY,
      this.getAll().filter((product) => product.id !== id),
    );
  },

  search(query = "", category = "All") {
    const normalized = query.trim().toLowerCase();
    return this.getAll().filter((product) => {
      const matchesQuery = [product.name, product.category]
        .join(" ")
        .toLowerCase()
        .includes(normalized);

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesQuery && matchesCategory && product.status !== "Deleted";
    });
  },

  replaceAll(products) {
    return writeStorage(KEY, products);
  },

  reset() {
    return writeStorage(KEY, defaultProducts);
  },

  raw() {
    return readStorage(KEY, []);
  },
};
