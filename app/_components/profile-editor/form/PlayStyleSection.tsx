import React from "react";
import { Star, X, Plus } from "lucide-react";
import { SectionCard } from "../atoms/SectionCard";
import type { PlayStyleItem } from "../types";

interface Props {
  playStyles: PlayStyleItem[];
  setPlayStyles: React.Dispatch<React.SetStateAction<PlayStyleItem[]>>;
  addPlayStyle: () => void;
  updatePlayStyle: (id: string, patch: Partial<PlayStyleItem>) => void;
}

export const PlayStyleSection: React.FC<Props> = ({
  playStyles,
  setPlayStyles,
  addPlayStyle,
  updatePlayStyle,
}) => (
  <SectionCard title="플레이 · 교류 스타일">
    <div className="space-y-2">
      {playStyles.map((item, idx) => (
        <div key={item.id} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              updatePlayStyle(item.id, { emphasized: !item.emphasized })
            }
            className={`flex-shrink-0 rounded-lg border p-1.5 transition-all ${
              item.emphasized
                ? "border-amber-300 bg-amber-50 text-amber-500"
                : "border-stone-200 bg-stone-50 text-stone-300 hover:text-stone-400"
            }`}
            title="강조"
          >
            <Star
              className="h-3.5 w-3.5"
              fill={item.emphasized ? "currentColor" : "none"}
            />
          </button>
          <input
            value={item.text}
            onChange={(e) => updatePlayStyle(item.id, { text: e.target.value })}
            placeholder={`항목 ${idx + 1}`}
            className={`flex-1 rounded-lg border bg-stone-50 px-3 py-2 text-xs transition-colors placeholder:text-stone-300 focus:border-violet-300 focus:outline-none ${
              item.emphasized
                ? "border-amber-200 bg-amber-50/40"
                : "border-stone-200"
            }`}
          />
          {playStyles.length > 1 && (
            <button
              type="button"
              onClick={() =>
                setPlayStyles((prev) => prev.filter((p) => p.id !== item.id))
              }
              className="flex-shrink-0 p-1.5 text-stone-300 transition-colors hover:text-red-400"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addPlayStyle}
        className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-stone-200 py-2.5 text-xs text-stone-400 transition-colors hover:border-violet-300 hover:text-violet-400"
      >
        <Plus className="h-3.5 w-3.5" />
        항목 추가
      </button>
    </div>
  </SectionCard>
);
