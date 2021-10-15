import React from "react";

export const DarkModeToggle: React.FC<{ toggleTheme?: any; theme: any }> = ({
  toggleTheme,
  theme,
}) => {
  return (
    <button onClick={() => toggleTheme()}>
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
};
