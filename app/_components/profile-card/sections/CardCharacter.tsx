import React from "react";
import { SectionBlock } from "../atoms/SectionBlock";
import type { ProfileData } from "../../profile-editor/types";

export const CardCharacter: React.FC<{ data: ProfileData }> = ({ data }) => {
  const hasCharSection =
    data.charImages.length > 0 || !!data.charMemo || !!data.youCharMemo;

  if (!hasCharSection) return null;

  return (
    <div className="mb-6">
      <SectionBlock title="커마">
        {(data.charImages.length > 0 || data.charMemo) && (
          <div className={data.youCharMemo ? "mb-4" : ""}>
            <div className="mb-2 text-[9px] font-semibold tracking-[0.2em] text-violet-500 uppercase">
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
                        className="block h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={`flex flex-col gap-2 ${data.charMemo ? "mb-2.5" : ""}`}
                >
                  {data.charImages.map((photo) => (
                    <div key={photo.id} className="flex items-start gap-2.5">
                      <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[10px] bg-stone-200">
                        <img
                          src={photo.imageUrl}
                          alt="커마"
                          className="block h-full w-full object-cover"
                        />
                      </div>
                      {photo.description && (
                        <div className="flex-1 pt-1 text-[10px] leading-[1.7] text-stone-600">
                          {photo.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            {data.charMemo && (
              <div className="rounded-lg bg-stone-100 px-3 py-2 text-[10px] leading-[1.7] whitespace-pre-wrap text-stone-600">
                {data.charMemo}
              </div>
            )}
          </div>
        )}
        {data.youCharMemo && (
          <div>
            <div className="mb-2 text-right text-[9px] font-semibold tracking-[0.2em] text-violet-500 uppercase">
              YOU
            </div>
            <div className="rounded-lg bg-stone-100 px-3 py-2 text-right text-[10px] leading-[1.7] whitespace-pre-wrap text-stone-600">
              {data.youCharMemo}
            </div>
          </div>
        )}
      </SectionBlock>
    </div>
  );
};
