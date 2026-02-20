import React from "react";
import { C } from "../card-colors";
import { s } from "../card-styles";
import { SectionBlock } from "../atoms/SectionBlock";
import { Pill } from "../atoms/Pill";
import type { ProfileData } from "../../profile-editor/types";

export const CardBasicInfo: React.FC<{ data: ProfileData }> = ({ data }) => {
  const meGenderDisplay =
    data.meGender === "직접기입" ? data.meGenderCustom : data.meGender;
  const youGenderDisplay =
    data.youGender === "직접기입" ? data.youGenderCustom : data.youGender;

  const meHasData =
    !!meGenderDisplay ||
    !!data.meAge ||
    data.meWeekday.length > 0 ||
    data.meWeekend.length > 0 ||
    !!data.meTimeMemo;

  return (
    <div style={{ marginBottom: "24px" }}>
      <SectionBlock title="기본 소개">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0",
          }}
        >
          {/* ME */}
          <div style={{ paddingRight: "16px" }}>
            <div style={s.meLabel}>ME</div>
            {meHasData ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {meGenderDisplay && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "9px",
                        color: C.stone400,
                        minWidth: "26px",
                      }}
                    >
                      성별
                    </span>
                    <Pill>{meGenderDisplay}</Pill>
                  </div>
                )}
                {data.meAge && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "9px",
                        color: C.stone400,
                        minWidth: "26px",
                      }}
                    >
                      나이
                    </span>
                    <Pill>{data.meAge}</Pill>
                  </div>
                )}
                {(data.meWeekday.length > 0 || data.meWeekend.length > 0) && (
                  <div>
                    <span
                      style={{
                        fontSize: "9px",
                        color: C.stone400,
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      접속
                    </span>
                    {data.meWeekday.length > 0 && (
                      <div style={{ marginBottom: "3px" }}>
                        <span
                          style={{
                            fontSize: "8px",
                            color: C.violet500,
                            marginRight: "4px",
                          }}
                        >
                          평일
                        </span>
                        <span style={{ fontSize: "9px", color: C.stone600 }}>
                          {data.meWeekday.join(" · ")}
                        </span>
                      </div>
                    )}
                    {data.meWeekend.length > 0 && (
                      <div>
                        <span
                          style={{
                            fontSize: "8px",
                            color: C.violet500,
                            marginRight: "4px",
                          }}
                        >
                          주말
                        </span>
                        <span style={{ fontSize: "9px", color: C.stone600 }}>
                          {data.meWeekend.join(" · ")}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                {data.meTimeMemo && (
                  <div
                    style={{
                      fontSize: "9px",
                      color: C.stone500,
                      lineHeight: 1.6,
                      fontStyle: "italic",
                      marginTop: "2px",
                    }}
                  >
                    {data.meTimeMemo}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ fontSize: "9px", color: C.stone300 }}>—</div>
            )}
          </div>

          {/* YOU */}
          <div
            style={{
              paddingLeft: "16px",
              borderLeft: `1px solid ${C.stone200}`,
            }}
          >
            <div style={{ ...s.meLabel, textAlign: "right" }}>YOU</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  justifyContent: "flex-end",
                }}
              >
                <Pill>{youGenderDisplay || "무관"}</Pill>
                <span
                  style={{
                    fontSize: "9px",
                    color: C.stone400,
                    minWidth: "26px",
                    textAlign: "right",
                  }}
                >
                  성별
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  justifyContent: "flex-end",
                }}
              >
                <Pill>{data.youAge || "무관"}</Pill>
                <span
                  style={{
                    fontSize: "9px",
                    color: C.stone400,
                    minWidth: "26px",
                    textAlign: "right",
                  }}
                >
                  나이
                </span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span
                  style={{
                    fontSize: "9px",
                    color: C.stone400,
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  접속
                </span>
                <div style={{ marginBottom: "3px" }}>
                  <span
                    style={{
                      fontSize: "8px",
                      color: C.violet500,
                      marginLeft: "4px",
                    }}
                  >
                    평일
                  </span>
                  <div style={{ fontSize: "9px", color: C.stone600 }}>
                    {data.youWeekdayAny
                      ? "무관"
                      : data.youWeekday.length > 0
                        ? data.youWeekday.join(" · ")
                        : "—"}
                  </div>
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "8px",
                      color: C.violet500,
                      marginLeft: "4px",
                    }}
                  >
                    주말
                  </span>
                  <div style={{ fontSize: "9px", color: C.stone600 }}>
                    {data.youWeekendAny
                      ? "무관"
                      : data.youWeekend.length > 0
                        ? data.youWeekend.join(" · ")
                        : "—"}
                  </div>
                </div>
              </div>
              {data.youTimeMemo && (
                <div
                  style={{
                    fontSize: "9px",
                    color: C.stone500,
                    lineHeight: 1.6,
                    fontStyle: "italic",
                    textAlign: "right",
                    marginTop: "2px",
                  }}
                >
                  {data.youTimeMemo}
                </div>
              )}
            </div>
          </div>
        </div>
      </SectionBlock>
    </div>
  );
};
