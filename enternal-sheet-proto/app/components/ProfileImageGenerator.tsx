import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import {
  Upload,
  X,
  Plus,
  Star,
  Download,
  ImageDown,
  Loader2,
  Eye,
} from "lucide-react";
import {
  ProfileCard,
  ProfileData,
  PhotoItem,
  PlayStyleItem,
} from "./ProfileCard";

// ── Constants ──────────────────────────────────────────────────────────────
const TIME_SLOTS = [
  "아침",
  "오전",
  "오후",
  "저녁",
  "밤",
  "새벽",
];

const AGE_OPTIONS = [
  "10대 전반",
  "10대 중반",
  "10대 후반",
  "20대 전반",
  "20대 중반",
  "20대 후반",
  "30대 전반",
  "30대 중반",
  "30대 후반",
  "40대 전반",
  "40대 중반",
  "40대 후반",
  "50대 이상",
];

const CONTENT_GROUPS = [
  {
    label: "일상 · 소셜",
    items: ["스샷", "만추", "컨하", "하우징", "탐험수첩"],
  },
  {
    label: "던전 · 파티",
    items: ["무작", "레벨링", "딥던전", "돌발작"],
  },
  { label: "전투", items: ["전장", "크컨"] },
  { label: "고난이도", items: ["극만신", "영식", "절"] },
  { label: "생활", items: ["채집", "제작"] },
];

const SERVERS = ["카벙클", "펜리르", "초코보", "모그리"];
const COVENANT_PLANS = ["스탠다드", "골드", "플래티넘", "무관"];
const SERVER_OPTIONS = ["O", "X", "△"];

// ── Helpers ────────────────────────────────────────────────────────────────
function toggleArr(arr: string[], item: string): string[] {
  return arr.includes(item)
    ? arr.filter((x) => x !== item)
    : [...arr, item];
}

// ── Small UI Atoms ─────────────────────────────────────────────────────────
const SectionCard: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
    <div className="px-5 py-3 border-b border-stone-100 bg-stone-50/60">
      <p className="text-[10px] tracking-[0.22em] uppercase text-stone-400">
        {title}
      </p>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const MeLabel: React.FC<{ right?: boolean }> = ({ right }) => (
  <p
    className={`text-[10px] tracking-[0.22em] uppercase text-violet-400 mb-3 ${right ? "text-right" : ""}`}
  >
    {right ? "YOU" : "ME"}
  </p>
);

const Mini: React.FC<{
  children: React.ReactNode;
  right?: boolean;
}> = ({ children, right }) => (
  <p
    className={`text-[10px] text-stone-400 mb-1.5 ${right ? "text-right" : ""}`}
  >
    {children}
  </p>
);

const Chip: React.FC<{
  label: string;
  selected: boolean;
  onClick: () => void;
}> = ({ label, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-2.5 py-1 rounded-full text-[11px] border transition-all leading-none ${
      selected
        ? "bg-violet-50 border-violet-300 text-violet-700"
        : "bg-stone-50 border-stone-200 text-stone-400 hover:border-stone-300 hover:text-stone-600"
    }`}
  >
    {label}
  </button>
);

const OptionBtn: React.FC<{
  label: string;
  selected: boolean;
  onClick: () => void;
  size?: "sm" | "md";
}> = ({ label, selected, onClick, size = "md" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-lg border transition-all leading-none ${
      size === "sm"
        ? "px-2 py-0.5 text-[10px]"
        : "px-3 py-1.5 text-xs"
    } ${
      selected
        ? "bg-violet-50 border-violet-300 text-violet-700"
        : "bg-stone-50 border-stone-200 text-stone-400 hover:border-stone-300 hover:text-stone-600"
    }`}
  >
    {label}
  </button>
);

const TimeChip: React.FC<{
  label: string;
  selected: boolean;
  onClick: () => void;
}> = ({ label, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-1.5 py-0.5 rounded text-[9px] border transition-all leading-none ${
      selected
        ? "bg-violet-50 border-violet-300 text-violet-700"
        : "bg-stone-50 border-stone-200 text-stone-400 hover:border-stone-300"
    }`}
  >
    {label}
  </button>
);

const FieldInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = (props) => (
  <input
    {...props}
    className={`w-full px-3 py-2 text-xs border border-stone-200 rounded-lg bg-stone-50 placeholder:text-stone-300 focus:outline-none focus:border-violet-300 transition-colors ${props.className ?? ""}`}
  />
);

const FieldTextarea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = (props) => (
  <textarea
    {...props}
    className={`w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-stone-50 placeholder:text-stone-300 focus:outline-none focus:border-violet-300 resize-none transition-colors ${props.className ?? ""}`}
  />
);

// ── Main Component ─────────────────────────────────────────────────────────
export function ProfileImageGenerator() {
  const captureRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    null,
  );

  // Display option
  const [displayOption, setDisplayOption] = useState<
    "image-only" | "image-with-text"
  >("image-only");

  // 1. Header image
  const [headerImage, setHeaderImage] = useState<string | null>(
    null,
  );

  // 2. Basic info
  const [nickname, setNickname] = useState("");
  const [server, setServer] = useState("");

  // ME
  const [meGender, setMeGender] = useState("");
  const [meGenderCustom, setMeGenderCustom] = useState("");
  const [meAge, setMeAge] = useState("");
  const [meWeekday, setMeWeekday] = useState<string[]>([]);
  const [meWeekend, setMeWeekend] = useState<string[]>([]);
  const [meTimeMemo, setMeTimeMemo] = useState("");

  // YOU
  const [youGender, setYouGender] = useState("무관");
  const [youGenderCustom, setYouGenderCustom] = useState("");
  const [youAge, setYouAge] = useState("무관");
  const [youWeekdayAny, setYouWeekdayAny] = useState(true);
  const [youWeekday, setYouWeekday] = useState<string[]>([]);
  const [youWeekendAny, setYouWeekendAny] = useState(true);
  const [youWeekend, setYouWeekend] = useState<string[]>([]);
  const [youTimeMemo, setYouTimeMemo] = useState("");

  // 3. Character images
  const [charImages, setCharImages] = useState<PhotoItem[]>([]);
  const [charMemo, setCharMemo] = useState("");
  const [youCharMemo, setYouCharMemo] = useState("");

  // 4. Main contents
  const [mySelected, setMySelected] = useState<string[]>([]);
  const [myCustom, setMyCustom] = useState<string[]>([]);
  const [myCustomInput, setMyCustomInput] = useState("");
  const [myContentMemo, setMyContentMemo] = useState("");
  const [youContentsEnabled, setYouContentsEnabled] =
    useState(false);
  const [youSelected, setYouSelected] = useState<string[]>([]);
  const [youCustom, setYouCustom] = useState<string[]>([]);
  const [youCustomInput, setYouCustomInput] = useState("");
  const [youContentMemo, setYouContentMemo] = useState("");

  // 5. Play style
  const [playStyles, setPlayStyles] = useState<PlayStyleItem[]>(
    [{ id: "1", text: "", emphasized: false }],
  );

  // 6. Server plan
  const [serverMove, setServerMove] = useState("");
  const [serverCross, setServerCross] = useState("");
  const [covenantPlan, setCovenantPlan] = useState("");
  const [serverPlanDesc, setServerPlanDesc] = useState("");

  // 7. Free text
  const [freeText, setFreeText] = useState("");

  // ── Build ProfileData ──────────────────────────────────────────────────
  const profileData: ProfileData = {
    displayOption,
    headerImage,
    nickname,
    server,
    meGender,
    meGenderCustom,
    meAge,
    meWeekday,
    meWeekend,
    meTimeMemo,
    youGender,
    youGenderCustom,
    youAge,
    youWeekdayAny,
    youWeekday,
    youWeekendAny,
    youWeekend,
    youTimeMemo,
    charImages,
    charMemo,
    youCharMemo,
    mySelected,
    myCustom,
    myContentMemo,
    youContentsEnabled,
    youSelected,
    youCustom,
    youContentMemo,
    playStyles,
    serverMove,
    serverCross,
    covenantPlan,
    serverPlanDesc,
    freeText,
  };

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleHeaderUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setHeaderImage(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCharUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCharImages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + Math.random(),
            imageUrl: ev.target?.result as string,
            description: "",
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const addPlayStyle = () =>
    setPlayStyles((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: "",
        emphasized: false,
      },
    ]);

  const updatePlayStyle = (
    id: string,
    patch: Partial<PlayStyleItem>,
  ) =>
    setPlayStyles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    );

  const addMyKeyword = () => {
    if (!myCustomInput.trim()) return;
    setMyCustom((prev) => [...prev, myCustomInput.trim()]);
    setMyCustomInput("");
  };

  const addYouKeyword = () => {
    if (!youCustomInput.trim()) return;
    setYouCustom((prev) => [...prev, youCustomInput.trim()]);
    setYouCustomInput("");
  };

  // ── Image generation ──────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (!captureRef.current) return;
    setIsGenerating(true);
    try {
      await new Promise((r) => setTimeout(r, 150));
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: "#FAFAF7",
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      setPreviewUrl(canvas.toDataURL("image/png"));
    } catch (err) {
      console.error("이미지 생성 오류:", err);
      alert("이미지 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!previewUrl) return;
    const link = document.createElement("a");
    link.download = `ff14-profile-${nickname || "profile"}.png`;
    link.href = previewUrl;
    link.click();
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Two-column layout ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 items-start">
        {/* ════════════════════ LEFT: Form ════════════════════ */}
        <div className="min-w-0 space-y-4">
          {/* ── 1. 대표 이미지 ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
            {!headerImage ? (
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("header-img-upload")
                    ?.click()
                }
                className="w-full aspect-[3/1] flex flex-col items-center justify-center gap-2 bg-stone-50 hover:bg-stone-100 transition-colors text-stone-300"
              >
                <Upload className="h-5 w-5" />
                <span className="text-[11px] tracking-wide">
                  대표 이미지 업로드
                </span>
              </button>
            ) : (
              <div className="relative">
                <div className="w-full aspect-[3/1] overflow-hidden bg-stone-100">
                  <img
                    src={headerImage}
                    alt="대표 이미지"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => setHeaderImage(null)}
                  className="absolute top-2 right-2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            <input
              id="header-img-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleHeaderUpload}
            />
          </div>

          {/* ── 2. 기본 소개 ── */}
          <SectionCard title="기본 정보">
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <Mini>닉네임 (최대 9자)</Mini>
                <FieldInput
                  value={nickname}
                  onChange={(e) =>
                    setNickname(e.target.value.slice(0, 9))
                  }
                  placeholder="닉네임"
                />
              </div>
              <div>
                <Mini>서버</Mini>
                <select
                  value={server}
                  onChange={(e) => setServer(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg bg-stone-50 text-stone-600 focus:outline-none focus:border-violet-300 transition-colors appearance-none"
                >
                  <option value="">서버 선택</option>
                  {SERVERS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ME / YOU */}
            <div className="grid grid-cols-2 border-t border-stone-100 pt-4">
              {/* ─ ME ─ */}
              <div className="pr-4 space-y-3.5 border-r border-stone-100">
                <MeLabel />
                <div>
                  <Mini>성별</Mini>
                  <div className="flex flex-wrap gap-1">
                    {["남", "여", "직접기입"].map((g) => (
                      <Chip
                        key={g}
                        label={g}
                        selected={meGender === g}
                        onClick={() =>
                          setMeGender((prev) =>
                            prev === g ? "" : g,
                          )
                        }
                      />
                    ))}
                  </div>
                  {meGender === "직접기입" && (
                    <input
                      value={meGenderCustom}
                      onChange={(e) =>
                        setMeGenderCustom(e.target.value)
                      }
                      placeholder="직접 입력"
                      className="mt-1.5 w-full px-2 py-1 text-[10px] border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:border-violet-300"
                    />
                  )}
                </div>
                <div>
                  <Mini>나이대</Mini>
                  <select
                    value={meAge}
                    onChange={(e) => setMeAge(e.target.value)}
                    className="w-full px-2 py-1.5 text-[10px] border border-stone-200 rounded-lg bg-stone-50 text-stone-600 focus:outline-none focus:border-violet-300 appearance-none"
                  >
                    <option value="">선택</option>
                    {AGE_OPTIONS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Mini>접속 시간</Mini>
                  <div className="space-y-2">
                    <div>
                      <p className="text-[9px] text-stone-300 mb-1">
                        평일
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {TIME_SLOTS.map((t) => (
                          <TimeChip
                            key={t}
                            label={t}
                            selected={meWeekday.includes(t)}
                            onClick={() =>
                              setMeWeekday((prev) =>
                                toggleArr(prev, t),
                              )
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] text-stone-300 mb-1">
                        주말
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {TIME_SLOTS.map((t) => (
                          <TimeChip
                            key={t}
                            label={t}
                            selected={meWeekend.includes(t)}
                            onClick={() =>
                              setMeWeekend((prev) =>
                                toggleArr(prev, t),
                              )
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <FieldTextarea
                      value={meTimeMemo}
                      onChange={(e) =>
                        setMeTimeMemo(e.target.value)
                      }
                      placeholder="접속 메모..."
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* ─ YOU ─ */}
              <div className="pl-4 space-y-3.5">
                <MeLabel right />
                <div>
                  <Mini right>성별</Mini>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {["남", "여", "직접기입", "무관"].map(
                      (g) => (
                        <Chip
                          key={g}
                          label={g}
                          selected={youGender === g}
                          onClick={() => setYouGender(g)}
                        />
                      ),
                    )}
                  </div>
                  {youGender === "직접기입" && (
                    <input
                      value={youGenderCustom}
                      onChange={(e) =>
                        setYouGenderCustom(e.target.value)
                      }
                      placeholder="직접 입력"
                      className="mt-1.5 w-full px-2 py-1 text-[10px] border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:border-violet-300 text-right"
                    />
                  )}
                </div>
                <div>
                  <Mini right>나이대</Mini>
                  <select
                    value={youAge}
                    onChange={(e) => setYouAge(e.target.value)}
                    className="w-full px-2 py-1.5 text-[10px] border border-stone-200 rounded-lg bg-stone-50 text-stone-600 focus:outline-none focus:border-violet-300 appearance-none text-right"
                  >
                    <option value="무관">무관</option>
                    {AGE_OPTIONS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Mini right>접속 시간</Mini>
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[9px] text-stone-300">
                          평일
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            setYouWeekdayAny((p) => !p)
                          }
                          className={`text-[9px] px-1.5 py-0.5 rounded border transition-all ${youWeekdayAny ? "bg-stone-200 border-stone-300 text-stone-500" : "bg-stone-50 border-stone-200 text-stone-400"}`}
                        >
                          무관
                        </button>
                      </div>
                      {!youWeekdayAny && (
                        <div className="flex flex-wrap gap-1 justify-end">
                          {TIME_SLOTS.map((t) => (
                            <TimeChip
                              key={t}
                              label={t}
                              selected={youWeekday.includes(t)}
                              onClick={() =>
                                setYouWeekday((prev) =>
                                  toggleArr(prev, t),
                                )
                              }
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[9px] text-stone-300">
                          주말
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            setYouWeekendAny((p) => !p)
                          }
                          className={`text-[9px] px-1.5 py-0.5 rounded border transition-all ${youWeekendAny ? "bg-stone-200 border-stone-300 text-stone-500" : "bg-stone-50 border-stone-200 text-stone-400"}`}
                        >
                          무관
                        </button>
                      </div>
                      {!youWeekendAny && (
                        <div className="flex flex-wrap gap-1 justify-end">
                          {TIME_SLOTS.map((t) => (
                            <TimeChip
                              key={t}
                              label={t}
                              selected={youWeekend.includes(t)}
                              onClick={() =>
                                setYouWeekend((prev) =>
                                  toggleArr(prev, t),
                                )
                              }
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <FieldTextarea
                      value={youTimeMemo}
                      onChange={(e) =>
                        setYouTimeMemo(e.target.value)
                      }
                      placeholder="접속 메모..."
                      rows={2}
                      className="text-right"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* ── 3. 커마 ── */}
          <SectionCard title="커마 (캐릭터)">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-stone-100">
              <p className="text-[10px] text-stone-400 mr-1">
                표시 방식
              </p>
              <OptionBtn
                label="이미지만"
                size="sm"
                selected={displayOption === "image-only"}
                onClick={() => setDisplayOption("image-only")}
              />
              <OptionBtn
                label="이미지 + 설명"
                size="sm"
                selected={displayOption === "image-with-text"}
                onClick={() =>
                  setDisplayOption("image-with-text")
                }
              />
            </div>
            <div className="space-y-3">
              <MeLabel />
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("char-img-upload")
                    ?.click()
                }
                className="w-full py-3 border border-dashed border-stone-200 rounded-xl flex items-center justify-center gap-2 text-stone-400 hover:border-violet-300 hover:text-violet-400 transition-colors"
              >
                <Upload className="h-4 w-4" />
                <span className="text-xs">이미지 추가</span>
              </button>
              <input
                id="char-img-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleCharUpload}
              />
              {charImages.length > 0 &&
                (displayOption === "image-only" ? (
                  <div className="grid grid-cols-2 gap-2">
                    {charImages.map((photo) => (
                      <div
                        key={photo.id}
                        className="relative aspect-square bg-stone-100 rounded-xl overflow-hidden group"
                      >
                        <img
                          src={photo.imageUrl}
                          alt="커마"
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() =>
                            setCharImages((prev) =>
                              prev.filter(
                                (p) => p.id !== photo.id,
                              ),
                            )
                          }
                          className="absolute top-1.5 right-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {charImages.map((photo) => (
                      <div
                        key={photo.id}
                        className="flex gap-3 items-start"
                      >
                        <div className="relative flex-shrink-0 w-20 h-20 bg-stone-100 rounded-xl overflow-hidden group">
                          <img
                            src={photo.imageUrl}
                            alt="커마"
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() =>
                              setCharImages((prev) =>
                                prev.filter(
                                  (p) => p.id !== photo.id,
                                ),
                              )
                            }
                            className="absolute top-1 right-1 bg-black/40 hover:bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-2.5 w-2.5" />
                          </button>
                        </div>
                        <FieldTextarea
                          value={photo.description}
                          onChange={(e) =>
                            setCharImages((prev) =>
                              prev.map((p) =>
                                p.id === photo.id
                                  ? {
                                      ...p,
                                      description:
                                        e.target.value,
                                    }
                                  : p,
                              ),
                            )
                          }
                          placeholder="설명 입력..."
                          rows={3}
                          className="flex-1"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              <div>
                <Mini>ME 메모</Mini>
                <FieldTextarea
                  value={charMemo}
                  onChange={(e) => setCharMemo(e.target.value)}
                  placeholder="캐릭터에 대한 설명이나 메모..."
                  rows={3}
                />
              </div>
            </div>
            <div className="border-t border-stone-100 mt-5 pt-4 space-y-2">
              <MeLabel right />
              <Mini right>원하시는 커마 스타일이 있다면</Mini>
              <FieldTextarea
                value={youCharMemo}
                onChange={(e) => setYouCharMemo(e.target.value)}
                placeholder="원하는 커마 스타일, 조건 등..."
                rows={3}
                className="text-right"
              />
            </div>
          </SectionCard>

          {/* ── 4. 주 컨텐츠 ── */}
          <SectionCard title="주 컨텐츠">
            <div className="space-y-3">
              <MeLabel />
              {CONTENT_GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="text-[9px] text-stone-300 mb-1.5">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {group.items.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        selected={mySelected.includes(item)}
                        onClick={() =>
                          setMySelected((prev) =>
                            toggleArr(prev, item),
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
              {myCustom.length > 0 && (
                <div>
                  <p className="text-[9px] text-stone-300 mb-1.5">
                    추가 키워드
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {myCustom.map((kw) => (
                      <span
                        key={kw}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-violet-50 border border-violet-200 text-violet-700"
                      >
                        {kw}
                        <button
                          onClick={() =>
                            setMyCustom((prev) =>
                              prev.filter((k) => k !== kw),
                            )
                          }
                          className="text-violet-400 hover:text-violet-600"
                        >
                          <X className="h-2.5 w-2.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <FieldInput
                  value={myCustomInput}
                  onChange={(e) =>
                    setMyCustomInput(e.target.value)
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" && addMyKeyword()
                  }
                  placeholder="키워드 직접 추가..."
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={addMyKeyword}
                  className="px-3 py-2 bg-violet-50 border border-violet-200 text-violet-600 rounded-lg hover:bg-violet-100 transition-colors flex items-center"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <FieldTextarea
                value={myContentMemo}
                onChange={(e) =>
                  setMyContentMemo(e.target.value)
                }
                placeholder="컨텐츠에 대한 간단한 설명..."
                rows={2}
              />
            </div>
            <div className="border-t border-stone-100 mt-5 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-[10px] tracking-[0.22em] uppercase text-violet-400">
                  YOU
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setYouContentsEnabled((p) => !p)
                  }
                  className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                    youContentsEnabled
                      ? "bg-violet-50 border-violet-300 text-violet-600"
                      : "bg-stone-50 border-stone-200 text-stone-400 hover:border-stone-300"
                  }`}
                >
                  {youContentsEnabled
                    ? "키워드 ON"
                    : "키워드 OFF"}
                </button>
              </div>
              {youContentsEnabled && (
                <div className="space-y-3">
                  {CONTENT_GROUPS.map((group) => (
                    <div key={group.label}>
                      <p className="text-[9px] text-stone-300 mb-1.5 text-right">
                        {group.label}
                      </p>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {group.items.map((item) => (
                          <Chip
                            key={item}
                            label={item}
                            selected={youSelected.includes(
                              item,
                            )}
                            onClick={() =>
                              setYouSelected((prev) =>
                                toggleArr(prev, item),
                              )
                            }
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                  {youCustom.length > 0 && (
                    <div className="flex flex-wrap gap-1 justify-end">
                      {youCustom.map((kw) => (
                        <span
                          key={kw}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-violet-50 border border-violet-200 text-violet-700"
                        >
                          {kw}
                          <button
                            onClick={() =>
                              setYouCustom((prev) =>
                                prev.filter((k) => k !== kw),
                              )
                            }
                            className="text-violet-400 hover:text-violet-600"
                          >
                            <X className="h-2.5 w-2.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <FieldInput
                      value={youCustomInput}
                      onChange={(e) =>
                        setYouCustomInput(e.target.value)
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && addYouKeyword()
                      }
                      placeholder="키워드 직접 추가..."
                      className="flex-1 text-right"
                    />
                    <button
                      type="button"
                      onClick={addYouKeyword}
                      className="px-3 py-2 bg-violet-50 border border-violet-200 text-violet-600 rounded-lg hover:bg-violet-100 transition-colors flex items-center"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
              <FieldTextarea
                value={youContentMemo}
                onChange={(e) =>
                  setYouContentMemo(e.target.value)
                }
                placeholder="원하는 컨텐츠 스타일, 조건 등..."
                rows={2}
                className="text-right"
              />
            </div>
          </SectionCard>

          {/* ── 5. 플레이·교류 스타일 ── */}
          <SectionCard title="플레이 · 교류 스타일">
            <div className="space-y-2">
              {playStyles.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() =>
                      updatePlayStyle(item.id, {
                        emphasized: !item.emphasized,
                      })
                    }
                    className={`flex-shrink-0 p-1.5 rounded-lg border transition-all ${
                      item.emphasized
                        ? "bg-amber-50 border-amber-300 text-amber-500"
                        : "bg-stone-50 border-stone-200 text-stone-300 hover:text-stone-400"
                    }`}
                    title="강조"
                  >
                    <Star
                      className="h-3.5 w-3.5"
                      fill={
                        item.emphasized
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                  <input
                    value={item.text}
                    onChange={(e) =>
                      updatePlayStyle(item.id, {
                        text: e.target.value,
                      })
                    }
                    placeholder={`항목 ${idx + 1}`}
                    className={`flex-1 px-3 py-2 text-xs border rounded-lg bg-stone-50 placeholder:text-stone-300 focus:outline-none focus:border-violet-300 transition-colors ${
                      item.emphasized
                        ? "border-amber-200 bg-amber-50/40"
                        : "border-stone-200"
                    }`}
                  />
                  {playStyles.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setPlayStyles((prev) =>
                          prev.filter((p) => p.id !== item.id),
                        )
                      }
                      className="flex-shrink-0 p-1.5 text-stone-300 hover:text-red-400 transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addPlayStyle}
                className="w-full py-2.5 border border-dashed border-stone-200 rounded-xl text-stone-400 hover:border-violet-300 hover:text-violet-400 transition-colors text-xs flex items-center justify-center gap-1.5 mt-1"
              >
                <Plus className="h-3.5 w-3.5" />
                항목 추가
              </button>
            </div>
          </SectionCard>

          {/* ── 6. 서버·언약 플랜 ── */}
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
                          setServerMove((prev) =>
                            prev === opt ? "" : opt,
                          )
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
                          setServerCross((prev) =>
                            prev === opt ? "" : opt,
                          )
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
                        setCovenantPlan((prev) =>
                          prev === plan ? "" : plan,
                        )
                      }
                    />
                  ))}
                </div>
              </div>
              <div>
                <Mini>세부 설명</Mini>
                <FieldTextarea
                  value={serverPlanDesc}
                  onChange={(e) =>
                    setServerPlanDesc(e.target.value)
                  }
                  placeholder="서버, 언약 플랜에 대한 추가 설명..."
                  rows={3}
                />
              </div>
            </div>
          </SectionCard>

          {/* ── 7. 그 외 ── */}
          <SectionCard title="그 외">
            <FieldTextarea
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              placeholder="자유롭게 작성해주세요..."
              rows={5}
            />
          </SectionCard>
        </div>
        {/* ════════════════════ END LEFT ════════════════════ */}

        {/* ════════════════════ RIGHT: Live Preview ════════════════════ */}
        <div className="lg:sticky lg:top-6 space-y-3">
          {/* Preview Panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
            {/* Panel Header */}
            <div className="px-5 py-3.5 border-b border-stone-100 bg-stone-50/60 flex items-center gap-2">
              <Eye className="h-3.5 w-3.5 text-stone-400" />
              <p className="text-[10px] tracking-[0.22em] uppercase text-stone-400 flex-1">
                실시간 미리보기
              </p>
              {nickname && (
                <span className="text-[10px] text-violet-500 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">
                  {nickname}
                </span>
              )}
            </div>

            {/* Live ProfileCard */}
            <div
              className="overflow-y-auto overflow-x-auto"
              style={{ maxHeight: "calc(100vh - 220px)" }}
            >
              <ProfileCard data={profileData} />
            </div>
          </div>

          {/* Generate button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:bg-violet-300 text-white rounded-2xl shadow-sm shadow-violet-100 flex items-center justify-center gap-2.5 transition-all"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm tracking-wide">
                  이미지 생성 중...
                </span>
              </>
            ) : (
              <>
                <ImageDown className="h-4 w-4" />
                <span className="text-sm tracking-wide">
                  이미지 생성하기
                </span>
              </>
            )}
          </button>

          {/* Download button (shows after generation) */}
          {previewUrl && (
            <button
              type="button"
              onClick={handleDownload}
              className="w-full py-3.5 bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 rounded-2xl flex items-center justify-center gap-2 transition-all"
            >
              <Download className="h-4 w-4" />
              <span className="text-sm">PNG 다운로드</span>
            </button>
          )}
        </div>
        {/* ════════════════════ END RIGHT ════════════════════ */}
      </div>

      {/* ── Hidden Capture Target ────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: "390px",
          zIndex: -9999,
          pointerEvents: "none",
        }}
      >
        <div ref={captureRef}>
          <ProfileCard data={profileData} />
        </div>
      </div>

      {/* ── Preview Modal (after generation) ────────────────────────────── */}
      {previewUrl && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget)
              setPreviewUrl(null);
          }}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden w-full max-w-sm flex flex-col shadow-2xl"
            style={{ maxHeight: "88vh" }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400">
                  생성된 이미지
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  스크롤하여 전체 내용을 확인하세요
                </p>
              </div>
              <button
                onClick={() => setPreviewUrl(null)}
                className="p-2 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 bg-stone-50">
              <img
                src={previewUrl}
                alt="생성된 프로필 이미지"
                className="w-full block"
              />
            </div>
            <div className="px-5 py-4 border-t border-stone-100 flex gap-3 bg-white">
              <button
                onClick={() => setPreviewUrl(null)}
                className="flex-none px-4 py-3 border border-stone-200 text-stone-500 rounded-xl text-xs hover:bg-stone-50 transition-colors"
              >
                닫기
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span className="text-sm">PNG 다운로드</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}