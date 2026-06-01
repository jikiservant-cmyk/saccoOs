import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';

const riskData = [
  { org: 'Kampala Unity SACCO', portfolio: '850M', npl: '2.4%', overdue: '20.4M', healthy: 94, atRisk: 4, defaulted: 2 },
  { org: 'Wakiso United SACCO', portfolio: '420M', npl: '5.1%', overdue: '21.4M', healthy: 87, atRisk: 9, defaulted: 4 },
  { org: 'Gulu Teachers SACCO', portfolio: '195M', npl: '1.8%', overdue: '3.5M', healthy: 96, atRisk: 3, defaulted: 1 },
  { org: 'Mbarara Farmers SACCO', portfolio: '310M', npl: '7.3%', overdue: '22.6M', healthy: 81, atRisk: 12, defaulted: 7 },
];

const productPerf = [
  { product: 'Regular Business Loan', disbursed: '1.24B', repayRate: '96.2%', avgTerm: '12 mo', risk: 'low' },
  { product: 'Emergency Micro-Loan', disbursed: '480M', repayRate: '88.4%', avgTerm: '3 mo', risk: 'medium' },
  { product: 'Asset Finance', disbursed: '620M', repayRate: '94.1%', avgTerm: '24 mo', risk: 'low' },
  { product: 'Agricultural Loan', disbursed: '290M', repayRate: '79.2%', avgTerm: '6 mo', risk: 'high' },
];

const riskConfig = {
  low:    'bg-green-500/10 text-green-400 border-green-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  high:   'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function LoanIntelPage() {
  const role = ROLES.SUPER_ADMIN;

  return (
    <div className="flex min-h-screen bg-gray-950 text-white font-sans">
      <Sidebar role={role} />

      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header */}
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">AI-Powered Analytics</p>
            <h1 className="text-3xl font-black tracking-tight">Loan Intelligence</h1>
            <p className="text-gray-400 text-sm mt-1">Cross-platform lending behavior, portfolio health, and risk prediction</p>
          </div>

          {/* Platform Loan KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Portfolio', val: '2.77B', sub: 'UGX across 4 SACCOs', color: 'text-white', icon: '💰' },
              { label: 'Platform NPL Rate', val: '3.8%', sub: '↓ 0.4% vs last quarter', color: 'text-green-400', icon: '📉' },
              { label: 'Loans at Risk', val: '142', sub: '30+ days overdue', color: 'text-yellow-400', icon: '⚠️' },
              { label: 'Predicted Defaults', val: '28', sub: 'Next 30 days (AI)', color: 'text-red-400', icon: '🧠' },
            ].map(kpi => (
              <div key={kpi.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{kpi.icon}</span>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{kpi.label}</p>
                </div>
                <p className={`text-3xl font-black ${kpi.color}`}>{kpi.val}</p>
                <p className="text-[10px] text-gray-600 font-bold mt-1">{kpi.sub}</p>
              </div>
            ))}
          </div>

          {/* Risk Heatmap by Org */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Portfolio Risk by Organization</h3>
            </div>
            <div className="divide-y divide-gray-800">
              {riskData.map(org => (
                <div key={org.org} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm font-black text-white">{org.org}</p>
                      <p className="text-[10px] text-gray-500 font-bold">Portfolio: UGX {org.portfolio} • Overdue: UGX {org.overdue}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-sm font-black ${parseFloat(org.npl) > 5 ? 'text-red-400' : parseFloat(org.npl) > 3 ? 'text-yellow-400' : 'text-green-400'}`}>
                        NPL: {org.npl}
                      </span>
                    </div>
                  </div>
                  {/* Health Bar */}
                  <div className="flex rounded-full overflow-hidden h-3 gap-0.5">
                    <div className="bg-green-500 h-full transition-all" style={{ width: `${org.healthy}%` }} title={`${org.healthy}% Healthy`} />
                    <div className="bg-yellow-400 h-full transition-all" style={{ width: `${org.atRisk}%` }} title={`${org.atRisk}% At Risk`} />
                    <div className="bg-red-500 h-full transition-all" style={{ width: `${org.defaulted}%` }} title={`${org.defaulted}% Defaulted`} />
                  </div>
                  <div className="flex gap-6 mt-2">
                    <span className="text-[10px] font-bold text-green-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" />{org.healthy}% Healthy</span>
                    <span className="text-[10px] font-bold text-yellow-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />{org.atRisk}% At Risk</span>
                    <span className="text-[10px] font-bold text-red-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />{org.defaulted}% Defaulted</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Performance */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Loan Product Performance</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-800">
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Total Disbursed</th>
                    <th className="px-6 py-4">Repayment Rate</th>
                    <th className="px-6 py-4">Avg Term</th>
                    <th className="px-6 py-4 text-right">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {productPerf.map(p => (
                    <tr key={p.product} className="hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-white">{p.product}</td>
                      <td className="px-6 py-4 text-sm font-black text-gray-300">UGX {p.disbursed}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-1.5 bg-gray-800 rounded-full">
                            <div
                              className={`h-full rounded-full ${parseFloat(p.repayRate) > 93 ? 'bg-green-500' : parseFloat(p.repayRate) > 85 ? 'bg-yellow-400' : 'bg-red-500'}`}
                              style={{ width: p.repayRate }}
                            />
                          </div>
                          <span className="text-sm font-black text-gray-200">{p.repayRate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400 font-bold">{p.avgTerm}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${riskConfig[p.risk as keyof typeof riskConfig]}`}>
                          {p.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Predictions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: '🧠', title: 'Default Risk Alert', body: '28 loans predicted to default in the next 30 days based on payment velocity decline. Mbarara Farmers SACCO accounts for 40% of predicted defaults.', color: 'border-red-500/20 bg-red-500/5' },
              { icon: '📊', title: 'Product Opportunity', body: 'Agricultural loans have the highest demand but worst repayment rate. Consider a co-payment insurance product to reduce NPL while serving farmers.', color: 'border-blue-500/20 bg-blue-500/5' },
              { icon: '💡', title: 'Collection Insight', body: 'Members who receive 2 SMS reminders before due date have 23% higher repayment rates. Enable auto-SMS for all at-risk loans.', color: 'border-green-500/20 bg-green-500/5' },
            ].map(insight => (
              <div key={insight.title} className={`p-6 rounded-3xl border ${insight.color}`}>
                <span className="text-2xl">{insight.icon}</span>
                <h4 className="text-sm font-black text-white mt-3 mb-2">{insight.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{insight.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
