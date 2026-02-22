import React from "react";
import { X, Plus } from "lucide-react";
import { SectionCard } from "../atoms/SectionCard";
import { MeLabel } from "../atoms/MeLabel";
import { Chip } from "../atoms/Chip";
import { FieldInput } from "../atoms/FieldInput";
import { FieldTextarea } from "../atoms/FieldTextarea";
import { JobPicker } from "../atoms/JobPicker";
import { CONTENT_GROUPS } from "../constants";
import { toggleArr } from "../helpers";
import type { JobType } from "../types";

interface Props {
  myJob: JobType[];
  setMyJob: React.Dispatch<React.SetStateAction<JobType[]>>;
  youJob: JobType[];
  setYouJob: React.Dispatch<React.SetStateAction<JobType[]>>;
  mySelected: string[];
  setMySelected: React.Dispatch<React.SetStateAction<string[]>>;
  myCustom: string[];
  setMyCustom: React.Dispatch<React.SetStateAction<string[]>>;
  myCustomInput: string;
  setMyCustomInput: (v: string) => void;
  myContentMemo: string;
  setMyContentMemo: (v: string) => void;
  youContentsEnabled: boolean;
  setYouContentsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  youSelected: string[];
  setYouSelected: React.Dispatch<React.SetStateAction<string[]>>;
  youCustom: string[];
  setYouCustom: React.Dispatch<React.SetStateAction<string[]>>;
  youCustomInput: string;
  setYouCustomInput: (v: string) => void;
  youContentMemo: string;
  setYouContentMemo: (v: string) => void;
  addMyKeyword: () => void;
  addYouKeyword: () => void;
}

export const ContentsSection: React.FC<Props> = ({
  myJob,
  setMyJob,
  youJob,
  setYouJob,
  mySelected,
  setMySelected,
  myCustom,
  setMyCustom,
  myCustomInput,
  setMyCustomInput,
  myContentMemo,
  setMyContentMemo,
  youContentsEnabled,
  setYouContentsEnabled,
  youSelected,
  setYouSelected,
  youCustom,
  setYouCustom,
  youCustomInput,
  setYouCustomInput,
  youContentMemo,
  setYouContentMemo,
  addMyKeyword,
  addYouKeyword,
}) => (
  <SectionCard title="주 컨텐츠">
    <div className="space-y-3">
      <MeLabel />
      <JobPicker value={myJob} onChange={setMyJob} />
      {CONTENT_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="text-[9px] text-stone-300 mb-1.5">{group.label}</p>
          <div className="flex flex-wrap gap-1">
            {group.items.map((item) => (
              <Chip
                key={item}
                label={item}
                selected={mySelected.includes(item)}
                onClick={() => setMySelected((prev) => toggleArr(prev, item))}
              />
            ))}
          </div>
        </div>
      ))}
      {myCustom.length > 0 && (
        <div>
          <p className="text-[9px] text-stone-300 mb-1.5">추가 키워드</p>
          <div className="flex flex-wrap gap-1">
            {myCustom.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-violet-50 border border-violet-200 text-violet-700"
              >
                {kw}
                <button
                  onClick={() =>
                    setMyCustom((prev) => prev.filter((k) => k !== kw))
                  }
                  className="text-violet-400 hover:text-violet-600"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="flex gap-2">
        <FieldInput
          value={myCustomInput}
          onChange={(e) => setMyCustomInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addMyKeyword()}
          placeholder="키워드 직접 추가..."
          className="flex-1"
        />
        <button
          type="button"
          onClick={addMyKeyword}
          className="px-3 py-2 bg-violet-50 border border-violet-200 text-violet-600 rounded-lg hover:bg-violet-100 transition-colors flex items-center"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      <FieldTextarea
        value={myContentMemo}
        onChange={(e) => setMyContentMemo(e.target.value)}
        placeholder="컨텐츠에 대한 간단한 설명..."
        rows={2}
      />
    </div>
    <div className="border-t border-stone-100 mt-5 pt-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-[10px] tracking-[0.22em] uppercase text-violet-400">
          YOU
        </div>
      </div>
      <JobPicker value={youJob} onChange={setYouJob} align="right" />
      <div className="flex items-center justify-end gap-2">
        <span className="text-[10px] text-stone-400">키워드 사용</span>
        <button
          type="button"
          onClick={() => setYouContentsEnabled((p) => !p)}
          className={`relative inline-flex h-4 w-7 shrink-0 items-center rounded-full transition-colors ${
            youContentsEnabled ? "bg-violet-400" : "bg-stone-200"
          }`}
        >
          <span
            className={`inline-block h-3 w-3 rounded-full bg-white shadow transition-transform ${
              youContentsEnabled ? "translate-x-3.5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
      {youContentsEnabled && (
        <div className="space-y-3">
          {CONTENT_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="text-[9px] text-stone-300 mb-1.5 text-right">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-1 justify-end">
                {group.items.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    selected={youSelected.includes(item)}
                    onClick={() =>
                      setYouSelected((prev) => toggleArr(prev, item))
                    }
                  />
                ))}
              </div>
            </div>
          ))}
          {youCustom.length > 0 && (
            <div className="flex flex-wrap gap-1 justify-end">
              {youCustom.map((kw) => (
                <span
                  key={kw}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-violet-50 border border-violet-200 text-violet-700"
                >
                  {kw}
                  <button
                    onClick={() =>
                      setYouCustom((prev) => prev.filter((k) => k !== kw))
                    }
                    className="text-violet-400 hover:text-violet-600"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <FieldInput
              value={youCustomInput}
              onChange={(e) => setYouCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addYouKeyword()}
              placeholder="키워드 직접 추가..."
              className="flex-1 text-right"
            />
            <button
              type="button"
              onClick={addYouKeyword}
              className="px-3 py-2 bg-violet-50 border border-violet-200 text-violet-600 rounded-lg hover:bg-violet-100 transition-colors flex items-center"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
      <FieldTextarea
        value={youContentMemo}
        onChange={(e) => setYouContentMemo(e.target.value)}
        placeholder="원하는 컨텐츠 스타일, 조건 등..."
        rows={2}
        className="text-right"
      />
    </div>
  </SectionCard>
);
