import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';

const services = [
  { name: 'API Gateway', status: 'operational', latency: '42ms', uptime: '99.98%', icon: '🌐' },
  { name: 'Supabase DB', status: 'operational', latency: '8ms', uptime: '99.99%', icon: '🗄️' },
  { name: 'Auth Service', status: 'operational', latency: '31ms', uptime: '99.97%', icon: '🔐' },
  { name: 'MTN MoMo API', status: 'operational', latency: '180ms', uptime: '99.1%', icon: '📱' },
  { name: 'Airtel Money API', status: 'degraded', latency: '420ms', uptime: '97.3%', icon: '📡' },
  { name: 'Email/SMS Gateway', status: 'operational', latency: '95ms', uptime: '99.8%', icon: '✉️' },
  { name: 'Storage (Uploads)', status: 'operational', latency: '55ms', uptime: '99.9%', icon: '📦' },
  { name: 'Cron Jobs', status: 'operational', latency: 'N/A', uptime: '100%', icon: '⏰' },
  { name: 'Report Generator', status: 'maintenance', latency: 'N/A', uptime: 'Paused', icon: '📊' },
];

const statusConfig = {
  operational: { badge: 'bg-green-500/10 text-green-400 border-green-500/20', dot: 'bg-green-500', label: 'Operational' },
  degraded:    { badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', dot: 'bg-yellow-400 animate-pulse', label: 'Degraded' },
  maintenance: { badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20', dot: 'bg-blue-400', label: 'Maintenance' },
  outage:      { badge: 'bg-red-500/10 text-red-400 border-red-500/20', dot: 'bg-red-500 animate-pulse', label: 'Outage' },
};

const incidents = [
  { time: '09:12 AM', msg: 'Airtel Money API response time elevated above 400ms threshold. Monitoring.', type: 'warning' },
  { time: '06:00 AM', msg: 'Report Generator taken offline for scheduled maintenance window. ETA: 3 hours.', type: 'info' },
  { time: 'Yesterday 11:45 PM', msg: 'All systems returned to normal after DB maintenance window completed.', type: 'success' },
];

export default function HealthPage() {
  const role = ROLES.SUPER_ADMIN;

  const operational = services.filter(s => s.status === 'operational').length;

  return (
    <div className="flex min-h-screen bg-gray-950 text-white font-sans">
      <Sidebar role={role} />

      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Infrastructure</p>
              <h1 className="text-3xl font-black tracking-tight">System Health</h1>
              <p className="text-gray-400 text-sm mt-1">Real-time status of all platform services and integrations</p>
            </div>
            <div className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl border ${operational === services.length ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'}`}>
              <span className={`w-2.5 h-2.5 rounded-full ${operational === services.length ? 'bg-green-500' : 'bg-yellow-400 animate-pulse'}`} />
              <span className="text-xs font-black uppercase tracking-widest">
                {operational}/{services.length} Systems Operational
              </span>
            </div>
          </div>

          {/* Platform Vitals */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Platform Uptime', val: '99.97%', sub: 'Last 30 days', icon: '📈' },
              { label: 'Avg API Latency', val: '68ms', sub: 'Global average', icon: '⚡' },
              { label: 'Active Users', val: '1,842', sub: 'Right now', icon: '👥' },
              { label: 'DB Connections', val: '34 / 100', sub: 'Pool utilization', icon: '🗄️' },
            ].map(v => (
              <div key={v.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{v.icon}</span>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{v.label}</p>
                </div>
                <p className="text-2xl font-black">{v.val}</p>
                <p className="text-[10px] text-gray-600 font-bold mt-1">{v.sub}</p>
              </div>
            ))}
          </div>

          {/* Service Grid */}
          <div>
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-5">Service Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map(svc => {
                const cfg = statusConfig[svc.status as keyof typeof statusConfig];
                return (
                  <div key={svc.name} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center justify-between hover:border-gray-700 transition-all">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{svc.icon}</span>
                      <div>
                        <p className="text-sm font-black text-white">{svc.name}</p>
                        <p className="text-[10px] text-gray-500 font-bold">Latency: {svc.latency} • Uptime: {svc.uptime}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${cfg.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Incident Log */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Incident Log</h3>
            </div>
            <div className="divide-y divide-gray-800">
              {incidents.map((inc, i) => (
                <div key={i} className={`p-5 flex items-start gap-4 border-l-2 ${inc.type === 'warning' ? 'border-yellow-500' : inc.type === 'success' ? 'border-green-500' : 'border-blue-500'}`}>
                  <span className="text-xl">{inc.type === 'warning' ? '⚠️' : inc.type === 'success' ? '✅' : 'ℹ️'}</span>
                  <div>
                    <p className="text-sm text-gray-200 font-bold">{inc.msg}</p>
                    <p className="text-[10px] text-gray-500 font-bold mt-1">{inc.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
