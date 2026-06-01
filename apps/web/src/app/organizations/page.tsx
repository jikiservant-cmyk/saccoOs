import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

async function getOrganizations() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching organizations:', error);
    return [];
  }
  return data;
}

export default async function OrganizationsPage() {
  const role = ROLES.SUPER_ADMIN;
  const organizations = await getOrganizations();

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar role={role} />
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight">Organization Management</h1>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Global SACCO Directory • {organizations.length} Active Tenants</p>
            </div>
            <Link 
              href="/organizations/new"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/20 active:scale-95"
            >
              + Add New SACCO
            </Link>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-slate-100 bg-slate-50/50">
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">SACCO Details</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Code</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Created</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {organizations.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-20 text-center text-slate-400 italic font-medium">
                        No SACCOs registered yet. Click the button above to add the first one.
                      </td>
                    </tr>
                  ) : (
                    organizations.map((org) => (
                      <tr key={org.id} className="group hover:bg-slate-50 transition-colors">
                        <td className="p-6">
                          <div>
                            <p className="font-black text-slate-900">{org.name}</p>
                            <p className="text-xs text-slate-500 font-bold">{org.email}</p>
                          </div>
                        </td>
                        <td className="p-6">
                          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                            {org.code}
                          </span>
                        </td>
                        <td className="p-6">
                          <p className="text-xs font-bold text-slate-600">{org.address}</p>
                          <p className="text-[10px] text-slate-400 font-black uppercase">{org.country}</p>
                        </td>
                        <td className="p-6">
                          <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${
                            org.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {org.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="p-6">
                          <p className="text-xs font-bold text-slate-600">
                            {new Date(org.created_at).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-xl transition-colors">
                              <span className="text-sm">👁️</span>
                            </button>
                            <button className="p-2 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors">
                              <span className="text-sm">⚙️</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
