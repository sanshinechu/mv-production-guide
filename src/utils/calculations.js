/**
 * 成本和時間計算工具
 */

import {
  IMAGE_MODELS,
  VIDEO_MODELS,
  MUSIC_SOURCES,
  estimateImageCount,
  estimateVideoSegments,
  calculateImageCost,
  calculateVideoCost,
  calculateMusicCost,
} from '../data/tools';

/**
 * 計算完整 MV 製作的成本估計
 * @param {object} inputs - 輸入參數
 *   - duration: MV 時長（秒）
 *   - characters: 主角數量
 *   - imageModel: 圖像模型 ID
 *   - videoModel: 影片模型 ID
 *   - musicSource: 音樂來源 ID
 * @returns {object} 成本分解
 */
export const calculateProjectCost = (inputs) => {
  const {
    duration = 180,
    characters = 1,
    imageModel = 'flux-dev',
    videoModel = 'kling',
    musicSource = 'suno',
  } = inputs;

  // 計算圖像數量和成本
  const imageCount = estimateImageCount(characters);
  const imageCost = calculateImageCost(imageCount, imageModel);

  // 計算影片成本
  const videoCost = calculateVideoCost(duration, videoModel);

  // 計算音樂成本
  const musicCost = calculateMusicCost(musicSource);

  // 總成本
  const totalCost = imageCost + videoCost + musicCost;

  return {
    imageCost: parseFloat(imageCost.toFixed(2)),
    videoCost: parseFloat(videoCost.toFixed(2)),
    musicCost: parseFloat(musicCost.toFixed(2)),
    totalCost: parseFloat(totalCost.toFixed(2)),
    breakdown: {
      images: {
        count: imageCount,
        unit: '張',
        unitPrice: IMAGE_MODELS[imageModel]?.price || 0,
        cost: parseFloat(imageCost.toFixed(2)),
      },
      videos: {
        duration: duration,
        unit: '秒',
        unitPrice: VIDEO_MODELS[videoModel]?.price || 0,
        cost: parseFloat(videoCost.toFixed(2)),
      },
      music: {
        source: MUSIC_SOURCES[musicSource]?.name || '未知',
        cost: parseFloat(musicCost.toFixed(2)),
      },
    },
  };
};

/**
 * 計算時程表（每個步驟的時間估計）
 * @param {object} inputs - 輸入參數
 * @returns {array} 時間分析
 */
export const generateTimeline = (inputs) => {
  const {
    duration = 180,
    characters = 1,
    imageModel = 'flux-dev',
    videoModel = 'kling',
  } = inputs;

  // Phase 1: 概念到設計
  const phase1Steps = [
    { step: 'MV_01: 歌詞創作', duration: { min: 30, max: 45 } },
    { step: 'MV_02: 主角設計', duration: { min: 15, max: 30 } },
    { step: 'MV_03: 場景提示詞', duration: { min: 30, max: 40 } },
    { step: 'MV_04: 分鏡設計', duration: { min: 30, max: 45 } },
    { step: 'MV_05: 截圖放大', duration: { min: 10, max: 15 } },
    { step: 'MV_06: 影片提示詞', duration: { min: 25, max: 40 } },
  ];

  const phase1TotalMin = phase1Steps.reduce((sum, s) => sum + s.duration.min, 0);
  const phase1TotalMax = phase1Steps.reduce((sum, s) => sum + s.duration.max, 0);

  // Phase 2: 視覺生成
  const imageGenerationTime = { min: 30, max: 60 }; // AI 等待時間
  const videoGenerationTime = { min: 45, max: 90 }; // 根據模型
  const assemblyTime = { min: 10, max: 15 }; // FFmpeg 組裝
  const validationTime = { min: 10, max: 15 }; // 驗證檢查

  const phase2TotalMin =
    imageGenerationTime.min + videoGenerationTime.min + assemblyTime.min + validationTime.min;
  const phase2TotalMax =
    imageGenerationTime.max + videoGenerationTime.max + assemblyTime.max + validationTime.max;

  // Phase 3: 打包上傳
  const packagingTime = { min: 5, max: 10 };
  const uploadTime = { min: 15, max: 30 };

  const phase3TotalMin = packagingTime.min + uploadTime.min;
  const phase3TotalMax = packagingTime.max + uploadTime.max;

  // 總計
  const totalMin = phase1TotalMin + phase2TotalMin + phase3TotalMin;
  const totalMax = phase1TotalMax + phase2TotalMax + phase3TotalMax;

  return {
    phases: [
      {
        phase: 1,
        name: '概念到設計',
        steps: phase1Steps,
        totalTime: { min: phase1TotalMin, max: phase1TotalMax },
      },
      {
        phase: 2,
        name: '視覺生成',
        steps: [
          { step: 'MV_07: 生圖', duration: imageGenerationTime },
          { step: 'MV_08: 生影片', duration: videoGenerationTime },
          { step: 'Step 9: FFmpeg 組裝', duration: assemblyTime },
          { step: 'Step 10: 驗證檢查', duration: validationTime },
        ],
        totalTime: { min: phase2TotalMin, max: phase2TotalMax },
      },
      {
        phase: 3,
        name: '打包上傳',
        steps: [
          { step: 'Step 11: 打包整理', duration: packagingTime },
          { step: 'Step 12: YouTube 上傳', duration: uploadTime },
        ],
        totalTime: { min: phase3TotalMin, max: phase3TotalMax },
      },
    ],
    totalTime: { min: totalMin, max: totalMax },
    estimatedHours: {
      min: (totalMin / 60).toFixed(1),
      max: (totalMax / 60).toFixed(1),
    },
  };
};

/**
 * 將分鐘轉換為小時和分鐘的字符串
 * @param {number} minutes - 分鐘數
 * @returns {string} 格式化的時間字符串
 */
export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins} 分鐘`;
  if (mins === 0) return `${hours} 小時`;
  return `${hours} 小時 ${mins} 分鐘`;
};

/**
 * 格式化成本為貨幣字符串
 * @param {number} cost - 成本（美元）
 * @returns {string} 格式化的成本字符串
 */
export const formatCost = (cost) => {
  return `$${cost.toFixed(2)}`;
};

/**
 * 根據預算等級推薦工具組合
 * @param {string} priority - 優先級（quality/balanced/budget）
 * @returns {object} 推薦的工具組合
 */
export const getRecommendedTools = (priority = 'balanced') => {
  const recommendations = {
    quality: {
      imageModel: 'flux-pro',
      videoModel: 'seedance',
      musicSource: 'suno',
      label: '質量優先',
      description: '使用最高端的模型，確保最佳品質',
    },
    balanced: {
      imageModel: 'flux-dev',
      videoModel: 'hailuo',
      musicSource: 'suno',
      label: '平衡',
      description: '性價比最優，品質和成本均衡',
    },
    budget: {
      imageModel: 'flux-schnell',
      videoModel: 'kling',
      musicSource: 'suno',
      label: '預算優先',
      description: '最經濟的方案，保持可接受的品質',
    },
  };

  return recommendations[priority] || recommendations.balanced;
};

/**
 * 驗證輸入參數
 * @param {object} inputs - 輸入參數
 * @returns {object} 驗證結果 { valid: boolean, errors: array }
 */
export const validateProjectInputs = (inputs) => {
  const errors = [];

  if (!inputs.theme || inputs.theme.trim() === '') {
    errors.push('請輸入 MV 主題');
  }

  if (!inputs.duration || inputs.duration < 30 || inputs.duration > 600) {
    errors.push('MV 時長必須在 30-600 秒之間');
  }

  if (!inputs.characters || inputs.characters < 1 || inputs.characters > 3) {
    errors.push('主角數量必須在 1-3 人之間');
  }

  if (!inputs.imageModel || !IMAGE_MODELS[inputs.imageModel]) {
    errors.push('請選擇有效的圖像生成模型');
  }

  if (!inputs.videoModel || !VIDEO_MODELS[inputs.videoModel]) {
    errors.push('請選擇有效的影片生成模型');
  }

  if (!inputs.musicSource || !MUSIC_SOURCES[inputs.musicSource]) {
    errors.push('請選擇有效的音樂來源');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * 生成成本和時間的完整分析
 * @param {object} inputs - 輸入參數
 * @returns {object} 完整分析數據
 */
export const generateCompleteAnalysis = (inputs) => {
  // 驗證輸入
  const validation = validateProjectInputs(inputs);
  if (!validation.valid) {
    return {
      valid: false,
      errors: validation.errors,
    };
  }

  // 計算成本
  const cost = calculateProjectCost(inputs);

  // 生成時程表
  const timeline = generateTimeline(inputs);

  // 獲取工具信息
  const selectedTools = {
    imageModel: IMAGE_MODELS[inputs.imageModel],
    videoModel: VIDEO_MODELS[inputs.videoModel],
    musicSource: MUSIC_SOURCES[inputs.musicSource],
  };

  return {
    valid: true,
    inputs,
    cost,
    timeline,
    selectedTools,
    summary: {
      totalCost: formatCost(cost.totalCost),
      totalTime: `${timeline.estimatedHours.min} - ${timeline.estimatedHours.max} 小時`,
      imageCount: cost.breakdown.images.count,
      videoDuration: cost.breakdown.videos.duration,
    },
  };
};
