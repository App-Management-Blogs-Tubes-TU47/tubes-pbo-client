import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserTypes {
  id: string;
  name: string;
  email: string;

  /**
   * @Types {string | null}
   * @description Token data
   * @default { null }
   */
  token: string | null;
}

interface AuthState {
  /**
   * @Types {UserTypes}
   * @description User data
   * @default { id: "", name: "", email: "" }
   */
  users: UserTypes;

  /**
   * @description Set user data
   * @param {UserTypes} users
   */
  setUsers: (users: UserTypes) => void;

  /**
   * @description Clear user data
   */
  clearUsers: () => void;

  /**
   * @description Set token data
   * @param {string} token
   */
  setToken: (token: string) => void;

  /**
   * @description Clear token data
   */
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      users: { id: "", name: "", email: "", token: "" },
      setUsers: (users) => set({ users }),
      clearUsers: () =>
        set({ users: { id: "", name: "", email: "", token: "" } }),

      setToken: (token) =>
        set((state) => ({ users: { ...state.users, token } })),
      clearToken: () =>
        set((state) => ({ users: { ...state.users, token: null } })),
    }),
    {
      name: "auth-storage", // Nama key di localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
