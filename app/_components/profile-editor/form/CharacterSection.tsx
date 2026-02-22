"use client";

import React from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { SectionCard } from "../atoms/SectionCard";
import { MeLabel } from "../atoms/MeLabel";
import { OptionBtn } from "../atoms/OptionBtn";
import { FieldTextarea } from "../atoms/FieldTextarea";
import { CouplingPicker } from "../atoms/CouplingPicker";
import { RacePicker } from "../atoms/RacePicker";
import type { PhotoItem, CouplingType, RaceType } from "../types";
import { toggleArr } from "../helpers";
import { useTheme } from "../ThemeContext";

interface Props {
  displayOption: "image-only" | "image-with-text";
  setDisplayOption: (v: "image-only" | "image-with-text") => void;
  charImages: PhotoItem[];
  setCharImages: React.Dispatch<React.SetStateAction<PhotoItem[]>>;
  charMemo: string;
  setCharMemo: (v: string) => void;
  youCharMemo: string;
  setYouCharMemo: (v: string) => void;
  handleCharUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  couplingPriority: CouplingType[][];
  onCouplingClick: (type: CouplingType, tierIndex: number) => void;
  meRace: RaceType[];
  setMeRace: React.Dispatch<React.SetStateAction<RaceType[]>>;
  youRace: RaceType[];
  setYouRace: React.Dispatch<React.SetStateAction<RaceType[]>>;
}

export const CharacterSection: React.FC<Props> = ({
  displayOption,
  setDisplayOption,
  charImages,
  setCharImages,
  charMemo,
  setCharMemo,
  youCharMemo,
  setYouCharMemo,
  handleCharUpload,
  couplingPriority,
  onCouplingClick,
  meRace,
  setMeRace,
  youRace,
  setYouRace,
}) => {
  const theme = useTheme();
  return (
  <SectionCard title="커마 · 커플링">
    <div className="space-y-3">
      <MeLabel />
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-stone-100">
        <p className="text-[10px] text-stone-400 mr-1">표시 방식</p>
        <OptionBtn
          label="이미지만"
          size="sm"
          selected={displayOption === "image-only"}
          onClick={() => setDisplayOption("image-only")}
        />
        <OptionBtn
          label="이미지 + 설명"
          size="sm"
          selected={displayOption === "image-with-text"}
          onClick={() => setDisplayOption("image-with-text")}
        />
      </div>
      {charImages.length < 10 ? (
        <button
          type="button"
          onClick={() => document.getElementById("char-img-upload")?.click()}
          className={`flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-stone-200 py-3 text-stone-400 transition-colors ${theme.uploadHover}`}
        >
          <Upload className="h-4 w-4" />
          <span className="text-xs">이미지 추가 ({charImages.length}/10)</span>
        </button>
      ) : (
        <div className="flex w-full items-center justify-center rounded-xl border border-dashed border-stone-200 py-3 text-stone-300">
          <span className="text-xs">최대 10장까지 등록 가능합니다</span>
        </div>
      )}
      <input
        id="char-img-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleCharUpload}
      />
      {charImages.length > 0 &&
        (displayOption === "image-only" ? (
          <div className="grid grid-cols-2 gap-2">
            {charImages.map((photo) => (
              <div
                key={photo.id}
                className="relative aspect-square bg-stone-100 rounded-xl overflow-hidden group"
              >
                <Image
                  src={photo.imageUrl}
                  alt="커마"
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() =>
                    setCharImages((prev) =>
                      prev.filter((p) => p.id !== photo.id),
                    )
                  }
                  className="absolute top-1.5 right-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {charImages.map((photo) => (
              <div key={photo.id} className="flex gap-3 items-start">
                <div className="relative flex-shrink-0 w-20 h-20 bg-stone-100 rounded-xl overflow-hidden group">
                  <Image
                    src={photo.imageUrl}
                    alt="커마"
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() =>
                      setCharImages((prev) =>
                        prev.filter((p) => p.id !== photo.id),
                      )
                    }
                    className="absolute top-1 right-1 bg-black/40 hover:bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </div>
                <FieldTextarea
                  value={photo.description}
                  onChange={(e) =>
                    setCharImages((prev) =>
                      prev.map((p) =>
                        p.id === photo.id
                          ? { ...p, description: e.target.value }
                          : p,
                      ),
                    )
                  }
                  placeholder="설명 입력"
                  rows={3}
                  className="flex-1"
                />
              </div>
            ))}
          </div>
        ))}
      <RacePicker
        value={meRace}
        onChange={(race) =>
          setMeRace((prev) => toggleArr(prev as string[], race) as RaceType[])
        }
      />
      <CouplingPicker value={couplingPriority} onChange={onCouplingClick} />
      <div>
        <FieldTextarea
          value={charMemo}
          onChange={(e) => setCharMemo(e.target.value)}
          placeholder="커마 · 커플링에 대한 설명이나 메모"
          rows={3}
        />
      </div>
    </div>
    <div className="border-t border-stone-100 mt-5 pt-4 space-y-2">
      <MeLabel right />
      <RacePicker
        value={youRace}
        onChange={(race) =>
          setYouRace((prev) => toggleArr(prev as string[], race) as RaceType[])
        }
      />
      <FieldTextarea
        value={youCharMemo}
        onChange={(e) => setYouCharMemo(e.target.value)}
        placeholder="원하는 커마 스타일, 조건 등"
        rows={3}
        className="text-right"
      />
    </div>
  </SectionCard>
  );
};
