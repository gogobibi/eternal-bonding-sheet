import React from "react";
import { C } from "../card-colors";

export const CardFooter: React.FC = () => (
  <div
    style={{
      borderTop: `1px solid ${C.stone200}`,
      paddingTop: "14px",
      textAlign: "center",
    }}
  >
    <p
      style={{
        fontSize: "8px",
        color: C.stone300,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}
    >
      Final Fantasy XIV · 언약 프로필
    </p>
  </div>
);
