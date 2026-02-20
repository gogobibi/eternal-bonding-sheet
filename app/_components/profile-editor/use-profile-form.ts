import { useState } from "react";
import type { ProfileData, PhotoItem, PlayStyleItem } from "./types";

export function useProfileForm() {
  // Display option
  const [displayOption, setDisplayOption] = useState<
    "image-only" | "image-with-text"
  >("image-only");

  // 1. Header image
  const [headerImage, setHeaderImage] = useState<string | null>(null);

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
  const [youContentsEnabled, setYouContentsEnabled] = useState(false);
  const [youSelected, setYouSelected] = useState<string[]>([]);
  const [youCustom, setYouCustom] = useState<string[]>([]);
  const [youCustomInput, setYouCustomInput] = useState("");
  const [youContentMemo, setYouContentMemo] = useState("");

  // 5. Play style
  const [playStyles, setPlayStyles] = useState<PlayStyleItem[]>([
    { id: "1", text: "", emphasized: false },
  ]);

  // 6. Server plan
  const [serverMove, setServerMove] = useState("");
  const [serverCross, setServerCross] = useState("");
  const [covenantPlan, setCovenantPlan] = useState("");
  const [serverPlanDesc, setServerPlanDesc] = useState("");

  // 7. Free text
  const [freeText, setFreeText] = useState("");

  // ── Build ProfileData ──
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

  // ── Handlers ──
  const handleHeaderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setHeaderImage(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCharUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      { id: Date.now().toString(), text: "", emphasized: false },
    ]);

  const updatePlayStyle = (id: string, patch: Partial<PlayStyleItem>) =>
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

  return {
    profileData,
    header: { headerImage, setHeaderImage, handleHeaderUpload },
    basic: { nickname, setNickname, server, setServer },
    basicMe: {
      meGender, setMeGender,
      meGenderCustom, setMeGenderCustom,
      meAge, setMeAge,
      meWeekday, setMeWeekday,
      meWeekend, setMeWeekend,
      meTimeMemo, setMeTimeMemo,
    },
    basicYou: {
      youGender, setYouGender,
      youGenderCustom, setYouGenderCustom,
      youAge, setYouAge,
      youWeekdayAny, setYouWeekdayAny,
      youWeekday, setYouWeekday,
      youWeekendAny, setYouWeekendAny,
      youWeekend, setYouWeekend,
      youTimeMemo, setYouTimeMemo,
    },
    character: {
      displayOption, setDisplayOption,
      charImages, setCharImages,
      charMemo, setCharMemo,
      youCharMemo, setYouCharMemo,
      handleCharUpload,
    },
    contents: {
      mySelected, setMySelected,
      myCustom, setMyCustom,
      myCustomInput, setMyCustomInput,
      myContentMemo, setMyContentMemo,
      youContentsEnabled, setYouContentsEnabled,
      youSelected, setYouSelected,
      youCustom, setYouCustom,
      youCustomInput, setYouCustomInput,
      youContentMemo, setYouContentMemo,
      addMyKeyword, addYouKeyword,
    },
    playStyle: { playStyles, setPlayStyles, addPlayStyle, updatePlayStyle },
    serverPlan: {
      serverMove, setServerMove,
      serverCross, setServerCross,
      covenantPlan, setCovenantPlan,
      serverPlanDesc, setServerPlanDesc,
    },
    free: { freeText, setFreeText },
  };
}
