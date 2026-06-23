import type { District, SchoolTier } from './types';
import { familyProfile } from './data/policies';

export interface SelfCheckInput {
  district: District;
  tier: SchoolTier; // 目标校层级
  moveInYear: number; // 计划/已落户年份
  huKouMatch: boolean; // 人户是否一致
  seatOccupied: 'no' | 'yes' | 'unknown'; // 目标房产学位近5年是否被占用
}

export type Verdict = 'safe' | 'caution' | 'risk';

export interface CheckIssue {
  level: Verdict;
  text: string;
}

export interface CheckLink {
  text: string;
  url: string;
}

export interface SelfCheckResult {
  verdict: Verdict;
  requiredYears: number;
  availableYears: number;
  latestMoveInYear: number;
  issues: CheckIssue[];
  checklist: CheckLink[];
}

const TIER_ADJ: Record<SchoolTier, number> = { top: 1, strong: 0, good: -1 };

export function runSelfCheck(input: SelfCheckInput): SelfCheckResult {
  const { district, tier, moveInYear, huKouMatch, seatOccupied } = input;

  const baseYears = district.residencyYears.value;
  const requiredYears = Math.max(0, baseYears + TIER_ADJ[tier]);
  const enroll = familyProfile.primaryEnrollYear; // 2029
  const availableYears = enroll - moveInYear;
  const latestMoveInYear = enroll - requiredYears;

  const issues: CheckIssue[] = [];

  // 1) 五年一户 + 学位占用
  if (district.fiveYearOnePolicy.value !== 'none') {
    if (seatOccupied === 'yes') {
      issues.push({
        level: 'risk',
        text: `${district.name}实施五年一户，目标房产学位近5年已被占用 → 无法对口，会被统筹。买前必须确认已释放。`,
      });
    } else if (seatOccupied === 'unknown') {
      issues.push({
        level: 'caution',
        text: '学位占用情况未知 → 五年一户区必须先查询该门牌号学位是否被占用。',
      });
    }
  }

  // 2) 落户年限
  if (availableYears < 0) {
    issues.push({
      level: 'risk',
      text: `计划落户年(${moveInYear})已晚于入学年(${enroll})，无法满足对口。`,
    });
  } else if (availableYears < requiredYears) {
    issues.push({
      level: 'risk',
      text: `到 ${enroll} 年仅落户 ${availableYears} 年，低于该层级学校预计要求(约${requiredYears}年) → 排序靠后或被统筹。最晚应 ${latestMoveInYear} 年前落户。`,
    });
  } else {
    issues.push({
      level: 'safe',
      text: `到 ${enroll} 年可落户 ${availableYears} 年，满足预计要求(约${requiredYears}年)。`,
    });
  }

  // 3) 人户一致
  if (!huKouMatch) {
    issues.push({
      level: 'caution',
      text: '人户分离：录取顺位靠后，热门校超额时容易被统筹。建议尽量做到人户一致。',
    });
  }

  // 4) 供需紧张 + 顶级校
  if (district.supplyTrend.value === 'tight' && tier === 'top') {
    issues.push({
      level: 'caution',
      text: '该区学位偏紧且目标为顶级校，竞争激烈，建议预留更长落户年限缓冲。',
    });
  }

  const verdict: Verdict = issues.some((i) => i.level === 'risk')
    ? 'risk'
    : issues.some((i) => i.level === 'caution')
      ? 'caution'
      : 'safe';

  const checklist: CheckLink[] = [
    {
      text: '① 查目标房产「学位是否被占用」(五年一户) → 区教育局 / 一网通办',
      url: 'https://zwdt.sh.gov.cn/',
    },
    {
      text: `② 查 ${district.name} 当年「入户年限/排序细则」→ 区教育局招生细则`,
      url: 'https://edu.sh.gov.cn/zcjd_2025ywjyzsrx/',
    },
    {
      text: '③ 确认「人户一致」状态 → 户籍地址与产权地址一致',
      url: 'https://edu.sh.gov.cn/',
    },
    {
      text: '④ 核对真实成交价与挂牌 → 贝壳找房(上海)',
      url: 'https://sh.ke.com/',
    },
    {
      text: '⑤ 查目标初中「名额分配到校」席位 → 上海市教育考试院',
      url: 'https://www.shmeea.edu.cn/',
    },
  ];

  return { verdict, requiredYears, availableYears, latestMoveInYear, issues, checklist };
}
