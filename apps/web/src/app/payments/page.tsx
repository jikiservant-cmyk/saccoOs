import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';

const providers = [
  { name: 'MTN MoMo', icon: '📱', status: 'active', txToday: '2,841', volume: 'UGX 1.24B', successRate: '98.2%', avgTime: '4s', color: 'border-yellow-500/20 bg-yellow-500/5' },
  { name: 'Airtel Money', icon: '📡', status: 'degraded', txToday: '1,102', volume: 'UGX 420M', successRate: '89.4%', avgTime: '12s', color: 'border-red-500/20 bg-red-500/5' },
  { name: 'Bank Transfer', icon: '🏦', status: 'active', txToday: '148', volume: 'UGX 780M', successRate: '99.9%', avgTime: '1-2 days', color: 'border-blue-500/20 bg-blue-500/5' },
  { name: 'Cash (Manual)', icon: '💵', status: 'active', txToday: '541', volume: 'UGX 95M', successRate: '100%', avgTime: 'Manual', color: 'border-green-500/20 bg-green-500/5' },
];

const recentPayments = [
  { id: 'PAY-9981', member: 'John Musoke', type: 'Loan Repayment', method: 'MTN MoMo', amount: '320,000', status: 'success', time: '2m ago' },
  { id: 'PAY-9980', member: 'Sarah Nakato', type: 'Savings Deposit', method: 'Airtel Money', amount: '150,000', status: 'failed', time: '5m ago' },
  { id: 'PAY-9979', member: 'Robert Okello', type: 'Loan Repayment', method: 'Cash', amount: '200,000', status: 'success', time: '12m ago' },
  { id: 'PAY-9978', member: 'Grace Akello', type: 'Share Capital', method: 'Bank Transfer', amount: '1,000,000', status: 'pending', time: '18m ago' },
  { id: 'PAY-9977', member: 'Amina Hassan', type: 'Savings Deposit', method: 'MTN MoMo', amount: '50,000', status: 'success', time: '24m ago' },
];

const statusStyle = {
  success: 'bg-green-500/10 text-green-400 border-green-500/20',
  failed:  'bg-red-500/10 text-red-400 border-red-500/20',
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
};

export default function PaymentsPage() {
  const role = ROLES.SUPER_ADMIN;

  return (
    <div className="flex min-h-screen bg-gray-950 text-white font-sans">
      <Sidebar role={role} />

      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">PSP Orchestration</p>
              <h1 className="text-3xl font-black tracking-tight">Payments & Gateways</h1>
              <p className="text-gray-400 text-sm mt-1">Monitor payment providers, settlement flows, and transaction health</p>
            </div>
            <button className="px-5 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-700 transition-all">
              ⚙️ Configure Providers
            </button>
          </div>

          {/* Today Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Volume Today', val: 'UGX 2.53B', icon: '💸', color: 'text-white' },
              { label: 'Transactions', val: '4,632', icon: '🔄', color: 'text-white' },
              { label: 'Success Rate', val: '96.8%', icon: '✅', color: 'text-green-400' },
              { label: 'Failed / Pending', val: '142', icon: '⚠️', color: 'text-yellow-400' },
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

          {/* Provider Cards */}
          <div>
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-5">Payment Providers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {providers.map(p => (
                <div key={p.name} className={`p-6 rounded-3xl border ${p.color}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{p.icon}</span>
                      <div>
                        <h3 className="text-sm font-black text-white">{p.name}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                          p.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'active' ? 'bg-green-500' : 'bg-yellow-400 animate-pulse'}`} />
                          {p.status}
                        </span>
                      </div>
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                      Configure →
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Tx Today</p>
                      <p className="text-lg font-black text-white mt-1">{p.txToday}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Volume</p>
                      <p className="text-sm font-black text-gray-300 mt-1">{p.volume}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Success</p>
                      <p className={`text-lg font-black mt-1 ${parseFloat(p.successRate) < 95 ? 'text-red-400' : 'text-green-400'}`}>{p.successRate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Recent Transactions</h3>
              <span className="text-[10px] font-black text-gray-600">Live Feed</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-800">
                    <th className="px-6 py-4">Ref</th>
                    <th className="px-6 py-4">Member</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Method</th>
                    <th className="px-6 py-4">Amount (UGX)</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {recentPayments.map(pay => (
                    <tr key={pay.id} className="hover:bg-gray-800/30 transition-colors cursor-pointer">
                      <td className="px-6 py-4 text-xs font-mono text-gray-500">{pay.id}</td>
                      <td className="px-6 py-4 text-sm font-black text-white">{pay.member}</td>
                      <td className="px-6 py-4 text-xs text-gray-400 font-bold">{pay.type}</td>
                      <td className="px-6 py-4 text-xs text-gray-400 font-bold">{pay.method}</td>
                      <td className="px-6 py-4 text-sm font-black text-white">{pay.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${statusStyle[pay.status as keyof typeof statusStyle]}`}>
                          {pay.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-xs text-gray-500 font-bold">{pay.time}</td>
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
