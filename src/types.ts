// 数据模型：所有指标都带来源(source)与可信度(confidence)，以满足"有理有据"要求。

/** 数据可信度等级 */
export type Confidence =
  | 'official'   // 官方文件/政府网站，确定性高
  | 'authoritative' // 权威媒体/研究院转引官方数据
  | 'estimate'   // 行业声誉/公开普遍认知的估计值，需进一步核实
  | 'todo';      // 占位，待接入官方数据源

/** 单条数据来源 */
export interface Source {
  title: string;
  publisher: string;
  url: string;
  date: string; // ISO 或 YYYY-MM
}

/** 带证据的指标值 */
export interface Metric<T = number> {
  value: T;
  confidence: Confidence;
  note?: string;
  sources?: Source[];
}

/** 五年一户实施范围 */
export type FiveYearScope = 'full' | 'partial' | 'none';

/** 对口方式（决定"买了能否进目标校"的确定性） */
export type Allocation = 'single' | 'mixed' | 'lottery';
// single=单校对口(确定性高) mixed=对口+派位混合 lottery=多校划片/电脑派位(确定性低)

/** 供需趋势 */
export type SupplyTrend = 'easing' | 'stable' | 'tight';

export interface District {
  id: string;
  name: string;
  /** 教育声誉定位，一句话 */
  positioning: string;

  // —— 第1层：政策与确定性 ——
  fiveYearOnePolicy: Metric<FiveYearScope>;
  /** 2029入学(本家庭)时，热门校预计要求的落户年限(年) */
  residencyYears: Metric<number>;
  allocation: Metric<Allocation>;

  // —— 第2层：教育质量 ——
  /** 小学/基础教育声誉评分 0-100（声誉估计，非升学率精确值） */
  eduQuality: Metric<number>;
  /** 名额分配到校带来的"曲线上车"利好程度 0-100 */
  quotaBenefit: Metric<number>;

  // —— 第3层：供需基本面 ——
  supplyTrend: Metric<SupplyTrend>;
  /** 学位预警学校数量趋势(近年→今年) */
  warningTrend: Metric<string>;

  // —— 第4层：成本 ——
  /** 学区房参考单价(万元/㎡)，公开认知区间，需核实 */
  pricePerSqm: Metric<[number, number]>;

  // —— 中考升学（真实数据锚点，决定该区初中"出口"强度）——
  /** 中考市重点率 %（该区考生进入市实验性示范性高中比例） */
  cityKeyRate?: Metric<number>;
  /** 四校（上中/华二/复附/交附）录取率 % */
  topFourRate?: Metric<number>;

  /** 供给侧：生源变化下学校缩班/布局调整的提示（2026新增关注点） */
  supplyNote?: Metric<string>;

  /** 代表性公办小学(仅作方向参考，需以当年官方划片为准) */
  notableSchools: string[];
}

/** 学校声誉层级 */
export type SchoolTier = 'top' | 'strong' | 'good';

/** 单所小学（板块下钻） */
export interface School {
  id: string;
  districtId: string;
  name: string;
  block: string; // 所在板块
  tier: SchoolTier;
  kind: 'public' | 'private'; // 公办 / 民办
  allocation: Allocation; // 对口方式（民办为 lottery=摇号）
  warning: boolean; // 近年是否发布生源预警
  note?: string;
  confidence: Confidence;
}

/** 房型/物业类型 */
export type HousingType = 'oldPublic' | 'commodity' | 'newish';
// oldPublic=老公房(总价低/多无电梯) commodity=商品房 newish=次新(2010后/电梯)

/** 对口小区（学区房筛选单元） */
export interface Community {
  id: string;
  districtId: string;
  name: string; // 小区名
  block: string; // 板块
  school: string; // 主要对口小学
  schoolTier: SchoolTier; // 对口校梯队
  housingType: HousingType;
  /** 性价比 / 价格 / 优劣的一句话说明 */
  note: string;
  confidence: Confidence;
}
