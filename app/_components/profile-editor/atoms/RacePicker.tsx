import React from "react";
import { OptionBtn } from "./OptionBtn";
import type { RaceType } from "../types";

const RACE_TYPES: RaceType[] = [
  "남라펠",
  "여라펠",
  "여코테",
  "남코테",
  "남중휴",
  "남고휴",
  "여중휴",
  "여고휴",
  "남레젠",
  "여레젠",
  "남비에라",
  "여비에라",
  "남로스갈",
  "여로스갈",
  "남루가딘",
  "여루가딘",
];

interface Props {
  value: RaceType[];
  onChange: (race: RaceType) => void;
}

export const RacePicker: React.FC<Props> = ({ value, onChange }) => (
  <div className="space-y-2">
    <div className="text-[10px] text-stone-400 gap-3 flex">
      <span>종족</span>
    </div>
    <div className="flex flex-wrap gap-1">
      {RACE_TYPES.map((race) => (
        <OptionBtn
          key={race}
          label={race}
          size="sm"
          selected={value.includes(race)}
          onClick={() => onChange(race)}
        />
      ))}
    </div>
  </div>
);
