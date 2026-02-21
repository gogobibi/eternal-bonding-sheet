import React from "react";

export const CardHeader: React.FC<{ headerImage: string | null }> = ({
  headerImage,
}) => {
  if (!headerImage) return null;
  return (
    <div className="aspect-[3/1] w-full overflow-hidden bg-stone-200">
      <img
        src={headerImage}
        alt="대표 이미지"
        className="block h-full w-full object-cover"
      />
    </div>
  );
};
