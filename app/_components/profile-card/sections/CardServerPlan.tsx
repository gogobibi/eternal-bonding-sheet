import React from "react";
import { SectionBlock } from "../atoms/SectionBlock";
import { Pill } from "../atoms/Pill";
import { OptionMark } from "../atoms/OptionMark";
import type { ProfileData } from "../../profile-editor/types";

export const CardServerPlan: React.FC<{ data: ProfileData }> = ({ data }) => {
  const hasServerSection =
    !!data.serverMove ||
    !!data.serverCross ||
    !!data.covenantPlan ||
    !!data.serverPlanDesc;

  if (!hasServerSection) return null;

  return (
    <div className="mb-6">
      <SectionBlock title="서버 · 언약 플랜">
        <div className="flex flex-col gap-2.5">
          {(data.serverMove || data.serverCross) && (
            <div className="flex gap-5">
              {data.serverMove && (
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-stone-400">서버 이동</span>
                  <OptionMark value={data.serverMove} />
                </div>
              )}
              {data.serverCross && (
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-stone-400">서버 초월</span>
                  <OptionMark value={data.serverCross} />
                </div>
              )}
            </div>
          )}
          {data.covenantPlan && (
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-stone-400">언약 플랜</span>
              <Pill accent>{data.covenantPlan}</Pill>
            </div>
          )}
          {data.serverPlanDesc && (
            <div className="rounded-lg bg-stone-100 px-3 py-2 text-[10px] leading-[1.7] whitespace-pre-wrap text-stone-600">
              {data.serverPlanDesc}
            </div>
          )}
        </div>
      </SectionBlock>
    </div>
  );
};
