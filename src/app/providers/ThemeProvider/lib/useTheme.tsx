import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "../context/ThemeContext";

interface IUseThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

export function useTheme(): IUseThemeResult {
    const { theme = Theme.LIGHT, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        setTheme?.(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return { theme, toggleTheme };
}