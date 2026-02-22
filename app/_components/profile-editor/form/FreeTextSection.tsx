import React from "react";
import { SectionCard } from "../atoms/SectionCard";
import { FieldTextarea } from "../atoms/FieldTextarea";

interface Props {
  freeText: string;
  setFreeText: (v: string) => void;
}

export const FreeTextSection: React.FC<Props> = ({ freeText, setFreeText }) => (
  <SectionCard title="그 외">
    <FieldTextarea
      value={freeText}
      onChange={(e) => setFreeText(e.target.value)}
      placeholder="자유롭게 작성해주세요"
      rows={5}
    />
  </SectionCard>
);
