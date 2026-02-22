import type { CouplingType } from "./types";

export function toggleArr(arr: string[], item: string): string[] {
  return arr.includes(item)
    ? arr.filter((x) => x !== item)
    : [...arr, item];
}

// tiers는 항상 3개의 슬롯 [tier0, tier1, tier2]을 유지함
export function toggleTypeTier(
  type: CouplingType,
  tierIndex: number,
  tiers: CouplingType[][],
): CouplingType[][] {
  const result = tiers.map((tier) => [...tier]);
  const currentTier = result.findIndex((tier) => tier.includes(type));

  if (currentTier === tierIndex) {
    // 같은 행 재클릭 → 선택 해제
    result[tierIndex] = result[tierIndex].filter((t) => t !== type);
  } else {
    // 다른 행으로 이동: 기존 행에서 제거 후 새 행에 추가
    if (currentTier !== -1) {
      result[currentTier] = result[currentTier].filter((t) => t !== type);
    }
    result[tierIndex] = [...result[tierIndex], type];
  }

  // 빈 티어 발견 시 하위 티어 전체 클리어
  for (let i = 0; i < result.length - 1; i++) {
    if (result[i].length === 0) {
      for (let j = i + 1; j < result.length; j++) {
        result[j] = [];
      }
      break;
    }
  }

  return result;
}


export function formatCouplingPriority(tiers: CouplingType[][]): string {
  const nonEmpty = tiers.filter((tier) => tier.length > 0);
  if (nonEmpty.length === 0) return "";
  return nonEmpty.map((tier) => tier.join(" = ")).join(" > ");
}
