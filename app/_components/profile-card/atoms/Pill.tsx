import React from "react";

export const Pill: React.FC<{
  children: React.ReactNode;
  accent?: boolean;
  size?: "sm" | "md";
}> = ({ children, accent, size = "md" }) => (
  <span
    className={`inline-block rounded-full leading-[1.7] border ${
      size === "sm" ? "px-1.5 py-px text-[9px]" : "px-2 py-0.5 text-[10px]"
    } ${
      accent
        ? "border-violet-200 bg-violet-50 text-violet-600"
        : "border-stone-200 bg-stone-100 text-stone-500"
    }`}
  >
    {children}
  </span>
);
