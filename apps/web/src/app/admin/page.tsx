import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';
import { createClient } from '@/utils/supabase/server';
import { respondToJoinRequest } from '../organizations/actions';

async function getJoinRequests() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];

  // Get the organization this admin belongs to
  const { data: orgRole } = await supabase
    .from('user_org_roles')
    .select('organization_id')
    .eq('user_id', user.id)
    .single();

  if (!orgRole) return [];

  const { data, error } = await supabase
    .from('business_organizations')
    .select('*, businesses(name, owner_profile_id)')
    .eq('organization_id', orgRole.organization_id)
    .eq('status', 'pending');

  if (error) {
    console.error('Error fetching join requests:', error);
    return [];
  }
  return data;
}

export default async function SaccoAdminDashboard() {
  const role = ROLES.SACCO_ADMIN;
  const requests = await getJoinRequests();

  const kpis = [
    { label: 'Total Savings', val: '1.2B', trend: '+12%', color: 'text-green-500', icon: '💰' },
    { label: 'Active Loans', val: '850M', sub: '214 active', trend: '+5%', color: 'text-blue-500', icon: '📝' },
    { label: 'Repayment Rate', val: '94.2%', status: 'Healthy', color: 'text-green-500', icon: '✅' },
    { label: 'Overdue Loans', val: '73M', sub: '18 loans late', trend: '+2%', color: 'text-red-500', icon: '⚠️' },
    { label: 'Monthly Revenue', val: '24M', trend: '+8%', color: 'text-purple-500', icon: '📈' },
    { label: 'Cash Available', val: '310M', status: 'Liquid', color: 'text-green-500', icon: '🏦' },
  ];

  const alerts = [
    { type: 'danger', msg: '12 loans overdue > 30 days', time: '2h ago' },
    { type: 'warning', msg: 'Liquidity below safe threshold', time: '4h ago' },
    { type: 'info', msg: '5 failed payment reconciliations', time: '1d ago' },
    { type: 'warning', msg: 'Large withdrawal detected: UGX 15M', time: '1d ago' },
  ];

  const activity = [
    { action: 'Loan Approved', target: 'LN-0042', time: '10 mins ago', status: 'success' },
    { action: 'Repayment Received', target: 'UGX 500,000', time: '25 mins ago', status: 'success' },
    { action: 'New Member Joined', target: 'John Musoke', time: '1 hour ago', status: 'info' },
    { action: 'SME Score Updated', target: 'Kizito Store: 62 → 74', time: '3 hours ago', status: 'success' },
  ];

  const smeHealth = [
    { label: 'Healthy SMEs', count: 48, color: 'bg-green-500' },
    { label: 'Medium Risk', count: 12, color: 'bg-yellow-500' },
    { label: 'High Risk', count: 3, color: 'bg-red-500' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Sidebar role={role} />
      
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Mission Control Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900">Mission Control</h1>
              <p className="text-gray-500 text-sm font-medium mt-1 uppercase tracking-widest text-[10px]">SACCO Admin Dashboard • Kampala Central</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-green-900/20">
                + New Loan
              </button>
              <button className="flex-1 md:flex-none bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                Generate Report
              </button>
            </div>
          </div>

          {/* JOIN REQUESTS */}
          {requests.length > 0 && (
            <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
              <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                New SME Join Requests ({requests.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {requests.map((req) => (
                  <div key={req.id} className="bg-white p-4 rounded-2xl border border-indigo-100 flex flex-col justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{req.businesses.name}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">SME ID: {req.business_id.slice(0, 8)}</p>
                    </div>
                    <div className="flex gap-2">
                      <form action={async () => {
                        'use server';
                        await respondToJoinRequest(req.id, 'active');
                      }} className="flex-1">
                        <button className="w-full py-2 bg-indigo-600 text-white text-[10px] font-black uppercase rounded-lg hover:bg-indigo-700 transition-all">
                          Approve
                        </button>
                      </form>
                      <form action={async () => {
                        'use server';
                        await respondToJoinRequest(req.id, 'rejected');
                      }} className="flex-1">
                        <button className="w-full py-2 bg-white border border-gray-200 text-gray-600 text-[10px] font-black uppercase rounded-lg hover:bg-gray-50 transition-all">
                          Reject
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TOP SECTION -> KPI CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xl">{kpi.icon}</span>
                  {kpi.trend && <span className={`text-[10px] font-black ${kpi.trend.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{kpi.trend}</span>}
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{kpi.label}</p>
                <p className={`text-xl font-black mt-1 ${kpi.color}`}>UGX {kpi.val}</p>
                {kpi.sub && <p className="text-[10px] text-gray-500 font-bold mt-1">{kpi.sub}</p>}
                {kpi.status && <p className="text-[10px] text-green-600 font-black mt-1 uppercase">{kpi.status}</p>}
              </div>
            ))}
          </div>

          {/* MIDDLE SECTION -> ALERTS & ACTIVITY */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Operational Alerts */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Operational Alerts
              </h3>
              <div className="space-y-3">
                {alerts.map((alert, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${
                    alert.type === 'danger' ? 'bg-red-50 border-red-100 text-red-900' :
                    alert.type === 'warning' ? 'bg-orange-50 border-orange-100 text-orange-900' :
                    'bg-blue-50 border-blue-100 text-blue-900'
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">
                        {alert.type === 'danger' ? '🛑' : alert.type === 'warning' ? '⚠️' : 'ℹ️'}
                      </span>
                      <p className="text-sm font-bold">{alert.msg}</p>
                    </div>
                    <span className="text-[10px] font-black opacity-50 uppercase">{alert.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Live Activity</h3>
              <div className="space-y-6">
                {activity.map((item, i) => (
                  <div key={i} className="flex gap-4 relative">
                    {i !== activity.length - 1 && <div className="absolute left-[9px] top-6 bottom-[-24px] w-0.5 bg-gray-100"></div>}
                    <div className={`w-5 h-5 rounded-full flex-shrink-0 mt-0.5 z-10 border-4 border-white ${
                      item.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-bold leading-none">{item.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.target}</p>
                      <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tighter">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION -> SME INTEL & CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* SME Intelligence */}
            <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl border border-gray-800">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xs font-black text-green-500 uppercase tracking-widest">SME Intelligence</h3>
                  <p className="text-gray-400 text-[10px] mt-1 font-bold">Your Secret Weapon: Growth & Credit Monitoring</p>
                </div>
                <span className="bg-green-500/10 text-green-500 text-[10px] font-black px-3 py-1 rounded-full border border-green-500/20">LIVE DATA</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                {smeHealth.map(item => (
                  <div key={item.label} className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                    <p className="text-2xl font-black">{item.count}</p>
                    <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mt-1">{item.label}</p>
                    <div className={`h-1 w-full rounded-full mt-3 ${item.color} opacity-50`}></div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💎</span>
                    <p className="text-xs font-bold text-blue-100">12 SMEs qualify for larger loans based on cashflow</p>
                  </div>
                  <button className="text-[10px] font-black uppercase text-blue-400 hover:text-blue-300">View All</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Top Growing</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold">Kato Hardware</span>
                      <span className="text-[10px] font-black text-green-500">↑ 24%</span>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Top Growing</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold">Mama Jane Shop</span>
                      <span className="text-[10px] font-black text-green-500">↑ 18%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cashflow & Liquidity Summary */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">Liquidity & Cashflow (Last 6 Months)</h3>
              <div className="flex-1 flex items-end gap-3 md:gap-6 px-2">
                {[45, 60, 35, 90, 75, 85].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                    <div className="w-full bg-green-50 rounded-t-xl transition-all group-hover:bg-green-100 relative overflow-hidden h-48">
                      <div className="absolute bottom-0 w-full bg-green-600 rounded-t-xl" style={{ height: `${h}%` }}></div>
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Month {i+1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS FOOTER */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            {['Add Member', 'Approve Loan', 'Record Deposit', 'Create Product', 'Audit Logs'].map(action => (
              <button key={action} className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all">
                {action}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
