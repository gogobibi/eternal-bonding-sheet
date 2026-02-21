import { useState, type RefObject } from "react";

export function useImageGenerator(
  captureRef: RefObject<HTMLDivElement | null>,
  nickname: string,
) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!captureRef.current) return;
    const target = captureRef.current;
    setIsGenerating(true);
    try {
      await document.fonts.ready;

      const { toPng } = await import("html-to-image");
      const options = {
        pixelRatio: 2,
        backgroundColor: "#FAFAF7",
      };

      // 첫 번째 호출: SVG foreignObject 컨텍스트에 웹폰트를 로드
      await toPng(target, options);
      // 두 번째 호출: 폰트가 로드된 상태에서 최종 렌더링
      const url = await toPng(target, options);

      setPreviewUrl(url);
      const link = document.createElement("a");
      link.download = `ff14-profile-${nickname || "profile"}.png`;
      link.href = url;
      link.click();
    } catch (err) {
      console.error("이미지 생성 오류:", err);
      alert("이미지 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!previewUrl) return;
    const link = document.createElement("a");
    link.download = `ff14-profile-${nickname || "profile"}.png`;
    link.href = previewUrl;
    link.click();
  };

  return { isGenerating, previewUrl, handleGenerate, handleDownload };
}
