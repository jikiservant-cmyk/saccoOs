import { ROLES } from '@sacco/core';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/utils/member';
import { createClient } from '@/utils/supabase/server';
import BottomNav from '@/components/layout/BottomNav';
import WalletActions from './WalletActions';

export default async function MyWalletPage() {
  const user = await getAuthenticatedUser();
  if (!user) {
    redirect('/login');
  }

  const supabase = await createClient();

  // 1. Get profile from sacco schema
  let { data: profile } = await supabase
    .schema('sacco')
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // 2. If profile missing, attempt to create it (fallback)
  if (!profile) {
    const { data: newProfile, error: createError } = await supabase
      .schema('sacco')
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: user.user_metadata?.full_name || 'Member',
        email: user.email,
        phone: user.user_metadata?.phone,
        roles: ['member'],
        is_active: true,
      })
      .select()
      .single();
    
    if (createError) {
      console.error('Error creating profile:', createError);
      return redirect('/login?error=Could not initialize profile');
    }
    profile = newProfile;

    // Also ensure member record exists
    const { data: defaultOrg } = await supabase
      .schema('sacco')
      .from('organizations')
      .select('id')
      .limit(1)
      .single();

    if (defaultOrg) {
      await supabase
        .schema('sacco')
        .from('members')
        .upsert({
          profile_id: user.id,
          organization_id: defaultOrg.id,
          membership_number: `MEM-${Math.floor(Math.random() * 10000)}`,
          status: 'active',
          joined_date: new Date(),
        }, { onConflict: 'profile_id, organization_id' });
    }
  }

  // 3. Check for SACCO membership
  const { data: member } = await supabase
    .schema('sacco')
    .from('members')
    .select('*')
    .eq('profile_id', user.id)
    .single();

  if (!member || member.status === 'pending') {
    return redirect('/onboarding?step=organization');
  }

  // 4. Get wallet from sacco schema
  const { data: wallet } = await supabase
    .schema('sacco')
    .from('wallets')
    .select('*')
    .eq('profile_id', user.id)
    .single();

  if (!wallet) {
    // If no wallet but is a member, they might need to choose a saving plan
    return redirect('/onboarding?step=saving-plan');
  }

  // Get transactions from sacco schema
  const { data: transactions } = await supabase
    .schema('sacco')
    .from('business_transactions')
    .select('*')
    .eq('profile_id', user.id) // Assuming we use profile_id for personal transactions
    .order('transaction_date', { ascending: false })
    .limit(10);

  const totalSavings = Number(wallet?.balance ?? 0);

  const walletSummary = [
    { label: 'Total Savings', value: `UGX ${totalSavings.toLocaleString()}`, accent: 'text-[#0eb898]' },
    { label: 'Locked Amount', value: `UGX 0`, accent: 'text-white/40' },
    { label: 'Loan Limit', value: `UGX ${(totalSavings * 3).toLocaleString()}`, accent: 'text-[var(--gold)]' },
  ];

  return (
    <div className="app bg-[#1a1f2c] min-h-screen relative pb-[100px] text-white">
      {/* TOP BAR */}
      <header className="topbar flex justify-between items-center p-[24px_22px_16px] animate-fade-up">
        <div className="logo font-serif text-[22px] font-bold text-white tracking-[-0.3px]">
          MyWallet<span className="logo-dot inline-block w-[7px] h-[7px] rounded-full bg-[#0eb898] ml-[2px] mb-[4px] align-middle"></span>
        </div>
        <div className="avatar w-[40px] h-[40px] rounded-[12px] bg-white/10 flex items-center justify-center font-serif text-[14px] font-bold text-[#0eb898] cursor-pointer tracking-[0.5px]">
          {profile?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'AM'}
        </div>
      </header>

      {/* WALLET CARD */}
      <div className="hero mx-[22px] mt-[16px] bg-gradient-to-br from-[#1a1f2c] to-[#0f131a] rounded-[26px] p-[30px_28px_26px] relative overflow-hidden animate-fade-up shadow-[0_10px_40px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
        <div className="absolute top-[-50%] right-[-20%] w-[80%] h-[150%] bg-gradient-to-b from-[#0eb898]/10 to-transparent rounded-full blur-3xl pointer-events-none transform rotate-45"></div>
        
        <div className="hero-lbl text-[11px] font-bold text-white/50 uppercase tracking-[2px] mb-[8px]">Savings Balance</div>
        <div className="hero-balance font-serif text-[44px] font-black text-white tracking-[-1px] leading-none mb-[24px] flex items-baseline">
          <span className="cur font-sans text-[20px] font-bold text-[#0eb898] mr-[6px]">UGX</span>
          {totalSavings.toLocaleString()}
        </div>

        <WalletActions profileId={user.id} />
      </div>

      {/* SUMMARY GRID */}
      <div className="grid grid-cols-3 gap-3 mx-[22px] mt-[20px] animate-fade-up [animation-delay:0.1s]">
        {walletSummary.map((item) => (
          <div key={item.label} className="bg-white/5 border border-white/5 rounded-[20px] p-[14px] text-center">
            <div className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">{item.label}</div>
            <div className={`text-[10px] font-bold ${item.accent}`}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* TRANSACTIONS */}
      <div className="section px-[22px] mt-[32px] animate-fade-up [animation-delay:0.2s]">
        <div className="sec-row flex justify-between items-center mb-[16px]">
          <span className="sec-title font-serif text-[18px] font-bold">Wallet History</span>
        </div>

        <div className="tx-list space-y-3">
          {!transactions || transactions.length === 0 ? (
            <div className="bg-white/5 border border-white/5 rounded-[26px] p-10 text-center text-white/30 font-mono text-[10px] uppercase tracking-widest">
              No transactions yet
            </div>
          ) : (
            transactions.map((tx: any) => (
              <div key={tx.id} className="tx-item flex items-center gap-[14px] p-[16px] bg-white/5 border border-white/5 rounded-[22px]">
                <div className={`tx-ico w-[40px] h-[40px] rounded-[12px] flex items-center justify-center text-[18px]
                  ${tx.transaction_type === 'income' ? 'bg-[#0eb898]/20 text-[#0eb898]' : 'bg-red-500/20 text-red-400'}
                `}>
                  {tx.transaction_type === 'income' ? '↓' : '↑'}
                </div>
                <div className="tx-info flex-1 min-w-0">
                  <div className="tx-name text-[13px] font-bold truncate">{tx.description}</div>
                  <div className="tx-time font-mono text-[9px] text-white/40 uppercase tracking-wider">{new Date(tx.transaction_date).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className={`tx-amt font-mono text-[13px] font-bold ${tx.transaction_type === 'income' ? 'text-[#0eb898]' : 'text-red-400'}`}>
                    {tx.transaction_type === 'income' ? '+' : '−'}{tx.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
