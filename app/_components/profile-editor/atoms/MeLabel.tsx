import React from "react";

export const MeLabel: React.FC<{ right?: boolean }> = ({ right }) => (
  <p
    className={`text-[10px] tracking-[0.22em] uppercase text-violet-400 mb-3 ${right ? "text-right" : ""}`}
  >
    {right ? "YOU" : "ME"}
  </p>
);
