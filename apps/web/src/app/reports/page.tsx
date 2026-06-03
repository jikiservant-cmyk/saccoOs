import { ROLES } from '@sacco/core';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import BottomNav from '@/components/layout/BottomNav';

export default async function ReportsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className="app bg-[var(--bg)] min-h-screen relative pb-[100px]">
      {/* HEADER */}
      <header className="px-[22px] py-8 pb-6 animate-fade-up">
        <h1 className="font-serif text-[28px] font-bold text-[var(--navy)] tracking-tight">Analytics</h1>
        <p className="text-[13px] text-[var(--muted)] font-medium">Business performance & insights</p>
      </header>

      {/* STATS OVERVIEW */}
      <div className="px-[22px] mb-8 animate-fade-up [animation-delay:0.1s]">
        <div className="bg-[var(--navy)] rounded-[32px] p-8 text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-[20px] border-white/5"></div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-white/50 mb-2">Net Profit (MTD)</p>
          <h2 className="font-serif text-4xl font-bold text-[var(--gold)]">UGX 440,500</h2>
          <div className="flex items-center gap-2 mt-4">
            <span className="bg-[var(--green)]/20 text-[var(--green)] text-[10px] font-bold px-2 py-0.5 rounded-full">+12%</span>
            <span className="text-[10px] text-white/40 font-mono">vs last month</span>
          </div>
        </div>
      </div>

      {/* CHARTS PLACEHOLDER */}
      <div className="px-[22px] mb-8 animate-fade-up [animation-delay:0.15s]">
        <h3 className="text-[11px] font-bold text-[var(--muted2)] uppercase tracking-[1.5px] mb-4 ml-2">Revenue vs Expenses</h3>
        <div className="bg-[var(--card)] border border-[var(--border2)] rounded-[26px] p-6 h-64 flex items-end gap-3">
          {[40, 70, 45, 90, 65, 80].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-[var(--teal)]/20 rounded-t-lg relative group cursor-pointer" style={{ height: `${h}%` }}>
                <div className="absolute inset-0 bg-[var(--teal)] opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg"></div>
              </div>
              <span className="font-mono text-[9px] text-[var(--muted2)] uppercase">M{i+1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* INSIGHTS */}
      <div className="px-[22px] animate-fade-up [animation-delay:0.2s]">
        <h3 className="text-[11px] font-bold text-[var(--muted2)] uppercase tracking-[1.5px] mb-4 ml-2">AI Insights</h3>
        <div className="space-y-4">
          <div className="bg-[var(--teal-lt)] border border-[var(--teal)]/10 rounded-2xl p-5">
            <p className="text-sm font-medium text-[var(--navy)] leading-relaxed">
              Your <strong>Sales</strong> are up by 15% this week. Consider restocking <strong>Maize Flour</strong> as it is your top performer.
            </p>
          </div>
          <div className="bg-[var(--gold-lt)] border border-[var(--gold)]/10 rounded-2xl p-5">
            <p className="text-sm font-medium text-[var(--navy)] leading-relaxed">
              Operational costs are slightly high. You could save <strong>UGX 15,000</strong> by optimizing your transport routes.
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
