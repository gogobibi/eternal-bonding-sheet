"use client";

import React, { useRef } from "react";
import { useProfileForm } from "./use-profile-form";
import { useImageGenerator } from "./use-image-generator";
import { ProfileCard } from "../profile-card/ProfileCard";
import { HeaderImageSection } from "./form/HeaderImageSection";
import { BasicInfoSection } from "./form/BasicInfoSection";
import { CharacterSection } from "./form/CharacterSection";
import { ContentsSection } from "./form/ContentsSection";
import { PlayStyleSection } from "./form/PlayStyleSection";
import { ServerPlanSection } from "./form/ServerPlanSection";
import { FreeTextSection } from "./form/FreeTextSection";
import { PreviewPanel } from "./preview/PreviewPanel";
import { PreviewModal } from "./preview/PreviewModal";

export function ProfileEditor() {
  const captureRef = useRef<HTMLDivElement>(null);
  const form = useProfileForm();
  const { isGenerating, previewUrl, setPreviewUrl, handleGenerate, handleDownload } =
    useImageGenerator(captureRef, form.profileData.nickname);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 items-start">
        {/* LEFT: Form */}
        <div className="min-w-0 space-y-4">
          <HeaderImageSection {...form.header} />
          <BasicInfoSection
            basic={form.basic}
            basicMe={form.basicMe}
            basicYou={form.basicYou}
          />
          <CharacterSection {...form.character} />
          <ContentsSection {...form.contents} />
          <PlayStyleSection {...form.playStyle} />
          <ServerPlanSection {...form.serverPlan} />
          <FreeTextSection {...form.free} />
        </div>

        {/* RIGHT: Live Preview */}
        <PreviewPanel
          profileData={form.profileData}
          nickname={form.profileData.nickname}
          isGenerating={isGenerating}
          previewUrl={previewUrl}
          handleGenerate={handleGenerate}
          handleDownload={handleDownload}
        />
      </div>

      {/* Hidden Capture Target */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: "390px",
          zIndex: -9999,
          pointerEvents: "none",
        }}
      >
        <div ref={captureRef}>
          <ProfileCard data={form.profileData} />
        </div>
      </div>

      {/* Preview Modal */}
      {previewUrl && (
        <PreviewModal
          previewUrl={previewUrl}
          onClose={() => setPreviewUrl(null)}
          onDownload={handleDownload}
        />
      )}
    </>
  );
}
