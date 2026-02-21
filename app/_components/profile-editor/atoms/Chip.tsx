import React from "react";

export const Chip: React.FC<{
  label: string;
  selected: boolean;
  onClick: () => void;
}> = ({ label, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-full border px-2.5 py-1 text-[11px] leading-none transition-all ${
      selected
        ? "border-violet-300 bg-violet-50 text-violet-700"
        : "border-stone-200 bg-stone-50 text-stone-400 hover:border-stone-300 hover:text-stone-600"
    }`}
  >
    {label}
  </button>
);
