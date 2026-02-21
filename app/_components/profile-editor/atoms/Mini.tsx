import React from "react";

export const Mini: React.FC<{
  children: React.ReactNode;
  right?: boolean;
}> = ({ children, right }) => (
  <p
    className={`mb-1.5 text-[10px] text-stone-400 ${right ? "text-right" : ""}`}
  >
    {children}
  </p>
);
