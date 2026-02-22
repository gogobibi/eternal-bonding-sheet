"use client";

import React, { createContext, useContext } from "react";
import type { AccentColor, ThemeClasses } from "./theme";
import { themeClasses } from "./theme";

const ThemeContext = createContext<ThemeClasses>(themeClasses.violet);

export const ThemeProvider: React.FC<{
  accentColor: AccentColor;
  children: React.ReactNode;
}> = ({ accentColor, children }) => (
  <ThemeContext.Provider value={themeClasses[accentColor]}>
    {children}
  </ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);
