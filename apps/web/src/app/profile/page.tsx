import { ROLES } from '@sacco/core';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser, getMemberDashboardData } from '@/utils/member';
import BottomNav from '@/components/layout/BottomNav';

export default async function MemberProfilePage() {
  const user = await getAuthenticatedUser();
  if (!user) {
    redirect('/login');
  }

  const dashboard = await getMemberDashboardData(user.id);
  if (!dashboard) {
    redirect('/onboarding');
  }

  const { member } = dashboard;
  const profileName = member.profile?.full_name || `${member.first_name} ${member.last_name}`;

  return (
    <div className="app bg-[var(--bg)] min-h-screen relative pb-[100px]">
      {/* HEADER */}
      <header className="px-[22px] py-10 pb-6 animate-fade-up">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-[32px] bg-[var(--navy)] flex items-center justify-center text-3xl font-serif font-bold text-[var(--gold)] shadow-2xl mb-4 relative">
            {profileName.split(' ').map(n => n[0]).join('')}
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-[var(--teal)] border-4 border-[var(--bg)] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <h1 className="font-serif text-2xl font-bold text-[var(--navy)] tracking-tight">{profileName}</h1>
          <p className="text-[13px] text-[var(--muted)] font-medium mt-1">{member.member_number}</p>
        </div>
      </header>

      {/* ACCOUNT SETTINGS */}
      <div className="px-[22px] mb-8 animate-fade-up [animation-delay:0.1s]">
        <h2 className="text-[11px] font-bold text-[var(--muted2)] uppercase tracking-[1.5px] mb-4 ml-2">Account Settings</h2>
        <div className="bg-[var(--card)] border border-[var(--border2)] rounded-[26px] overflow-hidden">
          {[
            { label: 'Personal Information', icon: '👤', sub: 'Name, Email, Phone' },
            { label: 'Security & Password', icon: '🔒', sub: '2FA, Change password' },
            { label: 'Linked Organizations', icon: '🏢', sub: 'SACCOs & Businesses' },
            { label: 'Notifications', icon: '🔔', sub: 'Push, Email, SMS' },
          ].map((item, i) => (
            <button key={item.label} className="w-full flex items-center gap-4 p-5 border-b border-[rgba(14,140,114,0.07)] last:border-0 hover:bg-[var(--teal-lt)] transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg)]/50 flex items-center justify-center text-xl">
                {item.icon}
              </div>
              <div className="flex-1 text-left">
                <p className="text-[14px] font-bold text-[var(--navy)] group-hover:text-[var(--teal)] transition-colors">{item.label}</p>
                <p className="text-[11px] text-[var(--muted2)] font-medium mt-0.5">{item.sub}</p>
              </div>
              <svg className="w-5 h-5 text-[var(--muted2)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* SUPPORT & LEGAL */}
      <div className="px-[22px] mb-8 animate-fade-up [animation-delay:0.15s]">
        <h2 className="text-[11px] font-bold text-[var(--muted2)] uppercase tracking-[1.5px] mb-4 ml-2">Support</h2>
        <div className="bg-[var(--card)] border border-[var(--border2)] rounded-[26px] overflow-hidden">
          {[
            { label: 'Help Center', icon: '🎧' },
            { label: 'Terms of Service', icon: '📄' },
            { label: 'Privacy Policy', icon: '🛡️' },
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center gap-4 p-5 border-b border-[rgba(14,140,114,0.07)] last:border-0 hover:bg-[var(--teal-lt)] transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg)]/50 flex items-center justify-center text-xl">
                {item.icon}
              </div>
              <span className="flex-1 text-left text-[14px] font-bold text-[var(--navy)] group-hover:text-[var(--teal)] transition-colors">{item.label}</span>
              <svg className="w-5 h-5 text-[var(--muted2)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* LOGOUT */}
      <div className="px-[22px] mb-12 animate-fade-up [animation-delay:0.2s]">
        <button className="w-full py-5 bg-[var(--red-lt)] border border-[var(--red)]/10 text-[var(--red)] font-bold uppercase tracking-widest rounded-[26px] hover:bg-[var(--red)] hover:text-white transition-all active:scale-95 shadow-lg shadow-[var(--red)]/5">
          Sign Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
