import { createClient } from '@/utils/supabase/server';
import { ROLES, Role } from '@sacco/core';
import { format } from 'date-fns';
import { redirect } from 'next/navigation';
import { getBusinessTransactions } from './actions';
import QuickActions from './QuickActions';
import BottomNav from '@/components/layout/BottomNav';

// Constants for static data and pure calculations
const now = new Date();

export default async function CashbookPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  // Get user profile and role from sacco schema
  const { data: profile } = await supabase
    .schema('sacco')
    .from('profiles')
    .select('roles, full_name')
    .eq('id', user.id)
    .single();

  const role = (profile?.roles?.[0] || ROLES.SME_OWNER) as Role;
  
  // Get business info
  let { data: business } = await supabase
    .schema('sacco')
    .from('businesses')
    .select('*')
    .eq('owner_profile_id', user.id)
    .single();

  // DEBUG: If business is missing, create a default one for the session (or UI fallback)
  if (!business && (role === 'business_owner' || role === 'member')) {
    // Attempt to auto-create if missing for existing users
    const { data: newBiz, error: createError } = await supabase
      .schema('sacco')
      .from('businesses')
      .insert({
        owner_profile_id: user.id,
        name: `${profile?.full_name || 'My'}'s Business`,
        business_type: 'General',
        district: 'Uganda',
      })
      .select()
      .single();
    
    if (!createError) {
      business = newBiz;
    }
  }

  // Get transactions
  const transactions = business ? await getBusinessTransactions(business.id) : [];
  
  // Get wallet if member
  let wallet = null;
  if (role === 'member') {
    const { data: walletData } = await supabase
      .schema('sacco')
      .from('wallets')
      .select('*')
      .eq('profile_id', user.id)
      .single();
    wallet = walletData;
  }

  const totalIncome = transactions
    .filter(t => t.transaction_type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.transaction_type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate Stock value specifically
  const stockValue = transactions
    .filter(t => t.category === 'Inventory' || t.category === 'Stock')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = wallet?.balance || (totalIncome - totalExpenses); 

  // Group transactions by date
  const groupedTransactions = transactions.reduce((groups: { [key: string]: any[] }, tx) => {
    const date = format(new Date(tx.transaction_date), 'yyyy-MM-dd');
    if (!groups[date]) groups[date] = [];
    groups[date].push(tx);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => b.localeCompare(a));

  return (
    <div className="app bg-[var(--bg)] min-h-screen relative pb-[100px]">
      {/* TOP BAR */}
      <header className="topbar flex justify-between items-center p-[24px_22px_16px] animate-fade-up">
        <div className="logo font-serif text-[22px] font-bold text-[var(--navy)] tracking-[-0.3px]">
          WalletBook<span className="logo-dot inline-block w-[7px] h-[7px] rounded-full bg-[var(--gold)] ml-[2px] mb-[4px] align-middle"></span>
        </div>
        <div className="topbar-right flex items-center gap-[10px]">
          <button className="icon-btn w-[40px] h-[40px] rounded-[12px] bg-[var(--card)] border border-[var(--border2)] flex items-center justify-center cursor-pointer relative" aria-label="Notifications">
            <svg className="w-[18px] h-[18px] stroke-[var(--navy3)] fill-none stroke-[1.8]" viewBox="0 0 24 24">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="notif-pip absolute top-[9px] right-[9px] w-[7px] h-[7px] rounded-full bg-[var(--gold)] border-[1.5px] border-[var(--card)]"></span>
          </button>
          <div className="avatar w-[40px] h-[40px] rounded-[12px] bg-[var(--navy)] flex items-center justify-center font-serif text-[14px] font-bold text-[var(--gold)] cursor-pointer tracking-[0.5px]" role="button" aria-label="Profile">
            {profile?.full_name?.split(' ').map(n => n[0]).join('') || 'AM'}
          </div>
        </div>
      </header>

      {/* GREETING */}
      <div className="greeting px-[22px] mb-[4px] animate-fade-up [animation-delay:0.05s]">
        <div className="greeting-hi text-[13px] text-[var(--muted)] font-medium mb-[2px]">Good morning 👋</div>
        <div className="greeting-name font-serif text-[24px] font-bold text-[var(--navy)]">{profile?.full_name || 'Alex Mugisha'}</div>
      </div>

      {/* HERO CARD */}
      <div className="hero mx-[22px] mt-[16px] bg-[var(--navy)] rounded-[26px] p-[30px_28px_26px] relative overflow-hidden animate-fade-up [animation-delay:0.1s]">
        {/* decorative teal arc */}
        <div className="absolute -top-[70px] -right-[70px] w-[220px] h-[220px] rounded-full border-[32px] border-[#0eb898]/20 pointer-events-none"></div>
        {/* gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--gold)] to-[var(--teal-mid)] rounded-b-[26px]"></div>

        <div className="hero-tag inline-flex items-center gap-[6px] bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.3)] rounded-full p-[4px_12px] text-[11px] font-semibold text-[var(--gold)] tracking-[0.8px] uppercase mb-[14px] font-mono">
          <span className="hero-tag-dot w-[6px] h-[6px] rounded-full bg-[var(--gold)]"></span>
          {business?.name || 'Personal Wallet'}
        </div>

        <div className="hero-lbl text-[12px] font-medium text-white/45 uppercase tracking-[1.5px] mb-[8px] font-mono">Total Balance</div>
        <div className="hero-balance font-serif text-[40px] font-extrabold text-white tracking-[-1px] leading-none mb-[4px] flex items-baseline">
          <span className="cur font-sans text-[18px] font-semibold text-white/50 mr-[5px]">UGX</span>
          {balance.toLocaleString()}
        </div>
        <div className="hero-sub font-mono text-[11px] text-white/35 mb-[26px]">Last updated — {format(now, 'MMMM dd, yyyy')}</div>

        <div className="hero-row flex gap-[12px]">
          <div className="hero-chip flex items-center gap-[8px] bg-white/10 border border-white/10 rounded-[12px] p-[9px_14px] flex-1">
            <div className="hc-icon inc w-[28px] h-[28px] rounded-[8px] flex items-center justify-center bg-[#1a9e6e]/20">
              <svg className="w-[15px] h-[15px] fill-none stroke-[2.2] stroke-[#4dd9a8]" viewBox="0 0 24 24">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <div className="hc-text">
              <div className="hc-lbl text-[10px] text-white/40 font-medium uppercase tracking-[0.8px]">Net Income</div>
              <div className="hc-val font-mono text-[13px] font-medium text-white mt-[1px]">{(totalIncome - totalExpenses).toLocaleString()}</div>
            </div>
          </div>
          <div className="hero-chip flex items-center gap-[8px] bg-white/10 border border-white/10 rounded-[12px] p-[9px_14px] flex-1">
            <div className="hc-icon exp w-[28px] h-[28px] rounded-[8px] flex items-center justify-center bg-[var(--gold)]/20">
              <svg className="w-[15px] h-[15px] fill-none stroke-[2.2] stroke-[var(--gold)]" viewBox="0 0 24 24">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <div className="hc-text">
              <div className="hc-lbl text-[10px] text-white/40 font-medium uppercase tracking-[0.8px]">Stock Value</div>
              <div className="hc-val font-mono text-[13px] font-medium text-white mt-[1px]">{stockValue.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT SECTIONS */}
      <div className="section px-[22px] mt-[26px] animate-fade-up [animation-delay:0.18s]">
        {/* QUICK ACTIONS */}
        <div className="sec-row flex justify-between items-center mb-[14px] mt-0">
          <span className="sec-title font-serif text-[18px] font-bold text-[var(--navy)]">Actions</span>
        </div>
        
        {business && <QuickActions businessId={business.id} />}

        {/* STATS */}
        <div className="sec-row flex justify-between items-center mb-[14px]">
          <span className="sec-title font-serif text-[18px] font-bold text-[var(--navy)]">Performance</span>
        </div>
        <div className="stats-row grid grid-cols-2 gap-[12px] mb-[26px]">
          <div className="stat-card inc bg-[var(--card)] border border-[var(--border2)] rounded-[20px] p-[18px_20px] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--green)]"></div>
            <div className="sc-lbl text-[11px] font-bold text-[var(--muted2)] uppercase tracking-[1px] mb-[8px]">Sales Revenue</div>
            <div className="sc-val inc font-serif text-[20px] font-bold text-[var(--green)]">{totalIncome.toLocaleString()}</div>
            <div className="sc-sub font-mono text-[10px] text-[var(--muted2)] mt-[4px]">UGX · {format(now, 'MMM yyyy')}</div>
          </div>
          <div className="stat-card exp bg-[var(--card)] border border-[var(--border2)] rounded-[20px] p-[18px_20px] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--gold)]"></div>
            <div className="sc-lbl text-[11px] font-bold text-[var(--muted2)] uppercase tracking-[1px] mb-[8px]">Inventory Value</div>
            <div className="sc-val exp font-serif text-[20px] font-bold text-[var(--gold-dark)]">{stockValue.toLocaleString()}</div>
            <div className="sc-sub font-mono text-[10px] text-[var(--muted2)] mt-[4px]">Current Stock</div>
          </div>
        </div>

        {/* BUDGET */}
        <div className="sec-row flex justify-between items-center mb-[14px]">
          <span className="sec-title font-serif text-[18px] font-bold text-[var(--navy)]">Budget</span>
          <span className="sec-link font-mono text-[12px] text-[var(--teal)] cursor-pointer">Edit →</span>
        </div>
        <div className="budget-card bg-[var(--card)] border border-[var(--border2)] rounded-[20px] p-[20px_22px] mb-[26px]">
          <div className="bc-top flex justify-between items-start mb-[16px]">
            <div>
              <div className="bc-lbl text-[12px] text-[var(--muted)] font-medium mb-[5px]">Spent this month</div>
              <div className="bc-val font-serif text-[22px] font-bold text-[var(--navy)]">UGX {totalExpenses.toLocaleString()}</div>
            </div>
            <div className="bc-pct font-serif text-[30px] font-extrabold text-[var(--teal)] line-height-[1]">
              {Math.min(Math.round((totalExpenses / 850000) * 100), 100)}<span className="font-sans text-[14px] font-medium text-[var(--muted2)]">%</span>
            </div>
          </div>
          <div className="bar-track h-[8px] rounded-full bg-[var(--teal-lt)] overflow-hidden">
            <div className="bar-fill h-full rounded-full bg-gradient-to-r from-[var(--teal)] to-[var(--gold)] transition-all duration-[1.1s] ease-[cubic-bezier(0.34,1.56,0.64,1)]" style={{ width: `${Math.min((totalExpenses / 850000) * 100, 100)}%` }}></div>
          </div>
          <div className="bar-lbls flex justify-between font-mono text-[10px] text-[var(--muted2)] mt-[7px]">
            <span>UGX 0</span>
            <span>Limit: 850,000</span>
          </div>
        </div>

        {/* TRANSACTIONS */}
        <div className="sec-row flex justify-between items-center mb-[14px]">
          <span className="sec-title font-serif text-[18px] font-bold text-[var(--navy)]">Activity Journal</span>
          <span className="sec-link font-mono text-[12px] text-[var(--teal)] cursor-pointer">Filter →</span>
        </div>

        <div className="journal-timeline space-y-6">
          {sortedDates.length === 0 ? (
            <div className="bg-[var(--card)] border border-[var(--border2)] rounded-[20px] p-10 text-center text-[var(--muted2)] font-mono text-xs uppercase tracking-widest">
              No activity recorded yet
            </div>
          ) : sortedDates.map((date) => (
            <div key={date} className="day-group">
              <div className="day-header flex items-center gap-3 mb-3">
                <div className="h-[1px] flex-1 bg-[var(--border2)]"></div>
                <span className="text-[10px] font-black text-[var(--muted2)] uppercase tracking-widest bg-[var(--bg)] px-2">
                  {format(new Date(date), 'EEEE, MMM dd')}
                </span>
                <div className="h-[1px] flex-1 bg-[var(--border2)]"></div>
              </div>

              <div className="tx-list bg-[var(--card)] border border-[var(--border2)] rounded-[26px] overflow-hidden shadow-sm">
                {groupedTransactions[date].map((tx) => (
                  <div key={tx.id} className="tx-item flex items-center gap-[14px] p-[16px_20px] border-b border-[rgba(14,140,114,0.07)] last:border-b-0 cursor-pointer transition-colors hover:bg-[var(--teal-lt)]">
                    <div className={`tx-ico w-[44px] h-[44px] rounded-[15px] flex items-center justify-center text-[20px] flex-shrink-0 shadow-sm
                      ${tx.category === 'Sales' ? 'bg-[var(--green-lt)]' : 
                        tx.category === 'Inventory' ? 'bg-[var(--gold-lt)]' : 
                        tx.category === 'Salary' ? 'bg-[var(--green-lt)]' : 
                        tx.category === 'Rent' ? 'bg-[var(--red-lt)]' : 
                        tx.category === 'Transport' ? 'bg-[var(--teal-lt)]' : 
                        'bg-[var(--navy-lt)]'}
                    `}>
                      {tx.category === 'Sales' ? '📦' : 
                       tx.category === 'Inventory' ? '📥' : 
                       tx.category === 'Salary' ? '💼' : 
                       tx.category === 'Rent' ? '🏠' : 
                       tx.category === 'Transport' ? '🚚' : 
                       tx.category === 'Lunch' ? '🍔' : '💸'}
                    </div>
                    <div className="tx-info flex-1 min-w-0">
                      <div className="tx-name text-[14px] font-bold text-[var(--navy)] truncate">{tx.description}</div>
                      <div className="tx-meta flex items-center gap-[8px] mt-[2px]">
                        <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-tight">{tx.category}</span>
                        <span className="w-1 h-1 rounded-full bg-[var(--muted2)]/30"></span>
                        <span className="tx-time font-mono text-[10px] text-[var(--muted2)]">{format(new Date(tx.transaction_date), 'HH:mm')}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={`tx-amt font-mono text-[14px] font-bold
                        ${tx.transaction_type === 'income' ? 'text-[var(--green)]' : 'text-[var(--red)]'}
                      `}>
                        {tx.transaction_type === 'income' ? '+' : '−'}{tx.amount.toLocaleString()}
                      </div>
                      <div className="text-[9px] font-black text-[var(--muted2)] uppercase tracking-tighter">UGX</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
