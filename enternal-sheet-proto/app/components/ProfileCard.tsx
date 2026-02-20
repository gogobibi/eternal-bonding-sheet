import React from 'react';

// ── Shared Types (exported for ProfileImageGenerator) ───────────────────────
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
  displayOption: 'image-only' | 'image-with-text';
  headerImage: string | null;
  nickname: string;
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
  youAge: string;
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

// ── Internal helpers ────────────────────────────────────────────────────────
const C = {
  bg: '#FAFAF7',
  white: '#ffffff',
  stone800: '#292524',
  stone700: '#44403c',
  stone600: '#57534e',
  stone500: '#78716c',
  stone400: '#a8a29e',
  stone300: '#d6d3d1',
  stone200: '#e7e5e4',
  stone100: '#f5f5f4',
  violet700: '#6d28d9',
  violet600: '#7c3aed',
  violet500: '#8b5cf6',
  violet200: '#ddd6fe',
  violet100: '#ede9fe',
  violet50: '#f5f3ff',
  amber500: '#f59e0b',
  amber400: '#fbbf24',
  amber100: '#fef3c7',
  green600: '#059669',
  red500: '#ef4444',
  orange500: '#f97316',
};

const s = {
  sectionWrap: {
    marginBottom: '0px',
  } as React.CSSProperties,

  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '14px',
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: '9px',
    letterSpacing: '0.22em',
    textTransform: 'uppercase' as const,
    color: C.stone400,
    fontWeight: 500,
    whiteSpace: 'nowrap' as const,
  } as React.CSSProperties,

  sectionLine: {
    flex: 1,
    height: '1px',
    backgroundColor: C.stone200,
  } as React.CSSProperties,

  meLabel: {
    fontSize: '9px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: C.violet500,
    fontWeight: 600,
    marginBottom: '8px',
  } as React.CSSProperties,
};

const SectionBlock: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={s.sectionWrap}>
    <div style={s.sectionHeader}>
      <span style={s.sectionTitle}>{title}</span>
      <div style={s.sectionLine} />
    </div>
    {children}
  </div>
);

const Pill: React.FC<{ children: React.ReactNode; accent?: boolean; size?: 'sm' | 'md' }> = ({
  children,
  accent,
  size = 'md',
}) => (
  <span
    style={{
      display: 'inline-block',
      padding: size === 'sm' ? '1px 6px' : '2px 8px',
      borderRadius: '999px',
      fontSize: size === 'sm' ? '9px' : '10px',
      lineHeight: 1.7,
      border: `1px solid ${accent ? C.violet200 : C.stone200}`,
      backgroundColor: accent ? C.violet50 : C.stone100,
      color: accent ? C.violet600 : C.stone500,
    }}
  >
    {children}
  </span>
);

const OptionMark: React.FC<{ value: string }> = ({ value }) => {
  const color = value === 'O' ? C.green600 : value === 'X' ? C.red500 : C.orange500;
  return (
    <span style={{ fontSize: '13px', fontWeight: 700, color }}>{value}</span>
  );
};

// ── Main ProfileCard ─────────────────────────────────────────────────────────
export const ProfileCard = React.forwardRef<HTMLDivElement, { data: ProfileData }>(
  ({ data }, ref) => {
    const meGenderDisplay =
      data.meGender === '직접기입' ? data.meGenderCustom : data.meGender;
    const youGenderDisplay =
      data.youGender === '직접기입' ? data.youGenderCustom : data.youGender;

    const meHasData =
      !!meGenderDisplay ||
      !!data.meAge ||
      data.meWeekday.length > 0 ||
      data.meWeekend.length > 0 ||
      !!data.meTimeMemo;

    const hasCharSection =
      data.charImages.length > 0 || !!data.charMemo || !!data.youCharMemo;

    const myAllKeywords = [...data.mySelected, ...data.myCustom];
    const youAllKeywords = [...data.youSelected, ...data.youCustom];
    const hasContentsSection =
      myAllKeywords.length > 0 ||
      !!data.myContentMemo ||
      (data.youContentsEnabled && youAllKeywords.length > 0) ||
      !!data.youContentMemo;

    const hasPlayStyles = data.playStyles.some((p) => p.text.trim());

    const hasServerSection =
      !!data.serverMove ||
      !!data.serverCross ||
      !!data.covenantPlan ||
      !!data.serverPlanDesc;

    return (
      <div
        ref={ref}
        style={{
          width: '390px',
          backgroundColor: C.bg,
          fontFamily:
            '"Noto Sans KR", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
          color: C.stone800,
          overflow: 'hidden',
        }}
      >
        {/* ── Header Image ── */}
        {data.headerImage && (
          <div
            style={{
              width: '100%',
              aspectRatio: '3 / 1',
              overflow: 'hidden',
              backgroundColor: C.stone200,
            }}
          >
            <img
              src={data.headerImage}
              alt="대표 이미지"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        {/* ── Body ── */}
        <div style={{ padding: '28px 24px 20px' }}>

          {/* Nickname & Server */}
          {(data.nickname || data.server) && (
            <div
              style={{
                textAlign: 'center',
                marginBottom: '26px',
                paddingBottom: '22px',
                borderBottom: `1px solid ${C.stone200}`,
              }}
            >
              {data.nickname && (
                <div
                  style={{
                    fontSize: '22px',
                    fontWeight: 600,
                    color: C.stone800,
                    letterSpacing: '0.04em',
                    marginBottom: '8px',
                  }}
                >
                  {data.nickname}
                </div>
              )}
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {data.server && (
                  <span
                    style={{
                      padding: '3px 12px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      backgroundColor: C.violet100,
                      color: C.violet700,
                      border: `1px solid ${C.violet200}`,
                      fontWeight: 500,
                    }}
                  >
                    {data.server}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* ── 기본 소개 (ME / YOU) ── */}
          <div style={{ marginBottom: '24px' }}>
            <SectionBlock title="기본 소개">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0',
                }}
              >
                {/* ME */}
                <div style={{ paddingRight: '16px' }}>
                  <div style={s.meLabel}>ME</div>
                  {meHasData ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {meGenderDisplay && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '9px', color: C.stone400, minWidth: '26px' }}>성별</span>
                          <Pill>{meGenderDisplay}</Pill>
                        </div>
                      )}
                      {data.meAge && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '9px', color: C.stone400, minWidth: '26px' }}>나이</span>
                          <Pill>{data.meAge}</Pill>
                        </div>
                      )}
                      {(data.meWeekday.length > 0 || data.meWeekend.length > 0) && (
                        <div>
                          <span style={{ fontSize: '9px', color: C.stone400, display: 'block', marginBottom: '4px' }}>접속</span>
                          {data.meWeekday.length > 0 && (
                            <div style={{ marginBottom: '3px' }}>
                              <span style={{ fontSize: '8px', color: C.violet500, marginRight: '4px' }}>평일</span>
                              <span style={{ fontSize: '9px', color: C.stone600 }}>{data.meWeekday.join(' · ')}</span>
                            </div>
                          )}
                          {data.meWeekend.length > 0 && (
                            <div>
                              <span style={{ fontSize: '8px', color: C.violet500, marginRight: '4px' }}>주말</span>
                              <span style={{ fontSize: '9px', color: C.stone600 }}>{data.meWeekend.join(' · ')}</span>
                            </div>
                          )}
                        </div>
                      )}
                      {data.meTimeMemo && (
                        <div
                          style={{
                            fontSize: '9px',
                            color: C.stone500,
                            lineHeight: 1.6,
                            fontStyle: 'italic',
                            marginTop: '2px',
                          }}
                        >
                          {data.meTimeMemo}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ fontSize: '9px', color: C.stone300 }}>—</div>
                  )}
                </div>

                {/* YOU */}
                <div
                  style={{
                    paddingLeft: '16px',
                    borderLeft: `1px solid ${C.stone200}`,
                  }}
                >
                  <div style={{ ...s.meLabel, textAlign: 'right' }}>YOU</div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      alignItems: 'flex-end',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                      <Pill>{youGenderDisplay || '무관'}</Pill>
                      <span style={{ fontSize: '9px', color: C.stone400, minWidth: '26px', textAlign: 'right' }}>성별</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                      <Pill>{data.youAge || '무관'}</Pill>
                      <span style={{ fontSize: '9px', color: C.stone400, minWidth: '26px', textAlign: 'right' }}>나이</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '9px', color: C.stone400, display: 'block', marginBottom: '4px' }}>접속</span>
                      <div style={{ marginBottom: '3px' }}>
                        <span style={{ fontSize: '8px', color: C.violet500, marginLeft: '4px' }}>평일</span>
                        <div style={{ fontSize: '9px', color: C.stone600 }}>
                          {data.youWeekdayAny
                            ? '무관'
                            : data.youWeekday.length > 0
                            ? data.youWeekday.join(' · ')
                            : '—'}
                        </div>
                      </div>
                      <div>
                        <span style={{ fontSize: '8px', color: C.violet500, marginLeft: '4px' }}>주말</span>
                        <div style={{ fontSize: '9px', color: C.stone600 }}>
                          {data.youWeekendAny
                            ? '무관'
                            : data.youWeekend.length > 0
                            ? data.youWeekend.join(' · ')
                            : '—'}
                        </div>
                      </div>
                    </div>
                    {data.youTimeMemo && (
                      <div
                        style={{
                          fontSize: '9px',
                          color: C.stone500,
                          lineHeight: 1.6,
                          fontStyle: 'italic',
                          textAlign: 'right',
                          marginTop: '2px',
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

          {/* ── 커마 ── */}
          {hasCharSection && (
            <div style={{ marginBottom: '24px' }}>
              <SectionBlock title="커마">
                {/* ME images */}
                {(data.charImages.length > 0 || data.charMemo) && (
                  <div style={{ marginBottom: data.youCharMemo ? '16px' : '0' }}>
                    <div style={s.meLabel}>ME</div>
                    {data.charImages.length > 0 && (
                      data.displayOption === 'image-only' ? (
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '6px',
                            marginBottom: data.charMemo ? '10px' : '0',
                          }}
                        >
                          {data.charImages.map((photo) => (
                            <div
                              key={photo.id}
                              style={{
                                aspectRatio: '1',
                                overflow: 'hidden',
                                borderRadius: '10px',
                                backgroundColor: C.stone200,
                              }}
                            >
                              <img
                                src={photo.imageUrl}
                                alt="커마"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            marginBottom: data.charMemo ? '10px' : '0',
                          }}
                        >
                          {data.charImages.map((photo) => (
                            <div
                              key={photo.id}
                              style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
                            >
                              <div
                                style={{
                                  flexShrink: 0,
                                  width: '72px',
                                  height: '72px',
                                  borderRadius: '10px',
                                  overflow: 'hidden',
                                  backgroundColor: C.stone200,
                                }}
                              >
                                <img
                                  src={photo.imageUrl}
                                  alt="커마"
                                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                />
                              </div>
                              {photo.description && (
                                <div
                                  style={{
                                    flex: 1,
                                    fontSize: '10px',
                                    color: C.stone600,
                                    lineHeight: 1.7,
                                    paddingTop: '4px',
                                  }}
                                >
                                  {photo.description}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )
                    )}
                    {data.charMemo && (
                      <div
                        style={{
                          fontSize: '10px',
                          color: C.stone600,
                          lineHeight: 1.7,
                          padding: '8px 12px',
                          backgroundColor: C.stone100,
                          borderRadius: '8px',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {data.charMemo}
                      </div>
                    )}
                  </div>
                )}
                {/* YOU */}
                {data.youCharMemo && (
                  <div>
                    <div style={{ ...s.meLabel, textAlign: 'right' }}>YOU</div>
                    <div
                      style={{
                        fontSize: '10px',
                        color: C.stone600,
                        lineHeight: 1.7,
                        padding: '8px 12px',
                        backgroundColor: C.stone100,
                        borderRadius: '8px',
                        textAlign: 'right',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {data.youCharMemo}
                    </div>
                  </div>
                )}
              </SectionBlock>
            </div>
          )}

          {/* ── 주 컨텐츠 ── */}
          {hasContentsSection && (
            <div style={{ marginBottom: '24px' }}>
              <SectionBlock title="주 컨텐츠">
                {(myAllKeywords.length > 0 || data.myContentMemo) && (
                  <div style={{ marginBottom: (data.youContentsEnabled && youAllKeywords.length > 0) || data.youContentMemo ? '14px' : '0' }}>
                    <div style={s.meLabel}>ME</div>
                    {myAllKeywords.length > 0 && (
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '4px',
                          marginBottom: data.myContentMemo ? '8px' : '0',
                        }}
                      >
                        {myAllKeywords.map((kw) => (
                          <Pill key={kw} accent>{kw}</Pill>
                        ))}
                      </div>
                    )}
                    {data.myContentMemo && (
                      <div
                        style={{
                          fontSize: '10px',
                          color: C.stone500,
                          lineHeight: 1.7,
                          fontStyle: 'italic',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {data.myContentMemo}
                      </div>
                    )}
                  </div>
                )}
                {((data.youContentsEnabled && youAllKeywords.length > 0) || data.youContentMemo) && (
                  <div>
                    <div style={{ ...s.meLabel, textAlign: 'right' }}>YOU</div>
                    {data.youContentsEnabled && youAllKeywords.length > 0 && (
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '4px',
                          justifyContent: 'flex-end',
                          marginBottom: data.youContentMemo ? '8px' : '0',
                        }}
                      >
                        {youAllKeywords.map((kw) => (
                          <Pill key={kw} accent>{kw}</Pill>
                        ))}
                      </div>
                    )}
                    {data.youContentMemo && (
                      <div
                        style={{
                          fontSize: '10px',
                          color: C.stone500,
                          lineHeight: 1.7,
                          fontStyle: 'italic',
                          textAlign: 'right',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {data.youContentMemo}
                      </div>
                    )}
                  </div>
                )}
              </SectionBlock>
            </div>
          )}

          {/* ── 플레이·교류 스타일 ── */}
          {hasPlayStyles && (
            <div style={{ marginBottom: '24px' }}>
              <SectionBlock title="플레이 · 교류 스타일">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {data.playStyles
                    .filter((p) => p.text.trim())
                    .map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          padding: item.emphasized ? '5px 10px' : '3px 0',
                          backgroundColor: item.emphasized ? C.amber100 : 'transparent',
                          borderRadius: item.emphasized ? '8px' : '0',
                          border: item.emphasized ? `1px solid #fde68a` : 'none',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '11px',
                            color: item.emphasized ? C.amber500 : C.stone300,
                            flexShrink: 0,
                            marginTop: '1px',
                            lineHeight: 1.6,
                          }}
                        >
                          {item.emphasized ? '★' : '·'}
                        </span>
                        <span
                          style={{
                            fontSize: '11px',
                            color: item.emphasized ? C.stone800 : C.stone600,
                            lineHeight: 1.7,
                            fontWeight: item.emphasized ? 500 : 400,
                          }}
                        >
                          {item.text}
                        </span>
                      </div>
                    ))}
                </div>
              </SectionBlock>
            </div>
          )}

          {/* ── 서버·언약 플랜 ── */}
          {hasServerSection && (
            <div style={{ marginBottom: '24px' }}>
              <SectionBlock title="서버 · 언약 플랜">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(data.serverMove || data.serverCross) && (
                    <div style={{ display: 'flex', gap: '20px' }}>
                      {data.serverMove && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '9px', color: C.stone400 }}>서버 이동</span>
                          <OptionMark value={data.serverMove} />
                        </div>
                      )}
                      {data.serverCross && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '9px', color: C.stone400 }}>서버 초월</span>
                          <OptionMark value={data.serverCross} />
                        </div>
                      )}
                    </div>
                  )}
                  {data.covenantPlan && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '9px', color: C.stone400 }}>언약 플랜</span>
                      <Pill accent>{data.covenantPlan}</Pill>
                    </div>
                  )}
                  {data.serverPlanDesc && (
                    <div
                      style={{
                        fontSize: '10px',
                        color: C.stone600,
                        lineHeight: 1.7,
                        padding: '8px 12px',
                        backgroundColor: C.stone100,
                        borderRadius: '8px',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {data.serverPlanDesc}
                    </div>
                  )}
                </div>
              </SectionBlock>
            </div>
          )}

          {/* ── 그 외 ── */}
          {data.freeText && (
            <div style={{ marginBottom: '24px' }}>
              <SectionBlock title="그 외">
                <div
                  style={{
                    fontSize: '10px',
                    color: C.stone600,
                    lineHeight: 1.9,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {data.freeText}
                </div>
              </SectionBlock>
            </div>
          )}

          {/* Footer */}
          <div
            style={{
              borderTop: `1px solid ${C.stone200}`,
              paddingTop: '14px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '8px',
                color: C.stone300,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Final Fantasy XIV · 언약 프로필
            </p>
          </div>
        </div>
      </div>
    );
  }
);

ProfileCard.displayName = 'ProfileCard';
