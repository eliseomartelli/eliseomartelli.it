import { createContext, ReactNode, useState } from "react";

interface ThemeContextType {
  darkMode?: boolean;
  toggleDarkMode?: Function;
}

export const ThemeContext = createContext<ThemeContextType>({});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
