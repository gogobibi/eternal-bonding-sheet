import React from "react";

export const OptionBtn: React.FC<{
  label: string;
  selected: boolean;
  onClick: () => void;
  size?: "sm" | "md";
}> = ({ label, selected, onClick, size = "md" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-lg border leading-none transition-all ${
      size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1.5 text-xs"
    } ${
      selected
        ? "border-violet-300 bg-violet-50 text-violet-700"
        : "border-stone-200 bg-stone-50 text-stone-400 hover:border-stone-300 hover:text-stone-600"
    }`}
  >
    {label}
  </button>
);
