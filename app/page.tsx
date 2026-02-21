import { ProfileEditor } from "./_components/profile-editor/ProfileEditor";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-7 text-center">
          <p className="mb-1.5 text-[10px] tracking-[0.3em] text-stone-300 uppercase">
            Final Fantasy XIV
          </p>
          <h1 className="text-[1.3rem] font-medium tracking-[0.05em] text-stone-700">
            언약 시트 생성기
          </h1>
          <p className="mt-1.5 text-[11px] text-stone-400">
            간단히 정보를 입력하여 언약 시트를 생성하세요
          </p>
        </div>

        <ProfileEditor />
      </div>
    </div>
  );
}
