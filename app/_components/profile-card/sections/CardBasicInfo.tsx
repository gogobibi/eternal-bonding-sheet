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
            <div className="text-[9px] tracking-[0.2em] uppercase text-violet-500 font-semibold mb-2">
              ME
            </div>
            {meHasData ? (
              <div className="flex flex-col gap-1.5">
                {meGenderDisplay && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] text-stone-400 min-w-[26px]">
                      성별
                    </span>
                    <Pill>{meGenderDisplay}</Pill>
                  </div>
                )}
                {data.meAge && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] text-stone-400 min-w-[26px]">
                      나이
                    </span>
                    <Pill>{data.meAge}</Pill>
                  </div>
                )}
                {(data.meWeekday.length > 0 || data.meWeekend.length > 0) && (
                  <div>
                    <span className="text-[9px] text-stone-400 block mb-1">
                      접속
                    </span>
                    {data.meWeekday.length > 0 && (
                      <div className="mb-[3px]">
                        <span className="text-[8px] text-violet-500 mr-1">
                          평일
                        </span>
                        <span className="text-[9px] text-stone-600">
                          {data.meWeekday.join(" · ")}
                        </span>
                      </div>
                    )}
                    {data.meWeekend.length > 0 && (
                      <div>
                        <span className="text-[8px] text-violet-500 mr-1">
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
                  <div className="text-[9px] text-stone-500 leading-[1.6] italic mt-0.5">
                    {data.meTimeMemo}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-[9px] text-stone-300">—</div>
            )}
          </div>

          {/* YOU */}
          <div className="pl-4 border-l border-stone-200">
            <div className="text-[9px] tracking-[0.2em] uppercase text-violet-500 font-semibold mb-2 text-right">
              YOU
            </div>
            <div className="flex flex-col gap-1.5 items-end">
              <div className="flex items-center gap-1.5 justify-end">
                <Pill>{youGenderDisplay || "무관"}</Pill>
                <span className="text-[9px] text-stone-400 min-w-[26px] text-right">
                  성별
                </span>
              </div>
              <div className="flex items-center gap-1.5 justify-end">
                <Pill>{data.youAge || "무관"}</Pill>
                <span className="text-[9px] text-stone-400 min-w-[26px] text-right">
                  나이
                </span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-stone-400 block mb-1">
                  접속
                </span>
                <div className="mb-[3px]">
                  <span className="text-[8px] text-violet-500 ml-1">
                    평일
                  </span>
                  <div className="text-[9px] text-stone-600">
                    {data.youWeekdayAny
                      ? "무관"
                      : data.youWeekday.length > 0
                        ? data.youWeekday.join(" · ")
                        : "—"}
                  </div>
                </div>
                <div>
                  <span className="text-[8px] text-violet-500 ml-1">
                    주말
                  </span>
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
                <div className="text-[9px] text-stone-500 leading-[1.6] italic text-right mt-0.5">
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
