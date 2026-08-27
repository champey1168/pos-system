import { api, getToken, setToken } from "./api.js";

const KEY = "coffee_pos_current_user";

const defaultUser = {
  id: "u-1001",
  name: "Jane Doe",
  email: "jane@coffeeshop.local",
  phone: "012345678",
  role: "Cashier",
  profileImage: "",
};

function readCurrentUser() {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storeUser(user) {
  if (user) {
    window.localStorage.setItem(KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(KEY);
  }
  return user;
}

export const authService = {
  getCurrentUser() {
    return readCurrentUser() || (getToken() ? null : defaultUser);
  },

  async login(credentials) {
    const { user, token } = await api.post("/login", credentials);
    setToken(token);
    storeUser(user);
    return user;
  },

  async register(credentials) {
    const { user, token } = await api.post("/register", credentials);
    setToken(token);
    storeUser(user);
    return user;
  },

  async logout() {
    try {
      await api.post("/logout");
    } catch {
      // ignore network errors on logout
    }
    setToken(null);
    storeUser(null);
    return null;
  },

  async update(profile) {
    const user = storeUser({ ...readCurrentUser(), ...profile });
    return user;
  },

  async fetchMe() {
    try {
      const user = await api.get("/user");
      storeUser(user);
      return user;
    } catch {
      storeUser(null);
      return null;
    }
  },
};
