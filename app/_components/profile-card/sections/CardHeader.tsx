import React from "react";
import { C } from "../card-colors";

export const CardHeader: React.FC<{ headerImage: string | null }> = ({
  headerImage,
}) => {
  if (!headerImage) return null;
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "3 / 1",
        overflow: "hidden",
        backgroundColor: C.stone200,
      }}
    >
      <img
        src={headerImage}
        alt="대표 이미지"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
};
