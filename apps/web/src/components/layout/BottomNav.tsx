'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function BottomNav() {
  const pathname = usePathname();
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  const navItems = [
    { label: 'Home', path: '/cashbook', icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></> },
    { label: 'Stock', path: '/inventory', icon: <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /> },
    { label: 'Stats', path: '/reports', icon: <path d="M12 20v-6M6 20V10M18 20V4" /> },
    { label: 'Profile', path: '/profile', icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></> },
  ];

  return (
    <>
      {/* Quick Action Overlay */}
      {showQuickMenu && (
        <div className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowQuickMenu(false)}>
          <div className="absolute bottom-[100px] left-1/2 -translate-x-1/2 w-full max-w-[320px] grid grid-cols-2 gap-3 p-4 animate-in slide-in-from-bottom-8 duration-300">
            {[
              { label: 'Record Sale', icon: '💰', color: 'bg-[var(--green)]', role: ['sme_owner', 'sme_staff'] },
              { label: 'Add Expense', icon: '💸', color: 'bg-[var(--red)]', role: ['sme_owner', 'sme_staff'] },
              { label: 'Deposit', icon: '📥', color: 'bg-[var(--teal)]', role: ['member'] },
              { label: 'New Stock', icon: '📦', color: 'bg-[var(--navy)]', role: ['sme_owner', 'sme_staff'] },
              { label: 'AI Scan', icon: '✨', color: 'bg-[var(--teal)]', role: ['sme_owner', 'sme_staff', 'member'] },
            ].map((item) => (
              <button 
                key={item.label}
                className="flex flex-col items-center justify-center gap-2 bg-[var(--card)] border border-[var(--border2)] rounded-[24px] p-5 shadow-xl active:scale-95 transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center text-xl text-white shadow-lg`}>
                  {item.icon}
                </div>
                <span className="text-[11px] font-bold text-[var(--navy)] uppercase tracking-wider">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <nav className="bottom-nav fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-[var(--card)] border-t border-[var(--border2)] flex justify-around items-center p-[10px_10px_24px] z-[100]" aria-label="Main navigation">
        {/* Left items */}
        <Link href="/cashbook" className="flex-1">
          <div className={`nav-item flex flex-col items-center gap-[4px] text-[10px] font-bold uppercase tracking-[0.8px] cursor-pointer transition-colors p-[5px_0] ${pathname === '/cashbook' ? 'text-[var(--teal)]' : 'text-[var(--muted2)]'}`}>
            <svg className="w-[22px] h-[22px] stroke-[1.7] fill-none stroke-current" viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Home
          </div>
        </Link>
        
        <Link href="/inventory" className="flex-1">
          <div className={`nav-item flex flex-col items-center gap-[4px] text-[10px] font-bold uppercase tracking-[0.8px] cursor-pointer transition-colors p-[5px_0] ${pathname === '/inventory' ? 'text-[var(--teal)]' : 'text-[var(--muted2)]'}`}>
            <svg className="w-[22px] h-[22px] stroke-[1.7] fill-none stroke-current" viewBox="0 0 24 24">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Stock
          </div>
        </Link>

        {/* FAB */}
        <div 
          onClick={() => setShowQuickMenu(!showQuickMenu)}
          className={`nav-fab w-[54px] h-[54px] rounded-[16px] bg-[var(--navy)] flex items-center justify-center cursor-pointer -mt-[24px] border-[3px] border-[var(--bg)] transition-all active:scale-90 flex-shrink-0 relative shadow-lg ${showQuickMenu ? 'rotate-45' : ''}`}
        >
          <svg className="w-[22px] h-[22px] stroke-white stroke-[2.4] fill-none" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {!showQuickMenu && <div className="absolute bottom-[-2px] left-[6px] right-[6px] h-[3px] rounded-b-[4px] bg-[var(--gold)]"></div>}
        </div>

        {/* Right items */}
        <Link href="/reports" className="flex-1">
          <div className={`nav-item flex flex-col items-center gap-[4px] text-[10px] font-bold uppercase tracking-[0.8px] cursor-pointer transition-colors p-[5px_0] ${pathname === '/reports' ? 'text-[var(--teal)]' : 'text-[var(--muted2)]'}`}>
            <svg className="w-[22px] h-[22px] stroke-[1.7] fill-none stroke-current" viewBox="0 0 24 24">
              <path d="M12 20v-6M6 20V10M18 20V4" />
            </svg>
            Stats
          </div>
        </Link>

        <Link href="/profile" className="flex-1">
          <div className={`nav-item flex flex-col items-center gap-[4px] text-[10px] font-bold uppercase tracking-[0.8px] cursor-pointer transition-colors p-[5px_0] ${pathname === '/profile' ? 'text-[var(--teal)]' : 'text-[var(--muted2)]'}`}>
            <svg className="w-[22px] h-[22px] stroke-[1.7] fill-none stroke-current" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Profile
          </div>
        </Link>
      </nav>
    </>
  );
}
