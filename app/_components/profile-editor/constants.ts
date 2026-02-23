export const TIME_SLOTS = ["아침", "오전", "오후", "저녁", "밤", "새벽"];

export const AGE_DECADES = ["10대", "20대", "30대", "40대", "50대 이상"];

export const AGE_DECADE_LABELS: Record<string, string> = {
  "10대": "10",
  "20대": "20",
  "30대": "30",
  "40대": "40",
  "50대 이상": "50↑",
};

export const CONTENT_GROUPS = [
  {
    label: "일상 · 소셜",
    items: ["스샷", "만추", "컨하", "하우징", "탐험수첩"],
  },
  {
    label: "레이드 · 던전",
    items: [
      "무작",
      "레벨링",
      "딥던전",
      "돌발작",
      "마물",
      "고대무기",
      "특수필드",
      "환토벌전",
      "극만신",
      "영식",
      "절",
    ],
  },
  { label: "PVP", items: ["전장", "크컨", "기공전"] },
  { label: "생활", items: ["채집", "제작", "터주", "먼바다", "고난도제작"] },
  { label: "기타", items: ["칭호·업적작", "골드소서", "마작"] },
];

export const SERVERS = ["카벙클", "펜리르", "초코보", "모그리"];
export const COVENANT_PLANS = ["스탠다드", "골드", "플래티넘", "무관"];
export const SERVER_OPTIONS = ["O", "X", "△"];
