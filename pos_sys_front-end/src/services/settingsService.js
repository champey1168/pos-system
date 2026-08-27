import { api } from "./api.js";

export const defaultSettings = {
  storeName: "Coffee Shop",
  Image: "logo.jpg",
  phone: "099 999 999",
  address: "Phnom Penh, Cambodia",
  currency: "USD",
  receiptFooter: "Thank you for your purchase!",
};

let cache = { ...defaultSettings };

export const settingsService = {
  get() {
    return cache;
  },

  async load() {
    try {
      const data = await api.get("/settings");
      cache = { ...defaultSettings, ...data };
    } catch {
      // keep local cache on failure
    }
    return cache;
  },

  async update(settings) {
    const data = await api.put("/settings", { ...cache, ...settings });
    cache = { ...defaultSettings, ...data };
    return cache;
  },
};
