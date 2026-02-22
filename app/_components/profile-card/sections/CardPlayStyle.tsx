import React from "react";
import { SectionBlock } from "../atoms/SectionBlock";
import type { PlayStyleItem } from "../../profile-editor/types";

export const CardPlayStyle: React.FC<{ playStyles: PlayStyleItem[] }> = ({
  playStyles,
}) => {
  const hasPlayStyles = playStyles.some((p) => p.text.trim());
  if (!hasPlayStyles) return null;

  return (
    <div className="mb-6">
      <SectionBlock title="플레이 · 교류 스타일">
        <div className="flex flex-col gap-1.5">
          {playStyles
            .filter((p) => p.text.trim())
            .map((item) => (
              <div
                key={item.id}
                className={`flex items-start gap-2 px-2.5 py-[3px] ${
                  item.emphasized ? " bg-amber-50 rounded-lg" : ""
                }`}
              >
                <span
                  className={`text-[11px] shrink-0 mt-px leading-[1.6] inline-flex w-3 justify-center ${
                    item.emphasized ? "text-amber-500" : "text-stone-400"
                  }`}
                >
                  {item.emphasized ? "\u2605" : "\u2013"}
                </span>
                <span
                  className={`text-[11px] leading-[1.7] ${
                    item.emphasized
                      ? "text-stone-800 font-medium"
                      : "text-stone-700"
                  }`}
                >
                  {item.text}
                </span>
              </div>
            ))}
        </div>
      </SectionBlock>
    </div>
  );
};
