# Pulse · 数据大屏

深蓝边缘网络观测大屏，包含区域筛选、时间范围、趋势图、节点表格、全屏与 CSV 导出。

React + Vite + Tailwind CSS 4，图标使用 Lucide。无 UI 组件框架、无远程字体或图片依赖，支持移动端。纯前端项目，无密钥、无数据库、无遥测。

## 本地运行

要求 Node.js **22.12+**（推荐 Node 22）。

```bash
npm ci
npm run dev
```

```bash
npm run build
npm run preview
```

## 部署到阿里云 ESA

1. 在 ESA **函数和 Pages** 中选择导入 GitHub 仓库 `BoliangLI/esa-react-dashboard`。
2. 选择 `main` 作为生产分支，根目录 `/`，Node.js 选择 `22.x`。
3. 仓库根目录已包含 `esa.jsonc`，安装命令 `npm ci`，构建命令 `npm run build`，静态资源目录 `dist`。
4. **函数入口留空**：本项目是纯静态 React SPA，无服务端函数。
5. 开始构建，完成后使用 ESA 分配的访问地址测试。

`assets.notFoundStrategy` 已设置为 `singlePageApplication`，支持单页应用路径回退。配置依据：[ESA Pages 构建与路由文档](https://help.aliyun.com/zh/edge-security-acceleration/esa/user-guide/build-pages)。

## 修改内容

修改 src/App.jsx 中的 nodes、regions、series 数据。当前所有指标为演示数据，刷新为模拟更新，CSV 导出当前示例节点数据。

- `src/App.jsx`：页面内容和少量交互状态。
- `src/index.css`：Tailwind 入口、字体和可访问性基础样式；布局通过工具类实现。
- `esa.jsonc`：部署配置。
- `package-lock.json`：可复现依赖，使用公共 npm registry。

品牌、项目、联系方式和指标均为可替换的示例，不代表真实商业服务。上线前替换示例邮箱、GitHub 链接和相关文案。

## 验证

已执行生产构建和本地浏览器桌面/移动端交互检查；ESA 远端部署需在你的账号中完成后再确认。

## License

MIT
