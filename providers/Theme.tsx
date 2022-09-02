import { createContext, ReactNode, useEffect, useState } from "react";

interface ThemeContextType {
  darkMode: boolean | null;
  toggleDarkMode: Function;
}

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

const LSDarkModeKey = "darkMode";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  function getInitialState(): boolean {
    const darkModeLS = localStorage.getItem(LSDarkModeKey);
    if (darkModeLS !== null) {
      const isDarkModeStored = JSON.parse(darkModeLS);
      return isDarkModeStored;
    } else {
      return isSystemDarkMode();
    }
  }

  function isSystemDarkMode() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  useEffect(() => {
    setDarkMode(getInitialState());
  }, []);

  useEffect(() => {
    if (darkMode !== null)
      localStorage.setItem(LSDarkModeKey, JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
