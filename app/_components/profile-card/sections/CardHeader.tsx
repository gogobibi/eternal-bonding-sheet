import React from "react";

export const CardHeader: React.FC<{ headerImage: string | null }> = ({
  headerImage,
}) => {
  if (!headerImage) return null;
  return (
    <div className="w-full aspect-[3/1] overflow-hidden bg-stone-200">
      <img
        src={headerImage}
        alt="대표 이미지"
        className="w-full h-full object-cover block"
      />
    </div>
  );
};
