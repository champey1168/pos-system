import { useMemo, useState } from "react";

import { authService } from "../services/authService.js";

import { AuthContext } from "./authContext.js";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() =>
    authService.getCurrentUser(),
  );

  const value = useMemo(
    () => ({
      currentUser,

      isAuthenticated: Boolean(currentUser),

      login(profile) {
        const user = authService.login(profile);
        setCurrentUser(user);
        return user;
      },

      logout() {
        const user = authService.logout();
        setCurrentUser(user);
      },

      updateProfile(profile) {
        const user = authService.update(profile);
        setCurrentUser(user);
        return user;
      },
    }),
    [currentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
