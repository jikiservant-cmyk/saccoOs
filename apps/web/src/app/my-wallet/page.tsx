import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser, getMemberDashboardData } from '@/utils/member';

export default async function MyWalletPage() {
  const user = await getAuthenticatedUser();
  if (!user) {
    redirect('/login');
  }

  const dashboard = await getMemberDashboardData(user.id);
  if (!dashboard) {
    redirect('/onboarding');
  }

  const { savings = [], loans = [], payments = [] } = dashboard;
  const totalSavings = savings.reduce((sum, item) => sum + Number(item.account?.cached_balance ?? 0), 0);
  const totalLoans = loans.reduce((sum, loan) => sum + Number(loan.principal ?? 0), 0);
  const pendingDeposits = payments
    .filter((tx) => tx.direction === 'inbound' && tx.status === 'pending')
    .reduce((sum, tx) => sum + Number(tx.amount ?? 0), 0);

  const walletSummary = [
    { label: 'Available balance', value: `UGX ${totalSavings.toLocaleString()}`, accent: 'text-green-400' },
    { label: 'Pending deposits', value: `UGX ${pendingDeposits.toLocaleString()}`, accent: 'text-blue-400' },
    { label: 'Reserved for loans', value: `UGX ${totalLoans.toLocaleString()}`, accent: 'text-yellow-300' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar role={ROLES.MEMBER} />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black text-green-400 uppercase tracking-[0.35em]">SACCO Wallet</p>
              <h1 className="text-4xl font-black tracking-tight">Your Wallet Overview</h1>
              <p className="text-sm text-gray-300 mt-2 max-w-2xl">Track your member wallet balances, recent activity, and savings performance in one place.</p>
            </div>
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-lg shadow-black/30">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 font-black">Total Wallet Value</p>
              <p className="mt-4 text-4xl font-black text-green-400">UGX {totalSavings.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {walletSummary.map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20">
                <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 font-black">{item.label}</p>
                <p className={`mt-4 text-3xl font-black ${item.accent}`}>{item.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-black">Recent Wallet Transactions</h2>
                <p className="text-sm text-gray-400">The latest SACCO wallet movements for your account.</p>
              </div>
              <div className="flex gap-3">
                <button className="rounded-2xl bg-white/10 border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-white/20 transition-all">Request Withdrawal</button>
                <button className="rounded-2xl bg-green-500 px-8 py-3 text-xs font-black uppercase tracking-[0.2em] text-black hover:bg-green-400 transition-all shadow-lg shadow-green-500/20">Deposit Funds</button>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-[0.35em] text-gray-400 border-b border-white/10">
                    <th className="px-4 py-3">Reference</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-gray-400">No wallet transactions found.</td>
                    </tr>
                  ) : (
                    payments.map((tx) => (
                      <tr key={tx.id || tx.internal_reference || tx.created_at} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-4 font-mono text-gray-200">{tx.internal_reference || tx.id || '---'}</td>
                        <td className="px-4 py-4 text-gray-100">{tx.description || tx.provider || 'Wallet activity'}</td>
                        <td className="px-4 py-4 text-green-300 font-black">{tx.direction === 'outbound' ? '-' : '+'}UGX {Number(tx.amount ?? 0).toLocaleString()}</td>
                        <td className="px-4 py-4 text-sm font-black uppercase tracking-[0.25em]">
                          <span className={`inline-flex rounded-full px-3 py-1 ${tx.status === 'completed' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                            {tx.status || 'pending'}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-400">{new Date(tx.created_at || tx.completed_at || Date.now()).toLocaleDateString()}</td>
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
