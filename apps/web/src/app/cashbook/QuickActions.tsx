'use client';

import { useState } from 'react';
import { addTransaction } from './actions';
import { BusinessTransactionType } from '@sacco/core';

interface QuickActionsProps {
  businessId: string;
}

export default function QuickActions({ businessId }: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<BusinessTransactionType>('income');
  const [loading, setLoading] = useState(false);

  const openModal = (t: BusinessTransactionType | 'transfer' | 'reports') => {
    if (t === 'transfer' || t === 'reports') {
      alert(`${t.charAt(0).toUpperCase() + t.slice(1)} module coming soon!`);
      return;
    }
    setType(t);
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append('businessId', businessId);
    formData.append('type', type);
    formData.append('date', new Date().toISOString());

    const result = await addTransaction(formData);
    setLoading(false);
    
    if (result.success) {
      setIsOpen(false);
      // Optional: window.location.reload() or router.refresh() if needed
      // But server actions + revalidatePath should handle it
    } else {
      alert('Error: ' + result.error);
    }
  };

  return (
    <>
      <div className="actions-grid grid grid-cols-4 gap-[10px] mb-[26px]">
        {[
          { label: 'Income', icon: 'inc', type: 'income' as const, path: <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /> },
          { label: 'Expense', icon: 'exp', type: 'expense' as const, path: <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /> },
          { label: 'Transfer', icon: 'trf', type: 'transfer' as const, path: <><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></> },
          { label: 'Reports', icon: 'rep', type: 'reports' as const, path: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></> },
        ].map((action) => (
          <button 
            key={action.label} 
            onClick={() => openModal(action.type)}
            className="action-btn flex flex-col items-center gap-[9px] bg-[var(--card)] border border-[var(--border2)] rounded-[18px] p-[16px_6px_13px] cursor-pointer transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(14,140,114,0.15)] active:scale-[0.96]"
          >
            <div className={`a-ico ${action.icon} w-[44px] h-[44px] rounded-[14px] flex items-center justify-center
              ${action.icon === 'inc' ? 'bg-[var(--green-lt)] text-[var(--green)]' : 
                action.icon === 'exp' ? 'bg-[var(--red-lt)] text-[var(--red)]' : 
                action.icon === 'trf' ? 'bg-[var(--teal-lt)] text-[var(--teal)]' : 
                'bg-[var(--gold-lt)] text-[var(--gold-dark)]'}
            `}>
              <svg className="w-[20px] h-[20px] stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                {action.path}
                {action.icon === 'inc' && <polyline points="17 6 23 6 23 12" />}
                {action.icon === 'exp' && <polyline points="17 18 23 18 23 12" />}
              </svg>
            </div>
            <span className="a-lbl text-[11px] text-[var(--muted)] font-semibold">{action.label}</span>
          </button>
        ))}
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-[400px] bg-white rounded-[32px] p-8 shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl font-bold text-[var(--navy)]">
                Add {type.charAt(0).toUpperCase() + type.slice(1)}
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-[var(--muted2)] hover:text-[var(--navy)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-mono text-[10px] font-bold uppercase tracking-[2px] text-[var(--muted2)] mb-2">Amount (UGX)</label>
                <input 
                  name="amount" 
                  type="number" 
                  required 
                  autoFocus
                  className="w-full px-4 py-3.5 bg-[var(--bg)]/30 border border-[var(--border2)] rounded-2xl text-lg font-serif font-bold text-[var(--navy)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold uppercase tracking-[2px] text-[var(--muted2)] mb-2">Category</label>
                <select 
                  name="category" 
                  required
                  className="w-full px-4 py-3.5 bg-[var(--bg)]/30 border border-[var(--border2)] rounded-2xl text-sm font-sans font-medium text-[var(--navy)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20 appearance-none"
                >
                  {type === 'income' ? (
                    <>
                      <option value="Sales">Product Sales</option>
                      <option value="Service">Service Fee</option>
                      <option value="Salary">Salary</option>
                      <option value="Other">Other Income</option>
                    </>
                  ) : (
                    <>
                      <option value="Inventory">Inventory/Stock</option>
                      <option value="Rent">Rent</option>
                      <option value="Utilities">Utilities (Water/Power)</option>
                      <option value="Transport">Transport</option>
                      <option value="Lunch">Lunch/Meals</option>
                      <option value="Other">Other Expense</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold uppercase tracking-[2px] text-[var(--muted2)] mb-2">Description</label>
                <input 
                  name="description" 
                  type="text" 
                  required
                  className="w-full px-4 py-3.5 bg-[var(--bg)]/30 border border-[var(--border2)] rounded-2xl text-sm font-sans text-[var(--navy)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                  placeholder="What was this for?"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold uppercase tracking-[2px] text-[var(--muted2)] mb-2">Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Cash', 'Mobile Money'].map((m) => (
                    <label key={m} className="flex items-center gap-3 p-3 bg-[var(--bg)]/30 border border-[var(--border2)] rounded-xl cursor-pointer hover:bg-[var(--teal-lt)] transition-colors">
                      <input type="radio" name="paymentMethod" value={m} defaultChecked={m === 'Cash'} className="accent-[var(--teal)]" />
                      <span className="text-xs font-bold text-[var(--navy)]">{m}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                disabled={loading}
                className="w-full py-4 bg-[var(--navy)] text-[var(--gold)] font-bold uppercase tracking-widest rounded-2xl shadow-lg active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Save ${type}`}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
