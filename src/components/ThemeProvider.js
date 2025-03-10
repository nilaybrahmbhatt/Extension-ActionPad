import React, { createContext, useState, useEffect, useContext } from "react";

// 1. Create the Theme Context
const ThemeContext = createContext();

// 2.  Custom Hook to consume the context
export const useTheme = () => useContext(ThemeContext);

// 3.  Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // Function to detect system theme
  const getSystemTheme = () => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light"; // Default if media query not supported
  };

  // State for the theme (light/dark)
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or system, or default to light
    const storedTheme =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    return storedTheme || getSystemTheme();
  });

  // Function to toggle the theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Function to explicitly set the theme
  const setExplicitTheme = (newTheme) => {
    setTheme(newTheme);
  };

  // useEffect hook to update localStorage whenever the theme changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      //  Optionally update document class for styling.
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.setAttribute("class", theme);
    }
  }, [theme]);

  // Update document class on initial load to apply theme from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);

  // Value to be provided by the context
  const contextValue = {
    theme,
    toggleTheme,
    setTheme: setExplicitTheme, // renamed for clarity and to avoid confusion
  };

  // Provide the context to the children components
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
