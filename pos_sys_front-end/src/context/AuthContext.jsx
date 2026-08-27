import { useCallback, useEffect, useMemo, useState } from "react";

import { authService } from "../services/authService.js";

import { getToken, setUnauthorizedHandler } from "../services/api.js";

import { AuthContext } from "./authContext.js";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() =>
    authService.getCurrentUser(),
  );

  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function restore() {
      if (getToken()) {
        const user = await authService.fetchMe();
        if (!cancelled) {
          setCurrentUser(user);
        }
      }
      if (!cancelled) {
        setReady(true);
      }
    }

    restore();

    setUnauthorizedHandler(() => {
      setCurrentUser(null);
      authService.logout();
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (credentials) => {
    const user = await authService.login(credentials);
    setCurrentUser(user);
    return user;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setCurrentUser(null);
  }, []);

  const updateProfile = useCallback(async (profile) => {
    const user = await authService.update(profile);
    setCurrentUser(user);
    return user;
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(getToken() && currentUser),
      ready,
      login,
      logout,
      updateProfile,
    }),
    [currentUser, ready, login, logout, updateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
