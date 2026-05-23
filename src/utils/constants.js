/**
 * 應用常數定義
 */

// MV 製作的支援樣式
export const MV_STYLES = [
  { value: 'indie-pop', label: 'Indie Pop' },
  { value: 'rb', label: 'R&B/Soul' },
  { value: 'pop', label: 'Pop' },
  { value: 'ballad', label: 'Ballad' },
  { value: 'edm', label: 'EDM' },
  { value: 'hip-hop', label: 'Hip-Hop' },
  { value: 'folk', label: 'Folk' },
];

// 時長範圍（秒）
export const DURATION_CONFIG = {
  min: 30,
  max: 600,
  default: 180,
  step: 10,
};

// 主角數量範圍
export const CHARACTER_CONFIG = {
  min: 1,
  max: 3,
  default: 2,
};

// 應用顏色配置
export const APP_COLORS = {
  primary: '#2563eb',
  secondary: '#7c3aed',
  success: '#16a34a',
  warning: '#ea580c',
  error: '#dc2626',
  info: '#0891b2',
};

// 應用尺寸配置
export const APP_SIZES = {
  containerMaxWidth: '1280px',
  sidebarWidth: '256px',
  headerHeight: '64px',
  footerHeight: '200px',
};

// 儲存鍵值
export const STORAGE_KEYS = {
  projectData: 'mv-project-data',
  userPreferences: 'mv-user-preferences',
  tutorials: 'mv-tutorials-completed',
};

// 動畫時間（毫秒）
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// API 端點（若使用）
export const API_ENDPOINTS = {
  generateImage: '/api/generate/image',
  generateVideo: '/api/generate/video',
  generateMusic: '/api/generate/music',
};

// 日期時間格式
export const DATE_FORMATS = {
  short: 'YYYY-MM-DD',
  long: 'YYYY-MM-DD HH:mm:ss',
  display: 'MMM DD, YYYY',
};

// 語言配置
export const LANGUAGES = {
  'zh-TW': '繁體中文',
  'en': 'English',
};

// 預設語言
export const DEFAULT_LANGUAGE = 'zh-TW';

// 應用信息
export const APP_INFO = {
  name: 'MV 製作完整指南',
  version: '1.0.0',
  description: '從歌詞創作到 YouTube 發布的 12 步完整工作流程',
  author: '羅東國小資訊組',
  github: 'https://github.com/yourusername/mv-guide',
  website: 'https://mv-guide.example.com',
};

// 常見問題類別
export const FAQ_CATEGORIES = [
  { id: 'general', label: '一般問題' },
  { id: 'tools', label: '工具相關' },
  { id: 'workflow', label: '工作流程' },
  { id: 'cost', label: '成本相關' },
  { id: 'technical', label: '技術問題' },
];

// 圖表配置
export const CHART_CONFIG = {
  lineChart: {
    margin: { top: 5, right: 30, left: 0, bottom: 5 },
    height: 300,
  },
  barChart: {
    margin: { top: 20, right: 30, left: 0, bottom: 20 },
    height: 300,
  },
  pieChart: {
    height: 300,
  },
};

// 驗證規則
export const VALIDATION_RULES = {
  theme: {
    minLength: 5,
    maxLength: 500,
  },
  duration: {
    min: 30,
    max: 600,
  },
  characters: {
    min: 1,
    max: 3,
  },
};
