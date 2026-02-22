import React from "react";
import { SectionBlock } from "../atoms/SectionBlock";
import { Pill } from "../atoms/Pill";
import type { ProfileData } from "../../profile-editor/types";

export const CardContents: React.FC<{ data: ProfileData }> = ({ data }) => {
  const hasContentsSection =
    data.myJob.length > 0 ||
    data.mySelected.length > 0 ||
    data.myCustom.length > 0 ||
    !!data.myContentMemo ||
    data.youJob.length > 0 ||
    (data.youContentsEnabled && (data.youSelected.length > 0 || data.youCustom.length > 0)) ||
    !!data.youContentMemo;

  if (!hasContentsSection) return null;

  const hasYouSection =
    data.youJob.length > 0 ||
    (data.youContentsEnabled && (data.youSelected.length > 0 || data.youCustom.length > 0)) ||
    data.youContentMemo;

  return (
    <div className="mb-6">
      <SectionBlock title="주 컨텐츠">
        {(data.myJob.length > 0 ||
          data.mySelected.length > 0 ||
          data.myCustom.length > 0 ||
          data.myContentMemo) && (
          <div className={hasYouSection ? "mb-3.5" : ""}>
            <div className="text-[9px] tracking-[0.2em] uppercase text-violet-500 font-semibold mb-2">
              ME
            </div>
            {data.myJob.length > 0 && (
              <div
                className={`flex flex-wrap gap-1 ${data.mySelected.length > 0 || data.myCustom.length > 0 || data.myContentMemo ? "mb-2" : ""}`}
              >
                {data.myJob.map((job) => (
                  <img
                    key={job}
                    src={`/job-icons/${job}.png`}
                    alt={job}
                    className="w-5 h-5"
                  />
                ))}
              </div>
            )}
            {data.mySelected.length > 0 && (
              <div
                className={`flex flex-wrap gap-1 ${data.myCustom.length > 0 || data.myContentMemo ? "mb-2" : ""}`}
              >
                {data.mySelected.map((kw) => (
                  <Pill key={kw} accent>
                    {kw}
                  </Pill>
                ))}
              </div>
            )}
            {data.myCustom.length > 0 && (
              <div
                className={`flex flex-wrap gap-1 ${data.myContentMemo ? "mb-2" : ""}`}
              >
                {data.myCustom.map((kw) => (
                  <Pill key={kw.id} accent emphasized={kw.emphasized}>
                    {kw.text}
                  </Pill>
                ))}
              </div>
            )}
            {data.myContentMemo && (
              <div className="text-[10px] text-stone-500 leading-[1.7] italic whitespace-pre-wrap">
                {data.myContentMemo}
              </div>
            )}
          </div>
        )}
        {hasYouSection && (
          <div>
            <div className="text-[9px] tracking-[0.2em] uppercase text-violet-500 font-semibold mb-2 text-right">
              YOU
            </div>
            {data.youJob.length > 0 && (
              <div
                className={`flex flex-wrap gap-1 justify-end ${data.youSelected.length > 0 || data.youCustom.length > 0 || data.youContentMemo ? "mb-2" : ""}`}
              >
                {data.youJob.map((job) => (
                  <img
                    key={job}
                    src={`/job-icons/${job}.png`}
                    alt={job}
                    className="w-5 h-5"
                  />
                ))}
              </div>
            )}
            {data.youContentsEnabled && data.youSelected.length > 0 && (
              <div
                className={`flex flex-wrap gap-1 justify-end ${data.youCustom.length > 0 || data.youContentMemo ? "mb-2" : ""}`}
              >
                {data.youSelected.map((kw) => (
                  <Pill key={kw} accent>
                    {kw}
                  </Pill>
                ))}
              </div>
            )}
            {data.youContentsEnabled && data.youCustom.length > 0 && (
              <div
                className={`flex flex-wrap gap-1 justify-end ${data.youContentMemo ? "mb-2" : ""}`}
              >
                {data.youCustom.map((kw) => (
                  <Pill key={kw.id} accent emphasized={kw.emphasized}>
                    {kw.text}
                  </Pill>
                ))}
              </div>
            )}
            {data.youContentMemo && (
              <div className="text-[10px] text-stone-500 leading-[1.7] italic text-right whitespace-pre-wrap">
                {data.youContentMemo}
              </div>
            )}
          </div>
        )}
      </SectionBlock>
    </div>
  );
};
