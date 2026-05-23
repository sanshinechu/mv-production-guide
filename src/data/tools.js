/**
 * AI Tools Database
 * 包含所有 MV 製作中使用的 AI 工具、模型和定價資訊
 */

// 圖像生成模型
export const IMAGE_MODELS = {
  'flux-dev': {
    id: 'flux-dev',
    name: 'FLUX.1 Dev',
    provider: 'Black Forest Labs',
    price: 0.025,
    currency: 'USD',
    pricePerUnit: '張',
    quality: '高品質、平衡',
    speed: '中速',
    recommended: true,
    description: '最平衡的選擇，品質和成本的最佳比例',
    strengths: ['高品質輸出', '描述理解能力強', '細節精緻'],
    weaknesses: ['速度中等'],
    bestFor: ['人物肖像', '場景設計', '分鏡圖'],
  },
  'flux-pro': {
    id: 'flux-pro',
    name: 'FLUX.1 Pro',
    provider: 'Black Forest Labs',
    price: 0.05,
    currency: 'USD',
    pricePerUnit: '張',
    quality: '最高品質',
    speed: '中速',
    recommended: false,
    description: '最高品質輸出，適合極高要求的製作',
    strengths: ['最高品質', '細節完美'],
    weaknesses: ['成本最高', '速度慢'],
    bestFor: ['高級商用製作', '完美主義專案'],
  },
  'ideogram': {
    id: 'ideogram',
    name: 'Ideogram V3',
    provider: 'Ideogram',
    price: 0.05,
    currency: 'USD',
    pricePerUnit: '張',
    quality: '高品質，文字強',
    speed: '中速',
    recommended: false,
    description: '文字渲染能力最強，適合需要文字的場景',
    strengths: ['文字渲染完美', '品質高'],
    weaknesses: ['文字場景專用'],
    bestFor: ['包含文字的畫面', '字幕設計'],
  },
  'flux-schnell': {
    id: 'flux-schnell',
    name: 'FLUX Schnell',
    provider: 'Black Forest Labs',
    price: 0.003,
    currency: 'USD',
    pricePerUnit: '張',
    quality: '中等品質',
    speed: '最快',
    recommended: false,
    description: '最便宜最快，適合快速草稿和預算有限的專案',
    strengths: ['最便宜', '最快'],
    weaknesses: ['品質相對較低', '細節可能缺失'],
    bestFor: ['快速原型', '預算優先專案'],
  },
};

// 影片生成模型
export const VIDEO_MODELS = {
  'kling': {
    id: 'kling',
    name: 'Kling V2.1',
    provider: 'Kuaishou',
    price: 0.07,
    currency: 'USD',
    pricePerUnit: '秒',
    maxDuration: 5,
    quality: '人物表現力強',
    speed: '快',
    recommended: true,
    description: '臉部表情和人物動作最自然，最適合 MV 主角鏡頭',
    strengths: ['臉部表情最佳', '人物動作流暢', '成本合理'],
    weaknesses: ['最長 5 秒', '場景複雜度有限'],
    bestFor: ['人物對話', '臉部特寫', '主角鏡頭'],
    costPerSegment: (duration) => duration * 0.07,
  },
  'hailuo': {
    id: 'hailuo',
    name: 'Hailuo',
    provider: 'Minimax',
    price: 0.28,
    currency: 'USD',
    pricePerUnit: '6 秒',
    maxDuration: 12,
    quality: '電影感、場景豐富',
    speed: '中速',
    recommended: false,
    description: '電影感強，適合場景轉換和環境鏡頭',
    strengths: ['電影感強', '場景表現力好', '時間長'],
    weaknesses: ['臉部細節不如 Kling', '成本相對高'],
    bestFor: ['場景轉換', '環境鏡頭', '背景動態'],
    costPerSegment: (duration) => Math.ceil(duration / 6) * 0.28,
  },
  'seedance': {
    id: 'seedance',
    name: 'Seedance 2.0',
    provider: 'Dreamina',
    price: 0.2,
    currency: 'USD',
    pricePerUnit: '秒',
    maxDuration: 10,
    quality: '頂級專業',
    speed: '中速',
    recommended: false,
    description: '最專業的電影感，適合 MV 高潮片段',
    strengths: ['最高品質', '電影感最強'],
    weaknesses: ['成本最高', '速度慢'],
    bestFor: ['MV 高潮部分', '商用高級製作'],
    costPerSegment: (duration) => duration * 0.2,
  },
  'wan': {
    id: 'wan',
    name: 'Wan 2.1',
    provider: 'ByteDance',
    price: 0.1,
    currency: 'USD',
    pricePerUnit: '秒',
    maxDuration: 5,
    quality: '中等品質',
    speed: '快',
    recommended: false,
    description: '便宜快速，適合預算優先的專案',
    strengths: ['便宜', '快速'],
    weaknesses: ['品質一般'],
    bestFor: ['預算優先', '快速製作'],
    costPerSegment: (duration) => duration * 0.1,
  },
};

// 音樂來源
export const MUSIC_SOURCES = {
  'suno': {
    id: 'suno',
    name: 'SUNO AI',
    provider: 'Suno',
    price: 0,
    currency: 'USD',
    subscription: '免費或 $10/月',
    description: 'AI 音樂生成平台，可根據提示詞生成原創音樂',
    strengths: ['完全免費選項', '快速生成', '自訂度高'],
    weaknesses: ['需要良好的提示詞'],
    bestFor: ['原創配樂', '所有 MV 專案'],
  },
  'custom': {
    id: 'custom',
    name: '自備音樂',
    provider: '用戶提供',
    price: 0,
    currency: 'USD',
    subscription: '無',
    description: '使用現有的歌曲或自製音樂',
    strengths: ['成本零', '完全控制'],
    weaknesses: ['需要自己準備'],
    bestFor: ['有現成音樂的專案'],
  },
};

// 預設配置：不同預算等級的工具組合
export const BUDGET_PRESETS = {
  'quality': {
    id: 'quality',
    name: '質量優先',
    emoji: '👑',
    description: '推薦高端模型，總成本約 $20-25',
    imageModel: 'flux-pro',
    videoModel: 'seedance',
    musicSource: 'suno',
    estimatedCost: { min: 20, max: 25 },
  },
  'balanced': {
    id: 'balanced',
    name: '平衡',
    emoji: '⚖️',
    description: '中等價位，總成本約 $10-15',
    imageModel: 'flux-dev',
    videoModel: 'hailuo',
    musicSource: 'suno',
    estimatedCost: { min: 10, max: 15 },
  },
  'budget': {
    id: 'budget',
    name: '預算優先',
    emoji: '💰',
    description: '最便宜方案，總成本約 $1.50-5',
    imageModel: 'flux-schnell',
    videoModel: 'kling',
    musicSource: 'suno',
    estimatedCost: { min: 1.5, max: 5 },
  },
};

/**
 * 計算成本輔助函數
 */

/**
 * 根據選擇的模型和參數計算圖像生成成本
 * @param {number} imageCount - 圖像數量
 * @param {string} imageModelId - 圖像模型 ID
 * @returns {number} 成本（美元）
 */
export const calculateImageCost = (imageCount, imageModelId) => {
  const model = IMAGE_MODELS[imageModelId];
  if (!model) return 0;
  return imageCount * model.price;
};

/**
 * 根據選擇的模型和時長計算影片生成成本
 * @param {number} duration - 總時長（秒）
 * @param {string} videoModelId - 影片模型 ID
 * @returns {number} 成本（美元）
 */
export const calculateVideoCost = (duration, videoModelId) => {
  const model = VIDEO_MODELS[videoModelId];
  if (!model) return 0;

  if (model.costPerSegment) {
    return model.costPerSegment(duration);
  }

  return duration * model.price;
};

/**
 * 根據選擇的來源計算音樂成本
 * @param {string} musicSourceId - 音樂來源 ID
 * @returns {number} 成本（美元）
 */
export const calculateMusicCost = (musicSourceId) => {
  const source = MUSIC_SOURCES[musicSourceId];
  if (!source) return 0;
  return source.price;
};

/**
 * 計算預設配置的估計成本
 * @param {string} presetId - 預設 ID（quality/balanced/budget）
 * @param {number} imageCount - 圖像數量
 * @param {number} duration - 影片時長
 * @returns {object} 成本估計
 */
export const calculatePresetCost = (presetId, imageCount, duration) => {
  const preset = BUDGET_PRESETS[presetId];
  if (!preset) return { imageCost: 0, videoCost: 0, musicCost: 0, totalCost: 0 };

  const imageCost = calculateImageCost(imageCount, preset.imageModel);
  const videoCost = calculateVideoCost(duration, preset.videoModel);
  const musicCost = calculateMusicCost(preset.musicSource);

  return {
    imageCost: parseFloat(imageCost.toFixed(2)),
    videoCost: parseFloat(videoCost.toFixed(2)),
    musicCost: parseFloat(musicCost.toFixed(2)),
    totalCost: parseFloat((imageCost + videoCost + musicCost).toFixed(2)),
  };
};

/**
 * 根據字符數估計圖像數量
 * MV_02 設計 + MV_03 場景 + MV_04 九宮格（每個 9 張）
 * @param {number} characters - 主角數量
 * @returns {number} 預計圖像數量
 */
export const estimateImageCount = (characters = 1) => {
  // 角色設計：2 張/人（分割屏）
  const portraitImages = characters * 2;

  // 假設 3 個場景，每個場景九宮格（9 張）
  const nineGridImages = 3 * 9;

  // 額外角度和細節：每人 4 張
  const additionalShots = characters * 4;

  return portraitImages + nineGridImages + additionalShots;
};

/**
 * 根據時長估計影片段數
 * @param {number} duration - 總時長（秒）
 * @returns {number} 預計視頻段數
 */
export const estimateVideoSegments = (duration = 180) => {
  // 平均每段 30 秒
  return Math.ceil(duration / 30);
};

/**
 * 獲取工具的詳細資訊
 */
export const getToolInfo = (toolId, type = 'image') => {
  if (type === 'image') return IMAGE_MODELS[toolId];
  if (type === 'video') return VIDEO_MODELS[toolId];
  if (type === 'music') return MUSIC_SOURCES[toolId];
  return null;
};

/**
 * 獲取所有圖像模型列表
 */
export const getImageModelsList = () => {
  return Object.values(IMAGE_MODELS).map((model) => ({
    ...model,
    type: 'image',
  }));
};

/**
 * 獲取所有影片模型列表
 */
export const getVideoModelsList = () => {
  return Object.values(VIDEO_MODELS).map((model) => ({
    ...model,
    type: 'video',
  }));
};

/**
 * 獲取所有音樂來源列表
 */
export const getMusicSourcesList = () => {
  return Object.values(MUSIC_SOURCES).map((source) => ({
    ...source,
    type: 'music',
  }));
};
