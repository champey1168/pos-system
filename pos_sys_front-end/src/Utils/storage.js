export function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);

    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));

  return value;
}

export function ensureStorage(key, fallback) {
  const value = readStorage(key, null);

  if (value === null) {
    writeStorage(key, fallback);

    return fallback;
  }

  return value;
}
