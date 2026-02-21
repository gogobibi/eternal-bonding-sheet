import React from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

interface Props {
  headerImage: string | null;
  setHeaderImage: (v: string | null) => void;
  handleHeaderUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const HeaderImageSection: React.FC<Props> = ({
  headerImage,
  setHeaderImage,
  handleHeaderUpload,
}) => (
  <div className="overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm">
    {!headerImage ? (
      <button
        type="button"
        onClick={() => document.getElementById("header-img-upload")?.click()}
        className="flex aspect-[3/1] w-full flex-col items-center justify-center gap-2 bg-stone-50 text-stone-300 transition-colors hover:bg-stone-100"
      >
        <Upload className="h-5 w-5" />
        <span className="text-[11px] tracking-wide">대표 이미지 업로드</span>
      </button>
    ) : (
      <div className="relative">
        <div className="relative aspect-[3/1] w-full overflow-hidden bg-stone-100">
          <Image
            src={headerImage}
            alt="대표 이미지"
            fill
            className="object-cover"
          />
        </div>
        <button
          onClick={() => setHeaderImage(null)}
          className="absolute top-2 right-2 rounded-full bg-black/40 p-1.5 text-white transition-colors hover:bg-black/60"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    )}
    <input
      id="header-img-upload"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleHeaderUpload}
    />
  </div>
);
