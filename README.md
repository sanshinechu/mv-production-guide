# MV 製作完整指南 🎬

一個互動式 Web 應用，提供從歌詞創作到 YouTube 發布的 **12 步完整 MV 製作工作流程**。

> **現代化的 MV 製作方案**：結合 AI 工具（FLUX、Kling、SUNO 等），輕鬆製作專業級的音樂錄影帶。

---

## ✨ 核心功能

### 📚 教學模式（Tutorial）
- 12 步完整工作流程，每步包含詳細說明
- 互動式左側導航樹，快速跳轉到任何步驟
- 實時成本和時間預估
- 可下載的檢查清單

### 🛠️ 製作助手（Assistant）
- **多步驟表單**：基本信息 → 工具選擇 → 預算優先級
- **實時成本計算**：圖像生成、影片生成、音樂製作三大成本
- **時程規劃**：自動計算 3 個 Phase 的總耗時
- **智能化檢查清單**：自動標記已完成的步驟

### 📊 數據可視化
- 成本分佈圖（Recharts）
- 時程甘特圖（Gantt Chart）
- 工作流程圖（Mermaid）

---

## 🛠️ 技術棧

- **React 19.2** - 現代 UI 框架
- **React Router 7.0** - 客戶端路由
- **Tailwind CSS 3.4** - 工具類樣式
- **Zustand 4.4** - 輕量狀態管理
- **Recharts 2.12** - 數據可視化圖表
- **Mermaid 10.6** - 流程圖和圖表
- **Vite 8.0** - 高效構建工具
- **Vercel** - 部署平台

---

## 📁 快速導航

```
src/
  ├── pages/
  │   ├── Home.jsx          # 著陸頁面
  │   ├── Tutorial.jsx      # 教學頁面
  │   └── Assistant.jsx     # 製作助手
  ├── data/
  │   ├── workflow.js       # 12 步工作流程
  │   └── tools.js          # AI 工具定價
  ├── stores/
  │   └── projectStore.js   # 狀態管理
  └── utils/
      ├── calculations.js   # 成本計算
      └── formatters.js     # 格式化函數
```

---

## 🚀 快速開始

```bash
# 安裝依賴
npm install --legacy-peer-deps

# 開發模式
npm run dev

# 生產構建
npm run build

# 預覽構建結果
npm run preview
```

應用會在 `http://localhost:5173` 啟動

---

## 📚 12 步工作流程

| Phase | 步驟 | 時間 | 成本 |
|-------|------|------|------|
| 1️⃣ 概念設計 | MV_01-06 | 2-3 小時 | $0 |
| 2️⃣ 視覺生成 | MV_07-10 | 2-3 小時 | $1.50-25 |
| 3️⃣ 打包上傳 | Step 11-12 | 30-60 分 | $0 |

---

## 💰 成本估計

根據選擇的工具自動計算：

- **圖像生成**：FLUX.1 Dev ($0.025/張) / Ideogram ($0.05/張) / FLUX Schnell ($0.003/張)
- **影片生成**：Kling ($0.07/秒) / Hailuo ($0.28/6秒) / Seedance ($0.20/秒)
- **音樂製作**：SUNO (免費或 $10/月)

---

## 🌍 部署

### Vercel（推薦）

```bash
npm install -g vercel
vercel
```

### GitHub Pages

```bash
npm run build
# 上傳 dist/ 到 GitHub Pages
```

---

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

---

## 📄 許可證

MIT License - 詳見 [LICENSE](LICENSE)

---

## 👤 作者

**羅東國小資訊組**

- 📺 [YouTube 頻道](https://youtube.com/channel/UCI-_wrJInnHXxhTwmWQ4x5g/)
- 🌐 [學校網站](https://www.lotes.ilc.edu.tw)
- 📧 lotes@tmail.ilc.edu.tw

---

**最後更新**：2026-05-24

Happy MV Making! 🎬✨
