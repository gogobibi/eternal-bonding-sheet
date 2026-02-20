import React from "react";
import { C } from "../card-colors";
import { s } from "../card-styles";
import { SectionBlock } from "../atoms/SectionBlock";
import { Pill } from "../atoms/Pill";
import type { ProfileData } from "../../profile-editor/types";

export const CardContents: React.FC<{ data: ProfileData }> = ({ data }) => {
  const myAllKeywords = [...data.mySelected, ...data.myCustom];
  const youAllKeywords = [...data.youSelected, ...data.youCustom];
  const hasContentsSection =
    myAllKeywords.length > 0 ||
    !!data.myContentMemo ||
    (data.youContentsEnabled && youAllKeywords.length > 0) ||
    !!data.youContentMemo;

  if (!hasContentsSection) return null;

  return (
    <div style={{ marginBottom: "24px" }}>
      <SectionBlock title="주 컨텐츠">
        {(myAllKeywords.length > 0 || data.myContentMemo) && (
          <div
            style={{
              marginBottom:
                (data.youContentsEnabled && youAllKeywords.length > 0) ||
                data.youContentMemo
                  ? "14px"
                  : "0",
            }}
          >
            <div style={s.meLabel}>ME</div>
            {myAllKeywords.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "4px",
                  marginBottom: data.myContentMemo ? "8px" : "0",
                }}
              >
                {myAllKeywords.map((kw) => (
                  <Pill key={kw} accent>
                    {kw}
                  </Pill>
                ))}
              </div>
            )}
            {data.myContentMemo && (
              <div
                style={{
                  fontSize: "10px",
                  color: C.stone500,
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  whiteSpace: "pre-wrap",
                }}
              >
                {data.myContentMemo}
              </div>
            )}
          </div>
        )}
        {((data.youContentsEnabled && youAllKeywords.length > 0) ||
          data.youContentMemo) && (
          <div>
            <div style={{ ...s.meLabel, textAlign: "right" }}>YOU</div>
            {data.youContentsEnabled && youAllKeywords.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "4px",
                  justifyContent: "flex-end",
                  marginBottom: data.youContentMemo ? "8px" : "0",
                }}
              >
                {youAllKeywords.map((kw) => (
                  <Pill key={kw} accent>
                    {kw}
                  </Pill>
                ))}
              </div>
            )}
            {data.youContentMemo && (
              <div
                style={{
                  fontSize: "10px",
                  color: C.stone500,
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  textAlign: "right",
                  whiteSpace: "pre-wrap",
                }}
              >
                {data.youContentMemo}
              </div>
            )}
          </div>
        )}
      </SectionBlock>
    </div>
  );
};
