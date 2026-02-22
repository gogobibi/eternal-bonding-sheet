import React from "react";
import { SectionBlock } from "../atoms/SectionBlock";

export const CardFreeText: React.FC<{ freeText: string }> = ({ freeText }) => {
  if (!freeText) return null;

  return (
    <div className="mb-6">
      <SectionBlock title="그 외">
        <div className="text-[10px] text-stone-700 leading-[1.9] whitespace-pre-wrap">
          {freeText}
        </div>
      </SectionBlock>
    </div>
  );
};
