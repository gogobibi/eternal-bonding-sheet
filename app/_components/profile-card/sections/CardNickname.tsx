import React from "react";
import { C } from "../card-colors";

export const CardNickname: React.FC<{
  nickname: string;
  server: string;
}> = ({ nickname, server }) => {
  if (!nickname && !server) return null;
  return (
    <div
      style={{
        textAlign: "center",
        marginBottom: "26px",
        paddingBottom: "22px",
        borderBottom: `1px solid ${C.stone200}`,
      }}
    >
      {nickname && (
        <div
          style={{
            fontSize: "22px",
            fontWeight: 600,
            color: C.stone800,
            letterSpacing: "0.04em",
            marginBottom: "8px",
          }}
        >
          {nickname}
        </div>
      )}
      <div
        style={{
          display: "flex",
          gap: "6px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {server && (
          <span
            style={{
              padding: "3px 12px",
              borderRadius: "999px",
              fontSize: "11px",
              backgroundColor: C.violet100,
              color: C.violet700,
              border: `1px solid ${C.violet200}`,
              fontWeight: 500,
            }}
          >
            {server}
          </span>
        )}
      </div>
    </div>
  );
};
