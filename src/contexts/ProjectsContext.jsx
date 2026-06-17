/**
 * 多專案管理 Context
 *
 * 負責：
 *  - 登入後載入專案清單，並開啟上次的（或最新的）專案；沒有專案就建一個預設的
 *  - 編輯時把作用中的專案自動同步到雲端（debounce 1.5 秒）
 *  - 提供切換 / 新增 / 改名 / 刪除 專案的操作
 *
 * 雲端優先：登入當下以雲端內容為準（跨裝置一致）。
 */
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { useAuth } from './AuthContext';
import { useProjectStore } from '../stores/projectStore';
import * as repo from '../firebase/projectsRepo';

const ProjectsContext = createContext(null);

const DEFAULT_PROJECT_NAME = '我的第一個專案';
const DEBOUNCE_MS = 1500;

// 只取要同步到雲端的欄位
function syncSlice(state) {
  return {
    formData: state.formData,
    analysis: state.analysis,
    checklist: state.checklist,
  };
}

export function ProjectsProvider({ children }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const hydratingRef = useRef(false); // 從雲端灌資料中，暫停反向寫回
  const timerRef = useRef(null);
  const initedUidRef = useRef(null);

  const refreshList = useCallback(async (uid) => {
    const list = await repo.listProjects(uid);
    useProjectStore.getState().setProjects(list);
    return list;
  }, []);

  const loadProjectInto = useCallback(async (uid, id) => {
    const proj = await repo.getProject(uid, id);
    const store = useProjectStore.getState();
    hydratingRef.current = true;
    store.applyProjectData(proj || {});
    store.setActiveProject(id, proj?.name || '未命名專案');
    hydratingRef.current = false;
  }, []);

  // ===== 登入後初始化 =====
  useEffect(() => {
    if (!user) {
      initedUidRef.current = null;
      return;
    }
    if (initedUidRef.current === user.uid) return;
    initedUidRef.current = user.uid;

    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const list = await refreshList(user.uid);
        if (cancelled) return;

        const store = useProjectStore.getState();
        let targetId = store.activeProjectId;
        if (!targetId || !list.find((p) => p.id === targetId)) {
          targetId = list[0]?.id || null;
        }

        if (!targetId) {
          // 完全沒有專案 → 用目前本機狀態建立第一個
          const created = await repo.createProject(
            user.uid,
            DEFAULT_PROJECT_NAME,
            syncSlice(store)
          );
          if (cancelled) return;
          await refreshList(user.uid);
          hydratingRef.current = true;
          store.setActiveProject(created.id, created.name);
          hydratingRef.current = false;
        } else {
          await loadProjectInto(user.uid, targetId);
        }
      } catch (err) {
        hydratingRef.current = false;
        console.error('專案初始化失敗：', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, refreshList, loadProjectInto]);

  // ===== 編輯時自動同步作用中的專案 =====
  useEffect(() => {
    if (!user) return;
    const unsubscribe = useProjectStore.subscribe((state, prev) => {
      if (hydratingRef.current) return;
      if (!state.activeProjectId) return;

      const changed =
        state.formData !== prev.formData ||
        state.analysis !== prev.analysis ||
        state.checklist !== prev.checklist ||
        state.projectName !== prev.projectName;
      if (!changed) return;

      const id = state.activeProjectId;
      const payload = { name: state.projectName, ...syncSlice(state) };

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        repo
          .saveProject(user.uid, id, payload)
          .catch((err) => console.error('專案儲存失敗：', err));
      }, DEBOUNCE_MS);
    });

    return () => {
      unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [user]);

  // ===== 操作 =====
  const switchProject = useCallback(
    async (id) => {
      if (!user) return;
      if (id === useProjectStore.getState().activeProjectId) return;
      setLoading(true);
      try {
        await loadProjectInto(user.uid, id);
      } finally {
        setLoading(false);
      }
    },
    [user, loadProjectInto]
  );

  const createProject = useCallback(
    async (name) => {
      if (!user) return;
      setLoading(true);
      try {
        const store = useProjectStore.getState();
        // 表單清空成全新專案
        hydratingRef.current = true;
        store.resetForNewProject();
        hydratingRef.current = false;

        const created = await repo.createProject(
          user.uid,
          name,
          syncSlice(useProjectStore.getState())
        );
        await refreshList(user.uid);
        hydratingRef.current = true;
        store.setActiveProject(created.id, created.name);
        hydratingRef.current = false;
      } finally {
        setLoading(false);
      }
    },
    [user, refreshList]
  );

  const renameProject = useCallback(
    async (name) => {
      if (!user) return;
      const id = useProjectStore.getState().activeProjectId;
      if (!id) return;
      // 先更新本地名稱（會觸發自動同步），再寫清單用的 name
      useProjectStore.getState().setProjectName(name);
      await repo.renameProject(user.uid, id, name);
      await refreshList(user.uid);
    },
    [user, refreshList]
  );

  const deleteActiveProject = useCallback(async () => {
    if (!user) return;
    const id = useProjectStore.getState().activeProjectId;
    if (!id) return;
    setLoading(true);
    try {
      await repo.deleteProject(user.uid, id);
      const list = await refreshList(user.uid);
      if (list.length > 0) {
        await loadProjectInto(user.uid, list[0].id);
      } else {
        // 刪到一個都不剩 → 建一個新的預設專案
        const store = useProjectStore.getState();
        hydratingRef.current = true;
        store.resetForNewProject();
        hydratingRef.current = false;
        const created = await repo.createProject(
          user.uid,
          DEFAULT_PROJECT_NAME,
          syncSlice(useProjectStore.getState())
        );
        await refreshList(user.uid);
        hydratingRef.current = true;
        store.setActiveProject(created.id, created.name);
        hydratingRef.current = false;
      }
    } finally {
      setLoading(false);
    }
  }, [user, refreshList, loadProjectInto]);

  const value = {
    loading,
    switchProject,
    createProject,
    renameProject,
    deleteActiveProject,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) {
    throw new Error('useProjects 必須在 <ProjectsProvider> 內使用');
  }
  return ctx;
}
