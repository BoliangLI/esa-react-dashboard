# ESA Pages · Apache ECharts 数据大屏

React + Vite + Tailwind CSS 4 + Apache ECharts 6。所有指标均为演示数据。

## 直接使用框架能力

- 折线、柱状、环形和关系图：ECharts 内置 series。
- 数据映射：dataset / encode。
- 提示框、图例筛选、区域缩放：tooltip / legend / dataZoom。
- 原始数据查看、重置、图片下载、折线柱状切换：toolbox。
- 图表生命周期和容器尺寸响应：echarts-for-react。
- 屏幕阅读器描述：ECharts aria。

没有自绘 SVG 图表，没有自行实现图表缩放、导出或提示框。页面布局使用 Tailwind，业务代码只组织演示数据、筛选状态和 option。ECharts 按需注册图表与组件。

## 本地运行

使用 Node.js **22.12+**。

```bash
npm ci
npm run dev
npm run build
npm run preview
```

## ESA 部署

导入本仓库的 `main` 分支，根目录 `/`，Node.js 22。`esa.jsonc` 已配置安装 `npm ci`、构建 `npm run build`、输出 `dist`。纯静态站点，函数入口留空。

配置依据：[ESA Pages 构建与路由](https://help.aliyun.com/zh/edge-security-acceleration/esa/user-guide/build-pages)。远端 ESA 部署需在你的账号中验证，本地构建不代表已部署。

`notFoundStrategy` 保持 `singlePageApplication`。更改 `src/App.jsx` 的 nodes 和 trend 数据即可接入真实数据。关系图表达逻辑连接，不表示地理位置。

## 验证

```bash
npm run build
```

已完成浏览器检查：图表渲染、时间/区域切换、移动端布局。内置工具箱的数据视图与图片下载可在部署后继续验收。图表库增加了 JavaScript 体积，换取完整的渲染与交互能力。

## 参考

- [Apache ECharts](https://echarts.apache.org/)
- [echarts-for-react](https://github.com/hustcc/echarts-for-react)

MIT
