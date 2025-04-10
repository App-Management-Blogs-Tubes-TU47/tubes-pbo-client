import { create } from "zustand";

type ThemeState = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      return { theme: newTheme };
    }),
}));
