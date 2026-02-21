import React from "react";

export const SectionBlock: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div>
    <div className="flex items-center gap-2 mb-3.5">
      <span className="text-[9px] tracking-[0.22em] uppercase text-stone-400 font-medium whitespace-nowrap">
        {title}
      </span>
      <div className="flex-1 h-px bg-stone-200" />
    </div>
    {children}
  </div>
);
