const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

let onUnauthorized = null;

export function setUnauthorizedHandler(fn) {
  onUnauthorized = fn;
}

export function getToken() {
  return window.localStorage.getItem("coffee_pos_token");
}

export function setToken(token) {
  if (token) {
    window.localStorage.setItem("coffee_pos_token", token);
  } else {
    window.localStorage.removeItem("coffee_pos_token");
  }
}

async function request(path, options = {}) {
  const { headers = {}, body, ...rest } = options;

  const token = getToken();

  const response = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;

  const text = await response.text();

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (response.status === 401) {
    if (onUnauthorized) {
      onUnauthorized();
    }
  }

  if (!response.ok) {
    const message = data?.message || data?.error || `Request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  get: (path) => request(path, { method: "GET" }),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  delete: (path) => request(path, { method: "DELETE" }),
};
