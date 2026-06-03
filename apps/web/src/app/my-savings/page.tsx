import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser, getMemberProfile, getMemberSavings } from '@/utils/member';

export default async function MySavingsPage() {
  const user = await getAuthenticatedUser();
  if (!user) redirect('/login');

  const member = await getMemberProfile(user.id);
  if (!member) redirect('/onboarding');

  const savingsAccounts = await getMemberSavings(member.id);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar role={ROLES.MEMBER} />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-green-600">My Savings</p>
              <h1 className="text-4xl font-black tracking-tight">Your SACCO Savings</h1>
              <p className="text-sm text-gray-500 mt-2">Keep track of your savings products and accumulated balances across all active accounts.</p>
            </div>
            <button className="rounded-2xl bg-green-700 px-6 py-3 text-xs font-black uppercase tracking-[0.35em] text-white hover:bg-green-600 transition-all">Add Deposit</button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {savingsAccounts.length === 0 ? (
              <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm text-center text-gray-500">
                No savings accounts found for your member profile.
              </div>
            ) : (
              savingsAccounts.map((account) => (
                <div key={account.id} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 font-black">{account.savings_product?.name || 'Savings Account'}</p>
                      <h2 className="mt-4 text-3xl font-black text-gray-900">UGX {(account.account?.cached_balance ?? 0).toLocaleString()}</h2>
                    </div>
                    <span className="rounded-full bg-green-50 text-green-700 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em]">{account.status}</span>
                  </div>
                  <div className="mt-5 border-t border-gray-100 pt-4 text-sm text-gray-600">
                    Interest rate: <span className="font-bold text-gray-900">{account.savings_product?.interest_rate ?? 'N/A'}%</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
