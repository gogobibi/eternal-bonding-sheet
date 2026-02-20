import React from "react";

export const Mini: React.FC<{
  children: React.ReactNode;
  right?: boolean;
}> = ({ children, right }) => (
  <p
    className={`text-[10px] text-stone-400 mb-1.5 ${right ? "text-right" : ""}`}
  >
    {children}
  </p>
);
