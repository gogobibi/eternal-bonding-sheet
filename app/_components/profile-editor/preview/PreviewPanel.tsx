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
  <div className="space-y-3 lg:sticky lg:top-6">
    {/* Preview Panel */}
    <div className="overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm">
      {/* Panel Header */}
      <div className="flex items-center gap-2 border-b border-stone-100 bg-stone-50/60 px-5 py-3.5">
        <Eye className="h-3.5 w-3.5 text-stone-400" />
        <p className="flex-1 text-[10px] tracking-[0.22em] text-stone-400 uppercase">
          실시간 미리보기
        </p>
        {nickname && (
          <span className="rounded-full border border-violet-100 bg-violet-50 px-2 py-0.5 text-[10px] text-violet-500">
            {nickname}
          </span>
        )}
      </div>

      {/* Live ProfileCard */}
      <div className="max-h-[calc(100vh-220px)] overflow-x-auto overflow-y-auto">
        <ProfileCard data={profileData} />
      </div>
    </div>

    {/* Generate button */}
    <button
      type="button"
      onClick={handleGenerate}
      disabled={isGenerating}
      className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-violet-600 py-4 text-white shadow-sm shadow-violet-100 transition-all hover:bg-violet-700 active:bg-violet-800 disabled:bg-violet-300"
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
  </div>
);
