import { useState, type RefObject } from "react";

export function useImageGenerator(
  captureRef: RefObject<HTMLDivElement | null>,
  nickname: string,
) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!captureRef.current) return;
    setIsGenerating(true);
    try {
      await new Promise((r) => setTimeout(r, 150));
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: "#FAFAF7",
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      setPreviewUrl(canvas.toDataURL("image/png"));
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

  return { isGenerating, previewUrl, setPreviewUrl, handleGenerate, handleDownload };
}
