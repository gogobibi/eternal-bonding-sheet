import React from "react";

export const SectionCard: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
    <div className="px-5 py-3 border-b border-stone-100 bg-stone-50/60">
      <p className="text-[10px] tracking-[0.22em] uppercase text-stone-400">
        {title}
      </p>
    </div>
    <div className="p-5">{children}</div>
  </div>
);
