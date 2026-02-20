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
                    <div
                      key={photo.id}
                      className="flex gap-2.5 items-start"
                    >
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
            {data.charMemo && (
              <div className="text-[10px] text-stone-600 leading-[1.7] px-3 py-2 bg-stone-100 rounded-lg whitespace-pre-wrap">
                {data.charMemo}
              </div>
            )}
          </div>
        )}
        {data.youCharMemo && (
          <div>
            <div className="text-[9px] tracking-[0.2em] uppercase text-violet-500 font-semibold mb-2 text-right">
              YOU
            </div>
            <div className="text-[10px] text-stone-600 leading-[1.7] px-3 py-2 bg-stone-100 rounded-lg text-right whitespace-pre-wrap">
              {data.youCharMemo}
            </div>
          </div>
        )}
      </SectionBlock>
    </div>
  );
};
