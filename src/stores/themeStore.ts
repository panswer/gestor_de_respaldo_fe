import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
}

function getInitialTheme(): Theme {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    return "light";
}

function applyTheme(theme: Theme) {
    document.documentElement.dataset.bsTheme = theme;
    localStorage.setItem("theme", theme);
}

const initial = getInitialTheme();
applyTheme(initial);

export const useThemeStore = create<ThemeState>((set) => ({
    theme: initial,
    toggleTheme: () => {
        set((state) => {
            const next = state.theme === "light" ? "dark" : "light";
            applyTheme(next);
            return { theme: next };
        });
    },
}));
