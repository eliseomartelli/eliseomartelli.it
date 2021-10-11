import React from "react";

export const DarkModeToggle: React.FC<{toggleTheme: any, theme: any}> = ({toggleTheme, theme}) => {
  return (
    <button onClick={() => toggleTheme()} className="ml-8">
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
};
