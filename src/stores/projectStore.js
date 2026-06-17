/**
 * 項目狀態管理 Store
 * 使用 Zustand 管理用戶的 MV 製作項目狀態
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateCompleteAnalysis } from '../utils/calculations';

// ====== 預設值（抽成常數，新增專案時用來重置）======
const INITIAL_FORM_DATA = {
  theme: '',
  style: 'indie-pop',
  duration: 180,
  characters: 2,
  imageModel: 'flux-dev',
  videoModel: 'kling',
  musicSource: 'suno',
  priority: 'balanced',
};

const INITIAL_CHECKLIST = [
  { id: 'mv01', title: 'MV_01: 創作歌詞', completed: false },
  { id: 'mv02', title: 'MV_02: 設計主角', completed: false },
  { id: 'mv03', title: 'MV_03: 撰寫場景提示詞', completed: false },
  { id: 'mv04', title: 'MV_04: 生成分鏡圖', completed: false },
  { id: 'mv05', title: 'MV_05: 截圖放大', completed: false },
  { id: 'mv06', title: 'MV_06: 生成影片提示詞', completed: false },
  { id: 'mv07', title: 'MV_07: 生圖和生影', completed: false },
  { id: 'mv08', title: 'MV_08: 空拍和細節', completed: false },
  { id: 'mv09', title: 'MV_09: 打光和效果', completed: false },
  { id: 'step10', title: 'Step 10: FFmpeg 組裝', completed: false },
  { id: 'step11', title: 'Step 11: 打包整理', completed: false },
  { id: 'step12', title: 'Step 12: YouTube 上傳', completed: false },
];

// 回傳全新的預設狀態（深拷貝，避免共用參照）
function freshProjectState() {
  return {
    formData: { ...INITIAL_FORM_DATA },
    analysis: null,
    currentStep: 1,
    error: null,
    checklist: INITIAL_CHECKLIST.map((item) => ({ ...item })),
  };
}

export const useProjectStore = create(
  persist(
    (set, get) => ({
      // ====== 表單數據 ======
      formData: { ...INITIAL_FORM_DATA },

      // ====== 計算結果 ======
      analysis: null,

      // ====== 檢查清單 ======
      checklist: INITIAL_CHECKLIST.map((item) => ({ ...item })),

      // ====== 多專案狀態 ======
      activeProjectId: null, // 目前作用中的專案 doc id
      projectName: '', // 目前專案名稱
      projects: [], // 專案清單 [{ id, name, updatedAt }]

      // ====== UI 狀態 ======
      currentStep: 1, // 表單步驟 (1-3)
      loading: false,
      error: null,

      // ====== 設定更新 ======
      updateFormData: (data) => {
        set((state) => ({
          formData: { ...state.formData, ...data },
        }));
      },

      setCurrentStep: (step) => {
        set({ currentStep: step });
      },

      // ====== 多專案操作 ======
      setProjects: (projects) => set({ projects }),

      setActiveProject: (id, name) =>
        set({ activeProjectId: id, projectName: name ?? '' }),

      setProjectName: (name) => set({ projectName: name }),

      // 把雲端專案資料灌進來（切換/載入專案時用）
      applyProjectData: (data) =>
        set((state) => ({
          formData: data?.formData ?? state.formData,
          analysis: data?.analysis ?? null,
          checklist: data?.checklist ?? state.checklist,
        })),

      // 開新專案：表單、清單全部回到預設
      resetForNewProject: () => set(freshProjectState()),

      // ====== 生成分析 ======
      generateAnalysis: () => {
        set({ loading: true, error: null });
        try {
          const state = get();
          const analysis = generateCompleteAnalysis(state.formData);

          if (analysis.valid) {
            set({ analysis, error: null });
          } else {
            set({ error: analysis.errors.join(', '), analysis: null });
          }
        } catch (err) {
          set({ error: err.message, analysis: null });
        } finally {
          set({ loading: false });
        }
      },

      // ====== 檢查清單操作 ======
      toggleChecklistItem: (id) => {
        set((state) => ({
          checklist: state.checklist.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item
          ),
        }));
      },

      updateChecklistItem: (id, updates) => {
        set((state) => ({
          checklist: state.checklist.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        }));
      },

      // ====== 重置 ======
      reset: () => {
        set({
          formData: {
            theme: '',
            style: 'indie-pop',
            duration: 180,
            characters: 2,
            imageModel: 'flux-dev',
            videoModel: 'kling',
            musicSource: 'suno',
            priority: 'balanced',
          },
          analysis: null,
          currentStep: 1,
          error: null,
        });
      },

      // ====== 檔案匯出 ======
      exportAsMarkdown: () => {
        const state = get();
        if (!state.analysis) {
          return null;
        }

        const { formData, analysis } = state;
        const { cost, timeline, summary } = analysis;

        let markdown = `# MV 製作計劃\n\n`;
        markdown += `生成時間：${new Date().toLocaleString('zh-TW')}\n\n`;

        markdown += `## 基本信息\n\n`;
        markdown += `- **主題**：${formData.theme}\n`;
        markdown += `- **曲風**：${formData.style}\n`;
        markdown += `- **時長**：${formData.duration} 秒\n`;
        markdown += `- **主角數量**：${formData.characters} 人\n\n`;

        markdown += `## 工具選擇\n\n`;
        markdown += `- **圖像生成**：${state.analysis.selectedTools.imageModel.name}\n`;
        markdown += `- **影片生成**：${state.analysis.selectedTools.videoModel.name}\n`;
        markdown += `- **音樂來源**：${state.analysis.selectedTools.musicSource.name}\n\n`;

        markdown += `## 成本估計\n\n`;
        markdown += `| 項目 | 成本 |\n`;
        markdown += `|------|------|\n`;
        markdown += `| 圖像生成 | \$${cost.imageCost.toFixed(2)} |\n`;
        markdown += `| 影片生成 | \$${cost.videoCost.toFixed(2)} |\n`;
        markdown += `| 音樂製作 | \$${cost.musicCost.toFixed(2)} |\n`;
        markdown += `| **總計** | **\$${cost.totalCost.toFixed(2)}** |\n\n`;

        markdown += `## 時程規劃\n\n`;
        timeline.phases.forEach((phase) => {
          markdown += `### Phase ${phase.phase}: ${phase.name}\n\n`;
          markdown += `預計時間：${phase.totalTime.min}-${phase.totalTime.max} 分鐘\n\n`;
          phase.steps.forEach((step) => {
            markdown += `- ${step.step}：${step.duration.min}-${step.duration.max} 分鐘\n`;
          });
          markdown += `\n`;
        });

        markdown += `**總計時間**：${timeline.estimatedHours.min}-${timeline.estimatedHours.max} 小時\n\n`;

        markdown += `## 檢查清單\n\n`;
        state.checklist.forEach((item) => {
          const checkbox = item.completed ? '✓' : '☐';
          markdown += `- [${checkbox}] ${item.title}\n`;
        });

        return markdown;
      },

      exportAsJSON: () => {
        const state = get();
        return JSON.stringify(
          {
            timestamp: new Date().toISOString(),
            formData: state.formData,
            analysis: state.analysis,
            checklist: state.checklist,
          },
          null,
          2
        );
      },
    }),
    {
      name: 'mv-project-storage', // localStorage 鍵名
      partialize: (state) => ({
        formData: state.formData,
        analysis: state.analysis,
        checklist: state.checklist,
        activeProjectId: state.activeProjectId,
      }), // 只持久化這些字段
    }
  )
);
