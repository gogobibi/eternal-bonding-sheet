import React from "react";
import { SectionBlock } from "../atoms/SectionBlock";
import { Pill } from "../atoms/Pill";
import type { ProfileData } from "../../profile-editor/types";

export const CardBasicInfo: React.FC<{ data: ProfileData }> = ({ data }) => {
  const meGenderDisplay =
    data.meGender === "직접기입" ? data.meGenderCustom : data.meGender;
  const youGenderDisplay =
    data.youGender === "직접기입" ? data.youGenderCustom : data.youGender;

  const meHasData =
    !!meGenderDisplay ||
    !!data.meAge ||
    data.meWeekday.length > 0 ||
    data.meWeekend.length > 0 ||
    !!data.meTimeMemo;

  return (
    <div className="mb-6">
      <SectionBlock title="기본 소개">
        <div className="grid grid-cols-2">
          {/* ME */}
          <div className="pr-4">
            <div className="mb-2 text-[9px] font-semibold tracking-[0.2em] text-violet-500 uppercase">
              ME
            </div>
            {meHasData ? (
              <div className="flex flex-col gap-1.5">
                {meGenderDisplay && (
                  <div className="flex items-center gap-1.5">
                    <span className="min-w-[26px] text-[9px] text-stone-400">
                      성별
                    </span>
                    <Pill>{meGenderDisplay}</Pill>
                  </div>
                )}
                {data.meAge && (
                  <div className="flex items-center gap-1.5">
                    <span className="min-w-[26px] text-[9px] text-stone-400">
                      나이
                    </span>
                    <Pill>{data.meAge}</Pill>
                  </div>
                )}
                {(data.meWeekday.length > 0 || data.meWeekend.length > 0) && (
                  <div>
                    <span className="mb-1 block text-[9px] text-stone-400">
                      접속
                    </span>
                    {data.meWeekday.length > 0 && (
                      <div className="mb-[3px]">
                        <span className="mr-1 text-[8px] text-violet-500">
                          평일
                        </span>
                        <span className="text-[9px] text-stone-600">
                          {data.meWeekday.join(" · ")}
                        </span>
                      </div>
                    )}
                    {data.meWeekend.length > 0 && (
                      <div>
                        <span className="mr-1 text-[8px] text-violet-500">
                          주말
                        </span>
                        <span className="text-[9px] text-stone-600">
                          {data.meWeekend.join(" · ")}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                {data.meTimeMemo && (
                  <div className="mt-0.5 text-[9px] leading-[1.6] text-stone-500 italic">
                    {data.meTimeMemo}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-[9px] text-stone-300">—</div>
            )}
          </div>

          {/* YOU */}
          <div className="border-l border-stone-200 pl-4">
            <div className="mb-2 text-right text-[9px] font-semibold tracking-[0.2em] text-violet-500 uppercase">
              YOU
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center justify-end gap-1.5">
                <Pill>{youGenderDisplay || "무관"}</Pill>
                <span className="min-w-[26px] text-right text-[9px] text-stone-400">
                  성별
                </span>
              </div>
              <div className="flex items-center justify-end gap-1.5">
                <Pill>{data.youAge || "무관"}</Pill>
                <span className="min-w-[26px] text-right text-[9px] text-stone-400">
                  나이
                </span>
              </div>
              <div className="text-right">
                <span className="mb-1 block text-[9px] text-stone-400">
                  접속
                </span>
                <div className="mb-[3px]">
                  <span className="ml-1 text-[8px] text-violet-500">평일</span>
                  <div className="text-[9px] text-stone-600">
                    {data.youWeekdayAny
                      ? "무관"
                      : data.youWeekday.length > 0
                        ? data.youWeekday.join(" · ")
                        : "—"}
                  </div>
                </div>
                <div>
                  <span className="ml-1 text-[8px] text-violet-500">주말</span>
                  <div className="text-[9px] text-stone-600">
                    {data.youWeekendAny
                      ? "무관"
                      : data.youWeekend.length > 0
                        ? data.youWeekend.join(" · ")
                        : "—"}
                  </div>
                </div>
              </div>
              {data.youTimeMemo && (
                <div className="mt-0.5 text-right text-[9px] leading-[1.6] text-stone-500 italic">
                  {data.youTimeMemo}
                </div>
              )}
            </div>
          </div>
        </div>
      </SectionBlock>
    </div>
  );
};
