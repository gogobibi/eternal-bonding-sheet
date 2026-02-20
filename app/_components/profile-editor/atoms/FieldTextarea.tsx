import React from "react";

export const FieldTextarea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = (props) => (
  <textarea
    {...props}
    className={`w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-stone-50 placeholder:text-stone-300 focus:outline-none focus:border-violet-300 resize-none transition-colors ${props.className ?? ""}`}
  />
);
