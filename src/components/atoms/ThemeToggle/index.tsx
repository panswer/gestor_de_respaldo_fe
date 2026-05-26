import { useCallback } from "react";
import { useThemeStore } from "../../../stores/themeStore";

function ThemeToggle() {
    const theme = useThemeStore((s) => s.theme);
    const toggleTheme = useThemeStore((s) => s.toggleTheme);

    const handleClick = useCallback(() => {
        toggleTheme();
    }, [toggleTheme]);

    return (
        <button className="btn" onClick={handleClick} aria-label="Cambiar tema">
            <i className={`bi bi-${theme === "light" ? "moon-fill" : "sun-fill"}`} />
        </button>
    );
}

export default ThemeToggle;
