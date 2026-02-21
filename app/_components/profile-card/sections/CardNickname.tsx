import React from "react";

export const CardNickname: React.FC<{
  nickname: string;
  server: string;
}> = ({ nickname, server }) => {
  if (!nickname && !server) return null;
  return (
    <div className="mb-[26px] border-b border-stone-200 pb-[22px] text-center">
      {nickname && (
        <div className="mb-2 text-[22px] font-semibold tracking-[0.04em] text-stone-800">
          {nickname}
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-1.5">
        {server && (
          <span className="rounded-full border border-violet-200 bg-violet-100 px-3 py-[3px] text-[11px] font-medium text-violet-700">
            {server}
          </span>
        )}
      </div>
    </div>
  );
};
