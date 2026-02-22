import React from "react";
import { SectionBlock } from "../atoms/SectionBlock";
import type { ProfileData } from "../../profile-editor/types";
import { formatCouplingPriority } from "../../profile-editor/helpers";

export const CardCharacter: React.FC<{ data: ProfileData }> = ({ data }) => {
  const hasCharSection =
    data.charImages.length > 0 ||
    !!data.charMemo ||
    !!data.youCharMemo ||
    data.couplingPriority.some((tier) => tier.length > 0) ||
    data.meRace.length > 0 ||
    data.youRace.length > 0;

  if (!hasCharSection) return null;

  return (
    <div className="mb-6">
      <SectionBlock title="커마 · 커플링">
        {(data.charImages.length > 0 ||
          data.charMemo ||
          data.couplingPriority.some((t) => t.length > 0) ||
          data.meRace.length > 0) && (
          <div
            className={
              data.youCharMemo || data.youRace.length > 0 ? "mb-4" : ""
            }
          >
            <div className="text-[9px] tracking-[0.2em] uppercase text-violet-500 font-semibold mb-2">
              ME
            </div>
            {data.charImages.length > 0 &&
              (data.displayOption === "image-only" ? (
                <div
                  className={`grid grid-cols-2 gap-1.5 ${data.charMemo ? "mb-2.5" : ""}`}
                >
                  {data.charImages.map((photo) => (
                    <div
                      key={photo.id}
                      className="aspect-square overflow-hidden rounded-[10px] bg-stone-200"
                    >
                      <img
                        src={photo.imageUrl}
                        alt="커마"
                        className="w-full h-full object-cover block"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={`flex flex-col gap-2 ${data.charMemo ? "mb-2.5" : ""}`}
                >
                  {data.charImages.map((photo) => (
                    <div key={photo.id} className="flex gap-2.5 items-start">
                      <div className="shrink-0 w-[72px] h-[72px] rounded-[10px] overflow-hidden bg-stone-200">
                        <img
                          src={photo.imageUrl}
                          alt="커마"
                          className="w-full h-full object-cover block"
                        />
                      </div>
                      {photo.description && (
                        <div className="flex-1 text-[10px] text-stone-600 leading-[1.7] pt-1">
                          {photo.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            {data.couplingPriority.length > 0 && (
              <div className="flex flex-wrap items-center gap-1 mt-2 mb-2">
                {formatCouplingPriority(data.couplingPriority)
                  .split(/( > | = )/)
                  .map((part, i) =>
                    part === " > " || part === " = " ? (
                      <span
                        key={i}
                        className="text-[9px] text-stone-400 font-medium"
                      >
                        {part.trim()}
                      </span>
                    ) : (
                      <span
                        key={i}
                        className="text-[10px] text-violet-600 rounded px-1.5 py-0.5 leading-none"
                      >
                        {part}
                      </span>
                    ),
                  )}
              </div>
            )}
            {data.meRace.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {data.meRace.map((r) => (
                  <span
                    key={r}
                    className="text-[10px] bg-stone-100 text-stone-500 rounded px-1.5 py-0.5 font-medium leading-none"
                  >
                    {r}
                  </span>
                ))}
              </div>
            )}
            {data.charMemo && (
              <div className="text-[10px] text-stone-600 leading-[1.7] px-3 py-2 bg-stone-100 rounded-lg whitespace-pre-wrap">
                {data.charMemo}
              </div>
            )}
          </div>
        )}
        {(data.youCharMemo || data.youRace.length > 0) && (
          <div>
            <div className="text-[9px] tracking-[0.2em] uppercase text-violet-500 font-semibold mb-2 text-right">
              YOU
            </div>
            {data.youRace.length > 0 && (
              <div className="flex flex-wrap justify-end gap-1 mb-2">
                {data.youRace.map((r) => (
                  <span
                    key={r}
                    className="text-[10px] bg-stone-100 text-stone-500 rounded px-1.5 py-0.5 font-medium leading-none"
                  >
                    {r}
                  </span>
                ))}
              </div>
            )}
            {data.youCharMemo && (
              <div className="text-[10px] text-stone-600 leading-[1.7] px-3 py-2 bg-stone-100 rounded-lg text-right whitespace-pre-wrap">
                {data.youCharMemo}
              </div>
            )}
          </div>
        )}
      </SectionBlock>
    </div>
  );
};
