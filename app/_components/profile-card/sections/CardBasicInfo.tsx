"use client";

import React from "react";
import { SectionBlock } from "../atoms/SectionBlock";
import { Pill } from "../atoms/Pill";
import type { ProfileData } from "../../profile-editor/types";
import { TIME_SLOTS } from "../../profile-editor/constants";
import { useTheme } from "../../profile-editor/ThemeContext";

const sortByTimeSlot = (slots: string[]) =>
  [...slots].sort((a, b) => TIME_SLOTS.indexOf(a) - TIME_SLOTS.indexOf(b));

export const CardBasicInfo: React.FC<{ data: ProfileData }> = ({ data }) => {
  const theme = useTheme();
  const meGenderDisplay =
    data.meGender === "직접기입" ? data.meGenderCustom : data.meGender;
  const youGenderDisplay =
    data.youGender === "직접기입" ? data.youGenderCustom : data.youGender;

  const hasYouData = !!(
    youGenderDisplay ||
    data.youAge.length > 0 ||
    data.youWeekdayAny ||
    data.youWeekday.length > 0 ||
    data.youWeekendAny ||
    data.youWeekend.length > 0 ||
    data.youTimeMemo
  );

  return (
    <div className="mb-6">
      <SectionBlock title="기본 소개">
        <div className={hasYouData ? "grid grid-cols-2" : ""}>
          {/* ME */}
          <div className={hasYouData ? "pr-4" : ""}>
            {hasYouData && (
              <div className={`text-[9px] tracking-[0.2em] uppercase ${theme.cardLabel} font-semibold mb-2`}>
                ME
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              {meGenderDisplay && (
                <div className="flex items-center gap-1.5">
                  <span className="min-w-[26px] text-[9px] text-stone-500">
                    성별
                  </span>
                  <Pill>{meGenderDisplay}</Pill>
                </div>
              )}
              {data.meAge.length > 0 && (
                <div className="flex items-start gap-1.5">
                  <span className="min-w-[26px] text-[9px] text-stone-500">
                    나이
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {data.meAge.map((age) => (
                      <Pill size="sm" key={age}>{age}</Pill>
                    ))}
                  </div>
                </div>
              )}
              {(data.meWeekday.length > 0 || data.meWeekend.length > 0) && (
                <div>
                  <span className="block text-[9px] text-stone-500">
                    접속 시간
                  </span>
                  {data.meWeekday.length > 0 && (
                    <div className="mb-[3px]">
                      <span className="mr-1 text-[8px] text-stone-500">
                        평일
                      </span>
                      <div className="text-[9px] text-stone-700">
                        {sortByTimeSlot(data.meWeekday).join(" · ")}
                      </div>
                    </div>
                  )}
                  {data.meWeekend.length > 0 && (
                    <div>
                      <span className="mr-1 text-[8px] text-stone-500">
                        주말
                      </span>
                      <div className="text-[9px] text-stone-700">
                        {sortByTimeSlot(data.meWeekend).join(" · ")}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {data.meTimeMemo && (
                <div className="mt-0.5 text-[9px] leading-[1.6] text-stone-600 italic">
                  {data.meTimeMemo}
                </div>
              )}
            </div>
          </div>

          {/* YOU */}
          {hasYouData && <div className="pl-4 border-l border-stone-200">
            <div className={`text-[9px] tracking-[0.2em] uppercase ${theme.cardLabel} font-semibold mb-2 text-right`}>
              YOU
            </div>
            <div className="flex flex-col items-end gap-1.5">
              {youGenderDisplay && (
                <div className="flex items-center justify-end gap-1.5">
                  <Pill>{youGenderDisplay}</Pill>
                  <span className="min-w-[26px] text-right text-[9px] text-stone-500">
                    성별
                  </span>
                </div>
              )}
              {data.youAge.length > 0 && (
                <div className="flex items-start justify-end gap-1.5 self-stretch">
                  <div className="flex min-w-0 flex-1 flex-wrap justify-end gap-1">
                    {data.youAge.map((age) => (
                      <Pill size="sm" key={age}>
                        {age}
                      </Pill>
                    ))}
                  </div>
                  <span className="min-w-[26px] shrink-0 text-right text-[9px] text-stone-500">
                    나이
                  </span>
                </div>
              )}
              {(data.youWeekdayAny ||
                data.youWeekday.length > 0 ||
                data.youWeekendAny ||
                data.youWeekend.length > 0) && (
                <div className="text-right">
                  <span className="block text-[9px] text-stone-500">
                    접속 시간
                  </span>
                  {(data.youWeekdayAny || data.youWeekday.length > 0) && (
                    <div className="mb-[3px]">
                      <span className="ml-1 text-[8px] text-stone-500">
                        평일
                      </span>
                      <div className="text-[9px] text-stone-700">
                        {data.youWeekdayAny
                          ? "무관"
                          : sortByTimeSlot(data.youWeekday).join(" · ")}
                      </div>
                    </div>
                  )}
                  {(data.youWeekendAny || data.youWeekend.length > 0) && (
                    <div>
                      <span className="ml-1 text-[8px] text-stone-500">
                        주말
                      </span>
                      <div className="text-[9px] text-stone-700">
                        {data.youWeekendAny
                          ? "무관"
                          : sortByTimeSlot(data.youWeekend).join(" · ")}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {data.youTimeMemo && (
                <div className="text-[9px] text-stone-600 leading-[1.6] italic text-right mt-0.5">
                  {data.youTimeMemo}
                </div>
              )}
            </div>
          </div>}
        </div>
      </SectionBlock>
    </div>
  );
};
