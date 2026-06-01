import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';

export default function AdminAccountingPage() {
  const role = ROLES.SACCO_ADMIN;

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Sidebar role={role} />
      
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black tracking-tight">Core Accounting</h1>
              <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest text-[10px] font-bold">Ledger, Balance Sheet & Journals</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white border border-gray-200 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all">Download Audit Trail</button>
              <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all">New Journal Entry</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Assets', val: '2.84B' },
              { label: 'Total Liabilities', val: '1.24B' },
              { label: 'Equity', val: '1.60B' },
              { label: 'Cash at Bank', val: '310M', color: 'text-green-600' },
            ].map(stat => (
              <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className={`text-2xl font-black mt-1 ${stat.color || 'text-gray-900'}`}>UGX {stat.val}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Chart of Accounts Summary</h3>
              <div className="space-y-4">
                {[
                  { name: '1000 - Assets', val: '2.84B', color: 'bg-green-500' },
                  { name: '2000 - Liabilities', val: '1.24B', color: 'bg-red-400' },
                  { name: '3000 - Equity', val: '1.60B', color: 'bg-blue-500' },
                  { name: '4000 - Income', val: '84.5M', color: 'bg-purple-500' },
                  { name: '5000 - Expenses', val: '42.2M', color: 'bg-orange-500' },
                ].map(acc => (
                  <div key={acc.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${acc.color}`}></div>
                      <span className="text-sm font-bold">{acc.name}</span>
                    </div>
                    <span className="text-sm font-black">UGX {acc.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Recent Journal Entries</h3>
              <div className="space-y-4">
                {[
                  { ref: 'JV-2024-001', desc: 'Loan Disbursement - LN-0042', amount: '5.0M', date: 'Today' },
                  { ref: 'JV-2024-002', desc: 'Interest Accrual - Monthly', amount: '12.4M', date: 'Yesterday' },
                  { ref: 'JV-2024-003', desc: 'Membership Fees Collection', amount: '450K', date: 'Yesterday' },
                  { ref: 'JV-2024-004', desc: 'Office Rent Payment', amount: '1.2M', date: '2 days ago' },
                ].map(jv => (
                  <div key={jv.ref} className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-black text-gray-900">{jv.ref}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">{jv.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black">UGX {jv.amount}</p>
                      <p className="text-[8px] text-gray-400 font-bold uppercase">{jv.date}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full py-4 text-[10px] font-black uppercase text-gray-400 hover:text-gray-600 transition-colors tracking-widest">View Full General Ledger</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
