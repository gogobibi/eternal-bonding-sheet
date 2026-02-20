import React from "react";
import { C } from "../card-colors";
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
    <div style={{ marginBottom: "24px" }}>
      <SectionBlock title="서버 · 언약 플랜">
        <div
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          {(data.serverMove || data.serverCross) && (
            <div style={{ display: "flex", gap: "20px" }}>
              {data.serverMove && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={{ fontSize: "9px", color: C.stone400 }}>
                    서버 이동
                  </span>
                  <OptionMark value={data.serverMove} />
                </div>
              )}
              {data.serverCross && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={{ fontSize: "9px", color: C.stone400 }}>
                    서버 초월
                  </span>
                  <OptionMark value={data.serverCross} />
                </div>
              )}
            </div>
          )}
          {data.covenantPlan && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "9px", color: C.stone400 }}>
                언약 플랜
              </span>
              <Pill accent>{data.covenantPlan}</Pill>
            </div>
          )}
          {data.serverPlanDesc && (
            <div
              style={{
                fontSize: "10px",
                color: C.stone600,
                lineHeight: 1.7,
                padding: "8px 12px",
                backgroundColor: C.stone100,
                borderRadius: "8px",
                whiteSpace: "pre-wrap",
              }}
            >
              {data.serverPlanDesc}
            </div>
          )}
        </div>
      </SectionBlock>
    </div>
  );
};
