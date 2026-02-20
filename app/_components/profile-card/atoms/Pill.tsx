import React from "react";
import { C } from "../card-colors";

export const Pill: React.FC<{
  children: React.ReactNode;
  accent?: boolean;
  size?: "sm" | "md";
}> = ({ children, accent, size = "md" }) => (
  <span
    style={{
      display: "inline-block",
      padding: size === "sm" ? "1px 6px" : "2px 8px",
      borderRadius: "999px",
      fontSize: size === "sm" ? "9px" : "10px",
      lineHeight: 1.7,
      border: `1px solid ${accent ? C.violet200 : C.stone200}`,
      backgroundColor: accent ? C.violet50 : C.stone100,
      color: accent ? C.violet600 : C.stone500,
    }}
  >
    {children}
  </span>
);
