import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser, getMemberProfile, getMemberPayments } from '@/utils/member';

export default async function StatementsPage() {
  const user = await getAuthenticatedUser();
  if (!user) redirect('/login');

  const member = await getMemberProfile(user.id);
  if (!member) redirect('/onboarding');

  const payments = await getMemberPayments(member.id);
  const statements = payments.length > 0
    ? payments.map((payment) => ({
        period: new Date(payment.created_at || payment.completed_at || Date.now()).toLocaleString('default', { month: 'long', year: 'numeric' }),
        status: payment.status === 'completed' ? 'Ready' : 'In progress',
        generatedAt: new Date(payment.created_at || payment.completed_at || Date.now()).toLocaleDateString(),
        id: payment.id || payment.internal_reference,
      }))
    : [
        { period: 'No statement data yet', status: 'Pending', generatedAt: '-', id: 'none' },
      ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar role={ROLES.MEMBER} />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-green-600">Statements</p>
            <h1 className="text-4xl font-black tracking-tight">SACCO Statements</h1>
            <p className="text-sm text-gray-500 mt-2">Download member statements and review your monthly SACCO activity.</p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-3 text-sm text-gray-600">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 font-black">Total statements</p>
                <p className="mt-3 text-3xl font-black text-gray-900">{payments.length}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 font-black">Last generated</p>
                <p className="mt-3 text-3xl font-black text-gray-900">{payments.length > 0 ? new Date(payments[0].created_at || payments[0].completed_at).toLocaleDateString() : '-'}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 font-black">Available for download</p>
                <p className="mt-3 text-3xl font-black text-green-600">{payments.length}</p>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-500 uppercase tracking-[0.35em] text-[10px]">
                  <tr>
                    <th className="px-5 py-4">Period</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Generated</th>
                    <th className="px-5 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {statements.map((statement) => (
                    <tr key={statement.id} className="hover:bg-white transition-colors">
                      <td className="px-5 py-4 font-bold text-gray-900">{statement.period}</td>
                      <td className="px-5 py-4 text-sm text-gray-700">{statement.status}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{statement.generatedAt}</td>
                      <td className="px-5 py-4">
                        <button className="rounded-2xl bg-green-700 px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-white hover:bg-green-600 transition-all">
                          Download
                        </button>
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
