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
                  <span className="text-[9px] text-stone-500">서버 이동</span>
                  <OptionMark value={data.serverMove} />
                </div>
              )}
              {data.serverCross && (
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-stone-500">서버 초월</span>
                  <OptionMark value={data.serverCross} />
                </div>
              )}
            </div>
          )}
          {data.covenantPlan && (
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-stone-500">언약 플랜</span>
              <Pill accent>{data.covenantPlan}</Pill>
            </div>
          )}
          {data.serverPlanDesc && (
            <div className="text-[10px] text-stone-700 leading-[1.7] px-3 py-2 bg-stone-100 rounded-lg whitespace-pre-wrap">
              {data.serverPlanDesc}
            </div>
          )}
        </div>
      </SectionBlock>
    </div>
  );
};
