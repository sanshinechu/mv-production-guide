/**
 * 驗證工具函數
 * 用於表單驗證和數據檢查
 */

/**
 * 驗證文本不為空
 * @param {string} text - 文本
 * @param {string} fieldName - 字段名
 * @returns {object} { valid: boolean, error: string }
 */
export const validateRequired = (text, fieldName = '此字段') => {
  if (!text || text.trim() === '') {
    return {
      valid: false,
      error: `${fieldName}為必填項`,
    };
  }
  return { valid: true, error: null };
};

/**
 * 驗證數字在範圍內
 * @param {number} num - 數字
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @param {string} fieldName - 字段名
 * @returns {object} { valid: boolean, error: string }
 */
export const validateNumberRange = (num, min, max, fieldName = '此字段') => {
  if (typeof num !== 'number') {
    return {
      valid: false,
      error: `${fieldName}必須是數字`,
    };
  }

  if (num < min || num > max) {
    return {
      valid: false,
      error: `${fieldName}必須在 ${min} 到 ${max} 之間`,
    };
  }

  return { valid: true, error: null };
};

/**
 * 驗證文本長度
 * @param {string} text - 文本
 * @param {number} minLength - 最小長度
 * @param {number} maxLength - 最大長度
 * @param {string} fieldName - 字段名
 * @returns {object} { valid: boolean, error: string }
 */
export const validateLength = (text, minLength, maxLength, fieldName = '此字段') => {
  const length = text ? text.length : 0;

  if (length < minLength) {
    return {
      valid: false,
      error: `${fieldName}至少需要 ${minLength} 個字符`,
    };
  }

  if (length > maxLength) {
    return {
      valid: false,
      error: `${fieldName}最多只能 ${maxLength} 個字符`,
    };
  }

  return { valid: true, error: null };
};

/**
 * 驗證電子郵件格式
 * @param {string} email - 電子郵件
 * @returns {object} { valid: boolean, error: string }
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      valid: false,
      error: '請輸入有效的電子郵件地址',
    };
  }

  return { valid: true, error: null };
};

/**
 * 驗證 URL 格式
 * @param {string} url - URL
 * @returns {object} { valid: boolean, error: string }
 */
export const validateURL = (url) => {
  try {
    new URL(url);
    return { valid: true, error: null };
  } catch {
    return {
      valid: false,
      error: '請輸入有效的 URL',
    };
  }
};

/**
 * 驗證 MV 表單數據
 * @param {object} formData - 表單數據
 * @returns {object} { valid: boolean, errors: object }
 */
export const validateMVFormData = (formData) => {
  const errors = {};

  // 驗證主題
  const themeValidation = validateRequired(formData.theme, '主題');
  if (!themeValidation.valid) {
    errors.theme = themeValidation.error;
  } else {
    const lengthValidation = validateLength(formData.theme, 5, 500, '主題');
    if (!lengthValidation.valid) {
      errors.theme = lengthValidation.error;
    }
  }

  // 驗證時長
  const durationValidation = validateNumberRange(formData.duration, 30, 600, '時長');
  if (!durationValidation.valid) {
    errors.duration = durationValidation.error;
  }

  // 驗證主角數量
  const characterValidation = validateNumberRange(formData.characters, 1, 3, '主角數量');
  if (!characterValidation.valid) {
    errors.characters = characterValidation.error;
  }

  // 驗證曲風
  const validStyles = ['indie-pop', 'rb', 'pop', 'ballad'];
  if (!validStyles.includes(formData.style)) {
    errors.style = '請選擇有效的曲風';
  }

  // 驗證模型選擇
  const validImageModels = ['flux-dev', 'ideogram', 'flux-schnell', 'flux-pro'];
  if (!validImageModels.includes(formData.imageModel)) {
    errors.imageModel = '請選擇有效的圖像生成模型';
  }

  const validVideoModels = ['kling', 'hailuo', 'seedance', 'wan'];
  if (!validVideoModels.includes(formData.videoModel)) {
    errors.videoModel = '請選擇有效的影片生成模型';
  }

  const validMusicSources = ['suno', 'custom'];
  if (!validMusicSources.includes(formData.musicSource)) {
    errors.musicSource = '請選擇有效的音樂來源';
  }

  // 驗證優先級
  const validPriorities = ['quality', 'balanced', 'budget'];
  if (!validPriorities.includes(formData.priority)) {
    errors.priority = '請選擇有效的預算優先級';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * 驗證檢查清單項目
 * @param {object} item - 清單項目
 * @returns {object} { valid: boolean, error: string }
 */
export const validateChecklistItem = (item) => {
  if (!item.id || !item.title) {
    return {
      valid: false,
      error: '清單項目必須包含 ID 和標題',
    };
  }

  return { valid: true, error: null };
};

/**
 * 批量驗證
 * @param {array} validators - 驗證函數陣列
 * @returns {object} { valid: boolean, errors: array }
 */
export const validateAll = (validators) => {
  const errors = [];

  validators.forEach((validator) => {
    const result = validator();
    if (!result.valid) {
      errors.push(result.error);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * 檢查對象中是否有空值
 * @param {object} obj - 對象
 * @param {array} requiredFields - 必填字段陣列
 * @returns {object} { valid: boolean, missingFields: array }
 */
export const validateObjectFields = (obj, requiredFields = []) => {
  const missingFields = [];

  requiredFields.forEach((field) => {
    if (!obj[field] || (typeof obj[field] === 'string' && obj[field].trim() === '')) {
      missingFields.push(field);
    }
  });

  return {
    valid: missingFields.length === 0,
    missingFields,
  };
};
