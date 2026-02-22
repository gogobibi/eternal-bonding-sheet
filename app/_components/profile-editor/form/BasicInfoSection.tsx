"use client";

import React, { useState, useEffect } from "react";
import { SectionCard } from "../atoms/SectionCard";
import { MeLabel } from "../atoms/MeLabel";
import { Mini } from "../atoms/Mini";
import { Chip } from "../atoms/Chip";
import { TimeChip } from "../atoms/TimeChip";
import { FieldInput } from "../atoms/FieldInput";
import { FieldTextarea } from "../atoms/FieldTextarea";
import { SERVERS, AGE_DECADES, AGE_PHASES, TIME_SLOTS } from "../constants";
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
    meAge: string;
    setMeAge: (v: string) => void;
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

export const BasicInfoSection: React.FC<Props> = ({
  basic,
  basicMe,
  basicYou,
}) => {
  const theme = useTheme();
  const [meDecade, setMeDecade] = useState("");
  const [mePhase, setMePhase] = useState("");
  const [youDecadeTemp, setYouDecadeTemp] = useState("");

  useEffect(() => {
    if (!meDecade) {
      basicMe.setMeAge("");
      return;
    }
    if (meDecade === "50대 이상") {
      basicMe.setMeAge("50대 이상");
    } else if (mePhase) {
      basicMe.setMeAge(`${meDecade} ${mePhase}`);
    } else {
      basicMe.setMeAge(meDecade);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meDecade, mePhase]);

  const addYouAge = (decade: string, phase?: string) => {
    const tag = phase ? `${decade} ${phase}` : decade;
    if (basicYou.youAge.includes(tag)) return;
    const filtered = basicYou.youAge.filter((a) => a !== "무관");
    basicYou.setYouAge([...filtered, tag]);
    setYouDecadeTemp("");
  };

  const removeYouAge = (tag: string) => {
    basicYou.setYouAge(basicYou.youAge.filter((a) => a !== tag));
  };

  const handleDecadeClick = (decade: string) => {
    if (decade === "50대 이상") {
      addYouAge("50대 이상");
      return;
    }
    setYouDecadeTemp((prev) => (prev === decade ? "" : decade));
  };

  const handlePhaseClick = (phase: string) => {
    if (!youDecadeTemp) return;
    if (phase === "세부표기안함") {
      addYouAge(youDecadeTemp);
    } else {
      addYouAge(youDecadeTemp, phase);
    }
  };

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
            <div className="flex flex-wrap gap-1">
              {AGE_DECADES.map((decade) => (
                <button
                  key={decade}
                  type="button"
                  onClick={() => {
                    if (meDecade === decade) {
                      setMeDecade("");
                      setMePhase("");
                    } else {
                      setMeDecade(decade);
                      if (decade === "50대 이상") setMePhase("");
                    }
                  }}
                  className={`rounded border px-1.5 py-0.5 text-[9px] transition-all ${
                    meDecade === decade
                      ? theme.ageDecadeSelected
                      : "border-stone-200 bg-stone-50 text-stone-400"
                  }`}
                >
                  {decade}
                </button>
              ))}
            </div>
            {meDecade && meDecade !== "50대 이상" && (
              <div className="mt-1 flex flex-wrap gap-1">
                {[...AGE_PHASES, "세부표기안함"].map((phase) => (
                  <button
                    key={phase}
                    type="button"
                    onClick={() =>
                      setMePhase(phase === "세부표기안함" ? "" : phase)
                    }
                    className={`rounded border px-1.5 py-0.5 text-[9px] transition-all ${
                      (
                        phase === "세부표기안함"
                          ? mePhase === ""
                          : mePhase === phase
                      )
                        ? theme.ageDecadeSelected
                        : "border-stone-200 bg-stone-50 text-stone-400"
                    }`}
                  >
                    {phase}
                  </button>
                ))}
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
            <div className="mb-1 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  const isAny = basicYou.youAge.includes("무관");
                  if (isAny) {
                    basicYou.setYouAge([]);
                  } else {
                    basicYou.setYouAge(["무관"]);
                    setYouDecadeTemp("");
                  }
                }}
                className={`rounded border px-1.5 py-0.5 text-[9px] transition-all ${
                  basicYou.youAge.includes("무관")
                    ? "border-stone-300 bg-stone-200 text-stone-500"
                    : "border-stone-200 bg-stone-50 text-stone-400"
                }`}
              >
                무관
              </button>
            </div>
            {!basicYou.youAge.includes("무관") && (
              <>
                {basicYou.youAge.length > 0 && (
                  <div className="mb-1.5 flex flex-wrap justify-end gap-1">
                    {basicYou.youAge.map((tag) => (
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
                <div className="flex flex-wrap justify-end gap-1">
                  {AGE_DECADES.map((decade) => (
                    <button
                      key={decade}
                      type="button"
                      onClick={() => handleDecadeClick(decade)}
                      className={`rounded border px-1.5 py-0.5 text-[9px] transition-all ${
                        youDecadeTemp === decade
                          ? theme.ageDecadeSelected
                          : "border-stone-200 bg-stone-50 text-stone-400"
                      }`}
                    >
                      {decade}
                    </button>
                  ))}
                </div>
                {youDecadeTemp && youDecadeTemp !== "50대 이상" && (
                  <div className="mt-1 flex flex-wrap justify-end gap-1">
                    {[...AGE_PHASES, "세부표기안함"].map((phase) => (
                      <button
                        key={phase}
                        type="button"
                        onClick={() => handlePhaseClick(phase)}
                        className={`rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-[9px] text-stone-400 transition-all ${theme.agePhaseHover}`}
                      >
                        {phase}
                      </button>
                    ))}
                  </div>
                )}
              </>
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
