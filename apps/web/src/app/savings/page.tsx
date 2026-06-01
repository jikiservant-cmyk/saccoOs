import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';

export default function AdminSavingsPage() {
  const role = ROLES.SACCO_ADMIN;

  const savings = [
    { id: '1', member: 'John Musoke', number: 'SV-1002', product: 'Regular Savings', balance: '4.2M', interest: '5%', status: 'active' },
    { id: '2', member: 'Sarah Nakato', number: 'SV-1005', product: 'Fixed Deposit', balance: '15.0M', interest: '12%', status: 'active' },
    { id: '3', member: 'Robert Okello', number: 'SV-1008', product: 'Education Fund', balance: '2.5M', interest: '8%', status: 'active' },
    { id: '4', member: 'Grace Akello', number: 'SV-1010', product: 'Regular Savings', balance: '8.8M', interest: '5%', status: 'active' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Sidebar role={role} />
      
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black tracking-tight">Savings & Deposits</h1>
              <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest text-[10px] font-bold">Monitor Member Savings Growth</p>
            </div>
            <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-green-900/20 transition-all">
              Record New Deposit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total SACCO Deposits</p>
              <p className="text-4xl font-black mt-2">1.24B</p>
              <p className="text-[10px] text-green-600 font-black mt-2">↑ 12% THIS MONTH</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Avg Savings per Member</p>
              <p className="text-4xl font-black mt-2 text-gray-700">980K</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Savings Products</p>
              <p className="text-4xl font-black mt-2 text-blue-600">8</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Savings Accounts</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50">
                  <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th className="px-6 py-4">Account Number</th>
                    <th className="px-6 py-4">Member</th>
                    <th className="px-6 py-4">Product Type</th>
                    <th className="px-6 py-4">Current Balance</th>
                    <th className="px-6 py-4">Interest Rate</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {savings.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                      <td className="px-6 py-4 text-sm font-mono font-bold text-gray-500">{s.number}</td>
                      <td className="px-6 py-4 text-sm font-black text-gray-900">{s.member}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-gray-500 px-2 py-1 bg-gray-100 rounded-lg">{s.product}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-black text-green-700 font-mono">UGX {s.balance}</td>
                      <td className="px-6 py-4 text-xs font-bold text-gray-500">{s.interest} p.a</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[10px] font-black uppercase text-green-700 hover:text-green-800 tracking-widest">History</button>
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
