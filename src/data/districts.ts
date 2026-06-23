import type { District, Source } from '../types';

// 通用官方入口（各区每年4月发布招生细则，落地数据须以当年区教委公告为准）
const eduCommittee: Source = {
  title: '2025年本市义务教育阶段学校招生入学政策解读',
  publisher: '上海市教育委员会',
  url: 'https://edu.sh.gov.cn/zcjd_2025ywjyzsrx/',
  date: '2025-04',
};

const fiveYearSrc: Source = {
  title: '2025这些区实行"五年一户"限定（转引各区招生细则）',
  publisher: '上海热线教育频道',
  url: 'https://edu.online.sh.cn/education/gb/content/2025-04/14/content_10302633.htm',
  date: '2025-04-14',
};

// 2026 市级实施意见：提出"同人口变化相适应的供给机制"，办学规模/班级数在各区细则公布
const impl2026: Source = {
  title: '上海市教育委员会关于2026年本市义务教育招生入学工作的实施意见（沪教委基〔2026〕9号）',
  publisher: '上海市教育委员会',
  url: 'https://edu.sh.gov.cn/xxgk2_zdgz_rxgkyzs_02/20260326/ac9f198654cf469da99e1830acf3ce69.html',
  date: '2026-03-26',
};

export const districts: District[] = [
  {
    id: 'xuhui',
    name: '徐汇区',
    positioning: '传统教育强区，公办民办双强，幼小资源密集；学位整体降温中。',
    fiveYearOnePolicy: {
      value: 'full',
      confidence: 'official',
      note: '2025年全区实施五年一户。',
      sources: [fiveYearSrc],
    },
    residencyYears: {
      value: 3,
      confidence: 'estimate',
      note: '热门校(如汇师、世外对口板块)预计需落户≥3年；2029以当年细则为准。',
      sources: [eduCommittee],
    },
    allocation: {
      value: 'mixed',
      confidence: 'official',
      note: '对口入学 + 划块电脑派位相结合。',
      sources: [
        {
          title: '徐汇区关于2025年义务教育阶段学校招生入学工作的实施方案',
          publisher: '上海市人民政府（徐汇区教育局）',
          url: 'https://www.shanghai.gov.cn/xhqywjy/20250411/2b71e54ac4a94e8bb43eac1db0e33ddd.html',
          date: '2025-04-07',
        },
      ],
    },
    eduQuality: {
      value: 92,
      confidence: 'estimate',
      note: '基于公办小学声誉的估计值，非升学率精确数据，建议用中考成绩进一步核实。',
    },
    quotaBenefit: {
      value: 80,
      confidence: 'estimate',
      note: '区内市重点资源密集，名额分配到区额度充裕，但校内竞争也强。',
    },
    supplyTrend: {
      value: 'easing',
      confidence: 'authoritative',
      note: '发布生源预警的公办小学由2023年约三成降至2025年约13%。',
      sources: [
        {
          title: '2025幼升小徐汇学位预警大降温！11→5所',
          publisher: '今日头条（转引徐汇区教育数据）',
          url: 'https://www.toutiao.com/article/7501906312314307091/',
          date: '2025-05-08',
        },
      ],
    },
    warningTrend: {
      value: '预警校 约11所(2023) → 约5所(2025) ↓',
      confidence: 'authoritative',
    },
    pricePerSqm: {
      value: [9, 15],
      confidence: 'estimate',
      note: '公开认知区间(万元/㎡)，须以贝壳/链家当期真实成交核实。',
    },
    topFourRate: {
      value: 2.45,
      confidence: 'authoritative',
      note: '2025年四校录取率全市第一；四校到校名额覆盖约80%初中。',
      sources: [
        {
          title: '2025年上海16区市重率、区重率、普高率汇总',
          publisher: '竞赛联（转引2025中考统计）',
          url: 'https://www.jingsailian.com/news/1610625.html',
          date: '2025-10-15',
        },
      ],
    },
    notableSchools: ['高安路第一小学', '汇师小学', '爱菊小学', '建襄小学', '上海世界外国语小学(民办)'],
    supplyNote: {
      value: '需求端降温(预警11→5所)，但作为强区，头部对口校生源仍足；缩班主要发生在外围弱校，顶级校学位未必松动。',
      confidence: 'estimate',
      note: '各校班级数/办学规模以当年区招生细则公布为准。',
      sources: [impl2026],
    },
  },
  {
    id: 'huangpu',
    name: '黄浦区',
    positioning: '老牌中心城区，名校集中、体量小、单价高，对口确定性受多校划片影响。',
    fiveYearOnePolicy: {
      value: 'full',
      confidence: 'official',
      note: '2025年全区实施五年一户。',
      sources: [fiveYearSrc],
    },
    residencyYears: {
      value: 3,
      confidence: 'estimate',
      note: '热门校(蓬莱路二小、卢湾一中心等)历来紧张，预计需较长落户年限。',
      sources: [eduCommittee],
    },
    allocation: {
      value: 'mixed',
      confidence: 'estimate',
      note: '部分热门校采用电脑派位/多校划片，须查当年细则。',
      sources: [eduCommittee],
    },
    eduQuality: { value: 90, confidence: 'estimate', note: '声誉估计值，非精确升学数据。' },
    quotaBenefit: { value: 78, confidence: 'estimate', note: '区内市重点密度高。' },
    supplyTrend: {
      value: 'stable',
      confidence: 'estimate',
      note: '体量小，顶级地块仍热，整体随全市趋势缓解。',
      sources: [eduCommittee],
    },
    warningTrend: { value: '少数顶级对口校持续预警', confidence: 'estimate' },
    pricePerSqm: {
      value: [10, 16],
      confidence: 'authoritative',
      note: '顶级对口(蓬二/卢二/上外黄浦)2025年4月二手均价约14.4万/㎡。',
      sources: [
        {
          title: '上海16区学区房的价格（数据截至2025年4月）',
          publisher: '搜狐（转引贝壳成交）',
          url: 'https://www.sohu.com/a/879631298_121124009',
          date: '2025-04-04',
        },
      ],
    },
    cityKeyRate: {
      value: 52.24,
      confidence: 'authoritative',
      note: '2025年中考市重点率全市领先（全市平均约22%）；坚持四校名额全覆盖。',
      sources: [
        {
          title: '2025上海中考：黄浦市重率超50%',
          publisher: '知乎专栏（转引2025中考数据）',
          url: 'https://zhuanlan.zhihu.com/p/1934308589805240329',
          date: '2025-08',
        },
      ],
    },
    notableSchools: ['卢湾一中心小学', '蓬莱路第二小学', '黄浦区第一中心小学', '上外-黄浦外国语小学'],
    supplyNote: {
      value: '体量小、老城区，部分生源不足学校面临撤并/缩班；但卢二、蓬二等顶级对口仍满额，竞争不减。',
      confidence: 'estimate',
      note: '以当年区招生细则办学规模为准。',
      sources: [impl2026],
    },
  },
  {
    id: 'minhang',
    name: '闵行区',
    positioning: '人口导入大区，体量大、性价比高；莘庄/春申/华漕等板块资源较好但学位偏紧。',
    fiveYearOnePolicy: {
      value: 'partial',
      confidence: 'official',
      note: '2025年对区内部分学校实施五年一户。',
      sources: [fiveYearSrc],
    },
    residencyYears: {
      value: 2,
      confidence: 'estimate',
      note: '热门板块(莘庄、春申)预警校可能要求更高年限。',
      sources: [eduCommittee],
    },
    allocation: {
      value: 'mixed',
      confidence: 'estimate',
      note: '对口为主，热门校超额时统筹/派位。',
      sources: [eduCommittee],
    },
    eduQuality: {
      value: 78,
      confidence: 'estimate',
      note: '板块分化大：莘庄/春申较强，外围较弱。',
    },
    quotaBenefit: {
      value: 76,
      confidence: 'estimate',
      note: '初中体量大、名额分配绝对数多，但优质高中相对少。',
    },
    supplyTrend: {
      value: 'tight',
      confidence: 'estimate',
      note: '人口导入板块学位紧张，与全市缓解趋势相反。',
      sources: [eduCommittee],
    },
    warningTrend: { value: '莘庄/春申/华漕等板块持续预警', confidence: 'estimate' },
    pricePerSqm: {
      value: [4.5, 8],
      confidence: 'estimate',
      note: '公开认知区间(万元/㎡)，板块差异大，须核实。',
    },
    notableSchools: ['闵行区实验小学', '明强小学', '莘城学校', '华师大附属紫竹小学'],
    supplyNote: {
      value: '人口导入区：春申/莘庄/紫竹等板块仍在扩班，外围老镇可能缩班。供给与需求同时在变，必须按板块看。',
      confidence: 'estimate',
      note: '以当年区招生细则办学规模为准。',
      sources: [impl2026],
    },
  },
  {
    id: 'qingpu',
    name: '青浦区',
    positioning: '远郊价格洼地，民办名校(青浦世外/平和)落地；公办基础较弱但名额分配到校对本区初中相对友好。',
    fiveYearOnePolicy: {
      value: 'none',
      confidence: 'estimate',
      note: '未列入2025全区/明确部分实施名单，以当年区教委细则为准。',
      sources: [fiveYearSrc],
    },
    residencyYears: {
      value: 1,
      confidence: 'estimate',
      note: '整体宽松，对口压力小。',
      sources: [eduCommittee],
    },
    allocation: {
      value: 'single',
      confidence: 'estimate',
      note: '多为单校对口，确定性较高。',
      sources: [eduCommittee],
    },
    eduQuality: {
      value: 62,
      confidence: 'estimate',
      note: '公办基础相对偏弱，但民办与新校在提升。',
    },
    quotaBenefit: {
      value: 88,
      confidence: 'estimate',
      note: '名额分配到校下，远郊普通初中竞争小，校内排名上市重点相对容易——这是青浦的隐藏优势。',
    },
    supplyTrend: {
      value: 'easing',
      confidence: 'estimate',
      note: '整体宽松，少数民办配套地块为热点。',
      sources: [eduCommittee],
    },
    warningTrend: { value: '整体宽松，个别新城/民办配套热点', confidence: 'estimate' },
    pricePerSqm: {
      value: [2.5, 5],
      confidence: 'estimate',
      note: '公开认知区间(万元/㎡)，须核实。',
    },
    notableSchools: ['青浦区实验小学', '青浦世界外国语学校(民办)', '协和双语(青浦)', '平和(青浦)'],
    supplyNote: {
      value: '远郊+新城导入并存：徐泾/新城配套校在增班，老镇区学校可能缩并。整体学位宽松。',
      confidence: 'estimate',
      note: '以当年区招生细则办学规模为准。',
      sources: [impl2026],
    },
  },
  {
    id: 'yangpu',
    name: '杨浦区',
    positioning: '高校云集，公办基础扎实(打一、二师附小、控二)，五年一户全区。',
    fiveYearOnePolicy: {
      value: 'full',
      confidence: 'official',
      note: '2025年全区实施五年一户。',
      sources: [fiveYearSrc],
    },
    residencyYears: {
      value: 3,
      confidence: 'estimate',
      note: '打一、二师附小等顶级对口校历来紧张。',
      sources: [eduCommittee],
    },
    allocation: {
      value: 'mixed',
      confidence: 'estimate',
      note: '对口为主，热门校电脑派位。',
      sources: [eduCommittee],
    },
    eduQuality: { value: 86, confidence: 'estimate', note: '声誉估计值。' },
    quotaBenefit: { value: 80, confidence: 'estimate', note: '区内市重点资源较好。' },
    supplyTrend: {
      value: 'stable',
      confidence: 'estimate',
      note: '随全市趋势缓解，顶级对口校仍热。',
      sources: [eduCommittee],
    },
    warningTrend: { value: '打一/二师附小等持续预警', confidence: 'estimate' },
    pricePerSqm: {
      value: [6.5, 11],
      confidence: 'estimate',
      note: '公开认知区间(万元/㎡)，须核实。',
    },
    topFourRate: {
      value: 2.16,
      confidence: 'authoritative',
      note: '2025年四校录取率全市第二（仅次于徐汇）。',
      sources: [
        {
          title: '2025年上海16区市重率、区重率、普高率汇总',
          publisher: '竞赛联（转引2025中考统计）',
          url: 'https://www.jingsailian.com/news/1610625.html',
          date: '2025-10-15',
        },
      ],
    },
    notableSchools: ['打虎山路第一小学', '第二师范学校附属小学', '控江二村小学', '杨浦小学'],
    supplyNote: {
      value: '生源随全市回落，外围校缩班；打一/二师附小等头部对口仍紧张。',
      confidence: 'estimate',
      note: '以当年区招生细则办学规模为准。',
      sources: [impl2026],
    },
  },
];
