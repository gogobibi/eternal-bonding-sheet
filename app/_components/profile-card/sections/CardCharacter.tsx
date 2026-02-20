import React from "react";
import { C } from "../card-colors";
import { s } from "../card-styles";
import { SectionBlock } from "../atoms/SectionBlock";
import type { ProfileData } from "../../profile-editor/types";

export const CardCharacter: React.FC<{ data: ProfileData }> = ({ data }) => {
  const hasCharSection =
    data.charImages.length > 0 || !!data.charMemo || !!data.youCharMemo;

  if (!hasCharSection) return null;

  return (
    <div style={{ marginBottom: "24px" }}>
      <SectionBlock title="커마">
        {(data.charImages.length > 0 || data.charMemo) && (
          <div style={{ marginBottom: data.youCharMemo ? "16px" : "0" }}>
            <div style={s.meLabel}>ME</div>
            {data.charImages.length > 0 &&
              (data.displayOption === "image-only" ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "6px",
                    marginBottom: data.charMemo ? "10px" : "0",
                  }}
                >
                  {data.charImages.map((photo) => (
                    <div
                      key={photo.id}
                      style={{
                        aspectRatio: "1",
                        overflow: "hidden",
                        borderRadius: "10px",
                        backgroundColor: C.stone200,
                      }}
                    >
                      <img
                        src={photo.imageUrl}
                        alt="커마"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginBottom: data.charMemo ? "10px" : "0",
                  }}
                >
                  {data.charImages.map((photo) => (
                    <div
                      key={photo.id}
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          flexShrink: 0,
                          width: "72px",
                          height: "72px",
                          borderRadius: "10px",
                          overflow: "hidden",
                          backgroundColor: C.stone200,
                        }}
                      >
                        <img
                          src={photo.imageUrl}
                          alt="커마"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>
                      {photo.description && (
                        <div
                          style={{
                            flex: 1,
                            fontSize: "10px",
                            color: C.stone600,
                            lineHeight: 1.7,
                            paddingTop: "4px",
                          }}
                        >
                          {photo.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            {data.charMemo && (
              <div
                style={{
                  fontSize: "10px",
                  color: C.stone600,
                  lineHeight: 1.7,
                  padding: "8px 12px",
                  backgroundColor: C.stone100,
                  borderRadius: "8px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {data.charMemo}
              </div>
            )}
          </div>
        )}
        {data.youCharMemo && (
          <div>
            <div style={{ ...s.meLabel, textAlign: "right" }}>YOU</div>
            <div
              style={{
                fontSize: "10px",
                color: C.stone600,
                lineHeight: 1.7,
                padding: "8px 12px",
                backgroundColor: C.stone100,
                borderRadius: "8px",
                textAlign: "right",
                whiteSpace: "pre-wrap",
              }}
            >
              {data.youCharMemo}
            </div>
          </div>
        )}
      </SectionBlock>
    </div>
  );
};
