/**
 * 雲端工作區同步（Firestore）
 *
 * A 階段：每個使用者只存「一份」工作區，固定文件 ID = current
 *   路徑：users/{uid}/mvProjects/current
 *
 * 這個路徑刻意對齊既有的 firestore.rules：
 *   match /users/{userId}/mvProjects/{projectId}
 * 所以 B 階段要做「多個命名專案」時，只要改用別的 projectId 即可，規則不用動。
 */
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';

const WORKSPACE_DOC = 'current';

function workspaceRef(uid) {
  return doc(db, 'users', uid, 'mvProjects', WORKSPACE_DOC);
}

/** 讀回雲端工作區；沒有則回傳 null */
export async function loadWorkspace(uid) {
  const snap = await getDoc(workspaceRef(uid));
  return snap.exists() ? snap.data() : null;
}

/** 把工作區資料寫回雲端 */
export async function saveWorkspace(uid, data) {
  await setDoc(workspaceRef(uid), {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}
