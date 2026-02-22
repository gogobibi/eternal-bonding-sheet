"use client";

import React from "react";
import type { JobType } from "../types";
import { useTheme } from "../ThemeContext";

const JOB_GROUPS: {
  role: string;
  roleIcon: string;
  jobs: JobType[];
}[] = [
  {
    role: "Tank",
    roleIcon: "/job-icons/TankRole.png",
    jobs: ["Warrior", "Paladin", "Gunbreaker", "Dark_Knight"],
  },
  {
    role: "Healer",
    roleIcon: "/job-icons/HealerRole.png",
    jobs: ["White_Mage", "Scholar", "Sage", "Astrologian"],
  },
  {
    role: "Melee",
    roleIcon: "/job-icons/Melee_DPS.png",
    jobs: ["Dragoon", "Monk", "Ninja", "Samurai", "Reaper", "Viper"],
  },
  {
    role: "Physical Ranged",
    roleIcon: "/job-icons/Physical_Ranged_DPS.png",
    jobs: ["Bard", "Machinist", "Dancer"],
  },
  {
    role: "Magic Ranged",
    roleIcon: "/job-icons/Magic_Ranged_DPS.png",
    jobs: ["Black_Mage", "Summoner", "Red_Mage", "Pictomancer"],
  },
];

interface Props {
  value: JobType[];
  onChange: React.Dispatch<React.SetStateAction<JobType[]>>;
  align?: "left" | "right";
}

export const JobPicker: React.FC<Props> = ({ value, onChange, align = "left" }) => {
  const theme = useTheme();

  const toggleJob = (job: JobType) => {
    onChange((prev) =>
      prev.includes(job) ? prev.filter((j) => j !== job) : [...prev, job]
    );
  };

  const toggleGroup = (jobs: JobType[]) => {
    const allSelected = jobs.every((j) => value.includes(j));
    if (allSelected) {
      onChange((prev) => prev.filter((j) => !jobs.includes(j)));
    } else {
      onChange((prev) => {
        const toAdd = jobs.filter((j) => !prev.includes(j));
        return [...prev, ...toAdd];
      });
    }
  };

  const isGroupSelected = (jobs: JobType[]) => jobs.every((j) => value.includes(j));

  return (
    <div className="space-y-1">
      {JOB_GROUPS.map((group) => (
        <div
          key={group.role}
          className={`flex items-center gap-1 flex-wrap ${
            align === "right" ? "flex-row-reverse" : ""
          }`}
        >
          <button
            type="button"
            onClick={() => toggleGroup(group.jobs)}
            className={`rounded p-0.5 transition-all ${
              isGroupSelected(group.jobs)
                ? theme.jobSelected
                : "opacity-40 hover:opacity-70"
            }`}
            title={group.role}
          >
            <img src={group.roleIcon} alt={group.role} className="w-6 h-6" />
          </button>
          <div className="w-px h-4 bg-stone-200 mx-0.5" />
          {group.jobs.map((job) => (
            <button
              key={job}
              type="button"
              onClick={() => toggleJob(job)}
              className={`rounded p-0.5 transition-all ${
                value.includes(job)
                  ? theme.jobSelected
                  : "opacity-40 hover:opacity-70"
              }`}
              title={job}
            >
              <img src={`/job-icons/${job}.png`} alt={job} className="w-6 h-6" />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
