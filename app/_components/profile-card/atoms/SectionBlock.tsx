import React from "react";
import { s } from "../card-styles";

export const SectionBlock: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div style={s.sectionWrap}>
    <div style={s.sectionHeader}>
      <span style={s.sectionTitle}>{title}</span>
      <div style={s.sectionLine} />
    </div>
    {children}
  </div>
);
