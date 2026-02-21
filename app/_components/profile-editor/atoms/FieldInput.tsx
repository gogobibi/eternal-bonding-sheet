import React from "react";

export const FieldInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = (props) => (
  <input
    {...props}
    className={`w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs transition-colors placeholder:text-stone-300 focus:border-violet-300 focus:outline-none ${props.className ?? ""}`}
  />
);
