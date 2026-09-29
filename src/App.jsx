import { useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Globe2,
  Server,
  Zap,
  ShieldCheck,
  RefreshCw,
  Maximize,
  Minimize,
  Download,
} from "lucide-react";

const regions = [
  ["亚太地区", "Asia Pacific", 48, "#38bdf8"],
  ["北美地区", "North America", 28, "#818cf8"],
  ["欧洲地区", "Europe", 18, "#2dd4bf"],
  ["其他地区", "Other Regions", 6, "#fbbf24"],
];
const nodes = [
  ["新加坡", "SIN", 99.99, 24, "健康"],
  ["法兰克福", "FRA", 99.98, 32, "健康"],
  ["旧金山", "SFO", 99.99, 28, "健康"],
  ["东京", "NRT", 99.97, 19, "健康"],
  ["悉尼", "SYD", 99.91, 67, "关注"],
];
const series = [
  20, 27, 24, 39, 31, 34, 22, 42, 40, 48, 39, 50, 53, 45, 60, 55, 70, 62, 71,
  66, 83, 72, 88, 79,
];
const spots = [
  [155, 91],
  [177, 118],
  [207, 94],
  [218, 151],
  [244, 191],
  [271, 231],
  [411, 90],
  [428, 125],
  [440, 167],
  [468, 219],
  [495, 126],
  [524, 120],
  [568, 100],
  [600, 151],
  [635, 178],
  [602, 224],
  [666, 238],
];
function Panel({ title, subtitle, children, className = "" }) {
  return (
    <section
      className={`rounded-xl border border-white/8 bg-[#111b2d] p-5 ${className}`}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium text-slate-200">{title}</h2>
        <span className="text-[10px] text-slate-500">{subtitle}</span>
      </div>
      {children}
    </section>
  );
}
export default function App() {
  const [range, setRange] = useState("24h"),
    [region, setRegion] = useState("全球"),
    [refresh, setRefresh] = useState(0),
    [clock, setClock] = useState(new Date()),
    [full, setFull] = useState(false),
    [notice, setNotice] = useState("");
  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 1000);
    const sync = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", sync);
    return () => {
      clearInterval(id);
      document.removeEventListener("fullscreenchange", sync);
    };
  }, []);
  const multiplier =
    (range === "7d" ? 6.6 : range === "1h" ? 0.052 : 1) *
    (region === "全球" ? 1 : 0.48);
  const requests = (24.86 * multiplier + refresh * 0.01).toFixed(2);
  function exportData() {
    const csv =
      "区域,节点,可用性,延迟ms,状态\n" +
      nodes.map((r) => r.join(",")).join("\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "pulse-nodes-demo.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      setNotice("当前浏览器不支持全屏模式");
    }
  }
  return (
    <div className="min-h-screen bg-[#0a1120] text-slate-200">
      <header className="border-b border-white/8 bg-[#0d1627]">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-5 py-5 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-sky-400/10 text-sky-400">
              <Activity size={24} />
            </span>
            <span className="text-xl font-bold tracking-[.13em]">
              PULSE
              <span className="ml-3 border-l border-slate-700 pl-3 text-xs font-normal tracking-normal text-slate-400">
                全球边缘观测中心
              </span>
            </span>
          </a>
          <div className="flex items-center gap-5 text-xs">
            <span className="hidden font-mono text-slate-500 sm:block">
              {clock.toLocaleString("zh-CN", { hour12: false })}
            </span>
            <span className="flex items-center gap-2 text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              系统运行正常
            </span>
            <button
              aria-label={full ? "退出全屏" : "进入全屏"}
              onClick={fullscreen}
              className="rounded-md border border-white/10 p-2 text-slate-400 hover:text-white"
            >
              {full ? <Minimize size={15} /> : <Maximize size={15} />}
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1600px] px-5 py-7 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="mb-1 text-[9px] tracking-[.25em] text-sky-500">
              NETWORK INTELLIGENCE / OVERVIEW
            </p>
            <h1 className="text-2xl font-semibold">每一次连接，尽在掌握</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#111b2d] px-3 py-2 text-xs">
              <Globe2 size={14} className="text-slate-400" />
              <select
                aria-label="选择区域"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="bg-transparent text-slate-300 outline-none"
              >
                <option className="bg-slate-900">全球</option>
                <option className="bg-slate-900">亚太地区</option>
              </select>
            </label>
            <div className="flex rounded-lg border border-white/10 bg-[#111b2d] p-1">
              {[
                ["1h", "近1小时"],
                ["24h", "近24小时"],
                ["7d", "近7天"],
              ].map(([v, t]) => (
                <button
                  key={v}
                  aria-pressed={v === range}
                  onClick={() => setRange(v)}
                  className={`rounded-md px-3 py-1.5 text-xs ${v === range ? "bg-sky-500/15 text-sky-300" : "text-slate-500 hover:text-slate-200"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button
              aria-label="刷新数据"
              onClick={() => {
                setRefresh((n) => n + 1);
                setNotice("演示数据已刷新");
              }}
              className="rounded-lg border border-white/10 p-2.5 text-slate-400 hover:text-sky-300"
            >
              <RefreshCw size={15} />
            </button>
          </div>
        </div>
        <div className="mb-5 flex items-center justify-between rounded-md border border-sky-500/10 bg-sky-500/5 px-3 py-2 text-[10px] text-slate-400">
          <span>DEMO MODE · 所有指标均为演示数据，未连接真实监控服务</span>
          <span role="status" className="ml-3 text-sky-300">
            {notice || "数据视图就绪"}
          </span>
        </div>
        <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            [Globe2, "总请求数", requests, "M", "12.8%", true],
            [
              Zap,
              "平均响应时间",
              region === "全球" ? "32" : "24",
              "ms",
              "8.2%",
              false,
            ],
            [
              Server,
              "在线节点",
              region === "全球" ? "218" : "104",
              "个",
              "4 个",
              true,
            ],
            [ShieldCheck, "服务可用性", "99.99", "%", "0.02%", true],
          ].map(([Icon, t, n, u, d, up], i) => (
            <section
              key={t}
              className="relative overflow-hidden rounded-xl border border-white/8 bg-[#111b2d] p-5"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{t}</span>
                <Icon className="text-sky-400/70" size={17} />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <strong className="font-mono text-3xl font-medium tracking-tight text-white">
                  {n}
                </strong>
                <span className="text-xs text-slate-500">{u}</span>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[10px] text-emerald-400">
                {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{" "}
                {d}
                <span className="ml-2 text-slate-500">较上一周期</span>
              </div>
              <svg
                viewBox="0 0 130 45"
                className="absolute right-3 bottom-3 h-11 w-28 opacity-60"
                aria-hidden="true"
              >
                <polyline
                  points={series
                    .slice(i, i + 12)
                    .map((n, j) => `${j * 12},${45 - n * 0.5}`)
                    .join(" ")}
                  fill="none"
                  stroke={i % 2 ? "#2dd4bf" : "#38bdf8"}
                  strokeWidth="1.5"
                />
              </svg>
            </section>
          ))}
        </div>
        <div className="grid gap-5 xl:grid-cols-[1.8fr_1fr]">
          <Panel
            title="全球节点分布"
            subtitle={`${region} · ${region === "全球" ? "218" : "104"} NODES ONLINE`}
          >
            <div className="relative overflow-hidden rounded-lg bg-[#0d1728]">
              <svg
                viewBox="0 0 800 300"
                className="w-full"
                role="img"
                aria-label="示意网络地图：连接北美、欧洲和亚太边缘节点"
              >
                <defs>
                  <pattern
                    id="dots"
                    width="9"
                    height="9"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="2" cy="2" r="1.2" fill="#344768" />
                  </pattern>
                  <radialGradient id="glow">
                    <stop stopColor="#38bdf8" stopOpacity=".25" />
                    <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <path
                  d="M89 64l63-27 78 5 40 31-20 31-45 13-13 38-28-15-19-40-49-8zM201 158l43-11 52 32-13 55-27 38-22-23-10-46zM369 71l38-23 56 13 20 28-20 20 18 40-18 20-1 40-29 40-22-20-14-51-27-26 18-41zM464 57l79-22 85 18 77 36-5 38-64-5-25 36-29 33-34-11-29-49-42-18zM588 220l44-20 51 14 22 31-30 17-56-9z"
                  fill="url(#dots)"
                />
                <ellipse
                  cx="465"
                  cy="155"
                  rx="310"
                  ry="140"
                  fill="url(#glow)"
                />
                {spots.slice(0, 9).map(([x, y], i) => (
                  <path
                    key={i}
                    d={`M600 151 Q${(600 + x) / 2} ${Math.min(y, 151) - 80} ${x} ${y}`}
                    fill="none"
                    stroke="#38bdf8"
                    strokeOpacity=".3"
                    strokeWidth="1"
                  />
                ))}
                {spots.map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="8" fill="#38bdf8" opacity=".09" />
                    <circle
                      cx={x}
                      cy={y}
                      r="2.8"
                      fill={i === 16 ? "#fbbf24" : "#38bdf8"}
                    />
                  </g>
                ))}
                <text x="606" y="140" fill="#a5e3ff" fontSize="10">
                  TOKYO
                </text>
                <text x="144" y="79" fill="#a5e3ff" fontSize="10">
                  SAN FRANCISCO
                </text>
                <text x="419" y="77" fill="#a5e3ff" fontSize="10">
                  FRANKFURT
                </text>
              </svg>
              <div className="absolute bottom-3 left-4 flex gap-4 text-[9px] text-slate-500">
                <span>
                  <i className="mr-1.5 inline-block size-1.5 rounded-full bg-sky-400" />
                  正常节点
                </span>
                <span>
                  <i className="mr-1.5 inline-block size-1.5 rounded-full bg-amber-400" />
                  高延迟节点
                </span>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 divide-x divide-white/5 text-center">
              {[
                ["6", "大洲覆盖"],
                ["48", "国家与地区"],
                ["24/7", "持续观测"],
              ].map(([n, l]) => (
                <div key={l}>
                  <strong className="font-mono text-lg text-slate-200">
                    {n}
                  </strong>
                  <span className="ml-3 text-[10px] text-slate-500">{l}</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="流量区域分布" subtitle="TRAFFIC DISTRIBUTION">
            <div className="flex items-center justify-center gap-6 py-3">
              <div
                className="grid size-36 shrink-0 place-items-center rounded-full"
                style={{
                  background:
                    "conic-gradient(#38bdf8 0 48%, #818cf8 48% 76%, #2dd4bf 76% 94%, #fbbf24 94% 100%)",
                }}
              >
                <div className="grid size-28 content-center rounded-full bg-[#111b2d] text-center">
                  <span className="font-mono text-2xl">{requests}M</span>
                  <span className="mt-1 text-[9px] text-slate-500">
                    TOTAL REQUESTS
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-5 space-y-4">
              {regions.map(([n, en, p, c]) => (
                <div key={n} className="flex items-center gap-3 text-xs">
                  <span
                    className="size-2 rounded-full"
                    style={{ background: c }}
                  />
                  <span className="text-slate-400">{n}</span>
                  <div className="ml-auto h-1 w-20 rounded bg-white/5">
                    <div
                      className="h-1 rounded"
                      style={{ width: p + "%", background: c }}
                    />
                  </div>
                  <span className="w-8 text-right font-mono">{p}%</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel
            title="请求趋势"
            subtitle={
              range === "24h"
                ? "00:00 — 23:59"
                : range === "7d"
                  ? "MON — SUN"
                  : "最近 60 分钟"
            }
          >
            <div className="mb-4 flex gap-5 text-[10px] text-slate-500">
              <span className="text-sky-400">— 请求量</span>
              <span className="text-indigo-400">— 缓存命中</span>
              <span className="ml-auto">单位：千次</span>
            </div>
            <svg
              viewBox="0 0 720 160"
              className="w-full"
              role="img"
              aria-label={`${range}请求量趋势图`}
            >
              <defs>
                <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#38bdf8" stopOpacity=".25" />
                  <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[20, 60, 100, 140].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="720"
                  y2={y}
                  stroke="#ffffff0d"
                  strokeDasharray="4 5"
                />
              ))}
              <polygon
                points={`0,160 ${series.map((n, i) => `${i * 31.3},${150 - n * (range === "7d" ? 1.35 : 1.15)}`).join(" ")} 720,160`}
                fill="url(#area)"
              />
              <polyline
                points={series
                  .map(
                    (n, i) =>
                      `${i * 31.3},${150 - n * (range === "7d" ? 1.35 : 1.15)}`,
                  )
                  .join(" ")}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
              />
              <polyline
                points={series
                  .map((n, i) => `${i * 31.3},${160 - n * 0.8}`)
                  .join(" ")}
                fill="none"
                stroke="#818cf8"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
            </svg>
            <div className="mt-3 flex justify-between font-mono text-[9px] text-slate-500">
              {(range === "7d"
                ? ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
                : range === "1h"
                  ? ["-60m", "-50m", "-40m", "-30m", "-20m", "-10m", "NOW"]
                  : [
                      "00:00",
                      "04:00",
                      "08:00",
                      "12:00",
                      "16:00",
                      "20:00",
                      "23:59",
                    ]
              ).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </Panel>
          <Panel title="最近事件" subtitle="ACTIVITY LOG">
            <div className="space-y-5">
              {[
                ["09:42:18", "新加坡节点扩容完成", "+4 个计算实例已就绪", true],
                ["09:38:05", "自动防护策略生效", "异常请求已被成功拦截", true],
                [
                  "09:31:42",
                  "悉尼节点延迟波动",
                  "当前延迟 67ms，持续观测中",
                  false,
                ],
                [
                  "09:24:11",
                  "全球缓存同步完成",
                  "配置已分发至全部边缘节点",
                  true,
                ],
              ].map(([t, title, desc, ok]) => (
                <div key={t} className="flex gap-3">
                  <span
                    className={`mt-1 size-1.5 shrink-0 rounded-full ${ok ? "bg-sky-400" : "bg-amber-400"}`}
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between gap-1">
                      <h3 className="text-xs text-slate-300">{title}</h3>
                      <time className="font-mono text-[9px] text-slate-500">
                        {t}
                      </time>
                    </div>
                    <p className="mt-1.5 text-[10px] text-slate-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
        <section className="mt-5 overflow-hidden rounded-xl border border-white/8 bg-[#111b2d]">
          <div className="flex items-center justify-between p-5">
            <h2 className="text-sm font-medium">关键节点状态</h2>
            <button
              onClick={exportData}
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-sky-300"
            >
              <Download size={13} />
              导出数据
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px] text-left text-xs">
              <thead className="border-y border-white/5 bg-white/2 text-[10px] font-normal text-slate-500">
                <tr>
                  {[
                    "节点区域",
                    "节点代码",
                    "可用性",
                    "平均延迟",
                    "运行状态",
                  ].map((t) => (
                    <th key={t} className="px-5 py-3 font-normal">
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {nodes
                  .filter(
                    (n) =>
                      region === "全球" || ["SIN", "NRT", "SYD"].includes(n[1]),
                  )
                  .map(([n, id, up, latency, state]) => (
                    <tr
                      key={id}
                      className="border-b border-white/5 last:border-0 hover:bg-white/2"
                    >
                      <td className="px-5 py-3.5">{n}</td>
                      <td className="px-5 font-mono text-slate-500">{id}</td>
                      <td className="px-5 font-mono">{up}%</td>
                      <td className="px-5 font-mono">
                        {latency} <span className="text-slate-500">ms</span>
                      </td>
                      <td className="px-5">
                        <span
                          className={`rounded px-2 py-1 text-[10px] ${state === "健康" ? "bg-emerald-400/10 text-emerald-400" : "bg-amber-400/10 text-amber-400"}`}
                        >
                          {state}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
        <footer className="mt-6 flex flex-wrap justify-between gap-3 font-mono text-[9px] tracking-wide text-slate-600">
          <span>PULSE OBSERVABILITY · DEMO DATA</span>
          <span>POWERED BY REACT + VITE · READY FOR ESA</span>
        </footer>
      </main>
    </div>
  );
}
