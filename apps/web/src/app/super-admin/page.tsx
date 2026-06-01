import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';
import { createClient } from '@/utils/supabase/server';

async function getPlatformStats() {
  const supabase = await createClient();
  
  // Fetch actual SACCO count
  const { count: saccoCount, error: saccoError } = await supabase
    .from('organizations')
    .select('*', { count: 'exact', head: true });

  // Fetch actual SACCOs for leaderboard
  const { data: saccos, error: listError } = await supabase
    .from('organizations')
    .select('name, created_at')
    .limit(5)
    .order('created_at', { ascending: false });

  return {
    saccoCount: saccoCount || 0,
    recentSaccos: saccos || [],
  };
}

export default async function SuperAdminDashboard() {
  const role = ROLES.SUPER_ADMIN;
  const stats = await getPlatformStats();

  const platformKPIs = [
    { label: 'Total SACCOs', val: stats.saccoCount.toString(), trend: '+6 this month', color: 'text-green-600', icon: '🏢', isCurrency: false },
    { label: 'Total Members', val: '128,450', trend: '+2.4%', color: 'text-blue-600', icon: '👥', isCurrency: false },
    { label: 'Total Loan Portfolio', val: '42.8B', trend: '+15%', color: 'text-purple-600', icon: '💰', isCurrency: true },
    { label: 'Total Savings', val: '76B', trend: '+8%', color: 'text-emerald-600', icon: '🏦', isCurrency: true },
    { label: 'Monthly Volume', val: '9.2B', trend: '+12%', color: 'text-orange-600', icon: '🔄', isCurrency: true },
    { label: 'Platform Revenue', val: '18.4M', trend: '+20%', color: 'text-indigo-600', icon: '📈', isCurrency: true },
  ];

  const systemHealth = [
    { name: 'API Gateway', status: 'healthy', icon: '🟢' },
    { name: 'Supabase DB', status: 'healthy', icon: '🟢' },
    { name: 'MTN MoMo', status: 'healthy', icon: '🟢' },
    { name: 'Airtel Money', status: 'high latency', icon: '🟡' },
    { name: 'Email Service', status: 'healthy', icon: '🟢' },
  ];

  const failedJobs = [
    { type: 'Webhook', count: 12, msg: 'failed retries', color: 'text-red-500' },
    { type: 'Reconciliation', count: 3, msg: 'failures', color: 'text-orange-500' },
    { type: 'Cron Jobs', count: 2, msg: 'failed', color: 'text-red-500' },
  ];

  // Mock data for leaderboard if no real data yet
  const leaderboard = stats.recentSaccos.length > 0 
    ? stats.recentSaccos.map(s => ({
        name: s.name,
        members: '0',
        savings: '0',
        loans: '0',
        growth: '+0%',
        risk: 'Low'
      }))
    : [
        { name: 'Wakiso SACCO', members: '12k', savings: '4B', loans: '2B', growth: '+14%', risk: 'Low' },
        { name: 'Mbarara United', members: '8k', savings: '2.1B', loans: '1.5B', growth: '+8%', risk: 'Medium' },
        { name: 'Gulu Farmers', members: '5.2k', savings: '1.8B', loans: '1.2B', growth: '+11%', risk: 'Low' },
        { name: 'Jinja Workers', members: '4.5k', savings: '1.5B', loans: '1.8B', growth: '-2%', risk: 'High' },
      ];

  const riskMetrics = [
    { label: 'Avg Repayment Rate', val: '88.4%', trend: 'stable' },
    { label: 'Default Trends', val: '+1.2%', trend: 'rising' },
    { label: 'Total Overdue', val: '1.4B', trend: 'stable' },
  ];

  const revenueBreakdown = [
    { label: 'Subscriptions', val: '8M' },
    { label: 'Transaction Fees', val: '6M' },
    { label: 'SMS Margins', val: '2M' },
    { label: 'Loan Commissions', val: '2.4M' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar role={role} />
      
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Platform Command Center Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 uppercase">Platform Command Center</h1>
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Super Admin • Global Ecosystem Oversight</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/20">
                System Audit
              </button>
              <button className="flex-1 md:flex-none bg-slate-900 hover:bg-black text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                Platform Settings
              </button>
            </div>
          </div>

          {/* TOP SECTION -> PLATFORM KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {platformKPIs.map((kpi) => (
              <div key={kpi.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-2xl bg-slate-50 group-hover:bg-white transition-colors">
                    <span className="text-2xl">{kpi.icon}</span>
                  </div>
                  <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-tighter">{kpi.trend}</span>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                <div className="flex items-baseline gap-1">
                  {kpi.isCurrency && <span className="text-[10px] font-bold text-slate-400">UGX</span>}
                  <p className={`text-2xl font-black ${kpi.color}`}>{kpi.val}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* PLATFORM HEALTH */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Infrastructure Health
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {systemHealth.map((sys) => (
                    <div key={sys.name} className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{sys.icon}</span>
                        <p className="text-xs font-black text-slate-700 uppercase">{sys.name}</p>
                      </div>
                      <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${
                        sys.status === 'healthy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {sys.status}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {failedJobs.map((job) => (
                    <div key={job.type} className="flex flex-col p-4 rounded-2xl border border-red-50 bg-red-50/30">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{job.type}</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-xl font-black ${job.color}`}>{job.count}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{job.msg}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SACCO LEADERBOARD */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">SACCO Performance Leaderboard</h3>
                  <button className="text-[10px] font-black text-indigo-600 uppercase hover:underline">View All Organizations</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-slate-100">
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">SACCO Name</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Members</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Savings</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Loans</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {leaderboard.map((sacco) => (
                        <tr key={sacco.name} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 font-black text-slate-900 text-sm">{sacco.name}</td>
                          <td className="py-4 text-xs font-bold text-slate-600">{sacco.members}</td>
                          <td className="py-4 text-xs font-black text-slate-900">UGX {sacco.savings}</td>
                          <td className="py-4 text-xs font-black text-slate-900">UGX {sacco.loans}</td>
                          <td className={`py-4 text-xs font-black ${sacco.growth.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{sacco.growth}</td>
                          <td className="py-4">
                            <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${
                              sacco.risk === 'Low' ? 'bg-green-100 text-green-700' : 
                              sacco.risk === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                              'bg-red-100 text-red-700'
                            }`}>
                              {sacco.risk}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* SIDEBAR ANALYTICS */}
            <div className="space-y-8">
              
              {/* RISK MONITORING */}
              <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl">
                <h3 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-8">Ecosystem Risk Monitoring</h3>
                <div className="space-y-6 mb-8">
                  {riskMetrics.map(risk => (
                    <div key={risk.label} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{risk.label}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-black">{risk.val}</span>
                        <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${
                          risk.trend === 'rising' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                        }`}>{risk.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-red-600/20 border border-red-500/20 rounded-2xl">
                  <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">Critical Alerts</p>
                  <ul className="space-y-2">
                    <li className="text-[10px] font-bold text-red-100 flex items-center gap-2">
                      <span className="text-xs">⚠</span> 3 SACCOs with repayment rate &lt; 70%
                    </li>
                    <li className="text-[10px] font-bold text-red-100 flex items-center gap-2">
                      <span className="text-xs">⚠</span> Fraud patterns detected
                    </li>
                  </ul>
                </div>
              </div>

              {/* REVENUE & BILLING */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Monetization Oversight</h3>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 text-center p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <p className="text-2xl font-black text-indigo-700">42</p>
                    <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mt-1">Paid</p>
                  </div>
                  <div className="flex-1 text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-2xl font-black text-slate-700">4</p>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Trial</p>
                  </div>
                  <div className="flex-1 text-center p-4 bg-red-50 rounded-2xl border border-red-100">
                    <p className="text-2xl font-black text-red-700">2</p>
                    <p className="text-[8px] font-black text-red-400 uppercase tracking-widest mt-1">Overdue</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {revenueBreakdown.map(item => (
                    <div key={item.label} className="flex justify-between items-center group">
                      <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">{item.label}</span>
                      <span className="text-xs font-black text-slate-900">UGX {item.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI INSIGHTS */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8 rounded-[2rem] shadow-xl">
                <h3 className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.2em] mb-6">AI Platform Intelligence</h3>
                <div className="space-y-4">
                  {[
                    '12 SACCOs likely to need liquidity support',
                    'Northern region growing fastest (+22%)',
                    'Mobile usage increased by 14% this week',
                    'Default prediction: 2.1% lower than May'
                  ].map((insight, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="text-lg">✨</span>
                      <p className="text-[11px] font-bold leading-relaxed text-indigo-50">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* AUDIT & SECURITY ALERTS */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Security & Audit Alerts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { type: 'Failed Logins', msg: 'Multiple attempts in Kampala', color: 'text-red-600', bg: 'bg-red-50' },
                { type: 'Large Withdrawal', msg: 'UGX 25M from Mbarara', color: 'text-orange-600', bg: 'bg-orange-50' },
                { type: 'Permission Escalation', msg: 'Detected in staff role', color: 'text-red-600', bg: 'bg-red-50' },
                { type: 'Suspicious Activity', msg: 'Rapid small transfers', color: 'text-indigo-600', bg: 'bg-indigo-50' },
              ].map((alert, i) => (
                <div key={i} className={`p-5 rounded-2xl border border-slate-100 ${alert.bg}`}>
                  <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${alert.color}`}>{alert.type}</p>
                  <p className="text-xs font-bold text-slate-700">{alert.msg}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
