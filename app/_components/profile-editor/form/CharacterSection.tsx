import React from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { SectionCard } from "../atoms/SectionCard";
import { MeLabel } from "../atoms/MeLabel";
import { Mini } from "../atoms/Mini";
import { OptionBtn } from "../atoms/OptionBtn";
import { FieldTextarea } from "../atoms/FieldTextarea";
import type { PhotoItem } from "../types";

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
}) => (
  <SectionCard title="커마 (캐릭터)">
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
    <div className="space-y-3">
      <MeLabel />
      <button
        type="button"
        onClick={() =>
          document.getElementById("char-img-upload")?.click()
        }
        className="w-full py-3 border border-dashed border-stone-200 rounded-xl flex items-center justify-center gap-2 text-stone-400 hover:border-violet-300 hover:text-violet-400 transition-colors"
      >
        <Upload className="h-4 w-4" />
        <span className="text-xs">이미지 추가</span>
      </button>
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
                  placeholder="설명 입력..."
                  rows={3}
                  className="flex-1"
                />
              </div>
            ))}
          </div>
        ))}
      <div>
        <Mini>ME 메모</Mini>
        <FieldTextarea
          value={charMemo}
          onChange={(e) => setCharMemo(e.target.value)}
          placeholder="캐릭터에 대한 설명이나 메모..."
          rows={3}
        />
      </div>
    </div>
    <div className="border-t border-stone-100 mt-5 pt-4 space-y-2">
      <MeLabel right />
      <Mini right>원하시는 커마 스타일이 있다면</Mini>
      <FieldTextarea
        value={youCharMemo}
        onChange={(e) => setYouCharMemo(e.target.value)}
        placeholder="원하는 커마 스타일, 조건 등..."
        rows={3}
        className="text-right"
      />
    </div>
  </SectionCard>
);
