"use client";

import React from "react";
import type { CouplingType } from "../types";
import { formatCouplingPriority } from "../helpers";
import { useTheme } from "../ThemeContext";

const COUPLING_TYPES: CouplingType[] = ["BL", "GL", "HL"];
const TIER_LABELS = ["1순위", "2순위", "3순위"];

interface Props {
  value: CouplingType[][];
  onChange: (type: CouplingType, tierIndex: number) => void;
}

export const CouplingPicker: React.FC<Props> = ({ value, onChange }) => {
  const theme = useTheme();
  const preview = formatCouplingPriority(value);

  const usedInPriorTiers = (tierIndex: number) =>
    new Set(value.slice(0, tierIndex).flat());

  const availableFor = (tierIndex: number) =>
    COUPLING_TYPES.filter((t) => !usedInPriorTiers(tierIndex).has(t));

  return (
    <div className="space-y-2">
      <div className="text-[10px] text-stone-400 gap-3 flex">
        <span>커플링 선호</span>
        {preview && (
          <>
            <span className={`text-[10px] ${theme.couplingPreviewText}`}>{preview}</span>
          </>
        )}
      </div>

      <div className="space-y-1.5">
        {TIER_LABELS.map((label, tierIndex) => {
          const available = availableFor(tierIndex);
          return (
            <div key={tierIndex} className="flex items-center gap-2">
              <span className="text-[10px] text-stone-400 w-8 shrink-0">
                {label}
              </span>
              {COUPLING_TYPES.map((type) => {
                const isSelected = value[tierIndex]?.includes(type) ?? false;
                const isAvailable = isSelected || available.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => onChange(type, tierIndex)}
                    disabled={!isAvailable}
                    className={`rounded-lg border px-3 py-1 text-xs font-medium leading-none transition-all ${
                      !isAvailable
                        ? "bg-stone-50 border-stone-100 text-stone-200 cursor-not-allowed"
                        : isSelected
                          ? theme.couplingBtnSelected
                          : "bg-stone-50 border-stone-200 text-stone-400 hover:border-stone-300 hover:text-stone-600"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
