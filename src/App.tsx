import { useMemo, useState } from 'react';
import type { Confidence, District, Metric, School, SchoolTier, Source, Community, HousingType } from './types';
import { districts } from './data/districts';
import { schoolsOf, schools } from './data/schools';
import { communities, communitiesOf, communitySources } from './data/communities';
import { cityPolicies, familyProfile } from './data/policies';
import {
  defaultWeights,
  scoreAll,
  type Weights,
  type DistrictScore,
} from './scoring';
import { runSelfCheck, type Verdict } from './selfcheck';

const CONF_LABEL: Record<Confidence, string> = {
  official: '官方',
  authoritative: '权威转引',
  estimate: '估计·待核实',
  todo: '待补充',
};

const ALLOC_LABEL: Record<District['allocation']['value'], string> = {
  single: '单校对口',
  mixed: '对口+派位',
  lottery: '多校划片',
};
const FIVE_LABEL: Record<District['fiveYearOnePolicy']['value'], string> = {
  full: '全区实施',
  partial: '部分学校',
  none: '不实施',
};
const SUPPLY_LABEL: Record<District['supplyTrend']['value'], string> = {
  easing: '降温',
  stable: '平稳',
  tight: '紧张',
};

const DIM_LABEL: Record<keyof Weights, string> = {
  certainty: '政策确定性',
  supply: '供需安全度',
  quality: '教育质量',
  value: '性价比',
};

const TIER_LABEL: Record<SchoolTier, string> = {
  top: '顶级',
  strong: '优质',
  good: '良好',
};

const VERDICT_LABEL: Record<Verdict, string> = {
  safe: '相对安全',
  caution: '需注意',
  risk: '高风险',
};

const HOUSING_LABEL: Record<HousingType, string> = {
  oldPublic: '老公房',
  commodity: '商品房',
  newish: '次新',
};

const TIER_FULL: Record<SchoolTier, string> = {
  top: '一梯队',
  strong: '二梯队',
  good: '三梯队',
};

function ConfBadge({ c }: { c: Confidence }) {
  return <span className={`confidence c-${c}`}>{CONF_LABEL[c]}</span>;
}

function SourceItem({ s }: { s: Source }) {
  return (
    <div className="src">
      <a href={s.url} target="_blank" rel="noreferrer">
        {s.title}
      </a>{' '}
      <span className="meta">
        — {s.publisher} · {s.date}
      </span>
    </div>
  );
}

function MetricSources({ m, name }: { m: Metric<unknown>; name: string }) {
  if (!m.sources && !m.note) return null;
  return (
    <div className="src">
      <strong>{name}</strong> <ConfBadge c={m.confidence} />
      {m.note && <div className="meta">{m.note}</div>}
      {m.sources?.map((s, i) => (
        <SourceItem key={i} s={s} />
      ))}
    </div>
  );
}

function SchoolRow({ s }: { s: School }) {
  return (
    <div className="school-row">
      <span className={`tier tier-${s.tier}`}>{TIER_LABEL[s.tier]}</span>
      <span className="school-name">{s.name}</span>
      <span className={`kind kind-${s.kind}`}>{s.kind === 'public' ? '公办' : '民办'}</span>
      <span className="school-block">{s.block}</span>
      <span className="school-alloc">
        {s.allocation === 'lottery' ? '摇号' : ALLOC_LABEL[s.allocation]}
      </span>
      {s.warning && <span className="school-warn">预警</span>}
      {s.note && <span className="school-note">{s.note}</span>}
    </div>
  );
}

/** 高德地图搜索链接（近似定位） */
function amapUrl(q: string): string {
  return `https://www.amap.com/search?query=${encodeURIComponent(q)}`;
}

/** 社区对口的核心校名（去掉括号/校区后缀） */
function commCoreName(c: Community): string {
  return c.school.replace(/[(（].*$/, '').replace(/\s*\/.*$/, '').trim();
}

/** 学校与对口小区是否匹配 */
function matchSchool(school: School, c: Community): boolean {
  const core = commCoreName(c);
  if (!core) return false;
  return school.name.includes(core) || core.includes(school.name);
}

/** 可展开的学校行：点公办学校 → 看对口小区 + 地图 */
function SchoolRowExpandable({ s }: { s: School }) {
  const [open, setOpen] = useState(false);
  const comms = useMemo(
    () =>
      s.kind === 'public'
        ? communitiesOf(s.districtId).filter((c) => matchSchool(s, c))
        : [],
    [s],
  );
  const dName = districts.find((d) => d.id === s.districtId)?.name ?? '';
  const hasComm = comms.length > 0;

  return (
    <div className="school-row-wrap">
      <div
        className={`school-row ${hasComm ? 'clickable' : ''}`}
        onClick={() => hasComm && setOpen((o) => !o)}
      >
        <span className={`tier tier-${s.tier}`}>{TIER_LABEL[s.tier]}</span>
        <span className="school-name">{s.name}</span>
        <span className={`kind kind-${s.kind}`}>{s.kind === 'public' ? '公办' : '民办'}</span>
        <span className="school-block">{s.block}</span>
        <span className="school-alloc">
          {s.allocation === 'lottery' ? '摇号·无对口小区' : ALLOC_LABEL[s.allocation]}
        </span>
        {s.warning && <span className="school-warn">预警</span>}
        {hasComm && (
          <span className="comm-toggle">{open ? '收起 ▴' : `对口小区 ${comms.length} ▾`}</span>
        )}
        {!hasComm && s.kind === 'public' && (
          <span className="comm-none">对口待官方划片</span>
        )}
        {s.note && <span className="school-note">{s.note}</span>}
      </div>
      {open && hasComm && (
        <div className="school-comms">
          {comms.map((c) => {
            const first = c.name.split(/[·、/]/)[0] ?? c.block;
            return (
              <div key={c.id} className="comm-mini">
                <div className="comm-mini-head">
                  <span className="comm-mini-name">{c.name}</span>
                  <a
                    className="map-link"
                    href={amapUrl(`${dName}${c.block} ${first}`)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📍地图
                  </a>
                </div>
                <div className="comm-mini-note">{c.note}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DistrictCard({
  d,
  score,
  rank,
}: {
  d: District;
  score: DistrictScore;
  rank: number;
}) {
  return (
    <div className={`card ${rank === 1 ? 'top' : ''}`}>
      <div className="card-head">
        <span className="rank">#{rank}</span>
        <span className="card-name">{d.name}</span>
        <span className="total">
          {score.total}
          <small> / 100</small>
        </span>
      </div>
      <div className="positioning">{d.positioning}</div>

      <div className="dims">
        {(Object.keys(score.dims) as (keyof typeof score.dims)[]).map((k) => (
          <div className="dim" key={k}>
            <span>{DIM_LABEL[k]}</span>
            <span className="bar">
              <span style={{ width: `${score.dims[k]}%` }} />
            </span>
            <span className="num">{score.dims[k]}</span>
          </div>
        ))}
      </div>

      <div className="facts">
        <span className="chip">
          <span className="k">五年一户</span>
          {FIVE_LABEL[d.fiveYearOnePolicy.value]}
          <ConfBadge c={d.fiveYearOnePolicy.confidence} />
        </span>
        <span className="chip">
          <span className="k">对口方式</span>
          {ALLOC_LABEL[d.allocation.value]}
          <ConfBadge c={d.allocation.confidence} />
        </span>
        <span className="chip">
          <span className="k">供需</span>
          {SUPPLY_LABEL[d.supplyTrend.value]}
          <ConfBadge c={d.supplyTrend.confidence} />
        </span>
        <span className="chip">
          <span className="k">参考单价</span>
          {d.pricePerSqm.value[0]}–{d.pricePerSqm.value[1]} 万/㎡
          <ConfBadge c={d.pricePerSqm.confidence} />
        </span>
        {d.cityKeyRate && (
          <span className="chip">
            <span className="k">中考市重率</span>
            {d.cityKeyRate.value}%<ConfBadge c={d.cityKeyRate.confidence} />
          </span>
        )}
        {d.topFourRate && (
          <span className="chip">
            <span className="k">四校录取率</span>
            {d.topFourRate.value}%<ConfBadge c={d.topFourRate.confidence} />
          </span>
        )}
      </div>

      <div className="move-in">
        ✓ 为 2029 入学，建议最晚 <b>{score.latestMoveInYear}</b> 年前完成落户
        （预计需落户约 {d.residencyYears.value} 年）
      </div>

      {score.flags.length > 0 && (
        <div className="flags">
          {score.flags.map((f, i) => (
            <div className="flag" key={i}>
              {f}
            </div>
          ))}
        </div>
      )}

      {d.supplyNote && (
        <div className="supply-note">
          <b>供给侧（{d.supplyNote.confidence === 'estimate' ? '估计' : ''}）：</b>
          {d.supplyNote.value}
        </div>
      )}

      <details className="evidence">
        <summary>查看代表性小学 · 板块下钻（{schoolsOf(d.id).length} 所）</summary>
        <div className="schools">
          {schoolsOf(d.id).map((s) => (
            <SchoolRow key={s.id} s={s} />
          ))}
        </div>
      </details>

      <details className="evidence">
        <summary>查看数据来源与可信度</summary>
        <MetricSources m={d.fiveYearOnePolicy} name="五年一户" />
        <MetricSources m={d.allocation} name="对口方式" />
        <MetricSources m={d.residencyYears} name="落户年限" />
        <MetricSources m={d.supplyTrend} name="供需趋势" />
        <MetricSources m={d.eduQuality} name="教育质量" />
        <MetricSources m={d.quotaBenefit} name="名额分配红利" />
        <MetricSources m={d.pricePerSqm} name="参考单价" />
        {d.cityKeyRate && <MetricSources m={d.cityKeyRate} name="中考市重率" />}
        {d.topFourRate && <MetricSources m={d.topFourRate} name="四校录取率" />}
        {d.supplyNote && <MetricSources m={d.supplyNote} name="供给侧/缩班" />}
      </details>
    </div>
  );
}

export default function App() {
  const [weights, setWeights] = useState<Weights>(defaultWeights);
  const scores = useMemo(() => scoreAll(districts, weights), [weights]);
  const scoreById = useMemo(
    () => Object.fromEntries(scores.map((s) => [s.id, s])),
    [scores],
  );

  function setW(k: keyof Weights, v: number) {
    setWeights((w) => ({ ...w, [k]: v }));
  }

  const [tab, setTab] = useState<'compare' | 'check' | 'community'>('compare');

  return (
    <div className="app">
      <h1>上海学区房决策助手 · 幼升小</h1>
      <p className="subtitle">
        面向买房家长 · 重点区：徐汇/黄浦/闵行/青浦/杨浦 · 数据口径：2026 招生季（已结束，细则已公布）
      </p>

      <div className="timeline-banner">
        <div className="timeline-step">
          <div className="year">{familyProfile.childBirthYear}</div>
          <div className="label">孩子出生</div>
        </div>
        <span className="timeline-arrow">→</span>
        <div className="timeline-step">
          <div className="year">{familyProfile.kindergartenStart}</div>
          <div className="label">上幼儿园</div>
        </div>
        <span className="timeline-arrow">→</span>
        <div className="timeline-step">
          <div className="year">{familyProfile.primaryEnrollYear}</div>
          <div className="label">幼升小</div>
        </div>
        <div className="timeline-insight">
          2026 招生季已结束，数据已按 2026 口径更新。两个关键点：（1）入户年限逐年收紧，你的落户时机就是决策变量；（2）<b>生源减少 ≠ 竞争缓解</b>——2026 政策明确“同人口变化相适应”，区里会同步缩班/调布局，紧俏校学位未必松动。
        </div>
      </div>

      <div className="tabs">
        <button
          className={tab === 'compare' ? 'active' : ''}
          onClick={() => setTab('compare')}
        >
          区域 / 学校对比
        </button>
        <button
          className={tab === 'check' ? 'active' : ''}
          onClick={() => setTab('check')}
        >
          学位 / 落户自查
        </button>
        <button
          className={tab === 'community' ? 'active' : ''}
          onClick={() => setTab('community')}
        >
          学区 / 小区
        </button>
      </div>

      {tab === 'check' ? (
        <SelfCheckPanel />
      ) : tab === 'community' ? (
        <CommunityPanel />
      ) : (
        <>
          <div className="section">
            调整你的偏好权重
            <small>教育质量优先 = 默认；可拖动重排</small>
          </div>
          <div className="weights">
            {(Object.keys(weights) as (keyof Weights)[]).map((k) => (
              <div className="weight" key={k}>
                <label>
                  <span>{DIM_LABEL[k]}</span>
                  <span className="val">{Math.round(weights[k] * 100)}%</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={weights[k]}
                  onChange={(e) => setW(k, Number(e.target.value))}
                />
              </div>
            ))}
          </div>

          <div className="section">
            区域排名与对比
            <small>按当前权重加权，分数越高越契合你的偏好</small>
          </div>
          <div className="cards">
            {districts
              .slice()
              .sort((a, b) => scoreById[b.id].total - scoreById[a.id].total)
              .map((d) => {
                const s = scoreById[d.id];
                const rank = scores.findIndex((x) => x.id === d.id) + 1;
                return <DistrictCard key={d.id} d={d} score={s} rank={rank} />;
              })}
          </div>

          <div className="section">
            为什么这样评 · 全市政策依据
            <small>这些政策决定了学区房的底层逻辑</small>
          </div>
          {cityPolicies.map((p) => (
            <div className="policy" key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
              <p className="impact">对你的含义：{p.impact}</p>
              {p.sources.map((s, i) => (
                <SourceItem key={i} s={s} />
              ))}
            </div>
          ))}
        </>
      )}

      <div className="legend">
        <span>可信度图例：</span>
        <span className="confidence c-official">官方</span>
        <span className="confidence c-authoritative">权威转引</span>
        <span className="confidence c-estimate">估计·待核实</span>
        <span className="confidence c-todo">待补充</span>
      </div>

      <div className="disclaimer">
        说明：政策类数据来自上海市教委、区教育局、教育考试院等官方源（2024–2025）；
        教育质量、单价等标注"估计·待核实"的指标为公开认知估计值，<b>不构成购房建议</b>，
        最终请以当年区教育局招生细则、贝壳/链家真实成交、目标房产学位占用查询为准。
      </div>
    </div>
  );
}

function SelfCheckPanel() {
  const [districtId, setDistrictId] = useState(districts[0].id);
  const [tier, setTier] = useState<SchoolTier>('top');
  const [moveInYear, setMoveInYear] = useState(2026);
  const [huKouMatch, setHuKouMatch] = useState(true);
  const [seatOccupied, setSeatOccupied] = useState<'no' | 'yes' | 'unknown'>('unknown');

  const district = districts.find((d) => d.id === districtId)!;
  const result = useMemo(
    () => runSelfCheck({ district, tier, moveInYear, huKouMatch, seatOccupied }),
    [district, tier, moveInYear, huKouMatch, seatOccupied],
  );

  return (
    <>
      <div className="section">
        学位 / 落户自查
        <small>填入你的具体情况，测算 2029 入学的对口风险</small>
      </div>

      <div className="checkform">
        <label>
          目标区
          <select value={districtId} onChange={(e) => setDistrictId(e.target.value)}>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          目标校层级
          <select value={tier} onChange={(e) => setTier(e.target.value as SchoolTier)}>
            <option value="top">顶级（头部对口校）</option>
            <option value="strong">优质</option>
            <option value="good">良好 / 普通对口</option>
          </select>
        </label>
        <label>
          计划落户年份
          <input
            type="number"
            min={2024}
            max={2029}
            value={moveInYear}
            onChange={(e) => setMoveInYear(Number(e.target.value))}
          />
        </label>
        <label>
          人户是否一致
          <select
            value={huKouMatch ? 'yes' : 'no'}
            onChange={(e) => setHuKouMatch(e.target.value === 'yes')}
          >
            <option value="yes">人户一致</option>
            <option value="no">人户分离</option>
          </select>
        </label>
        <label>
          学位近5年是否被占用
          <select
            value={seatOccupied}
            onChange={(e) => setSeatOccupied(e.target.value as 'no' | 'yes' | 'unknown')}
          >
            <option value="unknown">未知 / 待查</option>
            <option value="no">未被占用</option>
            <option value="yes">已被占用</option>
          </select>
        </label>
      </div>

      <div className={`verdict verdict-${result.verdict}`}>
        <div className="verdict-head">
          结论：{VERDICT_LABEL[result.verdict]}
          <span className="verdict-sub">
            到 2029 年可落户 {Math.max(0, result.availableYears)} 年 · 预计需约{' '}
            {result.requiredYears} 年 · 最晚落户 {result.latestMoveInYear} 年
          </span>
        </div>
        <ul className="issues">
          {result.issues.map((it, i) => (
            <li key={i} className={`issue issue-${it.level}`}>
              {it.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        行动清单 · 官方核验入口
        <small>这些是必须亲自查证的环节</small>
      </div>
      <div className="checklist">
        {result.checklist.map((c, i) => (
          <a key={i} className="checklist-item" href={c.url} target="_blank" rel="noreferrer">
            {c.text}
          </a>
        ))}
      </div>
    </>
  );
}

function CommunityCard({ c }: { c: Community }) {
  const dName = districts.find((d) => d.id === c.districtId)?.name ?? '';
  const first = c.name.split(/[·、/]/)[0] ?? c.block;
  return (
    <div className="comm-row">
      <div className="comm-head">
        <span className={`tier tier-${c.schoolTier}`}>{TIER_FULL[c.schoolTier]}</span>
        <span className="comm-name">{c.name}</span>
        <span className="comm-block">{c.block}</span>
        <span className="comm-housing">{HOUSING_LABEL[c.housingType]}</span>
        <a
          className="map-link"
          href={amapUrl(`${dName}${c.block} ${first}`)}
          target="_blank"
          rel="noreferrer"
        >
          📍地图
        </a>
      </div>
      <div className="comm-school">对口：{c.school}</div>
      <div className="comm-note">{c.note}</div>
    </div>
  );
}

function CommunityPanel() {
  const [view, setView] = useState<'schools' | 'communities'>('schools');
  const [districtId, setDistrictId] = useState<string>('all');
  const [tier, setTier] = useState<'all' | SchoolTier>('all');
  const [kind, setKind] = useState<'all' | 'public' | 'private'>('all');
  const [housing, setHousing] = useState<'all' | HousingType>('all');

  // —— 好学校名录 ——
  const schoolList = useMemo(() => {
    let arr = districtId === 'all' ? schools : schools.filter((s) => s.districtId === districtId);
    if (tier !== 'all') arr = arr.filter((s) => s.tier === tier);
    if (kind !== 'all') arr = arr.filter((s) => s.kind === kind);
    return arr;
  }, [districtId, tier, kind]);
  const schoolsByDistrict = useMemo(() => {
    const m: Record<string, School[]> = {};
    for (const s of schoolList) (m[s.districtId] ||= []).push(s);
    return m;
  }, [schoolList]);

  // —— 公办对口小区 ——
  const commList = useMemo(() => {
    let arr = districtId === 'all' ? communities : communitiesOf(districtId);
    if (tier !== 'all') arr = arr.filter((c) => c.schoolTier === tier);
    if (housing !== 'all') arr = arr.filter((c) => c.housingType === housing);
    return arr;
  }, [districtId, tier, housing]);
  const commByDistrict = useMemo(() => {
    const m: Record<string, Community[]> = {};
    for (const c of commList) (m[c.districtId] ||= []).push(c);
    return m;
  }, [commList]);

  return (
    <>
      <div className="notice">
        ⚠️ 本名录是<b>启发性清单（公开认知整理，标注"估计·待核实"）</b>，<b>不是完整名册</b>，可能遗漏（如卢二、七色花、徐教院等已补）。
        完整权威的对口请查 <b>区教育局当年"招生划片范围"</b> 或下方"数据来源"的官方对口地段表。民办为摇号、无对口小区。
      </div>

      <div className="subtabs">
        <button className={view === 'schools' ? 'active' : ''} onClick={() => setView('schools')}>
          好学校名录
        </button>
        <button
          className={view === 'communities' ? 'active' : ''}
          onClick={() => setView('communities')}
        >
          公办对口小区（学区房）
        </button>
      </div>

      <div className="checkform">
        <label>
          区域
          <select value={districtId} onChange={(e) => setDistrictId(e.target.value)}>
            <option value="all">全部 5 区</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          梯队
          <select value={tier} onChange={(e) => setTier(e.target.value as 'all' | SchoolTier)}>
            <option value="all">一+二梯队</option>
            <option value="top">仅一梯队</option>
            <option value="strong">仅二梯队</option>
          </select>
        </label>
        {view === 'schools' ? (
          <label>
            办学性质
            <select value={kind} onChange={(e) => setKind(e.target.value as 'all' | 'public' | 'private')}>
              <option value="all">公办 + 民办</option>
              <option value="public">仅公办(可买房对口)</option>
              <option value="private">仅民办(摇号)</option>
            </select>
          </label>
        ) : (
          <label>
            房型
            <select value={housing} onChange={(e) => setHousing(e.target.value as 'all' | HousingType)}>
              <option value="all">全部</option>
              <option value="newish">次新(电梯)</option>
              <option value="commodity">商品房</option>
              <option value="oldPublic">老公房</option>
            </select>
          </label>
        )}
      </div>

      {view === 'schools' ? (
        <>
          <div className="section">
            好学校名录
            <small>公办=点开看对口小区+地图；民办=电脑摇号、不靠学区房</small>
          </div>
          {districts
            .filter((d) => schoolsByDistrict[d.id]?.length)
            .map((d) => (
              <div key={d.id} className="comm-group">
                <div className="comm-group-title">
                  {d.name}
                  <span className="comm-count">{schoolsByDistrict[d.id].length} 所</span>
                </div>
                <div className="schools">
                  {schoolsByDistrict[d.id].map((s) => (
                    <SchoolRowExpandable key={s.id} s={s} />
                  ))}
                </div>
              </div>
            ))}
        </>
      ) : (
        <>
          <div className="section">
            公办对口小区（学区房）
            <small>仅公办二梯队以上；对口须以当年官方划片为准</small>
          </div>
          {districts
            .filter((d) => commByDistrict[d.id]?.length)
            .map((d) => (
              <div key={d.id} className="comm-group">
                <div className="comm-group-title">
                  {d.name}
                  <span className="comm-count">{commByDistrict[d.id].length} 个对口小区</span>
                </div>
                {commByDistrict[d.id].map((c) => (
                  <CommunityCard key={c.id} c={c} />
                ))}
              </div>
            ))}
        </>
      )}

      <div className="section">
        数据来源
        <small>对口/划片以官方原文为准</small>
      </div>
      {communitySources.map((s, i) => (
        <SourceItem key={i} s={s} />
      ))}
    </>
  );
}
