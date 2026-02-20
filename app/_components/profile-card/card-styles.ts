import React from "react";
import { C } from "./card-colors";

export const s = {
  sectionWrap: {
    marginBottom: "0px",
  } as React.CSSProperties,

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "14px",
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: "9px",
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: C.stone400,
    fontWeight: 500,
    whiteSpace: "nowrap" as const,
  } as React.CSSProperties,

  sectionLine: {
    flex: 1,
    height: "1px",
    backgroundColor: C.stone200,
  } as React.CSSProperties,

  meLabel: {
    fontSize: "9px",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: C.violet500,
    fontWeight: 600,
    marginBottom: "8px",
  } as React.CSSProperties,
};
