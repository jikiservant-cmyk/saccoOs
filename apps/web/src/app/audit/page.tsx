import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';

const auditEvents = [
  { id: '1', actor: 'Patrick Ssemakula', role: 'Super Admin', action: 'Organization Created', entity: 'Kampala Unity SACCO', severity: 'info', ip: '41.210.12.5', time: '09:41 AM', date: 'Today' },
  { id: '2', actor: 'Amina Nabukenya', role: 'SACCO Admin', action: 'Member Suspended', entity: 'M-0123 Robert Okello', severity: 'warning', ip: '41.210.18.9', time: '09:15 AM', date: 'Today' },
  { id: '3', actor: 'James Kato', role: 'Loan Officer', action: 'Loan Approved', entity: 'LN-0088 UGX 5.0M', severity: 'success', ip: '105.17.22.1', time: '08:50 AM', date: 'Today' },
  { id: '4', actor: 'System', role: 'Automated', action: 'Repayment Failed', entity: 'LN-0045 Grace Akello', severity: 'error', ip: '0.0.0.0', time: '08:30 AM', date: 'Today' },
  { id: '5', actor: 'Sarah Namuli', role: 'Teller', action: 'Deposit Posted', entity: 'ACC-2201 UGX 800,000', severity: 'success', ip: '41.210.12.5', time: '07:55 AM', date: 'Today' },
  { id: '6', actor: 'Patrick Ssemakula', role: 'Super Admin', action: 'Billing Plan Changed', entity: 'Wakiso SACCO → Growth', severity: 'info', ip: '41.210.12.5', time: '06:00 PM', date: 'Yesterday' },
  { id: '7', actor: 'John Musoke', role: 'Member', action: 'Password Reset', entity: 'M-0001', severity: 'warning', ip: '102.18.5.66', time: '04:22 PM', date: 'Yesterday' },
  { id: '8', actor: 'System', role: 'Automated', action: 'Backup Completed', entity: 'sacco_db_snapshot', severity: 'success', ip: '0.0.0.0', time: '02:00 AM', date: 'Yesterday' },
];

const severityConfig = {
  info:    { dot: 'bg-blue-500',   badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  warning: { dot: 'bg-yellow-500', badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  success: { dot: 'bg-green-500',  badge: 'bg-green-500/10 text-green-400 border-green-500/20' },
  error:   { dot: 'bg-red-500',    badge: 'bg-red-500/10 text-red-400 border-red-500/20' },
};

export default function AuditLogsPage() {
  const role = ROLES.SUPER_ADMIN;

  const stats = [
    { label: 'Events Today', val: '1,284', icon: '📋', color: 'text-white' },
    { label: 'Warnings', val: '23', icon: '⚠️', color: 'text-yellow-400' },
    { label: 'Errors', val: '7', icon: '🚨', color: 'text-red-400' },
    { label: 'Active Sessions', val: '142', icon: '🔐', color: 'text-green-400' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-950 text-white font-sans">
      <Sidebar role={role} />

      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Platform Security</p>
              <h1 className="text-3xl font-black tracking-tight">Audit Stream</h1>
              <p className="text-gray-400 text-sm mt-1">Real-time activity and security event monitoring</p>
            </div>
            <button className="px-5 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-700 transition-all">
              📤 Export Logs
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(s => (
              <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{s.icon}</span>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{s.label}</p>
                </div>
                <p className={`text-3xl font-black ${s.color}`}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
              <input
                className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-green-500 transition-colors placeholder:text-gray-600"
                placeholder="Search by actor, action, entity..."
              />
            </div>
            {['All Severity', 'Info', 'Warning', 'Error', 'Success'].map(f => (
              <button key={f} className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${f === 'All Severity' ? 'bg-white text-black border-transparent' : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-white'}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Event Table */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Event Log</h3>
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Live • Auto-refreshing</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-800/50">
                    <th className="px-6 py-4">Severity</th>
                    <th className="px-6 py-4">Actor</th>
                    <th className="px-6 py-4">Action</th>
                    <th className="px-6 py-4">Entity</th>
                    <th className="px-6 py-4">IP Address</th>
                    <th className="px-6 py-4 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {auditEvents.map(e => {
                    const cfg = severityConfig[e.severity as keyof typeof severityConfig];
                    return (
                      <tr key={e.id} className="hover:bg-gray-800/30 transition-colors cursor-pointer">
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${cfg.badge}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {e.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-white">{e.actor}</p>
                          <p className="text-[10px] text-gray-500 font-bold">{e.role}</p>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-300">{e.action}</td>
                        <td className="px-6 py-4 text-xs font-mono text-gray-400">{e.entity}</td>
                        <td className="px-6 py-4 text-xs font-mono text-gray-500">{e.ip}</td>
                        <td className="px-6 py-4 text-right">
                          <p className="text-xs font-bold text-gray-400">{e.time}</p>
                          <p className="text-[10px] text-gray-600">{e.date}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-800 flex justify-between items-center">
              <span className="text-[10px] text-gray-600 font-bold">Showing 8 of 1,284 events</span>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gray-700 transition-all">← Prev</button>
                <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gray-700 transition-all">Next →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
