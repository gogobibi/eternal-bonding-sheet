import React from "react";
import { C } from "../card-colors";
import { SectionBlock } from "../atoms/SectionBlock";

export const CardFreeText: React.FC<{ freeText: string }> = ({ freeText }) => {
  if (!freeText) return null;

  return (
    <div style={{ marginBottom: "24px" }}>
      <SectionBlock title="그 외">
        <div
          style={{
            fontSize: "10px",
            color: C.stone600,
            lineHeight: 1.9,
            whiteSpace: "pre-wrap",
          }}
        >
          {freeText}
        </div>
      </SectionBlock>
    </div>
  );
};
