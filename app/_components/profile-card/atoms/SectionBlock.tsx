import React from "react";

export const SectionBlock: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div>
    <div className="mb-3.5 flex items-center gap-2">
      <span className="text-[9px] font-medium tracking-[0.22em] whitespace-nowrap text-stone-400 uppercase">
        {title}
      </span>
      <div className="h-px flex-1 bg-stone-200" />
    </div>
    {children}
  </div>
);
