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
  // Contents
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
