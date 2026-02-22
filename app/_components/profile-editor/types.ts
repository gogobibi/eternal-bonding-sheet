export type CouplingType = "BL" | "GL" | "HL";

export type JobType =
  | "Warrior" | "Paladin" | "Gunbreaker" | "Dark_Knight"
  | "White_Mage" | "Scholar" | "Sage" | "Astrologian"
  | "Bard" | "Black_Mage" | "Dancer" | "Dragoon" | "Machinist"
  | "Monk" | "Ninja" | "Pictomancer" | "Reaper" | "Red_Mage"
  | "Samurai" | "Summoner" | "Viper";

export type RaceType =
  | "환상약O"
  | "환상약X"
  | "남라펠"
  | "여라펠"
  | "여코테"
  | "남코테"
  | "남중휴"
  | "남고휴"
  | "여중휴"
  | "여고휴"
  | "남레젠"
  | "여레젠"
  | "남비에라"
  | "여비에라"
  | "남로스갈"
  | "여로스갈"
  | "남루가딘"
  | "여루가딘";

export interface PhotoItem {
  id: string;
  imageUrl: string;
  description: string;
}

export interface PlayStyleItem {
  id: string;
  text: string;
  emphasized: boolean;
}

export interface ProfileData {
  displayOption: "image-only" | "image-with-text";
  headerImage: string | null;
  nickname: string;
  nicknameBlind: boolean;
  server: string;
  // ME
  meGender: string;
  meGenderCustom: string;
  meAge: string;
  meWeekday: string[];
  meWeekend: string[];
  meTimeMemo: string;
  // YOU
  youGender: string;
  youGenderCustom: string;
  youAge: string[];
  youWeekdayAny: boolean;
  youWeekday: string[];
  youWeekendAny: boolean;
  youWeekend: string[];
  youTimeMemo: string;
  // Character
  charImages: PhotoItem[];
  charMemo: string;
  youCharMemo: string;
  couplingPriority: CouplingType[][];
  meRace: RaceType[];
  youRace: RaceType[];
  // Contents
  myJob: JobType[];
  youJob: JobType[];
  mySelected: string[];
  myCustom: string[];
  myContentMemo: string;
  youContentsEnabled: boolean;
  youSelected: string[];
  youCustom: string[];
  youContentMemo: string;
  // Play styles
  playStyles: PlayStyleItem[];
  // Server plan
  serverMove: string;
  serverCross: string;
  covenantPlan: string;
  serverPlanDesc: string;
  // Free
  freeText: string;
}
