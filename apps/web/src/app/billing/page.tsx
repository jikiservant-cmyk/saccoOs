import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';

const plans = [
  { name: 'Starter', price: 'Free', orgs: 1, members: 100, features: ['Basic cashbook', 'Member directory', 'Monthly reports'], current: false },
  { name: 'Growth', price: 'UGX 150K/mo', orgs: 5, members: 1000, features: ['All Starter features', 'Loan management', 'SMS alerts', 'API access'], current: true },
  { name: 'Enterprise', price: 'Custom', orgs: 999, members: 999999, features: ['All Growth features', 'White-labelling', 'Dedicated support', 'Custom integrations'], current: false },
];

const invoices = [
  { id: 'INV-0024', org: 'Kampala Unity SACCO', plan: 'Growth', amount: '150,000', status: 'paid', date: 'Jun 1, 2026' },
  { id: 'INV-0023', org: 'Wakiso United SACCO', plan: 'Growth', amount: '150,000', status: 'paid', date: 'May 1, 2026' },
  { id: 'INV-0022', org: 'Mbarara Farmers SACCO', plan: 'Starter', amount: '0', status: 'free', date: 'May 1, 2026' },
  { id: 'INV-0021', org: 'Gulu Teachers SACCO', plan: 'Enterprise', amount: '800,000', status: 'overdue', date: 'Apr 1, 2026' },
  { id: 'INV-0020', org: 'Kampala Unity SACCO', plan: 'Growth', amount: '150,000', status: 'paid', date: 'Apr 1, 2026' },
];

export default function BillingPage() {
  const role = ROLES.SUPER_ADMIN;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar role={role} />

      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Platform Monetization</p>
              <h1 className="text-3xl font-black tracking-tight">Billing & Subscriptions</h1>
              <p className="text-slate-500 text-sm mt-1">Manage SACCO plans and track platform revenue</p>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                📤 Export Revenue
              </button>
              <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-900/20">
                + New Invoice
              </button>
            </div>
          </div>

          {/* Revenue Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: 'MRR', val: 'UGX 4.85M', sub: '+18% vs last month', color: 'text-indigo-700' },
              { label: 'Active Orgs', val: '38', sub: '3 on trial', color: 'text-slate-900' },
              { label: 'Overdue', val: '2', sub: 'UGX 1.6M at risk', color: 'text-red-600' },
              { label: 'ARR Projection', val: 'UGX 58M', sub: 'Based on current MRR', color: 'text-green-700' },
            ].map(s => (
              <div key={s.label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                <p className={`text-2xl font-black mt-2 ${s.color}`}>{s.val}</p>
                <p className="text-[10px] text-slate-400 font-bold mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Subscription Plans */}
          <div>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5">Subscription Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map(p => (
                <div key={p.name} className={`relative p-6 rounded-3xl border-2 transition-all ${p.current ? 'border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-100' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                  {p.current && (
                    <span className="absolute -top-3 left-6 px-3 py-1 bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest rounded-full">
                      Current Default
                    </span>
                  )}
                  <h3 className="text-lg font-black text-slate-900">{p.name}</h3>
                  <p className={`text-2xl font-black mt-2 ${p.current ? 'text-indigo-700' : 'text-slate-700'}`}>{p.price}</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">Up to {p.members.toLocaleString()} members • {p.orgs === 999 ? 'Unlimited' : p.orgs} org{p.orgs > 1 ? 's' : ''}</p>
                  <ul className="mt-4 space-y-2">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-600 font-bold">
                        <span className="text-green-500">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`mt-5 w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${p.current ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                    {p.current ? 'Configure Plan' : 'Set as Default'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Invoice History */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Invoice History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <th className="px-6 py-4">Invoice</th>
                    <th className="px-6 py-4">Organization</th>
                    <th className="px-6 py-4">Plan</th>
                    <th className="px-6 py-4">Amount (UGX)</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {invoices.map(inv => (
                    <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                      <td className="px-6 py-4 text-xs font-mono font-bold text-slate-500">{inv.id}</td>
                      <td className="px-6 py-4 text-sm font-black text-slate-900">{inv.org}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-lg uppercase">{inv.plan}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-black text-slate-900">{inv.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                          inv.status === 'paid' ? 'bg-green-50 text-green-700 border-green-100' :
                          inv.status === 'overdue' ? 'bg-red-50 text-red-700 border-red-100' :
                          'bg-slate-50 text-slate-500 border-slate-200'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-slate-400 font-bold">{inv.date}</td>
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
