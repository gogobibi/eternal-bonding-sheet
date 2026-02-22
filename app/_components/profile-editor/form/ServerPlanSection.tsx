import React from "react";
import { SectionCard } from "../atoms/SectionCard";
import { Mini } from "../atoms/Mini";
import { OptionBtn } from "../atoms/OptionBtn";
import { FieldTextarea } from "../atoms/FieldTextarea";
import { SERVER_OPTIONS, COVENANT_PLANS } from "../constants";

interface Props {
  serverMove: string;
  setServerMove: React.Dispatch<React.SetStateAction<string>>;
  serverCross: string;
  setServerCross: React.Dispatch<React.SetStateAction<string>>;
  covenantPlan: string;
  setCovenantPlan: React.Dispatch<React.SetStateAction<string>>;
  serverPlanDesc: string;
  setServerPlanDesc: (v: string) => void;
}

export const ServerPlanSection: React.FC<Props> = ({
  serverMove,
  setServerMove,
  serverCross,
  setServerCross,
  covenantPlan,
  setCovenantPlan,
  serverPlanDesc,
  setServerPlanDesc,
}) => (
  <SectionCard title="서버 · 언약 플랜">
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Mini>서버 이동</Mini>
          <div className="flex gap-1.5">
            {SERVER_OPTIONS.map((opt) => (
              <OptionBtn
                key={opt}
                label={opt}
                size="sm"
                selected={serverMove === opt}
                onClick={() =>
                  setServerMove((prev) => (prev === opt ? "" : opt))
                }
              />
            ))}
          </div>
        </div>
        <div>
          <Mini>서버 초월</Mini>
          <div className="flex gap-1.5">
            {SERVER_OPTIONS.map((opt) => (
              <OptionBtn
                key={opt}
                label={opt}
                size="sm"
                selected={serverCross === opt}
                onClick={() =>
                  setServerCross((prev) => (prev === opt ? "" : opt))
                }
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <Mini>언약 플랜</Mini>
        <div className="flex flex-wrap gap-1.5">
          {COVENANT_PLANS.map((plan) => (
            <OptionBtn
              key={plan}
              label={plan}
              selected={covenantPlan === plan}
              onClick={() =>
                setCovenantPlan((prev) => (prev === plan ? "" : plan))
              }
            />
          ))}
        </div>
      </div>
      <div>
        <Mini>세부 설명</Mini>
        <FieldTextarea
          value={serverPlanDesc}
          onChange={(e) => setServerPlanDesc(e.target.value)}
          placeholder="서버, 언약 플랜에 대한 추가 설명"
          rows={3}
        />
      </div>
    </div>
  </SectionCard>
);
