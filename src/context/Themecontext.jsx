import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const darkThemeProvider = createContext();

const Themecontext = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(
    JSON.parse(localStorage.getItem("darkTheme")) || false
  );

  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add("dark");
      localStorage.setItem("darkTheme", JSON.stringify(true));
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkTheme", JSON.stringify(false));
    }
  }, [darkTheme]);

  return (
    <darkThemeProvider.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </darkThemeProvider.Provider>
  );
};

export default Themecontext;
