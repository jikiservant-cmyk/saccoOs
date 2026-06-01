import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';

export default function HealthPage() {
  const role = ROLES.SUPER_ADMIN;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar role={role} />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-4">System Health</h1>
        <p className="text-slate-500">Infrastructure and integration status monitoring.</p>
        <div className="mt-8 bg-white p-12 rounded-3xl border border-slate-200 text-center italic text-slate-400">
          Real-time health monitoring coming soon...
        </div>
      </div>
    </div>
  );
}
