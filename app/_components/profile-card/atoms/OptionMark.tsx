import React from "react";
import { C } from "../card-colors";

export const OptionMark: React.FC<{ value: string }> = ({ value }) => {
  const color =
    value === "O" ? C.green600 : value === "X" ? C.red500 : C.orange500;
  return (
    <span style={{ fontSize: "13px", fontWeight: 700, color }}>{value}</span>
  );
};
