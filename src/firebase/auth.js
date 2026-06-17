/**
 * 登入 / 登出（Google）
 */
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from './config';

export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export function signOutUser() {
  return signOut(auth);
}
