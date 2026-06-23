import type { Source } from '../types';

// 2026 市级权威文件（招生季已结束，2026-03 发布、4 月各区细则、5 月报名录取）
const impl2026: Source = {
  title: '上海市教育委员会关于2026年本市义务教育阶段学校招生入学工作的实施意见（沪教委基〔2026〕9号）',
  publisher: '上海市教育委员会',
  url: 'https://edu.sh.gov.cn/xxgk2_zdgz_rxgkyzs_02/20260326/ac9f198654cf469da99e1830acf3ce69.html',
  date: '2026-03-26',
};

/** 全市层面、跨区通用的政策事实（这些决定了学区房的底层逻辑） */
export interface CityPolicy {
  id: string;
  title: string;
  summary: string;
  impact: string; // 对"幼升小买房家长"的含义
  sources: Source[];
}

export const cityPolicies: CityPolicy[] = [
  {
    id: 'supply-mechanism',
    title: '同人口变化相适应的供给机制（2026 新增导向）⭐',
    summary:
      '2026 年市级实施意见首次明确"建立同人口变化相适应的基本公共教育服务供给机制"，各区按常住人口分布动态调整学校布局与招生计划；并明确小学班额≤45 人、初中班额≤50 人。',
    impact:
      '生源减少 ≠ 竞争必然缓解：当适龄人口下降，区里可能同步"缩班 / 调整布局"，紧俏对口校的学位未必松动。判断一所学校时，要同时看"生源降幅"和"该校班级数是否同步缩减"——后者数据在各区招生细则公布的"办学规模"里。',
    sources: [impl2026],
  },
  {
    id: 'public-private-same',
    title: '公民同招 + 民办摇号',
    summary:
      '公办、民办小学同步招生；民办报名超额一律电脑随机录取，民办不再掐尖（2026 实施意见延续）。',
    impact:
      '优质生源回流对口公办，热门公办学区的"对口确定性"价值上升；"花钱买民办好生源"的老逻辑被削弱。',
    sources: [impl2026],
  },
  {
    id: 'quota-to-school',
    title: '名额分配到校（中考改革）',
    summary:
      '市实验性示范性高中将大比例招生名额按人头分配到每所初中（含普通初中）。委属市重点名额分配比例约65%。',
    impact:
      '"在普通初中当鸡头"也能凭校内排名上市重点，顶级学区的稀缺性被系统性稀释——这是判断学区房长期溢价是否可持续的关键变量。',
    sources: [
      {
        title: '2024年本市高中阶段学校招生工作的若干意见 / 名额分配到区到校计划',
        publisher: '上海市教育考试院',
        url: 'https://www.shmeea.edu.cn',
        date: '2024-05',
      },
    ],
  },
  {
    id: 'five-year-one',
    title: '五年一户（学位占用）',
    summary:
      '同一房屋地址5年内只享有一次同校对口入学机会（多胞胎、二/三孩除外）。2025年徐汇、黄浦、长宁、杨浦、宝山全区实施；闵行、浦东、静安、嘉定、松江等部分学校实施。',
    impact:
      '买房前必须查询目标房产的学位是否已被占用，否则即便买了也会被统筹到其他学校。',
    sources: [
      {
        title: '2025这些区实行"五年一户"限定',
        publisher: '上海热线教育频道（转引各区教委招生细则）',
        url: 'https://edu.online.sh.cn/education/gb/content/2025-04/14/content_10302633.htm',
        date: '2025-04-14',
      },
    ],
  },
  {
    id: 'residency-years',
    title: '入户年限逐年收紧',
    summary:
      '学位紧张学校对"落户年限"提出要求并逐年提高（典型路径：2025年需满2年、2026年需满3年，热门校更长），不满年限者排序靠后或被统筹。',
    impact:
      '本家庭2029年幼升小，落户/购房的时机本身就是决策变量——晚买可能年限不够。这是本工具为你测算"最晚落户时点"的依据。',
    sources: [
      {
        title: '上海这些学校发布超额预警，入户不满3年直接统筹',
        publisher: '知乎专栏（转引各区教委预警公告）',
        url: 'https://zhuanlan.zhihu.com/p/1896635680479766358',
        date: '2025',
      },
    ],
  },
  {
    id: 'demographics',
    title: '适龄人口见顶回落',
    summary:
      '出生人口下行，小学入学需求逐年回落。徐汇区发布生源预警的公办小学由2023年约三成降至2025年约13%（11所→5所）。',
    impact:
      '中长期看多数学区"学位紧张"在缓解，但顶级学区仍可能维持热度。关键：需求降的同时供给端也在缩班（见"供给机制"条），不能只看需求降就认为对口变松。',
    sources: [
      {
        title: '2025幼升小徐汇学位预警大降温！11→5所',
        publisher: '今日头条（转引徐汇区教育数据）',
        url: 'https://www.toutiao.com/article/7501906312314307091/',
        date: '2025-05-08',
      },
      {
        title: '2024年上海房地产市场综述',
        publisher: '上海市统计局',
        url: 'https://tjj.sh.gov.cn/tjfx/20250224/bd3a7d138b11452a847b4e306490fb47.html',
        date: '2025-02-24',
      },
    ],
  },
];

/** 本家庭关键参数（孩子2023年生，2026上幼儿园，2029幼升小） */
export const familyProfile = {
  childBirthYear: 2023,
  kindergartenStart: 2026,
  primaryEnrollYear: 2029, // 6岁入学
  // 印证：2026 小学入学对象为 2019-09-01~2020-08-31 出生满6周岁；2023 年生对应 2029 入学。
  birthWindowNote: '据2026实施意见，满6周岁入学；2023年出生 → 2029年幼升小。',
};
