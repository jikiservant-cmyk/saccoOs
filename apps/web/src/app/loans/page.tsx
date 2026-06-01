import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';

export default function AdminLoansPage() {
  const role = ROLES.SACCO_ADMIN;

  const loans = [
    { id: '1', member: 'John Musoke', number: 'LN-0042', amount: '5.0M', balance: '2.5M', rate: '1.5%', status: 'active', health: 'healthy' },
    { id: '2', member: 'Sarah Nakato', number: 'LN-0045', amount: '12.0M', balance: '12.0M', rate: '1.2%', status: 'disbursed', health: 'healthy' },
    { id: '3', member: 'Robert Okello', number: 'LN-0019', amount: '2.0M', balance: '800K', rate: '2.0%', status: 'active', health: 'overdue' },
    { id: '4', member: 'Grace Akello', number: 'LN-0050', amount: '3.5M', balance: '3.5M', rate: '1.5%', status: 'pending', health: 'new' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Sidebar role={role} />
      
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black tracking-tight">Loan Portfolio</h1>
              <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest text-[10px] font-bold">Manage Approvals & Portfolio Health</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white border border-gray-200 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all">Configure Products</button>
              <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-green-900/20 transition-all">New Loan Request</button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Portfolio', val: '850M', color: 'text-gray-900' },
              { label: 'Pending Approvals', val: '12', color: 'text-blue-600' },
              { label: 'Overdue Amount', val: '73M', color: 'text-red-600' },
              { label: 'Repayment Rate', val: '94.2%', color: 'text-green-600' },
            ].map(stat => (
              <div key={stat.label} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className={`text-2xl font-black mt-1 ${stat.color}`}>{stat.val}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex gap-4">
              <button className="px-4 py-2 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Active Loans</button>
              <button className="px-4 py-2 text-gray-500 hover:bg-gray-50 rounded-xl text-[10px] font-black uppercase tracking-widest">Pending Approvals</button>
              <button className="px-4 py-2 text-gray-500 hover:bg-gray-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500">Risky / Overdue</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50">
                  <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th className="px-6 py-4">Loan Details</th>
                    <th className="px-6 py-4">Member</th>
                    <th className="px-6 py-4">Principal</th>
                    <th className="px-6 py-4">Balance</th>
                    <th className="px-6 py-4">Health</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loans.map((l) => (
                    <tr key={l.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-black text-gray-900">{l.number}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{l.status}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-700">{l.member}</td>
                      <td className="px-6 py-4 text-sm font-black text-gray-900">UGX {l.amount}</td>
                      <td className="px-6 py-4 text-sm font-black text-gray-900">UGX {l.balance}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                          l.health === 'healthy' ? 'bg-green-50 text-green-700 border-green-100' : 
                          l.health === 'overdue' ? 'bg-red-50 text-red-700 border-red-100' :
                          'bg-blue-50 text-blue-700 border-blue-100'
                        }`}>
                          {l.health}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[10px] font-black uppercase text-green-700 hover:text-green-800 tracking-widest">Manage</button>
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
