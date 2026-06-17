import { useAuth } from '../../contexts/AuthContext';
import { useProjects } from '../../contexts/ProjectsContext';
import { useProjectStore } from '../../stores/projectStore';

/**
 * 專案列：登入後顯示，可切換 / 新增 / 改名 / 刪除專案。
 * 未登入時不顯示（資料只在本機，沒有「多專案」概念）。
 */
export default function ProjectBar() {
  const { user } = useAuth();
  const { loading, switchProject, createProject, renameProject, deleteActiveProject } =
    useProjects();

  const projects = useProjectStore((s) => s.projects);
  const activeProjectId = useProjectStore((s) => s.activeProjectId);
  const projectName = useProjectStore((s) => s.projectName);

  if (!user) return null;

  const handleCreate = () => {
    const name = window.prompt('新專案名稱：', '未命名專案');
    if (name && name.trim()) {
      createProject(name.trim()).catch((e) => alert('新增失敗：' + e.message));
    }
  };

  const handleRename = () => {
    if (!activeProjectId) return;
    const name = window.prompt('改成新名稱：', projectName || '');
    if (name && name.trim() && name.trim() !== projectName) {
      renameProject(name.trim()).catch((e) => alert('改名失敗：' + e.message));
    }
  };

  const handleDelete = () => {
    if (!activeProjectId) return;
    const ok = window.confirm(
      `確定要刪除專案「${projectName || '未命名專案'}」嗎？此動作無法復原。`
    );
    if (ok) {
      deleteActiveProject().catch((e) => alert('刪除失敗：' + e.message));
    }
  };

  return (
    <div className="border-b border-slate-200 bg-white/70 backdrop-blur">
      <div className="container mx-auto flex flex-wrap items-center gap-3 px-4 py-2 max-w-6xl">
        <span className="text-sm font-medium text-slate-500">📁 專案</span>

        <select
          value={activeProjectId || ''}
          onChange={(e) => switchProject(e.target.value)}
          disabled={loading || projects.length === 0}
          className="min-w-[10rem] max-w-[16rem] rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 disabled:opacity-60"
        >
          {projects.length === 0 && <option value="">（載入中…）</option>}
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCreate}
            disabled={loading}
            className="rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100 disabled:opacity-60"
          >
            ＋ 新增
          </button>
          <button
            type="button"
            onClick={handleRename}
            disabled={loading || !activeProjectId}
            className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
          >
            改名
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading || !activeProjectId}
            className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-60"
          >
            刪除
          </button>
        </div>

        {loading && <span className="text-xs text-slate-400">同步中…</span>}
      </div>
    </div>
  );
}
