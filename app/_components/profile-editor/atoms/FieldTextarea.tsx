"use client";

import React from "react";
import { useTheme } from "../ThemeContext";

export const FieldTextarea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = (props) => {
  const theme = useTheme();
  return (
    <textarea
      {...props}
      className={`w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-stone-50 placeholder:text-stone-300 focus:outline-none ${theme.inputFocus} resize-none transition-colors ${props.className ?? ""}`}
    />
  );
};
