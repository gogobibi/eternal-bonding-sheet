"use client";

import React from "react";
import { useTheme } from "../ThemeContext";

export const OptionBtn: React.FC<{
  label: string;
  selected: boolean;
  onClick: () => void;
  size?: "sm" | "md";
  special?: boolean;
}> = ({ label, selected, onClick, size = "md" }) => {
  const theme = useTheme();
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border transition-all leading-none ${
        size === "sm"
          ? "px-2 py-0.5 text-[10px]"
          : "px-3 py-1.5 text-xs"
      } ${
        selected
          ? theme.optionBtnSelected
          : "bg-stone-50 border-stone-200 text-stone-400 hover:border-stone-300 hover:text-stone-600"
      }`}
    >
      {label}
    </button>
  );
};
