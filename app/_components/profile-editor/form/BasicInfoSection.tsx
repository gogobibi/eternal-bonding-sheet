import React from "react";
import { SectionCard } from "../atoms/SectionCard";
import { MeLabel } from "../atoms/MeLabel";
import { Mini } from "../atoms/Mini";
import { Chip } from "../atoms/Chip";
import { TimeChip } from "../atoms/TimeChip";
import { FieldInput } from "../atoms/FieldInput";
import { FieldTextarea } from "../atoms/FieldTextarea";
import { SERVERS, AGE_OPTIONS, TIME_SLOTS } from "../constants";
import { toggleArr } from "../helpers";

interface Props {
  basic: {
    nickname: string;
    setNickname: (v: string) => void;
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
    youAge: string;
    setYouAge: (v: string) => void;
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
}) => (
  <SectionCard title="기본 정보">
    <div className="grid grid-cols-2 gap-3 mb-5">
      <div>
        <Mini>닉네임 (최대 9자)</Mini>
        <FieldInput
          value={basic.nickname}
          onChange={(e) => basic.setNickname(e.target.value.slice(0, 9))}
          placeholder="닉네임"
        />
      </div>
      <div>
        <Mini>서버</Mini>
        <select
          value={basic.server}
          onChange={(e) => basic.setServer(e.target.value)}
          className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg bg-stone-50 text-stone-600 focus:outline-none focus:border-violet-300 transition-colors appearance-none"
        >
          <option value="">서버 선택</option>
          {SERVERS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
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
              className="mt-1.5 w-full px-2 py-1 text-[10px] border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:border-violet-300"
            />
          )}
        </div>
        <div>
          <Mini>나이대</Mini>
          <select
            value={basicMe.meAge}
            onChange={(e) => basicMe.setMeAge(e.target.value)}
            className="w-full px-2 py-1.5 text-[10px] border border-stone-200 rounded-lg bg-stone-50 text-stone-600 focus:outline-none focus:border-violet-300 appearance-none"
          >
            <option value="">선택</option>
            {AGE_OPTIONS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
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
              placeholder="접속 메모..."
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
              className="mt-1.5 w-full px-2 py-1 text-[10px] border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:border-violet-300 text-right"
            />
          )}
        </div>
        <div>
          <Mini right>나이대</Mini>
          <select
            value={basicYou.youAge}
            onChange={(e) => basicYou.setYouAge(e.target.value)}
            className="w-full px-2 py-1.5 text-[10px] border border-stone-200 rounded-lg bg-stone-50 text-stone-600 focus:outline-none focus:border-violet-300 appearance-none text-right"
          >
            <option value="무관">무관</option>
            {AGE_OPTIONS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
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
              placeholder="접속 메모..."
              rows={2}
              className="text-right"
            />
          </div>
        </div>
      </div>
    </div>
  </SectionCard>
);
