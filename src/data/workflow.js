/**
 * MV 製作 12 步完整流程數據結構
 */

export const WORKFLOW_STEPS = [
  // Phase 1: 概念到設計
  {
    id: 'mv-01',
    phase: 1,
    phaseName: '概念到設計',
    step: 1,
    emoji: '✍️',
    title: '歌詞創作與曲風風格',
    shortDesc: '創作適合 SUNO 的歌詞和風格描述',
    duration: { min: 30, max: 45, unit: '分鐘' },
    cost: 0,
    description: `
根據主題創作完整的歌詞，包含歌曲結構標籤（Verse、Chorus、Bridge 等）。
同時為 SUNO 音樂生成平台編寫專業的英文風格描述。

主要任務：
- 分析主題和情感基調
- 創作含結構標籤的歌詞
- 編寫 SUNO 風格描述（英文）
- 確認音樂時長和調性
    `,
    tools: ['Claude AI'],
    outputs: ['完整歌詞', 'SUNO 風格描述'],
    tips: [
      '使用方括號標示歌詞結構：[Verse]、[Chorus] 等',
      '在方括號內添加情緒標籤：[Chorus, happy, energetic]',
      '英文風格描述要詳細，包含節奏、樂器、情緒等',
      '歌詞時長應在 3-5 分鐘之間'
    ],
    checklist: [
      '歌詞結構完整',
      '風格描述用英文編寫',
      '包含情緒和樂器描述',
      '時長確認'
    ]
  },
  {
    id: 'mv-02',
    phase: 1,
    phaseName: '概念到設計',
    step: 2,
    emoji: '👤',
    title: '主角設計',
    shortDesc: '設計 MV 主角的外觀和氣質',
    duration: { min: 15, max: 30, unit: '分鐘' },
    cost: 0,
    description: `
根據歌詞和曲風，設計主角的完整形象（臉部特寫 + 全身照）。
採用 Split Screen 垂直分割格式，便於後續 AI 生圖。

設計要素：
- 種族背景：東亞（East Asian）
- 髮型：根據曲風選擇
- 穿著：風格、材質、單品描述
- 氣質：性格特質和情緒基調
    `,
    tools: ['Claude AI', 'AI 生圖工具（可選）'],
    outputs: ['英文影像提示詞', '中文設計說明', '角色一致性參考詞'],
    tips: [
      '提示詞要詳細描述臉部五官和全身比例',
      '英文提示詞應包含光線、背景、攝影風格',
      '考慮後續場景，確保主角能融入各種環境',
      '生成 Split Screen 格式便於 MV 使用'
    ],
    checklist: [
      '英文提示詞完整',
      '包含臉部特寫和全身照',
      '有中文設計說明',
      '生成角色一致性參考詞'
    ]
  },
  {
    id: 'mv-03',
    phase: 1,
    phaseName: '概念到設計',
    step: 3,
    emoji: '🎬',
    title: '場景提示詞',
    shortDesc: '為各個歌詞段落設計場景',
    duration: { min: 30, max: 40, unit: '分鐘' },
    cost: 0,
    description: `
根據歌詞內容分析，為每個歌詞段落設計具體的場景視覺描述。
包含場景設定、角色動作、構圖、光影、特效等要素。

設計步驟：
1. 分析歌詞結構和時長分配
2. 識別關鍵視覺意象
3. 為每個段落編寫場景提示詞
4. 確保視覺連貫性
    `,
    tools: ['Claude AI'],
    outputs: ['2-4 個場景提示詞', '視覺故事線'],
    tips: [
      '每個場景提示詞應 300-400 字',
      '包含主題、構圖、場景、風格、光影等',
      '考慮運鏡方式（Push In、Pan 等）',
      '場景之間應有視覺承接'
    ],
    checklist: [
      '場景數量合理',
      '提示詞字數足夠',
      '包含完整視覺要素',
      '視覺風格一致'
    ]
  },
  {
    id: 'mv-04',
    phase: 1,
    phaseName: '概念到設計',
    step: 4,
    emoji: '🎨',
    title: '九宮格分鏡設計',
    shortDesc: '為每個場景生成 9 宮格分鏡圖',
    duration: { min: 30, max: 45, unit: '分鐘' },
    cost: 0,
    description: `
根據場景提示詞，為每個場景生成一張專業的 9 宮格分鏡設計圖。
9 個格子應展現不同的視角、運動和情緒。

設計原則：
- 廣闊視野：遠景、全身鏡頭
- 敘事中景：互動、表情
- 情緒特寫：臉部、細節
- 戲劇角度：低角度、高角度
    `,
    tools: ['AI 生圖工具（FLUX.1 Dev 推薦）'],
    outputs: ['2-4 張九宮格分鏡圖'],
    tips: [
      '每張圖 9 格必須是同一個場景',
      '角色外觀應完全一致',
      '光影和色彩應統一',
      '視角應多樣化'
    ],
    checklist: [
      '每個場景 1 張九宮格',
      '角色一致性檢查',
      '視角多樣化',
      '色彩統一'
    ]
  },
  {
    id: 'mv-05',
    phase: 1,
    phaseName: '概念到設計',
    step: 5,
    emoji: '🔍',
    title: '截圖放大提質',
    shortDesc: '從九宮格中選擇重點圖片放大',
    duration: { min: 10, max: 15, unit: '分鐘' },
    cost: 0,
    description: `
從九宮格中選擇 1-3 張關鍵圖片（通常是情緒高點），
使用 AI 放大和提質到更高解析度。

選擇標準：
- 角色表情最豐富的
- 場景細節最完整的
- 視覺衝擊最強的
    `,
    tools: ['AI 放大工具'],
    outputs: ['3-4 張高解析度圖片（1672×1672+）'],
    tips: [
      '選擇最能代表場景的圖片',
      '放大時保持細節清晰',
      '提質後檢查是否有變形',
      '保存為高質量格式'
    ],
    checklist: [
      '選擇 1-3 張關鍵圖',
      '放大至 1672×1672 以上',
      '質量檢查無變形',
      '導出高解析度版本'
    ]
  },
  {
    id: 'mv-06',
    phase: 1,
    phaseName: '概念到設計',
    step: 6,
    emoji: '🎥',
    title: '影片提示詞設計',
    shortDesc: '為視頻生成編寫動態效果描述',
    duration: { min: 25, max: 40, unit: '分鐘' },
    cost: 0,
    description: `
基於場景提示詞和九宮格，為每個視頻段編寫詳細的動態效果描述。
包含角色動作、運鏡方式、轉場效果等。

核心要素：
- 角色動態：身體動作、表情變化
- 環境動態：光影變化、背景元素
- 運鏡方式：Push In、Pan、Orbit 等
- 轉場效果：漸變、切割、溶解等
    `,
    tools: ['Claude AI'],
    outputs: ['6 個視頻段提示詞（每個 300-500 字）'],
    tips: [
      '提示詞要詳細描述時間進度',
      '明確指定運鏡方式和速度',
      '包含音樂節奏同步提示',
      '提及色彩和光線變化'
    ],
    checklist: [
      '每個視頻段有完整提示詞',
      '包含運鏡和動作描述',
      '有音樂節奏同步信息',
      '字數達到 300-500'
    ]
  },

  // Phase 2: 視覺生成
  {
    id: 'mv-07',
    phase: 2,
    phaseName: '視覺生成',
    step: 7,
    emoji: '🖼️',
    title: '圖片和影片生成',
    shortDesc: '使用 AI 工具生成圖片和視頻',
    duration: { min: 45, max: 90, unit: '分鐘' },
    cost: 1.50,
    costRange: [1.50, 25],
    description: `
使用 AI 生圖和生影工具，根據之前準備的提示詞生成所有素材。
包括角色設計圖、場景圖、和 6 個視頻段。

生成順序：
1. 生成主角設計圖（確認視覺）
2. 生成場景靜態圖（背景參考）
3. 生成 6 個視頻段（逐個生成，檢查質量）
    `,
    tools: ['FLUX.1 Dev', 'Kling V2.1 / Hailuo / Seedance'],
    outputs: ['主角設計圖', '場景靜態圖', '6 個視頻段'],
    tips: [
      '先生 1-2 個測試確認風格',
      '不滿意時調整提示詞重新生成',
      '檢查角色一致性',
      '保存所有中間版本'
    ],
    checklist: [
      '主角設計圖質量檢查',
      '所有 6 個視頻段已生成',
      '視頻時長檢查',
      '色彩和光線一致性'
    ]
  },
  {
    id: 'mv-08',
    phase: 2,
    phaseName: '視覺生成',
    step: 8,
    emoji: '🛩️',
    title: '空拍視角和細節',
    shortDesc: '為場景添加空拍和特殊視角',
    duration: { min: 20, max: 30, unit: '分鐘' },
    cost: 0.50,
    costRange: [0, 1],
    description: `
為某些場景生成空拍視角（無人機視角）或特殊視角（低角度、高角度等）。
增加視覺層次感和電影質感。

可選運鏡方式：
- Orbit：環繞運鏡
- Push In：推鏡
- Pull Out：拉鏡
- FPV：第一人稱飛行視角
    `,
    tools: ['Kling / Hailuo / Runway'],
    outputs: ['2-3 個空拍或特殊視角視頻'],
    tips: [
      '並非必須，可根據預算跳過',
      '用於高潮或過渡段效果最佳',
      '運鏡應與音樂節奏同步',
      '保持視覺風格一致'
    ],
    checklist: [
      '運鏡選擇合理',
      '與主視頻無違和感',
      '時長合適',
      '色彩一致性'
    ]
  },
  {
    id: 'mv-09',
    phase: 2,
    phaseName: '視覺生成',
    step: 9,
    emoji: '💡',
    title: '電影感打光優化',
    shortDesc: '優化視頻的色彩和打光效果',
    duration: { min: 15, max: 20, unit: '分鐘' },
    cost: 0,
    description: `
對生成的視頻進行色彩分級和打光優化，
提升電影級別的視覺質感。

打光風格選項：
- 黃金時刻光線
- 藍色時刻光線
- 倫勃朗光
- 戲劇性高對比光
    `,
    tools: ['DaVinci Resolve / Adobe Premiere / 後期軟件'],
    outputs: ['優化後的視頻段'],
    tips: [
      '保持色彩統一',
      '不要過度處理',
      '參考參考影片的光影風格',
      '逐段檢查色彩一致性'
    ],
    checklist: [
      '色彩分級完成',
      '打光效果一致',
      '無過度處理痕跡',
      '導出為代理格式'
    ]
  },
  {
    id: 'step-10',
    phase: 2,
    phaseName: '視覺生成',
    step: 10,
    emoji: '🔧',
    title: 'FFmpeg 組裝與驗證',
    shortDesc: '將視頻段和音樂組裝成完整 MV',
    duration: { min: 10, max: 15, unit: '分鐘' },
    cost: 0,
    description: `
使用 FFmpeg 將 6 個視頻段 + 音樂合併成完整的 MV 文件。
檢查音畫同步、時長、色彩等。

FFmpeg 基本命令：
\`\`\`
ffmpeg -i music.mp3 -i video1.mp4 -i video2.mp4 ... \\
  -filter_complex concat=n=6:v=1:a=0 -c:v libx264 -c:a aac \\
  output.mp4
\`\`\`
    `,
    tools: ['FFmpeg', 'VLC（驗證）'],
    outputs: ['完整 MV.mp4 文件'],
    tips: [
      '不要使用 -shortest 參數，會截斷音樂',
      '確保視頻編碼一致',
      '檢查音頻同步',
      '驗證最終時長'
    ],
    checklist: [
      '所有視頻段已連接',
      '音樂完整無截斷',
      '時長檢查',
      'VLC 本地播放驗證'
    ]
  },

  // Phase 3: 打包上傳
  {
    id: 'step-11',
    phase: 3,
    phaseName: '打包上傳',
    step: 11,
    emoji: '📦',
    title: '打包與資產整理',
    shortDesc: '準備 YouTube 上傳所需的所有文件',
    duration: { min: 5, max: 10, unit: '分鐘' },
    cost: 0,
    description: `
整理完成的 MV 及相關元數據，為 YouTube 上傳做準備。

輸出結構：
\`\`\`
outputs/MV標題/
├── MV_完整.mp4
├── cover.png (1920×1080)
├── metadata.md (7 區塊)
├── README.md
├── CREDITS.md
└── source-assets/
    ├── 主角設計圖
    ├── 場景圖
    └── 原始視頻段
\`\`\`
    `,
    tools: ['FFmpeg（提取封面）', '文本編輯器'],
    outputs: ['MP4 + PNG 封面 + metadata.md + README'],
    tips: [
      '封面可從影片首幀提取或 AI 生成',
      'metadata.md 應包含 7 區塊：描述、章節、社群、SEO、標籤、檢查清單、資訊',
      '保留源素材便於後期修改',
      '準備製作簡介（CREDITS.md）'
    ],
    checklist: [
      'MP4 文件準備完畢',
      '封面圖 1920×1080',
      'metadata.md 7 區塊完整',
      'README.md 和 CREDITS.md'
    ]
  },
  {
    id: 'step-12',
    phase: 3,
    phaseName: '打包上傳',
    step: 12,
    emoji: '📺',
    title: 'YouTube 上傳與發布',
    shortDesc: '上傳到 YouTube 並發布',
    duration: { min: 15, max: 30, unit: '分鐘' },
    cost: 0,
    description: `
使用 youtube_publisher skill 或手動上傳到 YouTube。
配置視頻信息（標題、描述、章節、標籤等）。

上傳前檢查清單：
- ✓ 標題簡潔吸引
- ✓ 描述前 100 字包含主關鍵詞
- ✓ 章節時間碼標記
- ✓ 標籤最多 30 個
- ✓ 縮圖品質檢查
    `,
    tools: ['youtube_publisher skill 或 YouTube Studio'],
    outputs: ['YouTube 視頻連結', '發布統計'],
    tips: [
      '使用 metadata.md 中的信息填充',
      '設置為「不公開」先驗證',
      '檢查播放統計和留言',
      '優化失敗時參考 FAQ'
    ],
    checklist: [
      '標題 + 描述完整',
      '章節時間碼添加',
      '標籤和分類設置',
      '社群媒體同步發布'
    ]
  }
]

export const getPhaseInfo = (phase) => {
  const phaseNames = {
    1: '概念到設計',
    2: '視覺生成',
    3: '打包上傳'
  }
  return phaseNames[phase]
}

export const getStepById = (id) => {
  return WORKFLOW_STEPS.find(step => step.id === id)
}

export const getStepsByPhase = (phase) => {
  return WORKFLOW_STEPS.filter(step => step.phase === phase)
}
