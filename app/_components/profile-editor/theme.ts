export type AccentColor = "violet" | "blue" | "sky" | "teal" | "pink" | "orange";

export interface ThemeClasses {
  cardLabel: string;
  cardAccentPillClasses: string;
  cardCouplingText: string;

  editorLabel: string;
  chipSelected: string;
  inputFocus: string;
  jobSelected: string;
  optionBtnSelected: string;
  toggleOn: string;

  keywordTag: string;
  keywordRemove: string;
  keywordAdd: string;

  couplingPreviewText: string;
  couplingBtnSelected: string;

  uploadHover: string;
  addBtnHover: string;

  ageDecadeSelected: string;
  ageYouTag: string;
  ageYouRemove: string;
  agePhaseHover: string;

  generateBtn: string;
}

export interface PaletteItem {
  key: AccentColor;
  name: string;
  swatch: string;
}

export const PALETTE_LIST: PaletteItem[] = [
  { key: "violet", name: "보라", swatch: "bg-violet-500" },
  { key: "blue", name: "파랑", swatch: "bg-blue-500" },
  { key: "sky", name: "하늘", swatch: "bg-sky-500" },
  { key: "teal", name: "청록", swatch: "bg-teal-500" },
  { key: "pink", name: "분홍", swatch: "bg-pink-500" },
  { key: "orange", name: "주황", swatch: "bg-orange-500" },
];

export const themeClasses: Record<AccentColor, ThemeClasses> = {
  violet: {
    cardLabel: "text-violet-500",
    cardAccentPillClasses: "border-violet-200 bg-violet-50 text-violet-600",
    cardCouplingText: "text-violet-600",
    editorLabel: "text-violet-400",
    chipSelected: "bg-violet-50 border-violet-300 text-violet-700",
    inputFocus: "focus:border-violet-300",
    jobSelected: "bg-violet-100 ring-1 ring-violet-400",
    optionBtnSelected: "bg-violet-50 border-violet-300 text-violet-700",
    toggleOn: "bg-violet-400",
    keywordTag: "bg-violet-50 border-violet-200 text-violet-700",
    keywordRemove: "text-violet-400 hover:text-violet-600",
    keywordAdd: "bg-violet-50 border-violet-200 text-violet-600 hover:bg-violet-100",
    couplingPreviewText: "text-violet-500",
    couplingBtnSelected: "bg-violet-50 border-violet-300 text-violet-700",
    uploadHover: "hover:border-violet-300 hover:text-violet-400",
    addBtnHover: "hover:border-violet-300 hover:text-violet-400",
    ageDecadeSelected: "border-violet-300 bg-violet-100 text-violet-600",
    ageYouTag: "border-violet-200 bg-violet-50 text-violet-600",
    ageYouRemove: "text-violet-400 hover:text-violet-600",
    agePhaseHover: "hover:border-violet-300 hover:bg-violet-100 hover:text-violet-600",
    generateBtn: "bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:bg-violet-300 shadow-violet-100",
  },
  blue: {
    cardLabel: "text-blue-500",
    cardAccentPillClasses: "border-blue-200 bg-blue-50 text-blue-600",
    cardCouplingText: "text-blue-600",
    editorLabel: "text-blue-400",
    chipSelected: "bg-blue-50 border-blue-300 text-blue-700",
    inputFocus: "focus:border-blue-300",
    jobSelected: "bg-blue-100 ring-1 ring-blue-400",
    optionBtnSelected: "bg-blue-50 border-blue-300 text-blue-700",
    toggleOn: "bg-blue-400",
    keywordTag: "bg-blue-50 border-blue-200 text-blue-700",
    keywordRemove: "text-blue-400 hover:text-blue-600",
    keywordAdd: "bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100",
    couplingPreviewText: "text-blue-500",
    couplingBtnSelected: "bg-blue-50 border-blue-300 text-blue-700",
    uploadHover: "hover:border-blue-300 hover:text-blue-400",
    addBtnHover: "hover:border-blue-300 hover:text-blue-400",
    ageDecadeSelected: "border-blue-300 bg-blue-100 text-blue-600",
    ageYouTag: "border-blue-200 bg-blue-50 text-blue-600",
    ageYouRemove: "text-blue-400 hover:text-blue-600",
    agePhaseHover: "hover:border-blue-300 hover:bg-blue-100 hover:text-blue-600",
    generateBtn: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 shadow-blue-100",
  },
  sky: {
    cardLabel: "text-sky-500",
    cardAccentPillClasses: "border-sky-200 bg-sky-50 text-sky-600",
    cardCouplingText: "text-sky-600",
    editorLabel: "text-sky-400",
    chipSelected: "bg-sky-50 border-sky-300 text-sky-700",
    inputFocus: "focus:border-sky-300",
    jobSelected: "bg-sky-100 ring-1 ring-sky-400",
    optionBtnSelected: "bg-sky-50 border-sky-300 text-sky-700",
    toggleOn: "bg-sky-400",
    keywordTag: "bg-sky-50 border-sky-200 text-sky-700",
    keywordRemove: "text-sky-400 hover:text-sky-600",
    keywordAdd: "bg-sky-50 border-sky-200 text-sky-600 hover:bg-sky-100",
    couplingPreviewText: "text-sky-500",
    couplingBtnSelected: "bg-sky-50 border-sky-300 text-sky-700",
    uploadHover: "hover:border-sky-300 hover:text-sky-400",
    addBtnHover: "hover:border-sky-300 hover:text-sky-400",
    ageDecadeSelected: "border-sky-300 bg-sky-100 text-sky-600",
    ageYouTag: "border-sky-200 bg-sky-50 text-sky-600",
    ageYouRemove: "text-sky-400 hover:text-sky-600",
    agePhaseHover: "hover:border-sky-300 hover:bg-sky-100 hover:text-sky-600",
    generateBtn: "bg-sky-600 hover:bg-sky-700 active:bg-sky-800 disabled:bg-sky-300 shadow-sky-100",
  },
  teal: {
    cardLabel: "text-teal-500",
    cardAccentPillClasses: "border-teal-200 bg-teal-50 text-teal-600",
    cardCouplingText: "text-teal-600",
    editorLabel: "text-teal-400",
    chipSelected: "bg-teal-50 border-teal-300 text-teal-700",
    inputFocus: "focus:border-teal-300",
    jobSelected: "bg-teal-100 ring-1 ring-teal-400",
    optionBtnSelected: "bg-teal-50 border-teal-300 text-teal-700",
    toggleOn: "bg-teal-400",
    keywordTag: "bg-teal-50 border-teal-200 text-teal-700",
    keywordRemove: "text-teal-400 hover:text-teal-600",
    keywordAdd: "bg-teal-50 border-teal-200 text-teal-600 hover:bg-teal-100",
    couplingPreviewText: "text-teal-500",
    couplingBtnSelected: "bg-teal-50 border-teal-300 text-teal-700",
    uploadHover: "hover:border-teal-300 hover:text-teal-400",
    addBtnHover: "hover:border-teal-300 hover:text-teal-400",
    ageDecadeSelected: "border-teal-300 bg-teal-100 text-teal-600",
    ageYouTag: "border-teal-200 bg-teal-50 text-teal-600",
    ageYouRemove: "text-teal-400 hover:text-teal-600",
    agePhaseHover: "hover:border-teal-300 hover:bg-teal-100 hover:text-teal-600",
    generateBtn: "bg-teal-600 hover:bg-teal-700 active:bg-teal-800 disabled:bg-teal-300 shadow-teal-100",
  },
  pink: {
    cardLabel: "text-pink-500",
    cardAccentPillClasses: "border-pink-200 bg-pink-50 text-pink-600",
    cardCouplingText: "text-pink-600",
    editorLabel: "text-pink-400",
    chipSelected: "bg-pink-50 border-pink-300 text-pink-700",
    inputFocus: "focus:border-pink-300",
    jobSelected: "bg-pink-100 ring-1 ring-pink-400",
    optionBtnSelected: "bg-pink-50 border-pink-300 text-pink-700",
    toggleOn: "bg-pink-400",
    keywordTag: "bg-pink-50 border-pink-200 text-pink-700",
    keywordRemove: "text-pink-400 hover:text-pink-600",
    keywordAdd: "bg-pink-50 border-pink-200 text-pink-600 hover:bg-pink-100",
    couplingPreviewText: "text-pink-500",
    couplingBtnSelected: "bg-pink-50 border-pink-300 text-pink-700",
    uploadHover: "hover:border-pink-300 hover:text-pink-400",
    addBtnHover: "hover:border-pink-300 hover:text-pink-400",
    ageDecadeSelected: "border-pink-300 bg-pink-100 text-pink-600",
    ageYouTag: "border-pink-200 bg-pink-50 text-pink-600",
    ageYouRemove: "text-pink-400 hover:text-pink-600",
    agePhaseHover: "hover:border-pink-300 hover:bg-pink-100 hover:text-pink-600",
    generateBtn: "bg-pink-600 hover:bg-pink-700 active:bg-pink-800 disabled:bg-pink-300 shadow-pink-100",
  },
  orange: {
    cardLabel: "text-orange-500",
    cardAccentPillClasses: "border-orange-200 bg-orange-50 text-orange-600",
    cardCouplingText: "text-orange-600",
    editorLabel: "text-orange-400",
    chipSelected: "bg-orange-50 border-orange-300 text-orange-700",
    inputFocus: "focus:border-orange-300",
    jobSelected: "bg-orange-100 ring-1 ring-orange-400",
    optionBtnSelected: "bg-orange-50 border-orange-300 text-orange-700",
    toggleOn: "bg-orange-400",
    keywordTag: "bg-orange-50 border-orange-200 text-orange-700",
    keywordRemove: "text-orange-400 hover:text-orange-600",
    keywordAdd: "bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100",
    couplingPreviewText: "text-orange-500",
    couplingBtnSelected: "bg-orange-50 border-orange-300 text-orange-700",
    uploadHover: "hover:border-orange-300 hover:text-orange-400",
    addBtnHover: "hover:border-orange-300 hover:text-orange-400",
    ageDecadeSelected: "border-orange-300 bg-orange-100 text-orange-600",
    ageYouTag: "border-orange-200 bg-orange-50 text-orange-600",
    ageYouRemove: "text-orange-400 hover:text-orange-600",
    agePhaseHover: "hover:border-orange-300 hover:bg-orange-100 hover:text-orange-600",
    generateBtn: "bg-orange-600 hover:bg-orange-700 active:bg-orange-800 disabled:bg-orange-300 shadow-orange-100",
  },
};
