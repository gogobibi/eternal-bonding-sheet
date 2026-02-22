"use client";

import React from "react";
import { useTheme } from "../ThemeContext";

export const MeLabel: React.FC<{ right?: boolean }> = ({ right }) => {
  const theme = useTheme();
  return (
    <p
      className={`text-[10px] tracking-[0.22em] uppercase ${theme.editorLabel} mb-3 ${right ? "text-right" : ""}`}
    >
      {right ? "YOU" : "ME"}
    </p>
  );
};
