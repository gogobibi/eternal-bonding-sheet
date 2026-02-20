import React from "react";
import { C } from "./card-colors";
import type { ProfileData } from "../profile-editor/types";
import { CardHeader } from "./sections/CardHeader";
import { CardNickname } from "./sections/CardNickname";
import { CardBasicInfo } from "./sections/CardBasicInfo";
import { CardCharacter } from "./sections/CardCharacter";
import { CardContents } from "./sections/CardContents";
import { CardPlayStyle } from "./sections/CardPlayStyle";
import { CardServerPlan } from "./sections/CardServerPlan";
import { CardFreeText } from "./sections/CardFreeText";
import { CardFooter } from "./sections/CardFooter";

export const ProfileCard = React.forwardRef<
  HTMLDivElement,
  { data: ProfileData }
>(({ data }, ref) => (
  <div
    ref={ref}
    style={{
      width: "390px",
      backgroundColor: C.bg,
      fontFamily:
        '"Noto Sans KR", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
      color: C.stone800,
      overflow: "hidden",
    }}
  >
    <CardHeader headerImage={data.headerImage} />
    <div style={{ padding: "28px 24px 20px" }}>
      <CardNickname nickname={data.nickname} server={data.server} />
      <CardBasicInfo data={data} />
      <CardCharacter data={data} />
      <CardContents data={data} />
      <CardPlayStyle playStyles={data.playStyles} />
      <CardServerPlan data={data} />
      <CardFreeText freeText={data.freeText} />
      <CardFooter />
    </div>
  </div>
));

ProfileCard.displayName = "ProfileCard";
