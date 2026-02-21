import React from "react";

export const TimeChip: React.FC<{
  label: string;
  selected: boolean;
  onClick: () => void;
}> = ({ label, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded border px-1.5 py-0.5 text-[9px] leading-none transition-all ${
      selected
        ? "border-violet-300 bg-violet-50 text-violet-700"
        : "border-stone-200 bg-stone-50 text-stone-400 hover:border-stone-300"
    }`}
  >
    {label}
  </button>
);
