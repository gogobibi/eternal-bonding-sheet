import React from "react";
import { X, Download } from "lucide-react";

interface Props {
  previewUrl: string;
  onClose: () => void;
  onDownload: () => void;
}

export const PreviewModal: React.FC<Props> = ({
  previewUrl,
  onClose,
  onDownload,
}) => (
  <div
    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
    onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}
  >
    <div
      className="bg-white rounded-3xl overflow-hidden w-full max-w-sm flex flex-col shadow-2xl max-h-[88vh]"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400">
            생성된 이미지
          </p>
          <p className="text-xs text-stone-500 mt-0.5">
            스크롤하여 전체 내용을 확인하세요
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="overflow-y-auto flex-1 bg-stone-50">
        <img
          src={previewUrl}
          alt="생성된 프로필 이미지"
          className="w-full block"
        />
      </div>
      <div className="px-5 py-4 border-t border-stone-100 flex gap-3 bg-white">
        <button
          onClick={onClose}
          className="flex-none px-4 py-3 border border-stone-200 text-stone-500 rounded-xl text-xs hover:bg-stone-50 transition-colors"
        >
          닫기
        </button>
        <button
          onClick={onDownload}
          className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span className="text-sm">PNG 다운로드</span>
        </button>
      </div>
    </div>
  </div>
);
