/**
 * Firebase 初始化
 *
 * 注意：下面這組是 Firebase「網頁端」設定。apiKey 是公開金鑰，
 * 放在前端程式裡是正常且安全的設計——真正的存取控制是靠
 * Firestore 安全規則（firestore.rules），不是靠藏這把金鑰。
 *
 * 沿用既有的 Firebase 專案：dancing-and-music-mv-115
 * 若日後想用環境變數覆寫，設定 VITE_FIREBASE_* 即可（見下方 fallback）。
 */
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || 'AIzaSyB4XJbqzLTL5kCQoh4Fu_1vsnyOKzPdcL0',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'dancing-and-music-mv-115.firebaseapp.com',
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'dancing-and-music-mv-115',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'dancing-and-music-mv-115.firebasestorage.app',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '878698855245',
  appId: env.VITE_FIREBASE_APP_ID || '1:878698855245:web:dc472881477bdc07a39504',
};

// 這個專案用的是「具名」Firestore 資料庫 mv-projects（不是預設庫）
const FIRESTORE_DATABASE_ID = env.VITE_FIRESTORE_DATABASE_ID || 'mv-projects';

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app, FIRESTORE_DATABASE_ID);
