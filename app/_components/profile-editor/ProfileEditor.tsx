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

export function ProfileEditor() {
  const captureRef = useRef<HTMLDivElement>(null);
  const form = useProfileForm();
  const { isGenerating, previewUrl, handleGenerate, handleDownload } =
    useImageGenerator(captureRef, form.profileData.nickname);

  return (
    <>
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_420px]">
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
        className="pointer-events-none fixed top-0 -left-[9999px] -z-[9999] w-[390px]"
      >
        <div ref={captureRef}>
          <ProfileCard data={form.profileData} />
        </div>
      </div>
    </>
  );
}
