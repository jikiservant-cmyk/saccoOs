import { createClient } from '@/utils/supabase/server';
import { ROLES, Role } from '@sacco/core';
import { redirect } from 'next/navigation';

async function getJoinRequests() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: orgRole } = await supabase
    .schema('sacco')
    .from('user_org_roles')
    .select('organization_id')
    .eq('user_id', user.id)
    .single();

  if (!orgRole) return [];

  const { data, error } = await supabase
    .schema('sacco')
    .from('organization_join_requests')
    .select('*, profiles(*)')
    .eq('organization_id', orgRole.organization_id)
    .eq('status', 'pending');
  
  if (error) {
    console.error('Error fetching join requests:', error);
    return [];
  }
  return data;
}

async function getSaccoMembers() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: orgRole } = await supabase
    .schema('sacco')
    .from('user_org_roles')
    .select('organization_id')
    .eq('user_id', user.id)
    .single();

  if (!orgRole) return [];

  const { data, error } = await supabase
    .schema('sacco')
    .from('user_org_roles')
    .select('profiles(*)')
    .eq('organization_id', orgRole.organization_id);

  if (error) {
    console.error('Error fetching members:', error);
    return [];
  }
  return data.map((d: any) => d.profiles).filter(Boolean);
}

async function getSaccoWallet() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: orgRole } = await supabase
    .schema('sacco')
    .from('user_org_roles')
    .select('organization_id')
    .eq('user_id', user.id)
    .single();

  if (!orgRole) return null;

  const { data, error } = await supabase
    .schema('sacco')
    .from('organizations')
    .select('*, wallets(*)')
    .eq('id', orgRole.organization_id)
    .single();

  if (error) {
    console.error('Error fetching sacco wallet:', error);
    return null;
  }
  return data;
}

async function getSavingProducts() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: orgRole } = await supabase
    .schema('sacco')
    .from('user_org_roles')
    .select('organization_id')
    .eq('user_id', user.id)
    .single();

  if (!orgRole) return [];

  const { data, error } = await supabase
    .schema('sacco')
    .from('saving_products')
    .select('*')
    .eq('organization_id', orgRole.organization_id);

  if (error) {
    console.error('Error fetching saving products:', error);
    return [];
  }
  return data;
}

async function getLoanProducts() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: orgRole } = await supabase
    .schema('sacco')
    .from('user_org_roles')
    .select('organization_id')
    .eq('user_id', user.id)
    .single();

  if (!orgRole) return [];

  const { data, error } = await supabase
    .schema('sacco')
    .from('loan_products')
    .select('*')
    .eq('organization_id', orgRole.organization_id);

  if (error) {
    console.error('Error fetching loan products:', error);
    return [];
  }
  return data;
}

export default async function SaccoAdminDashboard() {
  const role = ROLES.SACCO_ADMIN;
  const requests = await getJoinRequests();
  const members = await getSaccoMembers();
  const sacco = await getSaccoWallet();
  const savingProducts = await getSavingProducts();
  const loanProducts = await getLoanProducts();

  const kpis = [
    { label: 'Total Savings', val: '450.2M', trend: '+12%', icon: '💰', color: 'text-green-600', sub: 'Active Portfolios' },
    { label: 'Active Loans', val: '1.2B', trend: '+5%', icon: '📈', color: 'text-indigo-600', sub: 'Member Loans' },
    { label: 'Repayment Rate', val: '94.2%', trend: '+2.1%', icon: '✅', color: 'text-teal-600', status: 'Healthy' },
    { label: 'Overdue Loans', val: '42.5M', trend: '-8%', icon: '⚠️', color: 'text-red-600', sub: 'Requires Action' },
    { label: 'Monthly Revenue', val: '18.4M', trend: '+15%', icon: '📊', color: 'text-blue-600', sub: 'Fees & Interest' },
    { label: 'Cash Available', val: '84.1M', trend: '-2%', icon: '🏦', color: 'text-green-600', status: 'Stable' },
  ];

  const alerts = [
    { msg: "Treasury balance below target threshold", type: 'danger', time: '2m ago' },
    { msg: "Loan #842 (Mugisha Alex) is 3 days overdue", type: 'warning', time: '1h ago' },
    { msg: "New SACCO Join Request from 'Kikuubo Group'", type: 'info', time: '3h ago' },
  ];

  const activity = [
    { action: 'Loan Approved', target: 'UGX 5M for Sarah Bakers', time: '10m ago', status: 'success' },
    { action: 'Member Joined', target: 'John Katende', time: '45m ago', status: 'info' },
    { action: 'Payment Received', target: 'UGX 250k from Alex M.', time: '2h ago', status: 'success' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-100 p-6 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-indigo-200">
            S
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">Mission Control</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SACCO Admin Portal • Live</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-gray-50 text-gray-400 p-3 rounded-xl hover:bg-gray-100 transition-colors relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="h-10 w-[1px] bg-gray-100 mx-2"></div>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2">
            <span>+ New Loan</span>
          </button>
        </div>
      </header>

      <main className="p-8 space-y-8 max-w-[1600px] mx-auto w-full">
        
        {/* JOIN REQUESTS STRIP */}
        {requests.length > 0 && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-[24px] p-6 flex items-center justify-between animate-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">🤝</div>
              <div>
                <p className="text-sm font-black text-indigo-900">{requests.length} New Join Requests</p>
                <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Approval required for ecosystem access</p>
              </div>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all">Review All</button>
          </div>
        )}

        {/* TOP SECTION -> SACCO WALLET & KPI CARDS */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* SACCO WALLET CARD */}
          <div className="xl:col-span-1 bg-gray-900 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-green-500/20 transition-all"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500 border border-green-500/20">
                  🏦
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">SACCO Vault</p>
                  <p className="text-xs font-bold text-gray-300">{sacco?.name || 'Main Treasury'}</p>
                </div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500 mb-2">Total Treasury Balance</p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-sm font-bold text-gray-500">UGX</span>
                <h2 className="text-4xl font-black tracking-tighter">
                  {sacco?.wallets?.[0]?.balance?.toLocaleString() || '1.24B'}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Inflow</p>
                  <p className="text-sm font-bold text-green-400">+12.4M</p>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Outflow</p>
                  <p className="text-sm font-bold text-red-400">-4.2M</p>
                </div>
              </div>
            </div>
          </div>

          {/* KPI GRID */}
          <div className="xl:col-span-3 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {kpi.icon}
                  </div>
                  {kpi.trend && (
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                      kpi.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                    }`}>
                      {kpi.trend}
                    </span>
                  )}
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{kpi.label}</p>
                <p className={`text-2xl font-black mt-2 tracking-tight ${kpi.color}`}>UGX {kpi.val}</p>
                <div className="flex items-center gap-2 mt-3">
                  {kpi.sub && <p className="text-[10px] text-gray-500 font-bold">{kpi.sub}</p>}
                  {kpi.status && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <p className="text-[10px] text-green-600 font-black uppercase tracking-widest">{kpi.status}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCTS & ACTIVITY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Management Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Savings Products */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-black text-gray-900">Savings Products</h3>
                  <button className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">+ Create</button>
                </div>
                <div className="space-y-3">
                  {savingProducts.map((p) => (
                    <div key={p.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-gray-900">{p.name}</p>
                        <p className="text-[10px] text-gray-500 font-medium">{p.interest_rate}% Interest p.a</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-green-600 uppercase">Active</p>
                      </div>
                    </div>
                  ))}
                  {savingProducts.length === 0 && <p className="text-xs text-gray-400 italic">No savings products defined.</p>}
                </div>
              </div>

              {/* Loan Products */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-black text-gray-900">Loan Products</h3>
                  <button className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">+ Create</button>
                </div>
                <div className="space-y-3">
                  {loanProducts.map((p) => (
                    <div key={p.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-gray-900">{p.name}</p>
                        <p className="text-[10px] text-gray-500 font-medium">{p.interest_rate}% Interest Rate</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-indigo-600 uppercase">Active</p>
                      </div>
                    </div>
                  ))}
                  {loanProducts.length === 0 && <p className="text-xs text-gray-400 italic">No loan products defined.</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Operational Alerts & Feed */}
          <div className="space-y-8">
            {/* Alerts */}
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Priority Alerts
              </h3>
              <div className="space-y-4">
                {alerts.slice(0, 3).map((alert, i) => (
                  <div key={i} className={`p-4 rounded-2xl border ${
                    alert.type === 'danger' ? 'bg-red-50/50 border-red-100 text-red-900' :
                    alert.type === 'warning' ? 'bg-orange-50/50 border-orange-100 text-orange-900' :
                    'bg-blue-50/50 border-blue-100 text-blue-900'
                  }`}>
                    <p className="text-xs font-bold leading-relaxed">{alert.msg}</p>
                    <p className="text-[9px] font-black opacity-40 uppercase mt-2 tracking-widest">{alert.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Summary Activity */}
            <div className="bg-gray-900 p-8 rounded-[32px] text-white shadow-xl border border-gray-800">
              <h3 className="text-xs font-black text-green-500 uppercase tracking-widest mb-6">Recent Activity</h3>
              <div className="space-y-6">
                {activity.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      item.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></div>
                    <div>
                      <p className="text-xs font-bold">{item.action}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{item.target}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
