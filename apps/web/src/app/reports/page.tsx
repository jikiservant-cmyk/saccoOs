import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';

export default function ReportsPage() {
  const role = ROLES.SME_OWNER;

  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      <Sidebar role={role} />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Business Reports</h1>
              <p className="text-gray-400 text-sm mt-1">Deep dive into your sales, expenses, and growth.</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-xl text-sm font-bold">
                Export PDF
              </button>
              <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                Generate Monthly Report
              </button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profit Card */}
            <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Net Profit (YTD)</p>
                <p className="text-4xl font-black mt-2">18.2M</p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="bg-green-500/10 text-green-500 text-[10px] font-black px-2 py-0.5 rounded-full">+12.4%</span>
                  <span className="text-[10px] text-gray-500">vs last year</span>
                </div>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] text-8xl opacity-5 grayscale">📈</div>
            </div>

            {/* Expenses Card */}
            <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Operating Costs</p>
                <p className="text-4xl font-black mt-2 text-red-400">4.1M</p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="bg-red-500/10 text-red-400 text-[10px] font-black px-2 py-0.5 rounded-full">-2.1%</span>
                  <span className="text-[10px] text-gray-500">vs last month</span>
                </div>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] text-8xl opacity-5 grayscale">💸</div>
            </div>

            {/* Growth Card */}
            <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Revenue Growth</p>
                <p className="text-4xl font-black mt-2 text-blue-400">28%</p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="bg-blue-500/10 text-blue-400 text-[10px] font-black px-2 py-0.5 rounded-full">Strong</span>
                  <span className="text-[10px] text-gray-500">Industry average: 22%</span>
                </div>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] text-8xl opacity-5 grayscale">🚀</div>
            </div>
          </div>

          {/* Monthly Comparison */}
          <div className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-8">Monthly Revenue vs Expenses</h3>
            <div className="h-64 flex items-end gap-2 md:gap-4">
              {[
                { month: 'Jan', rev: 60, exp: 40 },
                { month: 'Feb', rev: 80, exp: 35 },
                { month: 'Mar', rev: 45, exp: 50 },
                { month: 'Apr', rev: 95, exp: 30 },
                { month: 'May', rev: 70, exp: 45 },
                { month: 'Jun', rev: 85, exp: 40 },
              ].map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-4 group">
                  <div className="w-full flex justify-center gap-1 h-full items-end">
                    <div className="w-2 md:w-4 bg-green-600 rounded-t-lg transition-all group-hover:bg-green-500" style={{ height: `${data.rev}%` }}></div>
                    <div className="w-2 md:w-4 bg-red-400 rounded-t-lg transition-all group-hover:bg-red-300" style={{ height: `${data.exp}%` }}></div>
                  </div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Risk Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Financial Health Score</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-300">Liquidity Ratio</span>
                  <span className="text-sm font-black text-green-500">Excellent (2.4)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-300">Debt to Equity</span>
                  <span className="text-sm font-black text-yellow-500">Moderate (0.8)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-300">Working Capital</span>
                  <span className="text-sm font-black text-green-500">UGX 8.5M</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-600/10 p-8 rounded-3xl border border-blue-500/20 relative overflow-hidden">
              <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Loan Eligibility Insight</h3>
              <p className="text-sm font-medium text-gray-200 leading-relaxed relative z-10">
                Based on your last 6 months of consistent cashflow and increasing inventory turnover, 
                you now qualify for a <strong>Tier 2 Business Expansion Loan</strong> of up to 
                <strong> UGX 12M</strong> at a preferred rate of <strong>1.5%</strong>.
              </p>
              <button className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-colors relative z-10">
                View Offer
              </button>
              <div className="absolute right-[-30px] top-[-30px] text-9xl grayscale opacity-10 rotate-12">💎</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
