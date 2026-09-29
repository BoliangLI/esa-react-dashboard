import { useState } from "react";
import ReactECharts from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { LineChart, BarChart, PieChart, GraphChart } from "echarts/charts";
import {
  AriaComponent,
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import {
  Activity,
  ArrowUpRight,
  Globe2,
  Server,
  ShieldCheck,
  Zap,
} from "lucide-react";

echarts.use([
  LineChart,
  BarChart,
  PieChart,
  GraphChart,
  AriaComponent,
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
  CanvasRenderer,
]);

const nodes = [
  { name: "新加坡", region: "亚太", value: 24 },
  { name: "东京", region: "亚太", value: 19 },
  { name: "悉尼", region: "亚太", value: 67 },
  { name: "法兰克福", region: "欧洲", value: 32 },
  { name: "旧金山", region: "北美", value: 28 },
  { name: "纽约", region: "北美", value: 35 },
];
const periods = {
  "24h": ["近 24 小时", 24],
  "7d": ["近 7 天", 7],
  "30d": ["近 30 天", 30],
};
const colors = ["#38bdf8", "#818cf8", "#2dd4bf", "#fbbf24"];
const common = {
  backgroundColor: "transparent",
  color: colors,
  textStyle: { fontFamily: "system-ui, sans-serif" },
  aria: { enabled: true },
  tooltip: { trigger: "item", confine: true },
  toolbox: {
    top: 25,
    right: 0,
    feature: {
      dataView: {
        readOnly: true,
        title: "查看数据",
        lang: ["数据视图", "关闭", "刷新"],
      },
      restore: { title: "重置" },
      saveAsImage: { title: "下载图片", backgroundColor: "#101a2e" },
    },
  },
};
const axis = {
  axisLine: { lineStyle: { color: "#334155" } },
  axisLabel: { color: "#94a3b8" },
  splitLine: { lineStyle: { color: "#ffffff09" } },
};

function Chart({ title, subtitle, option, wide = false }) {
  return (
    <section
      className={`min-w-0 rounded-2xl border border-white/8 bg-[#101a2e] p-5 ${wide ? "lg:col-span-2" : ""}`}
    >
      <h2 className="text-sm font-medium text-slate-100">{title}</h2>
      <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      <ReactECharts
        echarts={echarts}
        theme="dark"
        notMerge
        option={{ ...common, ...option }}
        style={{ height: 320, marginTop: 16 }}
      />
    </section>
  );
}

export default function App() {
  const [range, setRange] = useState("24h");
  const [region, setRegion] = useState("全球");
  const visibleNodes = nodes.filter(
    (node) => region === "全球" || node.region === region,
  );
  const count = periods[range][1];
  const factor = region === "全球" ? 1 : 0.48;
  const trend = Array.from({ length: count }, (_, i) => ({
    time:
      range === "24h" ? `${String(i).padStart(2, "0")}:00` : `第 ${i + 1} 天`,
    请求量: Math.round((56 + Math.sin(i * 0.7) * 17 + i * 1.3) * factor),
    缓存命中: Math.round((43 + Math.sin(i * 0.7) * 12 + i) * factor),
  }));
  const requests = (
    trend.reduce((sum, row) => sum + row.请求量, 0) / 1000
  ).toFixed(2);
  const avgLatency = Math.round(
    visibleNodes.reduce((sum, node) => sum + node.value, 0) /
      visibleNodes.length,
  );
  return (
    <div className="min-h-screen bg-[#080f1e] text-slate-200">
      <header className="border-b border-white/8 bg-[#0d1627]">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-5 py-5 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <Activity className="text-sky-400" />
            <strong className="text-xl tracking-widest">PULSE</strong>
            <span className="border-l border-slate-700 pl-3 text-xs text-slate-400">
              全球边缘观测中心
            </span>
          </a>
          <a
            className="text-xs text-slate-400 hover:text-sky-300"
            href="https://echarts.apache.org/"
            target="_blank"
            rel="noreferrer"
          >
            Powered by Apache ECharts ↗
          </a>
        </div>
      </header>
      <main className="mx-auto max-w-[1600px] space-y-6 px-5 py-8 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-2 text-[10px] tracking-[.25em] text-sky-400">
              NETWORK INTELLIGENCE / OVERVIEW
            </p>
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">
              让数据，呈现更多可能。
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              aria-label="选择区域"
              className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option>全球</option>
              <option>亚太</option>
            </select>
            <div className="flex rounded-lg border border-white/10 bg-slate-900 p-1">
              {Object.entries(periods).map(([key, [label]]) => (
                <button
                  key={key}
                  aria-pressed={range === key}
                  onClick={() => setRange(key)}
                  className={`rounded-md px-3 py-1.5 text-xs ${range === key ? "bg-sky-400/15 text-sky-300" : "text-slate-400 hover:text-white"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="rounded-lg border border-sky-400/10 bg-sky-400/5 px-4 py-3 text-xs leading-6 text-slate-400">
          DEMO ·
          所有指标均为演示数据。悬停查看详情，点击图例筛选，拖动趋势图底部滑块缩放。图表工具栏提供数据视图、重置和图片下载。
        </p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            [Globe2, "总请求量", requests, "百万次"],
            [Zap, "平均响应时间", avgLatency, "ms"],
            [Server, "示例节点", visibleNodes.length, "个"],
            [ShieldCheck, "目标可用性", "99.99", "%"],
          ].map(([Icon, label, value, unit]) => (
            <section
              key={label}
              className="rounded-2xl border border-white/8 bg-[#101a2e] p-5"
            >
              <div className="flex justify-between text-sm text-slate-400">
                {label}
                <Icon size={18} className="text-sky-400" />
              </div>
              <p className="mt-4 font-mono text-3xl text-white">
                {value}
                <span className="ml-2 text-xs text-slate-500">{unit}</span>
              </p>
              <p className="mt-4 flex items-center gap-1 text-xs text-emerald-400">
                <ArrowUpRight size={14} />
                {periods[range][0]} · {region}
              </p>
            </section>
          ))}
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          <Chart
            wide
            title="请求趋势"
            subtitle="图例筛选 / 区间缩放 / 折线柱状切换"
            option={{
              dataset: { source: trend },
              tooltip: { trigger: "axis", confine: true },
              legend: { top: 4, left: 0 },
              grid: { left: 45, right: 15, top: 80, bottom: 68 },
              xAxis: { ...axis, type: "category" },
              yAxis: { ...axis, type: "value", name: "千次" },
              dataZoom: [
                { type: "inside" },
                { type: "slider", bottom: 4, height: 22 },
              ],
              toolbox: {
                ...common.toolbox,
                feature: {
                  ...common.toolbox.feature,
                  magicType: {
                    type: ["line", "bar"],
                    title: { line: "切换折线图", bar: "切换柱状图" },
                  },
                },
              },
              series: ["请求量", "缓存命中"].map((name) => ({
                name,
                type: "line",
                smooth: true,
                showSymbol: false,
                areaStyle: { opacity: 0.08 },
                encode: { x: "time", y: name },
              })),
            }}
          />
          <Chart
            title="流量区域分布"
            subtitle="悬停查看占比，点击图例开关区域"
            option={{
              legend: { bottom: 0 },
              series: [
                {
                  type: "pie",
                  radius: ["45%", "67%"],
                  center: ["50%", "45%"],
                  label: { show: false },
                  emphasis: {
                    label: { show: true, fontSize: 18, formatter: "{b}\n{d}%" },
                  },
                  data: (region === "全球"
                    ? [
                        ["亚太", 48],
                        ["北美", 28],
                        ["欧洲", 18],
                        ["其他", 6],
                      ]
                    : [
                        ["新加坡", 45],
                        ["东京", 35],
                        ["悉尼", 20],
                      ]
                  ).map(([name, value]) => ({ name, value })),
                },
              ],
            }}
          />
          <Chart
            wide
            title="边缘节点连接"
            subtitle="可拖拽、缩放；表示逻辑连接，不表示地理位置"
            option={{
              series: [
                {
                  type: "graph",
                  layout: "circular",
                  roam: true,
                  draggable: true,
                  label: { show: true, position: "bottom", color: "#cbd5e1" },
                  symbolSize: 42,
                  edgeSymbol: ["none", "arrow"],
                  lineStyle: { color: "source", curveness: 0.2, opacity: 0.5 },
                  emphasis: { focus: "adjacency" },
                  data: visibleNodes.map((node, i) => ({
                    ...node,
                    itemStyle: { color: colors[i % colors.length] },
                  })),
                  links: visibleNodes.map((node, i) => ({
                    source: node.name,
                    target: visibleNodes[(i + 1) % visibleNodes.length].name,
                  })),
                },
              ],
            }}
          />
          <Chart
            title="节点响应时间"
            subtitle="单位 ms"
            option={{
              dataset: { source: visibleNodes },
              grid: { left: 76, right: 28, top: 40, bottom: 28 },
              xAxis: { ...axis, type: "value" },
              yAxis: { ...axis, type: "category" },
              series: [
                {
                  type: "bar",
                  barMaxWidth: 16,
                  itemStyle: { borderRadius: [0, 5, 5, 0] },
                  encode: { x: "value", y: "name" },
                  label: { show: true, position: "right" },
                },
              ],
            }}
          />
        </div>
        <footer className="flex flex-wrap justify-between gap-3 text-[10px] tracking-widest text-slate-500">
          <span>PULSE OBSERVABILITY · DEMO DATA</span>
          <span>REACT + VITE + APACHE ECHARTS · ESA PAGES</span>
        </footer>
      </main>
    </div>
  );
}
