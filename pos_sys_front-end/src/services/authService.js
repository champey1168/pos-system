import { ensureStorage, writeStorage } from "../Utils/storage.js";

const KEY = "coffee_pos_current_user";

const defaultUser = {
  id: "u-1001",
  name: "Jane Doe",
  email: "jane@coffeeshop.local",
  phone: "012345678",
  role: "Cashier",
  profileImage: "",
};

export const authService = {
  getCurrentUser() {
    return ensureStorage(KEY, defaultUser);
  },

  login(profile = defaultUser) {
    return writeStorage(KEY, { ...defaultUser, ...profile });
  },

  logout() {
    return writeStorage(KEY, defaultUser);
  },

  update(profile) {
    return writeStorage(KEY, { ...authService.getCurrentUser(), ...profile });
  },
};
