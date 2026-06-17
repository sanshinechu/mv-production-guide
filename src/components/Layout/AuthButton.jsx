import { useAuth } from '../../contexts/AuthContext';

/**
 * Header 右側的登入區：未登入顯示登入鈕，已登入顯示頭像 + 登出。
 */
export default function AuthButton() {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) {
    return <span className="text-sm text-slate-400">…</span>;
  }

  if (!user) {
    return (
      <button
        type="button"
        onClick={() => signIn().catch((e) => alert('登入失敗：' + e.message))}
        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        🔐 使用 Google 登入
      </button>
    );
  }

  const label = user.displayName || user.email || '使用者';

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2" title={`${label}（進度已雲端同步）`}>
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt=""
            referrerPolicy="no-referrer"
            className="h-7 w-7 rounded-full"
          />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
            {label.charAt(0)}
          </div>
        )}
        <span className="hidden max-w-[10rem] truncate text-sm text-slate-600 sm:inline">
          {label}
        </span>
      </div>
      <button
        type="button"
        onClick={() => signOut().catch((e) => alert('登出失敗：' + e.message))}
        className="text-sm text-slate-400 transition hover:text-slate-600"
      >
        登出
      </button>
    </div>
  );
}
