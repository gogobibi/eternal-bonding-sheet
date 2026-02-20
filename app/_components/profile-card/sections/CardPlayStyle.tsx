import React from "react";
import { C } from "../card-colors";
import { SectionBlock } from "../atoms/SectionBlock";
import type { PlayStyleItem } from "../../profile-editor/types";

export const CardPlayStyle: React.FC<{ playStyles: PlayStyleItem[] }> = ({
  playStyles,
}) => {
  const hasPlayStyles = playStyles.some((p) => p.text.trim());
  if (!hasPlayStyles) return null;

  return (
    <div style={{ marginBottom: "24px" }}>
      <SectionBlock title="플레이 · 교류 스타일">
        <div
          style={{ display: "flex", flexDirection: "column", gap: "6px" }}
        >
          {playStyles
            .filter((p) => p.text.trim())
            .map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  padding: item.emphasized ? "5px 10px" : "3px 0",
                  backgroundColor: item.emphasized
                    ? C.amber100
                    : "transparent",
                  borderRadius: item.emphasized ? "8px" : "0",
                  border: item.emphasized ? `1px solid #fde68a` : "none",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    color: item.emphasized ? C.amber500 : C.stone300,
                    flexShrink: 0,
                    marginTop: "1px",
                    lineHeight: 1.6,
                  }}
                >
                  {item.emphasized ? "\u2605" : "\u00B7"}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: item.emphasized ? C.stone800 : C.stone600,
                    lineHeight: 1.7,
                    fontWeight: item.emphasized ? 500 : 400,
                  }}
                >
                  {item.text}
                </span>
              </div>
            ))}
        </div>
      </SectionBlock>
    </div>
  );
};
