import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';

const txs = [
  { id: 'TX-00421', org: 'Kampala Unity SACCO', member: 'John Musoke', type: 'Loan Repayment', method: 'MTN MoMo', amount: '320,000', direction: 'in', status: 'success', date: 'Jun 1, 2026', time: '09:41 AM' },
  { id: 'TX-00420', org: 'Wakiso United SACCO', member: 'Grace Akello', type: 'Savings Deposit', method: 'Cash', amount: '500,000', direction: 'in', status: 'success', date: 'Jun 1, 2026', time: '09:31 AM' },
  { id: 'TX-00419', org: 'Kizito General Store', member: 'David Kizito', type: 'Expense', method: 'Airtel Money', amount: '88,000', direction: 'out', status: 'failed', date: 'Jun 1, 2026', time: '09:15 AM' },
  { id: 'TX-00418', org: 'Mbarara Farmers SACCO', member: 'Robert Okello', type: 'Loan Disbursement', method: 'Bank Transfer', amount: '5,000,000', direction: 'out', status: 'success', date: 'Jun 1, 2026', time: '08:50 AM' },
  { id: 'TX-00417', org: 'Gulu Teachers SACCO', member: 'Sarah Namuli', type: 'Savings Withdrawal', method: 'MTN MoMo', amount: '200,000', direction: 'out', status: 'success', date: 'Jun 1, 2026', time: '08:22 AM' },
  { id: 'TX-00416', org: 'Kampala Unity SACCO', member: 'Amina Hassan', type: 'Savings Deposit', method: 'MTN MoMo', amount: '75,000', direction: 'in', status: 'pending', date: 'Jun 1, 2026', time: '07:45 AM' },
];

const statusStyle = {
  success: 'bg-green-500/10 text-green-400 border-green-500/20',
  failed:  'bg-red-500/10 text-red-400 border-red-500/20',
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
};

const txTypes = ['All Types', 'Loan Repayment', 'Savings Deposit', 'Loan Disbursement', 'Withdrawal', 'Expense'];

export default function TransactionsPage() {
  const role = ROLES.SUPER_ADMIN;

  return (
    <div className="flex min-h-screen bg-gray-950 text-white font-sans">
      <Sidebar role={role} />

      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Ecosystem View</p>
              <h1 className="text-3xl font-black tracking-tight">Platform Transactions</h1>
              <p className="text-gray-400 text-sm mt-1">Monitor all financial flows across SACCOs and SMEs in real-time</p>
            </div>
            <button className="px-5 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-700 transition-all">
              📤 Export CSV
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Volume Today', val: 'UGX 4.1B', icon: '💰', color: 'text-white' },
              { label: 'Transactions', val: '8,241', icon: '🔄', color: 'text-white' },
              { label: 'Inflows', val: 'UGX 2.7B', icon: '📥', color: 'text-green-400' },
              { label: 'Outflows', val: 'UGX 1.4B', icon: '📤', color: 'text-red-400' },
            ].map(s => (
              <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{s.icon}</span>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{s.label}</p>
                </div>
                <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* Volume by Type */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-5">Volume by Transaction Type</h3>
            <div className="space-y-4">
              {[
                { label: 'Loan Repayments', val: 'UGX 1.24B', pct: '30%', color: 'bg-green-500' },
                { label: 'Loan Disbursements', val: 'UGX 980M', pct: '24%', color: 'bg-blue-500' },
                { label: 'Savings Deposits', val: 'UGX 820M', pct: '20%', color: 'bg-indigo-500' },
                { label: 'SME Business Transactions', val: 'UGX 660M', pct: '16%', color: 'bg-purple-500' },
                { label: 'Savings Withdrawals', val: 'UGX 400M', pct: '10%', color: 'bg-orange-500' },
              ].map(item => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-black text-gray-400">
                    <span>{item.label}</span>
                    <span>{item.val} <span className="text-gray-600">({item.pct})</span></span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full">
                    <div className={`${item.color} h-full rounded-full`} style={{ width: item.pct }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
              <input
                className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-green-500 transition-colors placeholder:text-gray-600"
                placeholder="Search by ID, member, org..."
              />
            </div>
            <select className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-400 font-bold focus:outline-none focus:border-green-500 transition-colors">
              {txTypes.map(t => <option key={t}>{t}</option>)}
            </select>
            <select className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-400 font-bold focus:outline-none focus:border-green-500 transition-colors">
              <option>All Organizations</option>
              <option>Kampala Unity SACCO</option>
              <option>Wakiso United SACCO</option>
              <option>Gulu Teachers SACCO</option>
              <option>Mbarara Farmers SACCO</option>
            </select>
          </div>

          {/* Transaction Table */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-800">
                    <th className="px-6 py-4">Ref</th>
                    <th className="px-6 py-4">Organization</th>
                    <th className="px-6 py-4">Member / Entity</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Method</th>
                    <th className="px-6 py-4">Amount (UGX)</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Date / Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {txs.map(tx => (
                    <tr key={tx.id} className="hover:bg-gray-800/30 transition-colors cursor-pointer">
                      <td className="px-6 py-4 text-xs font-mono text-gray-500">{tx.id}</td>
                      <td className="px-6 py-4 text-xs font-bold text-gray-400">{tx.org}</td>
                      <td className="px-6 py-4 text-sm font-black text-white">{tx.member}</td>
                      <td className="px-6 py-4 text-xs text-gray-400 font-bold">{tx.type}</td>
                      <td className="px-6 py-4 text-xs text-gray-500 font-bold">{tx.method}</td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-black ${tx.direction === 'in' ? 'text-green-400' : 'text-red-400'}`}>
                          {tx.direction === 'in' ? '+' : '−'}{tx.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${statusStyle[tx.status as keyof typeof statusStyle]}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-xs font-bold text-gray-400">{tx.time}</p>
                        <p className="text-[10px] text-gray-600">{tx.date}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-800 flex justify-between items-center">
              <span className="text-[10px] text-gray-600 font-bold">Showing 6 of 8,241 transactions</span>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gray-700 transition-all">← Prev</button>
                <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gray-700 transition-all">Next →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
