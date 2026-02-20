import React from "react";

export const TimeChip: React.FC<{
  label: string;
  selected: boolean;
  onClick: () => void;
}> = ({ label, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-1.5 py-0.5 rounded text-[9px] border transition-all leading-none ${
      selected
        ? "bg-violet-50 border-violet-300 text-violet-700"
        : "bg-stone-50 border-stone-200 text-stone-400 hover:border-stone-300"
    }`}
  >
    {label}
  </button>
);
