"use client";

import React, { useState } from "react";
import { SectionCard } from "../atoms/SectionCard";
import { MeLabel } from "../atoms/MeLabel";
import { Mini } from "../atoms/Mini";
import { Chip } from "../atoms/Chip";
import { TimeChip } from "../atoms/TimeChip";
import { FieldInput } from "../atoms/FieldInput";
import { FieldTextarea } from "../atoms/FieldTextarea";
import { SERVERS, AGE_DECADES, AGE_DECADE_LABELS, TIME_SLOTS } from "../constants";
import { toggleArr } from "../helpers";
import { useTheme } from "../ThemeContext";

interface Props {
  basic: {
    nickname: string;
    setNickname: (v: string) => void;
    nicknameBlind: boolean;
    setNicknameBlind: React.Dispatch<React.SetStateAction<boolean>>;
    server: string;
    setServer: (v: string) => void;
  };
  basicMe: {
    meGender: string;
    setMeGender: React.Dispatch<React.SetStateAction<string>>;
    meGenderCustom: string;
    setMeGenderCustom: (v: string) => void;
    meAge: string[];
    setMeAge: (v: string[]) => void;
    meWeekday: string[];
    setMeWeekday: React.Dispatch<React.SetStateAction<string[]>>;
    meWeekend: string[];
    setMeWeekend: React.Dispatch<React.SetStateAction<string[]>>;
    meTimeMemo: string;
    setMeTimeMemo: (v: string) => void;
  };
  basicYou: {
    youGender: string;
    setYouGender: (v: string) => void;
    youGenderCustom: string;
    setYouGenderCustom: (v: string) => void;
    youAge: string[];
    setYouAge: (v: string[]) => void;
    youWeekdayAny: boolean;
    setYouWeekdayAny: React.Dispatch<React.SetStateAction<boolean>>;
    youWeekday: string[];
    setYouWeekday: React.Dispatch<React.SetStateAction<string[]>>;
    youWeekendAny: boolean;
    setYouWeekendAny: React.Dispatch<React.SetStateAction<boolean>>;
    youWeekend: string[];
    setYouWeekend: React.Dispatch<React.SetStateAction<string[]>>;
    youTimeMemo: string;
    setYouTimeMemo: (v: string) => void;
  };
}

function decadePrefix(decade: string): string {
  return decade.replace("대 이상", "").replace("대", "");
}

function buildAgeTag(decade: string, phase: "↑" | "↓" | null): string {
  if (decade === "50대 이상") return "50↑";
  const prefix = decadePrefix(decade);
  if (phase === null) return `${prefix}대`;
  return `${prefix}${phase}`;
}

function addAgeTag(
  currentList: string[],
  decade: string,
  phase: "↑" | "↓" | null
): string[] | null {
  const tag = buildAgeTag(decade, phase);
  if (currentList.includes(tag)) return null;
  const prefix = decadePrefix(decade);
  const filtered = currentList.filter((a) => !a.startsWith(prefix));
  if (phase === "↑" && filtered.some((a) => a.endsWith("↑"))) return null;
  if (phase === "↓" && filtered.some((a) => a.endsWith("↓"))) return null;
  return [...filtered, tag];
}

function applySpecialAge(opt: "미성년자" | "성인", current: string[]): string[] {
  if (current.includes(opt)) {
    return current.filter((a) => a !== opt);
  }
  const specialOnly = current.filter((a) => a === "미성년자" || a === "성인");
  return [...specialOnly, opt];
}

export const BasicInfoSection: React.FC<Props> = ({
  basic,
  basicMe,
  basicYou,
}) => {
  const theme = useTheme();
  const [meDecadeTemp, setMeDecadeTemp] = useState("");
  const [youDecadeTemp, setYouDecadeTemp] = useState("");

  const addMeAge = (decade: string, phase: "↑" | "↓" | null) => {
    const result = addAgeTag(basicMe.meAge, decade, phase);
    if (result) {
      basicMe.setMeAge(result);
      setMeDecadeTemp("");
    }
  };

  const removeMeAge = (tag: string) => {
    basicMe.setMeAge(basicMe.meAge.filter((a) => a !== tag));
  };

  const addYouAge = (decade: string, phase: "↑" | "↓" | null) => {
    const result = addAgeTag(basicYou.youAge, decade, phase);
    if (result) {
      basicYou.setYouAge(result);
      setYouDecadeTemp("");
    }
  };

  const removeYouAge = (tag: string) => {
    basicYou.setYouAge(basicYou.youAge.filter((a) => a !== tag));
  };

  const mHasSpecial = basicMe.meAge.some((a) => a === "미성년자" || a === "성인");
  const yHasSpecial = basicYou.youAge.some((a) => a === "미성년자" || a === "성인");
  const meAgeTags = basicMe.meAge.filter((a) => a !== "미성년자" && a !== "성인");
  const youAgeTags = basicYou.youAge.filter((a) => a !== "미성년자" && a !== "성인");

  return (
    <SectionCard title="기본 정보">
      <div className="pb-3"></div>
      <div className="mb-5 grid grid-cols-2 gap-3">
        <div>
          <div className="flex flex-row">
            <Mini>닉네임 (최대 9자)</Mini>
            <div className="mx-1" />
            <button
              type="button"
              onClick={() => basic.setNicknameBlind((p) => !p)}
              className={`relative inline-flex h-3.5 w-6 flex-shrink-0 items-center rounded-full transition-colors ${
                basic.nicknameBlind ? "bg-stone-200" : "bg-stone-400"
              }`}
              aria-label={basic.nicknameBlind ? "비공개" : "공개"}
            >
              <span
                className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white shadow-sm transition-transform ${
                  basic.nicknameBlind ? "translate-x-0.5" : "translate-x-3"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <FieldInput
              value={basic.nickname}
              onChange={(e) => basic.setNickname(e.target.value.slice(0, 9))}
              placeholder="닉네임"
            />
          </div>
        </div>
        <div>
          <Mini>서버</Mini>
          <div className="flex flex-wrap gap-1 pt-1">
            {SERVERS.map((s) => (
              <Chip
                key={s}
                label={s}
                selected={basic.server === s}
                onClick={() => basic.setServer(basic.server === s ? "" : s)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ME / YOU */}
      <div className="grid grid-cols-2 border-t border-stone-100 pt-4">
        {/* ME */}
        <div className="pr-4 space-y-3.5 border-r border-stone-100">
          <MeLabel />
          <div>
            <Mini>성별</Mini>
            <div className="flex flex-wrap gap-1">
              {["남", "여", "직접기입"].map((g) => (
                <Chip
                  key={g}
                  label={g}
                  selected={basicMe.meGender === g}
                  onClick={() =>
                    basicMe.setMeGender((prev) => (prev === g ? "" : g))
                  }
                />
              ))}
            </div>
            {basicMe.meGender === "직접기입" && (
              <input
                value={basicMe.meGenderCustom}
                onChange={(e) => basicMe.setMeGenderCustom(e.target.value)}
                placeholder="직접 입력"
                className={`mt-1.5 w-full px-2 py-1 text-[10px] border border-stone-200 rounded-lg bg-stone-50 focus:outline-none ${theme.inputFocus}`}
              />
            )}
          </div>
          <div>
            <Mini>나이대</Mini>
            {/* 미성년자/성인 */}
            <div className="flex flex-wrap gap-1 mb-1">
              {(["미성년자", "성인"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    basicMe.setMeAge(applySpecialAge(opt, basicMe.meAge));
                    setMeDecadeTemp("");
                  }}
                  className={`rounded border px-1.5 py-0.5 text-[9px] transition-all ${
                    basicMe.meAge.includes(opt)
                      ? theme.ageDecadeSelected
                      : "border-stone-200 bg-stone-50 text-stone-400"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {/* 선택된 나이 태그 */}
            {meAgeTags.length > 0 && (
              <div className="mb-1.5 flex flex-wrap gap-1">
                {meAgeTags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-0.5 rounded border ${theme.ageYouTag} px-1.5 py-0.5 text-[9px]`}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeMeAge(tag)}
                      className={theme.ageYouRemove}
                      aria-label={`${tag} 제거`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            {/* 나이대 버튼 */}
            <div className={`flex flex-wrap gap-1 ${mHasSpecial ? "opacity-40 pointer-events-none" : ""}`}>
              {AGE_DECADES.map((decade) => (
                <button
                  key={decade}
                  type="button"
                  onClick={() => {
                    if (decade === "50대 이상") {
                      addMeAge(decade, "↑");
                    } else {
                      setMeDecadeTemp((prev) => (prev === decade ? "" : decade));
                    }
                  }}
                  className={`rounded border px-1.5 py-0.5 text-[9px] transition-all ${
                    meDecadeTemp === decade
                      ? theme.ageDecadeSelected
                      : "border-stone-200 bg-stone-50 text-stone-400"
                  }`}
                >
                  {AGE_DECADE_LABELS[decade]}
                </button>
              ))}
            </div>
            {/* 세부 선택 */}
            {meDecadeTemp && !mHasSpecial && (
              <div className="mt-1 flex flex-wrap gap-1">
                {(["↑", "↓"] as const).map((phase) => (
                  <button
                    key={phase}
                    type="button"
                    onClick={() => addMeAge(meDecadeTemp, phase)}
                    className={`rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-[9px] text-stone-400 transition-all ${theme.agePhaseHover}`}
                  >
                    {phase === "↑" ? "이상(↑)" : "이하(↓)"}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => addMeAge(meDecadeTemp, null)}
                  className={`rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-[9px] text-stone-400 transition-all ${theme.agePhaseHover}`}
                >
                  세부표기안함
                </button>
              </div>
            )}
          </div>
          <div>
            <Mini>접속 시간</Mini>
            <div className="space-y-2">
              <div>
                <p className="text-[9px] text-stone-300 mb-1">평일</p>
                <div className="flex flex-wrap gap-1">
                  {TIME_SLOTS.map((t) => (
                    <TimeChip
                      key={t}
                      label={t}
                      selected={basicMe.meWeekday.includes(t)}
                      onClick={() =>
                        basicMe.setMeWeekday((prev) => toggleArr(prev, t))
                      }
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[9px] text-stone-300 mb-1">주말</p>
                <div className="flex flex-wrap gap-1">
                  {TIME_SLOTS.map((t) => (
                    <TimeChip
                      key={t}
                      label={t}
                      selected={basicMe.meWeekend.includes(t)}
                      onClick={() =>
                        basicMe.setMeWeekend((prev) => toggleArr(prev, t))
                      }
                    />
                  ))}
                </div>
              </div>
              <FieldTextarea
                value={basicMe.meTimeMemo}
                onChange={(e) => basicMe.setMeTimeMemo(e.target.value)}
                placeholder="간단한 메모"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* YOU */}
        <div className="pl-4 space-y-3.5">
          <MeLabel right />
          <div>
            <Mini right>성별</Mini>
            <div className="flex flex-wrap gap-1 justify-end">
              {["남", "여", "직접기입", "무관"].map((g) => (
                <Chip
                  key={g}
                  label={g}
                  selected={basicYou.youGender === g}
                  onClick={() => basicYou.setYouGender(g)}
                />
              ))}
            </div>
            {basicYou.youGender === "직접기입" && (
              <input
                value={basicYou.youGenderCustom}
                onChange={(e) => basicYou.setYouGenderCustom(e.target.value)}
                placeholder="직접 입력"
                className={`mt-1.5 w-full px-2 py-1 text-[10px] border border-stone-200 rounded-lg bg-stone-50 focus:outline-none ${theme.inputFocus} text-right`}
              />
            )}
          </div>
          <div>
            <Mini right>나이대</Mini>
            {/* 미성년자/성인 */}
            <div className="flex flex-wrap gap-1 justify-end mb-1">
              {(["미성년자", "성인"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    basicYou.setYouAge(applySpecialAge(opt, basicYou.youAge));
                    setYouDecadeTemp("");
                  }}
                  className={`rounded border px-1.5 py-0.5 text-[9px] transition-all ${
                    basicYou.youAge.includes(opt)
                      ? theme.ageDecadeSelected
                      : "border-stone-200 bg-stone-50 text-stone-400"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {/* 선택된 나이 태그 */}
            {youAgeTags.length > 0 && (
              <div className="mb-1.5 flex flex-wrap justify-end gap-1">
                {youAgeTags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-0.5 rounded border ${theme.ageYouTag} px-1.5 py-0.5 text-[9px]`}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeYouAge(tag)}
                      className={theme.ageYouRemove}
                      aria-label={`${tag} 제거`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            {/* 나이대 버튼 */}
            <div className={`flex flex-wrap justify-end gap-1 ${yHasSpecial ? "opacity-40 pointer-events-none" : ""}`}>
              {AGE_DECADES.map((decade) => (
                <button
                  key={decade}
                  type="button"
                  onClick={() => {
                    if (decade === "50대 이상") {
                      addYouAge(decade, "↑");
                    } else {
                      setYouDecadeTemp((prev) => (prev === decade ? "" : decade));
                    }
                  }}
                  className={`rounded border px-1.5 py-0.5 text-[9px] transition-all ${
                    youDecadeTemp === decade
                      ? theme.ageDecadeSelected
                      : "border-stone-200 bg-stone-50 text-stone-400"
                  }`}
                >
                  {AGE_DECADE_LABELS[decade]}
                </button>
              ))}
            </div>
            {/* 세부 선택 */}
            {youDecadeTemp && !yHasSpecial && (
              <div className="mt-1 flex flex-wrap justify-end gap-1">
                {(["↑", "↓"] as const).map((phase) => (
                  <button
                    key={phase}
                    type="button"
                    onClick={() => addYouAge(youDecadeTemp, phase)}
                    className={`rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-[9px] text-stone-400 transition-all ${theme.agePhaseHover}`}
                  >
                    {phase === "↑" ? "이상(↑)" : "이하(↓)"}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => addYouAge(youDecadeTemp, null)}
                  className={`rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-[9px] text-stone-400 transition-all ${theme.agePhaseHover}`}
                >
                  세부표기안함
                </button>
              </div>
            )}
          </div>
          <div>
            <Mini right>접속 시간</Mini>
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[9px] text-stone-300">평일</p>
                  <button
                    type="button"
                    onClick={() => basicYou.setYouWeekdayAny((p) => !p)}
                    className={`text-[9px] px-1.5 py-0.5 rounded border transition-all ${basicYou.youWeekdayAny ? "bg-stone-200 border-stone-300 text-stone-500" : "bg-stone-50 border-stone-200 text-stone-400"}`}
                  >
                    무관
                  </button>
                </div>
                {!basicYou.youWeekdayAny && (
                  <div className="flex flex-wrap gap-1 justify-end">
                    {TIME_SLOTS.map((t) => (
                      <TimeChip
                        key={t}
                        label={t}
                        selected={basicYou.youWeekday.includes(t)}
                        onClick={() =>
                          basicYou.setYouWeekday((prev) => toggleArr(prev, t))
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[9px] text-stone-300">주말</p>
                  <button
                    type="button"
                    onClick={() => basicYou.setYouWeekendAny((p) => !p)}
                    className={`text-[9px] px-1.5 py-0.5 rounded border transition-all ${basicYou.youWeekendAny ? "bg-stone-200 border-stone-300 text-stone-500" : "bg-stone-50 border-stone-200 text-stone-400"}`}
                  >
                    무관
                  </button>
                </div>
                {!basicYou.youWeekendAny && (
                  <div className="flex flex-wrap gap-1 justify-end">
                    {TIME_SLOTS.map((t) => (
                      <TimeChip
                        key={t}
                        label={t}
                        selected={basicYou.youWeekend.includes(t)}
                        onClick={() =>
                          basicYou.setYouWeekend((prev) => toggleArr(prev, t))
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
              <FieldTextarea
                value={basicYou.youTimeMemo}
                onChange={(e) => basicYou.setYouTimeMemo(e.target.value)}
                placeholder="간단한 메모"
                rows={2}
                className="text-right"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};
