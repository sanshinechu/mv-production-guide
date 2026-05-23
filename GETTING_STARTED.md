# 快速開始指南

## 什麼是這個項目？

**MV 製作完整指南**是一個互動式 Web 應用，提供從歌詞創作到 YouTube 發布的完整 12 步 MV 製作工作流程。

### 核心功能

- 📚 **教學模式**：詳細的 12 步指南，含最佳實踐
- 🛠️ **製作助手**：多步驟表單 + 動態計算
- 💰 **成本計算器**：精確估算 AI 工具費用
- ⏱️ **時程規劃**：自動計算製作時間
- ✅ **檢查清單**：可下載的待辦清單

## 快速開始（3 分鐘）

### 選項 1：在線體驗（推薦）

部署完成後，訪問：https://mv-guide.vercel.app

### 選項 2：本地開發

```bash
# 1. 複製項目到本地目錄
cd C:\Users\user\Desktop  # 避免 Google Drive 權限問題
git clone <your-repo-url>
cd mv-guide

# 2. 安裝依賴
npm install --legacy-peer-deps

# 3. 啟動開發伺服器
npm run dev

# 4. 打開瀏覽器
# 訪問 http://localhost:5173
```

## 主要頁面

### 首頁 (`/`)
- 項目介紹
- 功能特性
- 快速導航

### 教學模式 (`/tutorial`)
- 左側：12 步工作流程導航樹
- 中央：詳細內容和代碼示例
- 右側：時間和成本估算

### 製作助手 (`/assistant`)
- Step 1：基本信息（主題、曲風、時長、主角數）
- Step 2：工具選擇（圖像、影片、音樂生成工具）
- Step 3：預算優先級（質量/平衡/預算）
- 結果：成本摘要、時程表、檢查清單

## 技術棧

- **前端**：React 19 + Vite
- **樣式**：Tailwind CSS
- **路由**：React Router 7
- **狀態**：Zustand（含 localStorage 持久化）
- **可視化**：Recharts + Mermaid
- **部署**：Vercel

## 項目結構

```
mv-guide/
├── src/
│   ├── pages/           # 頁面組件（Home, Tutorial, Assistant）
│   ├── components/      # 可重用組件（Layout, Navigation）
│   ├── hooks/           # 自定義 hooks（useCalculator, useWorkflow）
│   ├── stores/          # Zustand 狀態管理（projectStore）
│   ├── data/            # 數據層（workflow, tools）
│   ├── utils/           # 工具函數（calculations, formatters, validators）
│   ├── App.jsx          # 路由配置
│   ├── main.jsx         # 入口點
│   └── index.css        # Tailwind 樣式
├── public/              # 靜態資源
├── package.json         # 依賴和腳本
├── vite.config.js       # Vite 配置
├── tailwind.config.js   # Tailwind 配置
├── postcss.config.js    # PostCSS 配置
└── vercel.json          # Vercel 部署配置
```

## 開發工作流

### 添加新步驟

1. 在 `src/data/workflow.js` 中添加步驟數據
2. 在 `Tutorial.jsx` 中添加導航項
3. 創建相應的內容組件

### 自定義成本計算

編輯 `src/data/tools.js`：

```javascript
const IMAGE_MODELS = {
  'flux-dev': {
    name: 'FLUX.1 Dev',
    price: 0.025,
    quality: '高品質',
    description: '平衡的品質和價格'
  }
  // 添加更多模型...
}
```

### 本地化

編輯 `src/utils/constants.js`：

```javascript
export const LANGUAGES = {
  'zh-TW': '繁體中文',
  'en': 'English'
  // 添加更多語言...
}
```

## 測試

### 手動測試檢查清單

- [ ] 首頁加載正常
- [ ] 教學頁面可以導航所有 12 步
- [ ] 製作助手表單可以提交
- [ ] 成本計算正確
- [ ] 檢查清單可以勾選和保存（localStorage）
- [ ] 下載 Markdown 計劃有效
- [ ] 移動設備適配正常

## 常見問題

**Q: 為什麼我的計算不同？**  
A: 確認你在 Step 2 選擇的工具。不同工具的價格不同。

**Q: 能導出計劃嗎？**  
A: 是的。在助手結果頁面點擊「下載 Markdown 計劃」。

**Q: 可以修改工具價格嗎？**  
A: 可以。編輯 `src/data/tools.js` 並重新構建。

## 後續步驟

1. **部署**：參考 `DEPLOYMENT.md`
2. **完善教學**：添加更多詳細的提示詞示例
3. **集成 API**：連接真實的 AI 生成 API
4. **用戶反饋**：收集用戶意見並改進

## 獲取幫助

- 📖 查看 `README.md` 了解項目信息
- 🚀 參考 `DEPLOYMENT.md` 部署到 Vercel
- 💬 在 GitHub Issues 中提問

---

**祝你使用愉快！🎬✨**

