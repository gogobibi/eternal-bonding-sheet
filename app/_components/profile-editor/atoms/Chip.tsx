import React from "react";

export const Chip: React.FC<{
  label: string;
  selected: boolean;
  onClick: () => void;
}> = ({ label, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-2.5 py-1 rounded-full text-[11px] border transition-all leading-none ${
      selected
        ? "bg-violet-50 border-violet-300 text-violet-700"
        : "bg-stone-50 border-stone-200 text-stone-400 hover:border-stone-300 hover:text-stone-600"
    }`}
  >
    {label}
  </button>
);
