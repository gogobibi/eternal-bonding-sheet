import React from "react";
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
  <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
    {!headerImage ? (
      <button
        type="button"
        onClick={() =>
          document.getElementById("header-img-upload")?.click()
        }
        className="w-full aspect-[3/1] flex flex-col items-center justify-center gap-2 bg-stone-50 hover:bg-stone-100 transition-colors text-stone-300"
      >
        <Upload className="h-5 w-5" />
        <span className="text-[11px] tracking-wide">대표 이미지 업로드</span>
      </button>
    ) : (
      <div className="relative">
        <div className="w-full aspect-[3/1] overflow-hidden bg-stone-100">
          <img
            src={headerImage}
            alt="대표 이미지"
            className="w-full h-full object-cover"
          />
        </div>
        <button
          onClick={() => setHeaderImage(null)}
          className="absolute top-2 right-2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
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
