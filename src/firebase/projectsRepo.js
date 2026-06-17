/**
 * 多專案資料層（Firestore）
 *
 * 每個使用者的專案存在 users/{uid}/mvProjects 集合下，每個 doc 一個專案：
 *   { name, formData, analysis, checklist, createdAt, updatedAt }
 *
 * 沿用既有 firestore.rules（users/{userId}/mvProjects/{projectId}），規則不用改。
 * A 階段留下的 `current` doc 因為沒有 name，會被當成一個「未命名專案」一起列出，
 * 不需要搬資料。
 */
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './config';

function projectsCol(uid) {
  return collection(db, 'users', uid, 'mvProjects');
}

function projectRef(uid, id) {
  return doc(db, 'users', uid, 'mvProjects', id);
}

/** 列出所有專案（只取清單需要的欄位），依更新時間新到舊排序 */
export async function listProjects(uid) {
  const snap = await getDocs(projectsCol(uid));
  const items = snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: data.name || '未命名專案',
      updatedAt: data.updatedAt || '',
    };
  });
  items.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
  return items;
}

/** 讀取單一專案完整內容 */
export async function getProject(uid, id) {
  const snap = await getDoc(projectRef(uid, id));
  return snap.exists() ? snap.data() : null;
}

/** 建立新專案，回傳含 id 的資料 */
export async function createProject(uid, name, data) {
  const now = new Date().toISOString();
  const payload = { name, ...data, createdAt: now, updatedAt: now };
  const ref = await addDoc(projectsCol(uid), payload);
  return { id: ref.id, ...payload };
}

/** 儲存（覆寫合併）專案內容 */
export async function saveProject(uid, id, data) {
  await setDoc(
    projectRef(uid, id),
    { ...data, updatedAt: new Date().toISOString() },
    { merge: true }
  );
}

/** 改名 */
export async function renameProject(uid, id, name) {
  await updateDoc(projectRef(uid, id), {
    name,
    updatedAt: new Date().toISOString(),
  });
}

/** 刪除 */
export async function deleteProject(uid, id) {
  await deleteDoc(projectRef(uid, id));
}
