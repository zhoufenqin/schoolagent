import type { Community, Source } from '../types';

// ⚠️ 对口小区按门牌/路段逐年微调，本表为公开认知整理（confidence=estimate；徐汇=2026官方划片）。
// 务必以"当年区教育局招生划片范围"原文为准。主要参考来源见下。
export const communitySources: Source[] = [
  {
    title: '★官方·各区招生政策总入口（含各区《2026公办小学招生划片范围》）',
    publisher: '上海市义务教育入学报名系统（市政府办公厅）',
    url: 'https://shrxbm.edu.sh.gov.cn/zszc/zcsm.html',
    date: '2026',
  },
  {
    title: '2025年徐汇区公办小学招生划片范围',
    publisher: '上海市人民政府（徐汇区教育局）',
    url: 'https://www.shanghai.gov.cn/xhqywjy/20250411/c7624fb2664d407cb7a23d54210a1f22.html',
    date: '2025-04-11',
  },
  {
    title: '2025年杨浦区一年级新生招生范围',
    publisher: '上海市杨浦区人民政府',
    url: 'https://www.shyp.gov.cn/shypq/yqyw-wb-jyjzl-ypzs/20250407/477723/8a0ebfc504dc4e74a5e2421c3ac0a93a.pdf',
    date: '2025-04-07',
  },
  {
    title: '杨浦区打虎山路第一小学对口小区（转引2024区教育局招生范围）',
    publisher: '百度知道 / 上海小升初网',
    url: 'https://www.shijiancn.com/gongbanzhongxue/63585.html',
    date: '2025-04',
  },
  {
    title: '2025上海小学初中对口地段表（16区汇总，接近完整·转引官方）',
    publisher: '上海本地宝',
    url: 'https://sh.bendibao.com/edu/202548/296346.shtm',
    date: '2025-04-08',
  },
  {
    title: '2026徐汇区小学招生对口地段一览',
    publisher: '上海本地宝（转引徐汇区教育局）',
    url: 'https://sh.bendibao.com/edu/202647/304993.shtm',
    date: '2026-04-07',
  },
  {
    title: '★官方·2026黄浦区公办小学办学基本情况公示表（含对口范围+招生班数）',
    publisher: '上海市义务教育入学报名系统',
    url: 'https://shrxbm.edu.sh.gov.cn/zszc/policy/310101/zszchtml_201601607.html',
    date: '2026-04-09',
  },
  {
    title: '★官方·2026闵行区公办小学招生划片范围（具体小区）',
    publisher: '闵行区政府',
    url: 'https://zwgk.shmh.gov.cn/mh-xxgk-cms/website/mh_xxgk/xxgk_jyj_ywxx_8_02/content/7641043b-4e2a-472b-94aa-c638bbd8769e.htm',
    date: '2026-04-09',
  },
  {
    title: '★官方·2026杨浦区一年级新生招生范围（图片，已存 suishenban/）',
    publisher: '上海市义务教育入学报名系统',
    url: 'https://shrxbm.edu.sh.gov.cn/zszc/policy/310110/zszchtml_201601611.html',
    date: '2026-04-09',
  },
  {
    title: '★官方·2026青浦区小学学区划分（学校→对口居委/村→具体小区/路牌，1116条）',
    publisher: '上海市义务教育入学报名系统',
    url: 'https://shrxbm.edu.sh.gov.cn/zszc/policy/310118/zszchtml_201601636.html',
    date: '2026-04-09',
  },
];

// 梯队约定：schoolTier top=一梯队，strong=二梯队，good=三梯队/普小。
// 本表只收录"公办、二梯队以上"的对口小区（学区房）。
// ⚠️ 民办为电脑摇号、无对口小区，不在此表，见"好学校名录"。
export const communities: Community[] = [
  // ===== 杨浦 =====
  { id: 'yp-anshan4', districtId: 'yangpu', name: '鞍山四村', block: '鞍山', school: '打虎山路第一小学', schoolTier: 'top', housingType: 'oldPublic', note: '打一对口主力，老公房、总价低、多无电梯；学区硬通货但居住老旧，适合"占学位"。', confidence: 'estimate' },
  { id: 'yp-anshan6', districtId: 'yangpu', name: '鞍山五村/六村', block: '鞍山', school: '打虎山路第一小学', schoolTier: 'top', housingType: 'oldPublic', note: '同打一对口，老公房梯队；单价高、户型小。', confidence: 'estimate' },
  { id: 'yp-tongjilvyuan', districtId: 'yangpu', name: '同济绿园', block: '鞍山', school: '打虎山路第一小学', schoolTier: 'top', housingType: 'newish', note: '打一对口里少见的次新带电梯——既要顶级学区又要居住的较优解，性价比相对高。', confidence: 'estimate' },
  { id: 'yp-kongjiang', districtId: 'yangpu', name: '控江四/五/六村', block: '控江路', school: '二师附小 / 控江二村小学', schoolTier: 'top', housingType: 'oldPublic', note: '二师附小(一梯队)/控二(二梯队)对口老公房，控江板块，总价低。', confidence: 'estimate' },
  { id: 'yp-mingxing', districtId: 'yangpu', name: '民星苑 / 凤城新村', block: '控江路', school: '控江二村小学', schoolTier: 'strong', housingType: 'commodity', note: '控二对口，部分商品房有电梯，居住性比纯老公房好。', confidence: 'estimate' },
  { id: 'yp-guohe', districtId: 'yangpu', name: '国和一村 / 工农新村', block: '五角场/国和', school: '六一小学 / 复旦科技园小学', schoolTier: 'strong', housingType: 'oldPublic', note: '五角场二梯队对口，近大学城与商圈，资源丰富。', confidence: 'estimate' },

  // ===== 徐汇（对口=2026区教育局划片"对口居委"，居委≈小区/新村；本地宝转引官方，2026-04）=====
  { id: 'xh-gaoan-wanping', districtId: 'xuhui', name: '高安·康平·吴兴·宛平·天平·上海新村·安亭·余庆等居委', block: '天平', school: '高安路第一小学(宛平校区·本部)', schoolTier: 'top', housingType: 'oldPublic', note: '高一本部(天平板块)对口居委；老公房+老洋房、单价极高、户型杂，占学位首选。', confidence: 'authoritative' },
  { id: 'xh-gaoan-huazhan', districtId: 'xuhui', name: '华阳·名苑·盛华景苑·华泾绿苑·光华绿苑·印象旭辉等居委', block: '华泾', school: '高安路第一小学(华展校区)', schoolTier: 'top', housingType: 'commodity', note: '⚠近年新增的华展校区在华泾(非天平本部)，房龄较新、单价明显低于本部——想要"高一牌子"又预算有限可重点看。', confidence: 'authoritative' },
  { id: 'xh-huishi', districtId: 'xuhui', name: '文定·汇站·潘家宅·陈家宅·豪庭(徐虹校区)等居委', block: '徐家汇', school: '汇师小学', schoolTier: 'top', housingType: 'commodity', note: '汇师对口居委，徐家汇核心，出行/补习资源极强；单价高。', confidence: 'authoritative' },
  { id: 'xh-jianxiang', districtId: 'xuhui', name: '建岳·太原·永嘉新村·永太·建新·息村等居委', block: '永嘉路/天平', school: '建襄小学', schoolTier: 'top', housingType: 'oldPublic', note: '建襄对口，永嘉路一带老公房/洋房。', confidence: 'authoritative' },
  { id: 'xh-xiangyang', districtId: 'xuhui', name: '慎成·陕西·永康·肇嘉浜·建新·息村等居委', block: '衡复', school: '向阳小学', schoolTier: 'top', housingType: 'oldPublic', note: '向阳对口，衡复风貌区顶级地段，稀缺但旧。', confidence: 'authoritative' },
  { id: 'xh-no1', districtId: 'xuhui', name: '嘉善·桃源村·复中·东湖·新乐·淮海·安福·春华等居委', block: '淮海中路', school: '徐汇区第一中心小学', schoolTier: 'strong', housingType: 'oldPublic', note: '一中心(二梯队)对口，淮海中路一带；(注：南丹南村实际对口交大附小，非一中心)。', confidence: 'authoritative' },
  { id: 'xh-tianlin3', districtId: 'xuhui', name: '田林一~十二村·万科华尔兹·爱建园(部分)', block: '田林', school: '田林第三小学', schoolTier: 'strong', housingType: 'oldPublic', note: '田林新村，二梯队里性价比较高板块，单价低于天平/徐家汇。', confidence: 'authoritative' },
  { id: 'xh-shsx', districtId: 'xuhui', name: '长桥一村·长桥五村·光华·汇成五村(本部校区)', block: '长桥', school: '上海小学(本部)', schoolTier: 'strong', housingType: 'oldPublic', note: '上海小学(二梯队)对口，长桥板块、单价较低、外围。', confidence: 'authoritative' },
  { id: 'xh-xujiaoyuan', districtId: 'xuhui', name: '长桥四村·长桥七村·长桥八村·长桥三村一(部分)', block: '长桥', school: '徐汇区教育学院附属实验小学(徐教院附小)', schoolTier: 'strong', housingType: 'oldPublic', note: '徐教院附小(你提到的)对口，长桥板块。', confidence: 'authoritative' },

  // ===== 黄浦（对口=2026官方《公办小学办学基本情况公示表》对口居委 + 计划招生班数；shrxbm官方）=====
  { id: 'hp-luwan1', districtId: 'huangpu', name: '建五·建六·复三·建一·顺昌·建东·孝和·西成·新天地(居委)', block: '淮海', school: '卢湾一中心小学', schoolTier: 'top', housingType: 'commodity', note: '黄浦最贵学区(卢一中心)，2026招6班；85㎡超预算，仅小户型占学位可行。', confidence: 'authoritative' },
  { id: 'hp-penglai', districtId: 'huangpu', name: '文庙·净土街·小桃园·曹家街·学宫·多稼·桑园·府谷(居委)', block: '老西门', school: '蓬莱路第二小学', schoolTier: 'top', housingType: 'oldPublic', note: '蓬二对口，2026招8班(体量大)；老西门老公房，总价相对淮海低、房龄老。', confidence: 'authoritative' },
  { id: 'hp-luwan2', districtId: 'huangpu', name: '茂名·思南·永嘉·香山·瑞雪·建德(居委)', block: '瑞金/淮海', school: '卢湾二中心小学', schoolTier: 'top', housingType: 'oldPublic', note: '卢二(一梯队·对口向明初中)，2026招7班；老卢湾、思南公馆一带，"卢二向明"顶级双学区。', confidence: 'authoritative' },
  { id: 'hp-qisehua', districtId: 'huangpu', name: '渔阳里·长乐·淮中·瑞成·瑞兴(居委)', block: '淮海', school: '七色花小学', schoolTier: 'strong', housingType: 'oldPublic', note: '与卢二齐名的淮海强校，2026招3班(小而精)。', confidence: 'authoritative' },
  { id: 'hp-no1', districtId: 'huangpu', name: '白渡·新码·万裕·龙潭·光启·四新(居委)', block: '老城厢/外滩', school: '黄浦区第一中心小学', schoolTier: 'strong', housingType: 'oldPublic', note: '黄浦一中心(二梯队)，2026招5班；老城厢老公房。', confidence: 'authoritative' },
  { id: 'hp-swfl', districtId: 'huangpu', name: '耀江(一)(二)·高雄·市民(居委)', block: '半淞园', school: '上外-黄浦外国语小学', schoolTier: 'strong', housingType: 'commodity', note: '上外黄浦(二梯队)，2026招8班(体量大)；半淞园商品房较多、居住性较好。', confidence: 'authoritative' },
  { id: 'hp-fuxing3', districtId: 'huangpu', name: '泰瑞·肇方·太阳都市·方西·会稽·果育·学院·广福·宝带(居委)', block: '老西门', school: '复兴东路第三小学', schoolTier: 'strong', housingType: 'oldPublic', note: '复兴东路三小(二梯队)，2026招5班。', confidence: 'authoritative' },

  // ===== 闵行（对口=2026官方《闵行区公办小学招生划片范围》具体小区；闵行区政府）=====
  { id: 'mh-shiyan', districtId: 'minhang', name: '莘松三/五/八/九村·锦澳家园·锦都花苑·银厦花园·裕兴花园·莘怡公寓', block: '莘庄(莘沥路本部)', school: '闵行区实验小学', schoolTier: 'strong', housingType: 'commodity', note: '⭐闵行实小本部对口小区；老公房+部分商品房，二梯队、预算内可住得下。', confidence: 'authoritative' },
  { id: 'mh-chunshen', districtId: 'minhang', name: '水仙苑·随园玉兰苑·万科等(春城校区)', block: '春申', school: '闵行区实验小学(春城校区)', schoolTier: 'strong', housingType: 'newish', note: '⭐实小春城校区对口，春申次新带电梯，性价比核心。', confidence: 'authoritative' },
  { id: 'mh-qibao', districtId: 'minhang', name: '七宝村·友谊村·茂盛花园·水景书香园·宝仪花苑·学院新村·东方花园·皇都花园·蒲汇新村', block: '七宝', school: '明强小学', schoolTier: 'top', housingType: 'commodity', note: '明强(闵行一梯队)对口小区，七宝生活成熟、商品房多。', confidence: 'authoritative' },
  { id: 'mh-pingnan', districtId: 'minhang', name: '平南一~四村·华一村·华梅花苑 / 平吉一·二村·东苑半岛·蓝色港湾·新时代花园(平吉校区)', block: '梅陇/古美', school: '平南小学', schoolTier: 'strong', housingType: 'commodity', note: '平南(二梯队)对口；本部老公房、平吉校区有商品房。', confidence: 'authoritative' },
  { id: 'mh-zizhu', districtId: 'minhang', name: '紫竹半岛·吴泾英武村/幸福村/友爱村/星火村', block: '紫竹/吴泾', school: '紫竹小学(华师大系)', schoolTier: 'strong', housingType: 'newish', note: '高校系、板块新、房龄好、电梯；离市区稍远。', confidence: 'authoritative' },

  // ===== 青浦（对口=2026官方《青浦区小学学区划分》具体小区/路牌；shrxbm官方）=====
  { id: 'qp-shiyan', districtId: 'qingpu', name: '青淞苑·青城苑·侨鑫公寓·西园新村·庆丰新村·南沁园·汇丰豪轩等', block: '盈浦(青浦老城)', school: '青浦区实验小学', schoolTier: 'strong', housingType: 'oldPublic', note: '区内公办头部对口，多为老城新村/大楼；单价低、性价比高，公办整体弱于市区。', confidence: 'authoritative' },
  { id: 'qp-yifu', districtId: 'qingpu', name: '万寿新村·城中城·留水园·翡翠国际花苑·盈湖三岛·富力桃园·旭辉玫瑰湾·民乐佳苑·葛洲坝玉兰花园', block: '盈浦/香花桥', school: '逸夫小学', schoolTier: 'strong', housingType: 'commodity', note: '公办二梯队对口，新村+次新商品房混合。', confidence: 'authoritative' },
  { id: 'qp-shida', districtId: 'qingpu', name: '远洋虹桥万和源·万科一~五期·虹桥公馆·绿城春晓园·蟠龙馨苑·西郊雅苑·昱慧苑', block: '徐泾/赵巷(虹桥)', school: '上海师范大学附属青浦实验小学', schoolTier: 'strong', housingType: 'newish', note: '⭐近虹桥的次新盘对口公办；房龄好、配套强、升值优于老城。', confidence: 'authoritative' },
  { id: 'qp-yulanwan', districtId: 'qingpu', name: '新青浦世纪苑·都市绿舟·忆华里·西部花园·御澜湾苑·金地格林郡', block: '盈浦/夏阳', school: '御澜湾学校', schoolTier: 'good', housingType: 'commodity', note: '九年一贯公办，新城商品房板块。', confidence: 'authoritative' },
];
];

export function communitiesOf(districtId: string): Community[] {
  return communities.filter((c) => c.districtId === districtId);
}
