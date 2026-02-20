import React from "react";

export const FieldInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = (props) => (
  <input
    {...props}
    className={`w-full px-3 py-2 text-xs border border-stone-200 rounded-lg bg-stone-50 placeholder:text-stone-300 focus:outline-none focus:border-violet-300 transition-colors ${props.className ?? ""}`}
  />
);
