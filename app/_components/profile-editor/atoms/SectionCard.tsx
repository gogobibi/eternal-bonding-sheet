import React from "react";

export const SectionCard: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div className="overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm">
    <div className="border-b border-stone-100 bg-stone-50/60 px-5 py-3">
      <p className="text-[10px] tracking-[0.22em] text-stone-400 uppercase">
        {title}
      </p>
    </div>
    <div className="p-5">{children}</div>
  </div>
);
