import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';

const tickets = [
  { id: 'TKT-0081', org: 'Mbarara Farmers SACCO', user: 'Mercy Tendo', subject: 'Member cannot log in after password reset', category: 'Auth', priority: 'high', status: 'open', time: '10 min ago' },
  { id: 'TKT-0080', org: 'Kizito General Store', user: 'David Kizito', subject: 'Cashbook not reflecting recent transaction after sync', category: 'Bug', priority: 'medium', status: 'in_progress', time: '1 hr ago' },
  { id: 'TKT-0079', org: 'Kampala Unity SACCO', user: 'Amina Nabukenya', subject: 'Request to add 3 new loan officers to staff list', category: 'Account', priority: 'low', status: 'open', time: '2 hr ago' },
  { id: 'TKT-0078', org: 'Wakiso United SACCO', user: 'Patrick Ssemakula', subject: 'Airtel Money repayment processing with delays today', category: 'Payments', priority: 'high', status: 'escalated', time: '3 hr ago' },
  { id: 'TKT-0077', org: 'Gulu Teachers SACCO', user: 'James Kato', subject: 'Monthly report PDF generation failing for May 2026', category: 'Reports', priority: 'medium', status: 'resolved', time: '5 hr ago' },
  { id: 'TKT-0076', org: 'Independent SME', user: 'Ruth Atim', subject: 'How do I join a SACCO from my business profile?', category: 'Onboarding', priority: 'low', status: 'resolved', time: '1 day ago' },
];

const priorityStyle = {
  high:   'bg-red-500/10 text-red-400 border-red-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  low:    'bg-gray-500/10 text-gray-400 border-gray-700',
};

const statusStyle = {
  open:        'bg-blue-500/10 text-blue-400 border-blue-500/20',
  in_progress: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  escalated:   'bg-orange-500/10 text-orange-400 border-orange-500/20',
  resolved:    'bg-green-500/10 text-green-400 border-green-500/20',
};

const statusLabel = {
  open: 'Open',
  in_progress: 'In Progress',
  escalated: 'Escalated',
  resolved: 'Resolved',
};

export default function SupportPage() {
  const role = ROLES.SUPER_ADMIN;

  const stats = [
    { label: 'Open Tickets', val: '14', color: 'text-blue-400', icon: '📬' },
    { label: 'In Progress', val: '6', color: 'text-indigo-400', icon: '🔧' },
    { label: 'Escalated', val: '2', color: 'text-orange-400', icon: '🚨' },
    { label: 'Avg Response', val: '1.4h', color: 'text-white', icon: '⏱️' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-950 text-white font-sans">
      <Sidebar role={role} />

      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Helpdesk</p>
              <h1 className="text-3xl font-black tracking-tight">Support & Operations</h1>
              <p className="text-gray-400 text-sm mt-1">Platform-wide support tickets and user escalations</p>
            </div>
            <button className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-green-900/20">
              + Create Ticket
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(s => (
              <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{s.icon}</span>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{s.label}</p>
                </div>
                <p className={`text-3xl font-black ${s.color}`}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* Filter Row */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
              <input
                className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-green-500 transition-colors placeholder:text-gray-600"
                placeholder="Search tickets..."
              />
            </div>
            {['All', 'Open', 'In Progress', 'Escalated', 'Resolved'].map(f => (
              <button key={f} className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${f === 'All' ? 'bg-white text-black border-transparent' : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-white'}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Ticket List */}
          <div className="space-y-3">
            {tickets.map(t => (
              <div key={t.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-all cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-gray-500">{t.id}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${priorityStyle[t.priority as keyof typeof priorityStyle]}`}>
                        {t.priority}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full text-[8px] font-black uppercase tracking-widest">{t.category}</span>
                    </div>
                    <p className="text-sm font-black text-white truncate">{t.subject}</p>
                    <p className="text-[10px] text-gray-500 font-bold mt-1">{t.org} · {t.user} · {t.time}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${statusStyle[t.status as keyof typeof statusStyle]}`}>
                      {statusLabel[t.status as keyof typeof statusLabel]}
                    </span>
                    <button className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                      View →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Response Time */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-5">Response Time SLA</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { tier: 'High Priority', target: '< 1 hour', current: '0.8h', met: true },
                { tier: 'Medium Priority', target: '< 4 hours', current: '2.1h', met: true },
                { tier: 'Low Priority', target: '< 24 hours', current: '6.4h', met: true },
              ].map(sla => (
                <div key={sla.tier} className="flex items-center gap-4">
                  <span className={`w-3 h-3 rounded-full flex-shrink-0 ${sla.met ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div>
                    <p className="text-xs font-black text-white">{sla.tier}</p>
                    <p className="text-[10px] text-gray-500 font-bold">Target: {sla.target} · Actual: <span className={sla.met ? 'text-green-400' : 'text-red-400'}>{sla.current}</span></p>
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
