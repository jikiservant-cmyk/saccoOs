import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser, getMemberProfile, getMemberLoans } from '@/utils/member';

export default async function MyLoansPage() {
  const user = await getAuthenticatedUser();
  if (!user) redirect('/login');

  const member = await getMemberProfile(user.id);
  if (!member) redirect('/onboarding');

  const loans = await getMemberLoans(member.id);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar role={ROLES.MEMBER} />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-green-600">My Loans</p>
              <h1 className="text-4xl font-black tracking-tight">Loan Portfolio</h1>
              <p className="text-sm text-gray-500 mt-2">Review your active SACCO loans, repayment schedule, and upcoming dues.</p>
            </div>
            <button className="rounded-2xl bg-green-700 px-6 py-3 text-xs font-black uppercase tracking-[0.35em] text-white hover:bg-green-600 transition-all">View Repayment Plan</button>
          </div>

          <div className="space-y-6">
            {loans.length === 0 ? (
              <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center text-gray-500 shadow-sm">
                No active loans found for your profile.
              </div>
            ) : (
              loans.map((loan) => {
                const statusLabel = loan.status === 'due_soon' || loan.status === 'overdue' ? 'Due Soon' : 'Repaying';
                return (
                  <div key={loan.id} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-gray-400 font-black">{loan.loan_number || 'Member Loan'}</p>
                        <h2 className="mt-3 text-3xl font-black text-gray-900">UGX {Number(loan.principal ?? 0).toLocaleString()}</h2>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] ${statusLabel === 'Due Soon' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                        {statusLabel}
                      </span>
                    </div>
                    <div className="mt-6 grid gap-4 md:grid-cols-3 text-sm text-gray-600">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.35em] font-black text-gray-400">Loan ID</p>
                        <p className="mt-2 font-bold text-gray-900">{loan.loan_number || loan.id}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.35em] font-black text-gray-400">Disbursed</p>
                        <p className="mt-2 font-bold text-gray-900">{loan.disbursement_date ? new Date(loan.disbursement_date).toLocaleDateString() : 'TBD'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.35em] font-black text-gray-400">Repayment status</p>
                        <p className="mt-2 font-bold text-gray-900">{loan.status}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
