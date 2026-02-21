import React from "react";
import { Eye, Loader2, ImageDown, Download } from "lucide-react";
import type { ProfileData } from "../types";
import { ProfileCard } from "../../profile-card/ProfileCard";

interface Props {
  profileData: ProfileData;
  nickname: string;
  isGenerating: boolean;
  previewUrl: string | null;
  handleGenerate: () => void;
  handleDownload: () => void;
}

export const PreviewPanel: React.FC<Props> = ({
  profileData,
  nickname,
  isGenerating,
  previewUrl,
  handleGenerate,
  handleDownload,
}) => (
  <div className="lg:sticky lg:top-6 space-y-3">
    {/* Preview Panel */}
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
      {/* Panel Header */}
      <div className="px-5 py-3.5 border-b border-stone-100 bg-stone-50/60 flex items-center gap-2">
        <Eye className="h-3.5 w-3.5 text-stone-400" />
        <p className="text-[10px] tracking-[0.22em] uppercase text-stone-400 flex-1">
          실시간 미리보기
        </p>
        {nickname && (
          <span className="text-[10px] text-violet-500 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">
            {nickname}
          </span>
        )}
      </div>

      {/* Live ProfileCard */}
      <div
        className="overflow-y-auto overflow-x-auto max-h-[calc(100vh-220px)]"
      >
        <ProfileCard data={profileData} />
      </div>
    </div>

    {/* Generate button */}
    <button
      type="button"
      onClick={handleGenerate}
      disabled={isGenerating}
      className="w-full py-4 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:bg-violet-300 text-white rounded-2xl shadow-sm shadow-violet-100 flex items-center justify-center gap-2.5 transition-all"
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm tracking-wide">이미지 생성 중...</span>
        </>
      ) : (
        <>
          <ImageDown className="h-4 w-4" />
          <span className="text-sm tracking-wide">이미지 생성하기</span>
        </>
      )}
    </button>

    {/* Download button (shows after generation) */}
    {previewUrl && (
      <button
        type="button"
        onClick={handleDownload}
        className="w-full py-3.5 bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 rounded-2xl flex items-center justify-center gap-2 transition-all"
      >
        <Download className="h-4 w-4" />
        <span className="text-sm">PNG 다운로드</span>
      </button>
    )}
  </div>
);
