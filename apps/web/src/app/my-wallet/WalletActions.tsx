'use client';

import { useState } from 'react';
import { topUpWallet } from '../cashbook/actions';

export default function WalletActions({ profileId }: { profileId: string }) {
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    const amountStr = prompt('Enter deposit amount (UGX):');
    if (!amountStr) return;
    
    const amount = parseInt(amountStr);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    setLoading(true);
    try {
      await topUpWallet(amount);
      alert('Deposit successful!');
    } catch (e) {
      console.error(e);
      alert('Deposit failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    alert('Withdrawal feature is coming soon in the next update!');
  };

  return (
    <div className="flex gap-[12px] w-full">
      <button 
        onClick={handleDeposit}
        disabled={loading}
        className="flex-1 bg-[#0eb898] text-[#1a1f2c] font-black text-[11px] uppercase tracking-[1.5px] p-[14px] rounded-[16px] shadow-lg shadow-[#0eb898]/20 active:scale-95 transition-all disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Deposit'}
      </button>
      <button 
        onClick={handleWithdraw}
        className="flex-1 bg-white/10 text-white font-black text-[11px] uppercase tracking-[1.5px] p-[14px] rounded-[16px] border border-white/10 active:scale-95 transition-all"
      >
        Withdraw
      </button>
    </div>
  );
}
