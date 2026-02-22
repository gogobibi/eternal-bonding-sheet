"use client";

import React from "react";
import { useTheme } from "../ThemeContext";

export const TimeChip: React.FC<{
  label: string;
  selected: boolean;
  onClick: () => void;
}> = ({ label, selected, onClick }) => {
  const theme = useTheme();
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-1.5 py-0.5 rounded text-[9px] border transition-all leading-none ${
        selected
          ? theme.chipSelected
          : "bg-stone-50 border-stone-200 text-stone-400 hover:border-stone-300"
      }`}
    >
      {label}
    </button>
  );
};
