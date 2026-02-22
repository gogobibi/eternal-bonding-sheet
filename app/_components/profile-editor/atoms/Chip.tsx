"use client";

import React from "react";
import { useTheme } from "../ThemeContext";

export const Chip: React.FC<{
  label: string;
  selected: boolean;
  onClick: () => void;
}> = ({ label, selected, onClick }) => {
  const theme = useTheme();
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2.5 py-1 rounded-full text-[11px] border transition-all leading-none ${
        selected
          ? theme.chipSelected
          : "bg-stone-50 border-stone-200 text-stone-400 hover:border-stone-300 hover:text-stone-600"
      }`}
    >
      {label}
    </button>
  );
};
