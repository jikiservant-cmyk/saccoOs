import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';

export default function AdminMembersPage() {
  const role = ROLES.SACCO_ADMIN;

  const members = [
    { id: '1', name: 'John Musoke', number: 'M-001', email: 'john@example.com', status: 'active', savings: '4.2M', loans: '1.5M' },
    { id: '2', name: 'Sarah Nakato', number: 'M-002', email: 'sarah@example.com', status: 'active', savings: '8.1M', loans: '0' },
    { id: '3', name: 'Robert Okello', number: 'M-003', email: 'robert@example.com', status: 'suspended', savings: '1.2M', loans: '500K' },
    { id: '4', name: 'Grace Akello', number: 'M-004', email: 'grace@example.com', status: 'active', savings: '12.5M', loans: '2.8M' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Sidebar role={role} />
      
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black tracking-tight">Member Directory</h1>
              <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest text-[10px] font-bold">Manage SACCO Members & Profiles</p>
            </div>
            <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-green-900/20 transition-all">
              + Add New Member
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Members</p>
              <p className="text-3xl font-black mt-1">1,248</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Today</p>
              <p className="text-3xl font-black mt-1 text-green-600">842</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">New This Month</p>
              <p className="text-3xl font-black mt-1 text-blue-600">+56</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <input 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-green-600 transition-colors"
                  placeholder="Search members by name, ID or email..."
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-4 py-2.5 border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all">Filter</button>
                <button className="flex-1 md:flex-none px-4 py-2.5 border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all">Export</button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50">
                  <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th className="px-6 py-4">Member Name</th>
                    <th className="px-6 py-4">ID Number</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Savings</th>
                    <th className="px-6 py-4">Outstanding Loans</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {members.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-black text-gray-900">{m.name}</p>
                          <p className="text-[10px] text-gray-400 font-bold">{m.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono font-bold text-gray-500">{m.number}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                          m.status === 'active' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                        }`}>
                          {m.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-black text-gray-700">UGX {m.savings}</td>
                      <td className="px-6 py-4 text-sm font-black text-red-600">UGX {m.loans}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[10px] font-black uppercase text-green-700 hover:text-green-800 tracking-widest">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
