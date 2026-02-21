import React from "react";

export const FieldTextarea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = (props) => (
  <textarea
    {...props}
    className={`w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs transition-colors placeholder:text-stone-300 focus:border-violet-300 focus:outline-none ${props.className ?? ""}`}
  />
);
