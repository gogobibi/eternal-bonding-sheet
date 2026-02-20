import React from "react";

export const OptionMark: React.FC<{ value: string }> = ({ value }) => (
  <span
    className={`text-[13px] font-bold ${
      value === "O"
        ? "text-emerald-600"
        : value === "X"
          ? "text-red-500"
          : "text-orange-500"
    }`}
  >
    {value}
  </span>
);
