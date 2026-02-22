import React from "react";

export const CardNickname: React.FC<{
  nickname: string;
  server: string;
  nicknameBlind?: boolean;
}> = ({ nickname, server, nicknameBlind }) => {
  const displayName = nicknameBlind ? "비공개 " : nickname;
  if (!displayName && !server) return null;
  return (
    <div className="mb-2 pb-[10px] text-right text-[10px] font-semibold tracking-[0.04em] text-stone-600">
      {displayName && (
        <span className={nicknameBlind ? "text-stone-300" : ""}>
          {displayName}
        </span>
      )}
      <span>{server && ` @ ${server}`}</span>
    </div>
  );
};
