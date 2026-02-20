import React from "react";

export const CardNickname: React.FC<{
  nickname: string;
  server: string;
}> = ({ nickname, server }) => {
  if (!nickname && !server) return null;
  return (
    <div className="text-center mb-[26px] pb-[22px] border-b border-stone-200">
      {nickname && (
        <div className="text-[22px] font-semibold text-stone-800 tracking-[0.04em] mb-2">
          {nickname}
        </div>
      )}
      <div className="flex gap-1.5 justify-center flex-wrap">
        {server && (
          <span className="py-[3px] px-3 rounded-full text-[11px] bg-violet-100 text-violet-700 border border-violet-200 font-medium">
            {server}
          </span>
        )}
      </div>
    </div>
  );
};
