"use client";

import React from "react";
import { Star, X, Plus } from "lucide-react";
import { SectionCard } from "../atoms/SectionCard";
import type { PlayStyleItem } from "../types";
import { useTheme } from "../ThemeContext";

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
}) => {
  const theme = useTheme();

  return (
    <SectionCard title="플레이 · 교류 스타일">
      <div className="space-y-2">
        {playStyles.map((item, idx) => (
          <div key={item.id} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                updatePlayStyle(item.id, { emphasized: !item.emphasized })
              }
              className={`flex-shrink-0 p-1.5 rounded-lg border transition-all ${
                item.emphasized
                  ? "bg-amber-50 border-amber-300 text-amber-500"
                  : "bg-stone-50 border-stone-200 text-stone-300 hover:text-stone-400"
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
              onChange={(e) =>
                updatePlayStyle(item.id, { text: e.target.value })
              }
              placeholder={`항목 ${idx + 1}`}
              className={`flex-1 px-3 py-2 text-xs border rounded-lg bg-stone-50 placeholder:text-stone-300 focus:outline-none ${theme.inputFocus} transition-colors ${
                item.emphasized
                  ? "border-amber-200 bg-amber-50/40"
                  : "border-stone-200"
              }`}
            />
            {playStyles.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setPlayStyles((prev) =>
                    prev.filter((p) => p.id !== item.id),
                  )
                }
                className="flex-shrink-0 p-1.5 text-stone-300 hover:text-red-400 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addPlayStyle}
          className={`w-full py-2.5 border border-dashed border-stone-200 rounded-xl text-stone-400 ${theme.addBtnHover} transition-colors text-xs flex items-center justify-center gap-1.5 mt-1`}
        >
          <Plus className="h-3.5 w-3.5" />
          항목 추가
        </button>
      </div>
    </SectionCard>
  );
};
