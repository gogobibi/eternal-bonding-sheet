"use client";

import React from "react";
import type { AccentColor } from "../theme";
import { PALETTE_LIST } from "../theme";

interface Props {
  value: AccentColor;
  onChange: (color: AccentColor) => void;
}

export const ThemePicker: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex flex-row items-center gap-4 p-1">
      <p className="text-[10px] tracking-[0.22em] uppercase text-stone-400">
        테마 색상
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        {PALETTE_LIST.map((palette) => (
          <button
            key={palette.key}
            type="button"
            onClick={() => onChange(palette.key)}
            className={`flex items-center gap-1.5 px-1 py-1 rounded-sm transition-all ${palette.swatch} ${
              value === palette.key
                ? "ring-2 ring-offset-1 ring-stone-400"
                : "ring-1 ring-transparent"
            }`}
          >
            <span className={`w-2 h-2 rounded-lg  flex-shrink-0`} />
          </button>
        ))}
      </div>
    </div>
  );
};
