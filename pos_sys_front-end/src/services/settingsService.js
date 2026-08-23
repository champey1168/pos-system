import { ensureStorage, writeStorage } from "../Utils/storage.js";

const KEY = "coffee_pos_settings";

export const defaultSettings = {
  storeName:"Coffee Shop",
  Image:"logo.jpg",
  phone: "099 999 999",
  address: "Phnom Penh, Cambodia",
  currency: "USD",
  receiptFooter: "Thank you for your purchase!",
};

export const settingsService = {
  get() {
    return ensureStorage(KEY, defaultSettings);
  },

  update(settings) {
    return writeStorage(KEY, {
      ...defaultSettings,
      ...settings,
    });
  },
};
