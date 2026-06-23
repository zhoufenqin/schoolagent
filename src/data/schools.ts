import type { School } from '../types';

// 好学校名录（公办 + 民办）。
// 说明：tier/kind/warning 为公开认知整理 confidence=estimate（青浦民办名单经区政府2025/2026招生计划核实=authoritative）。
// allocation: single/mixed=公办对口；lottery=民办电脑摇号（无对口小区，买房不解决）。
// 对口划片每年微调，务必以"当年区教育局招生细则"为准。
export const schools: School[] = [
  // ===== 徐汇 =====
  { id: 'xh-gaoan', districtId: 'xuhui', name: '高安路第一小学', block: '天平/衡复', tier: 'top', kind: 'public', allocation: 'mixed', warning: true, note: '公办四大、一梯队，历来生源预警。', confidence: 'estimate' },
  { id: 'xh-huishi', districtId: 'xuhui', name: '汇师小学', block: '徐家汇', tier: 'top', kind: 'public', allocation: 'mixed', warning: true, note: '一梯队，对口紧张、落户年限高。', confidence: 'estimate' },
  { id: 'xh-jianxiang', districtId: 'xuhui', name: '建襄小学', block: '永嘉/天平', tier: 'top', kind: 'public', allocation: 'mixed', warning: false, note: '公办四大之一。', confidence: 'estimate' },
  { id: 'xh-xiangyang', districtId: 'xuhui', name: '向阳小学', block: '衡复', tier: 'top', kind: 'public', allocation: 'mixed', warning: false, note: '公办四大之一、衡复风貌区。', confidence: 'estimate' },
  { id: 'xh-xujiaoyuan', districtId: 'xuhui', name: '徐汇区教育学院附属实验小学', block: '斜土/小木桥', tier: 'strong', kind: 'public', allocation: 'mixed', warning: false, note: '徐教院附小，二梯队强校（你提到的）。', confidence: 'estimate' },
  { id: 'xh-no1', districtId: 'xuhui', name: '徐汇区第一中心小学', block: '徐家汇', tier: 'strong', kind: 'public', allocation: 'mixed', warning: false, note: '二梯队。', confidence: 'estimate' },
  { id: 'xh-tianlin3', districtId: 'xuhui', name: '田林第三小学', block: '田林', tier: 'strong', kind: 'public', allocation: 'mixed', warning: false, note: '二梯队、性价比较高板块。', confidence: 'estimate' },
  { id: 'xh-shsx', districtId: 'xuhui', name: '上海小学', block: '华泾/南站', tier: 'strong', kind: 'public', allocation: 'single', warning: false, note: '二梯队、外围、对口确定性较高。', confidence: 'estimate' },
  { id: 'xh-shiwai', districtId: 'xuhui', name: '上海世界外国语小学', block: '徐家汇', tier: 'top', kind: 'private', allocation: 'lottery', warning: false, note: '民办头部，电脑摇号，不靠学区房。', confidence: 'estimate' },
  { id: 'xh-shengda', districtId: 'xuhui', name: '盛大花园小学', block: '华泾', tier: 'strong', kind: 'private', allocation: 'lottery', warning: false, note: '民办，摇号。', confidence: 'estimate' },

  // ===== 黄浦 =====
  { id: 'hp-luwan1', districtId: 'huangpu', name: '卢湾一中心小学', block: '打浦/淮海', tier: 'top', kind: 'public', allocation: 'mixed', warning: true, note: '黄浦一梯队、单价最高。', confidence: 'estimate' },
  { id: 'hp-penglai2', districtId: 'huangpu', name: '蓬莱路第二小学', block: '老西门', tier: 'top', kind: 'public', allocation: 'mixed', warning: true, note: '一梯队。', confidence: 'estimate' },
  { id: 'hp-luwan2', districtId: 'huangpu', name: '卢湾二中心小学', block: '淮海/老卢湾', tier: 'top', kind: 'public', allocation: 'mixed', warning: true, note: '一梯队，对口直升向明初中，“卢二向明”顶级双学区（你提到的）。', confidence: 'estimate' },
  { id: 'hp-qisehua', districtId: 'huangpu', name: '七色花小学', block: '淮海/老卢湾', tier: 'strong', kind: 'public', allocation: 'mixed', warning: false, note: '与卢二齐名的老卢湾强校。', confidence: 'estimate' },
  { id: 'hp-no1', districtId: 'huangpu', name: '黄浦区第一中心小学', block: '外滩', tier: 'strong', kind: 'public', allocation: 'mixed', warning: false, note: '二梯队。', confidence: 'estimate' },
  { id: 'hp-swfl', districtId: 'huangpu', name: '上外-黄浦外国语小学', block: '半洞园', tier: 'strong', kind: 'public', allocation: 'mixed', warning: false, note: '二梯队。', confidence: 'estimate' },
  { id: 'hp-fuxing3', districtId: 'huangpu', name: '复兴东路第三小学', block: '老西门', tier: 'strong', kind: 'public', allocation: 'mixed', warning: false, note: '二梯队。', confidence: 'estimate' },

  // ===== 闵行 =====
  { id: 'mh-mingqiang', districtId: 'minhang', name: '明强小学', block: '七宝', tier: 'top', kind: 'public', allocation: 'mixed', warning: true, note: '闵行公办一梯队。', confidence: 'estimate' },
  { id: 'mh-shiyan', districtId: 'minhang', name: '闵行区实验小学', block: '莘庄/春申(多校区)', tier: 'strong', kind: 'public', allocation: 'mixed', warning: true, note: '公办标杆，热门校区学位紧张。', confidence: 'estimate' },
  { id: 'mh-xinsong', districtId: 'minhang', name: '莘松小学', block: '莘庄', tier: 'strong', kind: 'public', allocation: 'mixed', warning: false, note: '二梯队、莘庄成熟板块。', confidence: 'estimate' },
  { id: 'mh-zizhu', districtId: 'minhang', name: '华师大附属紫竹小学', block: '紫竹/吴泾', tier: 'strong', kind: 'public', allocation: 'single', warning: false, note: '高校系，板块较新。', confidence: 'estimate' },
  { id: 'mh-pingnan', districtId: 'minhang', name: '平南小学', block: '梅陇/春申', tier: 'strong', kind: 'public', allocation: 'mixed', warning: false, note: '二梯队。', confidence: 'estimate' },
  { id: 'mh-wanke', districtId: 'minhang', name: '万科双语学校', block: '七宝/虹桥', tier: 'strong', kind: 'private', allocation: 'lottery', warning: false, note: '民办，摇号。', confidence: 'estimate' },

  // ===== 青浦（民办名单经区政府招生计划核实）=====
  { id: 'qp-shiyan', districtId: 'qingpu', name: '青浦区实验小学', block: '青浦新城', tier: 'strong', kind: 'public', allocation: 'single', warning: false, note: '区内公办头部、一梯队公办，单校对口（唯一真正买房对口项）。', confidence: 'estimate' },
  { id: 'qp-yifu', districtId: 'qingpu', name: '逸夫小学', block: '青浦新城', tier: 'strong', kind: 'public', allocation: 'single', warning: false, note: '公办二梯队。', confidence: 'estimate' },
  { id: 'qp-shiwai', districtId: 'qingpu', name: '青浦世界外国语学校', block: '徐泾', tier: 'top', kind: 'private', allocation: 'lottery', warning: false, note: '均瑶世外系、九年一贯，民办摇号。', confidence: 'authoritative' },
  { id: 'qp-pinghe', districtId: 'qingpu', name: '青浦平和双语学校', block: '淀山湖/新城', tier: 'top', kind: 'private', allocation: 'lottery', warning: false, note: '山峰集团办、平和集团管理，民办摇号。', confidence: 'authoritative' },
  { id: 'qp-lansheng', districtId: 'qingpu', name: '青浦兰生学校(复旦/兰生系)', block: '徐泾/新城', tier: 'top', kind: 'private', allocation: 'lottery', warning: false, note: '你说的“复旦兰生”：民办摇号、含小学段；五浦汇为其初中。', confidence: 'authoritative' },
  { id: 'qp-songqingling', districtId: 'qingpu', name: '宋庆龄学校', block: '徐泾', tier: 'top', kind: 'private', allocation: 'lottery', warning: false, note: '民办、摇号、国际化。', confidence: 'authoritative' },
  { id: 'qp-xiehe', districtId: 'qingpu', name: '协和双语学校(青浦)', block: '徐泾', tier: 'strong', kind: 'private', allocation: 'lottery', warning: false, note: '民办，摇号。', confidence: 'authoritative' },

  // ===== 杨浦 =====
  { id: 'yp-dayi', districtId: 'yangpu', name: '打虎山路第一小学', block: '鞉山', tier: 'top', kind: 'public', allocation: 'mixed', warning: true, note: '杨浦一梯队，对口紧张。', confidence: 'estimate' },
  { id: 'yp-ershifu', districtId: 'yangpu', name: '第二师范学校附属小学', block: '控江', tier: 'top', kind: 'public', allocation: 'mixed', warning: true, note: '一梯队。', confidence: 'estimate' },
  { id: 'yp-kongjiang2', districtId: 'yangpu', name: '控江二村小学(本部)', block: '控江', tier: 'strong', kind: 'public', allocation: 'mixed', warning: false, note: '二梯队。', confidence: 'estimate' },
  { id: 'yp-yangpu', districtId: 'yangpu', name: '杨浦小学', block: '平凉/内江', tier: 'strong', kind: 'public', allocation: 'mixed', warning: false, note: '二梯队。', confidence: 'estimate' },
  { id: 'yp-liuyi', districtId: 'yangpu', name: '六一小学', block: '五角场', tier: 'strong', kind: 'public', allocation: 'mixed', warning: false, note: '二梯队、五角场。', confidence: 'estimate' },
  { id: 'yp-yangpu-min', districtId: 'yangpu', name: '阳浦小学', block: '五角场', tier: 'top', kind: 'private', allocation: 'lottery', warning: false, note: '民办头部，摇号。', confidence: 'estimate' },
];

export function schoolsOf(districtId: string): School[] {
  return schools.filter((s) => s.districtId === districtId);
}

/** 只取公办（学区房对口相关） */
export function publicSchoolsOf(districtId: string): School[] {
  return schools.filter((s) => s.districtId === districtId && s.kind === 'public');
}
