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
  "남우라",
  "여우라",
  "남비에라",
  "여비에라",
  "남로스갈",
  "여로스갈",
  "남루가딘",
  "여루가딘",
];

const FANTASIA_TYPES = ["환상약O", "환상약X"] as const;

interface Props {
  value: RaceType[];
  onChange: (race: RaceType) => void;
}

export const RacePicker: React.FC<Props> = ({ value, onChange }) => {
  const handleFantasiaClick = (race: "환상약O" | "환상약X") => {
    const opposite = race === "환상약O" ? "환상약X" : "환상약O";
    onChange(race);
    if (!value.includes(race) && value.includes(opposite)) {
      onChange(opposite);
    }
  };

  return (
    <div className="space-y-2">
      <div className="text-[10px] text-stone-400 gap-3 flex">
        <span>종족</span>
      </div>
      <div className="flex flex-wrap gap-1 mt-1.5">
        {FANTASIA_TYPES.map((race) => (
          <OptionBtn
            key={race}
            label={race}
            size="sm"
            special
            selected={value.includes(race)}
            onClick={() => handleFantasiaClick(race)}
          />
        ))}
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
};
