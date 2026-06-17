/**
 * 雲端同步掛勾
 *
 * 行為（A 階段：單一工作區、雲端優先）：
 *   1. 登入後：把雲端工作區載回來蓋掉本機狀態（讓跨裝置看到同一份進度）。
 *      若雲端還沒有資料，就用目前本機的狀態建立第一份。
 *   2. 之後狀態一有變動（formData / analysis / checklist），
 *      延遲 1.5 秒（debounce）自動寫回雲端。
 *   3. 登出後停止同步。
 *
 * 說明：登入當下「雲端優先」，意思是若你在另一台電腦改過、雲端較新，
 *      登入會以雲端為準。這是 A 階段刻意的簡化，之後 B 階段做多專案就沒這問題。
 */
import { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProjectStore } from '../stores/projectStore';
import { loadWorkspace, saveWorkspace } from '../firebase/projectSync';

const DEBOUNCE_MS = 1500;

function pickSyncState(state) {
  return {
    formData: state.formData,
    analysis: state.analysis,
    checklist: state.checklist,
  };
}

export function useCloudSync() {
  const { user } = useAuth();
  const hydratingRef = useRef(false); // 從雲端載入中，暫停反向寫回，避免迴圈
  const timerRef = useRef(null);
  const loadedUidRef = useRef(null);

  // 1) 登入後載入雲端工作區
  useEffect(() => {
    if (!user) {
      loadedUidRef.current = null;
      return;
    }
    if (loadedUidRef.current === user.uid) return; // 同一人已載過，不重複
    loadedUidRef.current = user.uid;

    let cancelled = false;
    (async () => {
      try {
        const cloud = await loadWorkspace(user.uid);
        if (cancelled) return;

        if (cloud) {
          const current = useProjectStore.getState();
          hydratingRef.current = true;
          useProjectStore.setState({
            formData: cloud.formData ?? current.formData,
            analysis: cloud.analysis ?? null,
            checklist: cloud.checklist ?? current.checklist,
          });
          hydratingRef.current = false;
        } else {
          // 雲端沒有 → 用本機現況建立第一份
          await saveWorkspace(user.uid, pickSyncState(useProjectStore.getState()));
        }
      } catch (err) {
        hydratingRef.current = false;
        console.error('雲端載入失敗：', err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  // 2) 狀態變動 → debounce 寫回雲端
  useEffect(() => {
    if (!user) return;

    const unsubscribe = useProjectStore.subscribe((state) => {
      if (hydratingRef.current) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        saveWorkspace(user.uid, pickSyncState(state)).catch((err) =>
          console.error('雲端儲存失敗：', err)
        );
      }, DEBOUNCE_MS);
    });

    return () => {
      unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [user]);
}
