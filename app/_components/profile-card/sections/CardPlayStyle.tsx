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
                className={`flex items-start gap-2 ${
                  item.emphasized
                    ? "px-2.5 py-[5px] bg-amber-100 rounded-lg border border-amber-200"
                    : "px-0 py-[3px]"
                }`}
              >
                <span
                  className={`text-[11px] shrink-0 mt-px leading-[1.6] ${
                    item.emphasized ? "text-amber-500" : "text-stone-300"
                  }`}
                >
                  {item.emphasized ? "\u2605" : "\u00B7"}
                </span>
                <span
                  className={`text-[11px] leading-[1.7] ${
                    item.emphasized
                      ? "text-stone-800 font-medium"
                      : "text-stone-600"
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
