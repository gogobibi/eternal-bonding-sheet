import React from "react";
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

  const hasYouSection =
    (data.youContentsEnabled && youAllKeywords.length > 0) ||
    data.youContentMemo;

  return (
    <div className="mb-6">
      <SectionBlock title="주 컨텐츠">
        {(myAllKeywords.length > 0 || data.myContentMemo) && (
          <div className={hasYouSection ? "mb-3.5" : ""}>
            <div className="mb-2 text-[9px] font-semibold tracking-[0.2em] text-violet-500 uppercase">
              ME
            </div>
            {myAllKeywords.length > 0 && (
              <div
                className={`flex flex-wrap gap-1 ${data.myContentMemo ? "mb-2" : ""}`}
              >
                {myAllKeywords.map((kw) => (
                  <Pill key={kw} accent>
                    {kw}
                  </Pill>
                ))}
              </div>
            )}
            {data.myContentMemo && (
              <div className="text-[10px] leading-[1.7] whitespace-pre-wrap text-stone-500 italic">
                {data.myContentMemo}
              </div>
            )}
          </div>
        )}
        {hasYouSection && (
          <div>
            <div className="mb-2 text-right text-[9px] font-semibold tracking-[0.2em] text-violet-500 uppercase">
              YOU
            </div>
            {data.youContentsEnabled && youAllKeywords.length > 0 && (
              <div
                className={`flex flex-wrap justify-end gap-1 ${data.youContentMemo ? "mb-2" : ""}`}
              >
                {youAllKeywords.map((kw) => (
                  <Pill key={kw} accent>
                    {kw}
                  </Pill>
                ))}
              </div>
            )}
            {data.youContentMemo && (
              <div className="text-right text-[10px] leading-[1.7] whitespace-pre-wrap text-stone-500 italic">
                {data.youContentMemo}
              </div>
            )}
          </div>
        )}
      </SectionBlock>
    </div>
  );
};
