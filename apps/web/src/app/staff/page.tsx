import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';

export default function AdminStaffPage() {
  const role = ROLES.SACCO_ADMIN;

  const staff = [
    { name: 'Amos Okello', role: 'Loan Officer', status: 'active', performance: '92%' },
    { name: 'Sarah Namuli', role: 'Teller', status: 'active', performance: '88%' },
    { name: 'John Musoke', role: 'Accountant', status: 'active', performance: '95%' },
    { name: 'Grace Akello', role: 'Auditor', status: 'inactive', performance: 'N/A' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Sidebar role={role} />
      
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black tracking-tight">Staff Management</h1>
              <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest text-[10px] font-bold">Manage Roles & System Access</p>
            </div>
            <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-gray-900/20 transition-all">
              + Invite Staff
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {staff.map((s) => (
              <div key={s.name} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-xl">👤</div>
                  <div>
                    <h4 className="text-sm font-black text-gray-900">{s.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{s.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-green-600 uppercase tracking-widest">{s.performance}</p>
                  <p className="text-[8px] text-gray-400 font-bold uppercase mt-1">Efficiency</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
