// import { createClient } from '@/utils/supabase/server'; // Unused import removed
import { ROLES } from '@sacco/core';
import Sidebar from '@/components/layout/Sidebar';
import { format } from 'date-fns';

// Constants for static data and pure calculations
const now = new Date();
const formattedMonth = format(now, 'MMMM yyyy');

// Mock transactions data (static, defined outside component for purity)


const transactions = [
  { id: '1', description: 'Product sales', category: 'Groceries', amount: 320000, transaction_type: 'income' as const, payment_method: 'Cash', transaction_date: new Date().toISOString() },
  { id: '2', description: 'Product sales', category: 'MoMo payment', amount: 165000, transaction_type: 'income' as const, payment_method: 'MTN MoMo', transaction_date: new Date().toISOString() },
  { id: '3', description: 'Transport', category: 'Boda to market', amount: 5000, transaction_type: 'expense' as const, payment_method: 'Cash', transaction_date: new Date().toISOString() },
  { id: '4', description: 'Product sales', category: 'Counter sales', amount: 280000, transaction_type: 'income' as const, payment_method: 'Cash', transaction_date: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: '5', description: 'Stock purchase', category: 'Milk, sugar, flour', amount: 88000, transaction_type: 'expense' as const, payment_method: 'Cash', transaction_date: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: '6', description: 'Rent', category: 'Shop space', amount: 200000, transaction_type: 'expense' as const, payment_method: 'Airtel Money', transaction_date: new Date(Date.now() - 86400000 * 3).toISOString() },
];

export default async function CashbookPage() {
  // Demo Mode: Bypassing auth to show the module
  const role = ROLES.SME_OWNER;
  
  const business = {
    id: 'demo-biz-1',
    name: 'Kizito General Store',
    business_type: 'Retail',
    district: 'Kampala',
  };

  

  const totalIncome = transactions
    .filter(t => t.transaction_type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.transaction_type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const profit = totalIncome - totalExpenses;

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
    return val.toString();
  };

  return (
    <div className="flex min-h-screen bg-black text-white font-sans overflow-hidden">
      <Sidebar role={role} />
      
      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4 md:p-6 overflow-y-auto">
        {/* Main Cashbook Column */}
        <div className="flex-1 max-w-2xl mx-auto w-full space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 rounded-lg flex items-center justify-center text-xl md:text-2xl font-bold">
                {business.name[0]}
              </div>
              <div>
                <h1 className="text-base md:text-lg font-bold">{business.name}</h1>
                <p className="text-[10px] md:text-xs text-gray-400">{business.business_type} • {business.district}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-gray-900 rounded-lg border border-gray-800">
                🔍
              </button>
              <button className="p-2 bg-gray-900 rounded-lg border border-gray-800">
                📅
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 bg-gray-900/50 p-4 rounded-2xl border border-gray-800">
            <div className="text-center">
              <p className="text-green-500 text-sm md:text-lg font-bold">{formatCurrency(totalIncome)}</p>
              <p className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-widest font-black">Income</p>
            </div>
            <div className="text-center border-x border-gray-800">
              <p className="text-red-400 text-sm md:text-lg font-bold">{formatCurrency(totalExpenses)}</p>
              <p className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-widest font-black">Expenses</p>
            </div>
            <div className="text-center">
              <p className="text-white text-sm md:text-lg font-bold">{formatCurrency(profit)}</p>
              <p className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-widest font-black">Profit</p>
            </div>
          </div>

          {/* Month Selector */}
          <div className="flex items-center justify-between bg-gray-900/30 p-3 rounded-xl border border-gray-800/50">
            <button className="text-gray-500 hover:text-white">◀</button>
            <span className="text-sm font-bold uppercase tracking-wider">{formattedMonth}</span>
            <button className="text-gray-500 hover:text-white">▶</button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-gray-900 rounded-xl border border-gray-800">
            <button className="flex-1 py-2 text-xs font-bold rounded-lg bg-white text-black">All</button>
            <button className="flex-1 py-2 text-xs font-bold rounded-lg text-gray-400 hover:text-white">Income</button>
            <button className="flex-1 py-2 text-xs font-bold rounded-lg text-gray-400 hover:text-white">Expenses</button>
          </div>

          {/* Transaction List */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center px-2">
                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Today — Mon 25 May</h3>
                <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">+UGX 485,000</span>
              </div>
              
              {transactions.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-4 bg-gray-900/40 rounded-2xl border border-gray-800/50 hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                      t.transaction_type === 'income' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {t.transaction_type === 'income' ? '📥' : '📤'}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{t.description}</h4>
                      <p className="text-[10px] text-gray-500">{t.category} — {t.payment_method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${
                      t.transaction_type === 'income' ? 'text-green-500' : 'text-red-400'
                    }`}>
                      {t.transaction_type === 'income' ? '+' : '-'}{t.amount.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-gray-500">{format(new Date(t.transaction_date), 'h:mm a')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Sidebar / Insights Column */}
        <div className="hidden lg:flex flex-col w-80 space-y-6">
          {/* Expense Breakdown */}
          <div className="bg-gray-900/50 p-6 rounded-3xl border border-gray-800">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Expense Breakdown</h3>
            <div className="space-y-4">
              {[
                { label: 'Stock purchase', color: 'bg-red-500', val: '1.04M', percent: '60%' },
                { label: 'Rent', color: 'bg-orange-500', val: '800K', percent: '45%' },
                { label: 'Salaries', color: 'bg-yellow-500', val: '320K', percent: '20%' },
                { label: 'Transport', color: 'bg-gray-500', val: '280K', percent: '15%' },
                { label: 'Utilities', color: 'bg-gray-600', val: '170K', percent: '10%' },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                      <span>{item.label}</span>
                    </div>
                    <span className="text-gray-400">{item.val}</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800 rounded-full">
                    <div className={`${item.color} h-full rounded-full`} style={{ width: item.percent }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Credit Score */}
          <div className="bg-gray-900/50 p-6 rounded-3xl border border-gray-800">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6 text-center">Credit Score</h3>
            <div className="flex flex-col items-center space-y-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="56" fill="none" stroke="#1f2937" strokeWidth="8" />
                  <circle cx="64" cy="64" r="56" fill="none" stroke="#10b981" strokeWidth="8" strokeDasharray="351" strokeDashoffset={351 - (351 * 0.71)} />
                </svg>
                <div className="absolute text-center">
                  <p className="text-3xl font-black">71</p>
                  <p className="text-[10px] text-green-500 font-bold uppercase">Low Risk</p>
                </div>
              </div>
              <div className="w-full space-y-3">
                {[
                  { label: 'Profit margin', val: '20/25', color: 'bg-green-500' },
                  { label: 'Consistency', val: '20/20', color: 'bg-green-500' },
                  { label: 'Debt burden', val: '15/20', color: 'bg-orange-500' },
                  { label: 'Repayment', val: '16/20', color: 'bg-blue-500' },
                  { label: 'Data richness', val: '8/15', color: 'bg-green-500/50' },
                ].map(metric => (
                  <div key={metric.label} className="flex items-center justify-between gap-4">
                    <span className="text-[10px] text-gray-400 font-bold">{metric.label}</span>
                    <div className="flex items-center gap-2 flex-1 justify-end">
                      <div className="h-1 bg-gray-800 rounded-full w-24">
                        <div className={`h-full rounded-full ${metric.color}`} style={{ width: '80%' }}></div>
                      </div>
                      <span className="text-[10px] font-bold min-w-[30px]">{metric.val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gray-900/50 p-6 rounded-3xl border border-gray-800">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">AI Insights</h3>
            <div className="space-y-4">
              {[
                { icon: '📊', text: '32% profit margin — above the retail average of 22% for your category.', bg: 'bg-green-500/10' },
                { icon: '⚠️', text: 'Stock purchase is 40% of expenses. Consider bulk buying to reduce cost.', bg: 'bg-orange-500/10' },
                { icon: '💡', text: 'Based on your cashflow you qualify for a loan up to UGX 4.6M from Kampala Unity SACCO.', bg: 'bg-blue-500/10' },
              ].map((insight, i) => (
                <div key={i} className={`flex gap-3 p-3 rounded-2xl ${insight.bg} border border-white/5`}>
                  <span className="text-lg">{insight.icon}</span>
                  <p className="text-[10px] leading-relaxed text-gray-300 font-medium">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
