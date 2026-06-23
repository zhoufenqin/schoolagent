import type { District } from './types';
import { familyProfile } from './data/policies';

/** 四个维度的权重（买房家长可在UI中调整） */
export interface Weights {
  certainty: number; // 政策确定性
  supply: number; // 供需安全度
  quality: number; // 教育质量
  value: number; // 性价比
}

/** 面向"幼升小买房家长"的默认权重：教育质量优先，其次政策确定性 */
export const defaultWeights: Weights = {
  certainty: 0.25,
  supply: 0.2,
  quality: 0.4,
  value: 0.15,
};

export interface DimensionScores {
  certainty: number;
  supply: number;
  quality: number;
  value: number;
}

export interface DistrictScore {
  id: string;
  name: string;
  total: number;
  dims: DimensionScores;
  /** 为满足2029入学，最晚落户年份 */
  latestMoveInYear: number;
  /** 风险提示 */
  flags: string[];
}

function allocationScore(a: District['allocation']['value']): number {
  switch (a) {
    case 'single':
      return 100; // 单校对口，买了基本能进
    case 'mixed':
      return 65; // 对口+派位，存在不确定
    case 'lottery':
      return 35; // 多校划片/派位，确定性低
  }
}

function supplyScore(s: District['supplyTrend']['value']): number {
  switch (s) {
    case 'easing':
      return 90; // 降温，被统筹风险低
    case 'stable':
      return 70;
    case 'tight':
      return 45; // 紧张，可能落户不够被统筹
  }
}

function priceMid(d: District): number {
  const [lo, hi] = d.pricePerSqm.value;
  return (lo + hi) / 2;
}

function valueScore(d: District): number {
  // 单价越低性价比越高（万元/㎡）
  return clamp(Math.round(110 - priceMid(d) * 6), 10, 100);
}

function qualityScore(d: District): number {
  // 教育质量 = 小学声誉 70% + 名额分配中考红利 30%
  return Math.round(d.eduQuality.value * 0.7 + d.quotaBenefit.value * 0.3);
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

export function scoreDistrict(d: District, w: Weights): DistrictScore {
  const dims: DimensionScores = {
    certainty: allocationScore(d.allocation.value),
    supply: supplyScore(d.supplyTrend.value),
    quality: qualityScore(d),
    value: valueScore(d),
  };

  const wsum = w.certainty + w.supply + w.quality + w.value || 1;
  const total = Math.round(
    (dims.certainty * w.certainty +
      dims.supply * w.supply +
      dims.quality * w.quality +
      dims.value * w.value) /
      wsum,
  );

  const latestMoveInYear = familyProfile.primaryEnrollYear - d.residencyYears.value;

  const flags: string[] = [];
  if (d.fiveYearOnePolicy.value === 'full') {
    flags.push('全区五年一户：买房前必须核查目标房产学位是否被占用');
  }
  if (d.supplyTrend.value === 'tight') {
    flags.push('学位偏紧：落户年限不足可能被统筹');
  }
  if (d.allocation.value !== 'single') {
    flags.push('非单校对口：买了不一定进目标校，需看划片/派位规则');
  }
  if (d.residencyYears.value >= 3) {
    flags.push(`热门校落户年限要求高(约${d.residencyYears.value}年)：最晚 ${latestMoveInYear} 年前落户`);
  }
  if (d.supplyTrend.value === 'easing') {
    flags.push('生源降温≠对口变松：留意目标校是否同步缩班（供给侧也在收缩）');
  }

  return { id: d.id, name: d.name, total, dims, latestMoveInYear, flags };
}

export function scoreAll(districts: District[], w: Weights): DistrictScore[] {
  return districts
    .map((d) => scoreDistrict(d, w))
    .sort((a, b) => b.total - a.total);
}
