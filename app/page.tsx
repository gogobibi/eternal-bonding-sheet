import { ProfileEditor } from "./_components/profile-editor/ProfileEditor";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-7">
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-300 mb-1.5">
            Final Fantasy XIV
          </p>
          <h1 className="text-stone-700 text-[1.3rem] font-medium tracking-[0.05em]">
            언약 시트 생성기
          </h1>
          <p className="text-[11px] text-stone-400 mt-1.5">
            간단히 정보를 입력하여 언약 시트를 생성하세요
          </p>
        </div>

        <ProfileEditor />
      </div>
    </div>
  );
}
