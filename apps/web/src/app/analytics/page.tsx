import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';

export default function AnalyticsPage() {
  const role = ROLES.SME_OWNER;

  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      <Sidebar role={role} />
      
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Business Analytics</h1>
              <p className="text-gray-400 text-sm mt-1">Real-time performance metrics and forecasting.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <select className="flex-1 md:flex-none bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-green-500">
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
                <option>This Year</option>
              </select>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Avg Transaction', val: '45,200', change: '+5%', color: 'text-white' },
              { label: 'Customer Retention', val: '68%', change: '+12%', color: 'text-green-500' },
              { label: 'Stock Turnover', val: '4.2x', change: '-2%', color: 'text-orange-400' },
              { label: 'Net Margin', val: '32.4%', change: '+3%', color: 'text-blue-400' },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                <div className="flex items-end justify-between mt-2">
                  <p className={`text-2xl font-black ${stat.color}`}>UGX {stat.val}</p>
                  <span className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Large Chart Area */}
          <div className="bg-gray-900/50 p-6 md:p-8 rounded-3xl border border-gray-800">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Revenue Forecast</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-[10px] font-bold text-gray-400">Actual</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-600 border border-dashed border-gray-400"></div>
                  <span className="text-[10px] font-bold text-gray-400">Projected</span>
                </div>
              </div>
            </div>
            <div className="h-64 md:h-80 w-full flex items-end gap-2 md:gap-4 px-2">
              {/* Mock Bar Chart */}
              {[40, 55, 30, 85, 60, 75, 90, 65, 80, 95, 45, 70].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                  <div className="w-full bg-green-600/20 rounded-t-lg transition-all group-hover:bg-green-500/40 relative overflow-hidden" style={{ height: `${h}%` }}>
                    <div className="absolute bottom-0 w-full bg-green-500 rounded-t-lg" style={{ height: '30%' }}></div>
                  </div>
                  <div className="absolute -top-8 bg-white text-black text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}M
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-2 text-[10px] font-black text-gray-600 uppercase tracking-widest">
              <span>Jan</span>
              <span>Jun</span>
              <span>Dec</span>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-gray-900/50 p-6 md:p-8 rounded-3xl border border-gray-800">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Top Selling Categories</h3>
              <div className="space-y-6">
                {[
                  { name: 'Groceries', val: '4.2M', p: 75, color: 'bg-green-500' },
                  { name: 'Dairy & Eggs', val: '1.8M', p: 45, color: 'bg-blue-500' },
                  { name: 'Personal Care', val: '1.2M', p: 30, color: 'bg-purple-500' },
                  { name: 'Beverages', val: '0.9M', p: 20, color: 'bg-orange-500' },
                ].map(cat => (
                  <div key={cat.name} className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span>{cat.name}</span>
                      <span>UGX {cat.val}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full">
                      <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.p}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900/50 p-6 md:p-8 rounded-3xl border border-gray-800">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Payment Methods</h3>
              <div className="flex flex-col items-center justify-center h-full pb-8">
                {/* Mock Donut Chart */}
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="80" cy="80" r="70" fill="none" stroke="#1f2937" strokeWidth="20" />
                    <circle cx="80" cy="80" r="70" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="440" strokeDashoffset="110" />
                    <circle cx="80" cy="80" r="70" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="440" strokeDashoffset="330" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-2xl font-black">75%</p>
                    <p className="text-[8px] text-gray-500 uppercase font-bold">Digital</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8 w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-[10px] font-bold text-gray-400">MoMo (55%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-[10px] font-bold text-gray-400">Bank (20%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-700"></div>
                    <span className="text-[10px] font-bold text-gray-400">Cash (25%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
