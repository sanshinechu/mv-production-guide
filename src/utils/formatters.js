/**
 * 格式化工具函數
 * 用於將數據轉換為可讀的格式
 */

/**
 * 格式化成本為貨幣
 * @param {number} amount - 金額
 * @returns {string} 格式化後的字符串
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * 格式化時間（分鐘）為可讀格式
 * @param {number} minutes - 分鐘數
 * @returns {string} 格式化後的字符串
 */
export const formatTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes} 分鐘`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} 小時`;
  }

  return `${hours} 小時 ${remainingMinutes} 分鐘`;
};

/**
 * 格式化時間範圍
 * @param {number} min - 最小值（分鐘）
 * @param {number} max - 最大值（分鐘）
 * @returns {string} 格式化後的範圍字符串
 */
export const formatTimeRange = (min, max) => {
  return `${formatTime(min)} - ${formatTime(max)}`;
};

/**
 * 格式化成本範圍
 * @param {number} min - 最小值（美元）
 * @param {number} max - 最大值（美元）
 * @returns {string} 格式化後的範圍字符串
 */
export const formatCostRange = (min, max) => {
  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
};

/**
 * 格式化日期
 * @param {Date|string} date - 日期對象或字符串
 * @returns {string} 格式化後的日期字符串
 */
export const formatDate = (date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * 格式化日期和時間
 * @param {Date|string} date - 日期對象或字符串
 * @returns {string} 格式化後的日期時間字符串
 */
export const formatDateTime = (date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * 將百分比轉換為進度條顯示
 * @param {number} percentage - 百分比（0-100）
 * @returns {string} 格式化的百分比字符串
 */
export const formatPercentage = (percentage) => {
  return `${Math.round(percentage)}%`;
};

/**
 * 格式化步驟 ID 為可讀形式
 * @param {string} stepId - 步驟 ID（例如 'mv-01'）
 * @returns {string} 格式化後的步驟名稱
 */
export const formatStepId = (stepId) => {
  return stepId
    .toUpperCase()
    .replace(/-/g, '_')
    .replace(/MV_0/, 'MV_')
    .replace(/STEP_0/, 'Step ');
};

/**
 * 截斷長文本
 * @param {string} text - 文本
 * @param {number} length - 最大長度
 * @returns {string} 截斷後的文本
 */
export const truncateText = (text, length = 100) => {
  if (text.length <= length) {
    return text;
  }
  return text.substring(0, length) + '...';
};

/**
 * 首字母大寫
 * @param {string} text - 文本
 * @returns {string} 首字母大寫後的文本
 */
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * 將毫秒轉換為可讀的持續時間
 * @param {number} milliseconds - 毫秒
 * @returns {string} 可讀的持續時間
 */
export const formatDuration = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours} 小時 ${minutes % 60} 分鐘`;
  }
  if (minutes > 0) {
    return `${minutes} 分鐘 ${seconds % 60} 秒`;
  }
  return `${seconds} 秒`;
};

/**
 * 將數字轉換為中文大寫（用於正式文檔）
 * @param {number} num - 數字
 * @returns {string} 中文大寫
 */
export const toChineseNumber = (num) => {
  const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  if (num < 10) {
    return chineseNumbers[num];
  }
  // 簡單實現，只支持到 99
  const tens = Math.floor(num / 10);
  const ones = num % 10;
  let result = '';
  if (tens === 1) {
    result = '十';
  } else if (tens > 1) {
    result = chineseNumbers[tens] + '十';
  }
  if (ones > 0) {
    result += chineseNumbers[ones];
  }
  return result || '零';
};
