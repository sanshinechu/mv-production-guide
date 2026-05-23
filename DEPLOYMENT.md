# MV 製作完整指南 - 部署說明

## 快速部署到 Vercel（推薦）

### 方式 1：透過 Vercel 網站（最簡單）

1. 訪問 [Vercel.com](https://vercel.com)
2. 用 GitHub 帳戶登錄或註冊
3. 點擊「New Project」按鈕
4. 點擊「Import Git Repository」
5. 搜索並選擇 `mv-production-guide` 倉庫
6. 點擊「Import」
7. 在配置頁面上：
   - **Project Name**: 可保持預設或自訂（例：`mv-guide`）
   - **Framework**: 選擇 `Vite`
   - **Root Directory**: `./`
   - 其他設置保持預設
8. 點擊「Deploy」

部署完成後，Vercel 會提供一個公開 URL

### 方式 2：本地開發設置

由於 Google Drive 文件系統限制，建議在本地磁碟上開發：

```bash
git clone https://github.com/sanshinechu/mv-production-guide.git
cd mv-production-guide
npm install --legacy-peer-deps
npm run dev
```

## 快速連結

- **GitHub 倉庫**: https://github.com/sanshinechu/mv-production-guide
- **部署網址**: 待配置
