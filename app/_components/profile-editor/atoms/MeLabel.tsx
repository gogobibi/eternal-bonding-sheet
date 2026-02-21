import React from "react";

export const MeLabel: React.FC<{ right?: boolean }> = ({ right }) => (
  <p
    className={`mb-3 text-[10px] tracking-[0.22em] text-violet-400 uppercase ${right ? "text-right" : ""}`}
  >
    {right ? "YOU" : "ME"}
  </p>
);
