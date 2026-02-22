"use client";

import React from "react";
import { useTheme } from "../ThemeContext";

export const FieldInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = (props) => {
  const theme = useTheme();
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 text-xs border border-stone-200 rounded-lg bg-stone-50 placeholder:text-stone-300 focus:outline-none ${theme.inputFocus} transition-colors ${props.className ?? ""}`}
    />
  );
};
