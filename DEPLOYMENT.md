# 部署指南

## 本地開發環境設置

### 1. 安裝依賴（首選：本地目錄）

由於 Google Drive 存在文件權限問題，建議在本地目錄安裝依賴：

```bash
# 方案 A：在本地目錄安裝（推薦）
cd C:\Users\user\Desktop\mv-guide  # 或任何本地目錄
# 複製源代碼到本地
# 然後執行：
npm install --legacy-peer-deps
```

### 2. 啟動開發伺服器

```bash
npm run dev
```

應用將在 `http://localhost:5173` 啟動。

### 3. 構建生產版本

```bash
npm run build
```

構建輸出在 `dist/` 目錄。

## 部署到 Vercel

### 方案 A：使用 Vercel CLI

```bash
npm install -g vercel
vercel
```

按照提示登錄和部署。

### 方案 B：使用 GitHub + Vercel

1. 初始化 git 並推送到 GitHub：
```bash
git add .
git commit -m "Initial commit: MV 製作完整指南"
git remote add origin https://github.com/YOUR_USERNAME/mv-guide.git
git push -u origin main
```

2. 在 Vercel 中連接 GitHub 倉庫：
   - 訪問 vercel.com
   - 點擊「New Project」
   - 選擇 GitHub 倉庫
   - Vercel 會自動檢測 Vite 配置
   - 點擊「Deploy」

### 方案 C：Docker 部署

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 環境變數

在 Vercel 中設置以下環境變數：

- `VITE_APP_NAME`: "MV 製作完整指南"

## 解決常見問題

### npm install 失敗（Google Drive 權限問題）

**原因**：Google Drive 的文件系統不支持某些文件操作。

**解決方案**：
1. 在本地目錄（C: 或 D: 硬碟）安裝依賴
2. 將 node_modules 複製回項目
3. 或直接部署到 Vercel（Vercel 會在他們的伺服器上安裝）

### Vite 無法啟動

```bash
# 清空 node_modules 和 cache
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

### 端口 5173 已被占用

```bash
# 使用不同端口
npm run dev -- --port 5174
```

## 構建優化

### 代碼分割

應用已配置自動代碼分割，確保快速首屏加載。

### 資源優化

- 圖片將被自動優化
- CSS 會被最小化
- JavaScript 會被壓縮

## 監控和分析

部署後，可以在 Vercel 儀表板中查看：

- 構建時間
- 部署狀態
- 性能指標（Core Web Vitals）
- 錯誤日誌

## 回滾

如果部署有問題，可以在 Vercel 儀表板中快速回滾到之前的版本。

---

**預計首次加載時間**：< 2 秒（使用 Vercel Edge）
**部署時間**：3-5 分鐘
**構建時間**：1-2 分鐘

