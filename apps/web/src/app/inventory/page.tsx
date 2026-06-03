import { createClient } from '@/utils/supabase/server';
import { ROLES } from '@sacco/core';
import { redirect } from 'next/navigation';
import BottomNav from '@/components/layout/BottomNav';

export default async function InventoryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const inventoryItems = [
    { id: '1', name: 'Maize Flour', sku: 'MF-001', quantity: 45, unit: 'kg', buyingPrice: 2500, sellingPrice: 3500, status: 'In Stock' },
    { id: '2', name: 'Sugar', sku: 'SG-012', quantity: 12, unit: 'kg', buyingPrice: 4000, sellingPrice: 5000, status: 'Low Stock' },
    { id: '3', name: 'Cooking Oil', sku: 'CO-005', quantity: 0, unit: 'Liters', buyingPrice: 6000, sellingPrice: 7500, status: 'Out of Stock' },
    { id: '4', name: 'Rice', sku: 'RC-022', quantity: 120, unit: 'kg', buyingPrice: 3200, sellingPrice: 4200, status: 'In Stock' },
    { id: '5', name: 'Soap', sku: 'SP-009', quantity: 24, unit: 'Bars', buyingPrice: 1500, sellingPrice: 2000, status: 'In Stock' },
  ];

  return (
    <div className="app bg-[var(--bg)] min-h-screen relative pb-[100px]">
      {/* HEADER */}
      <header className="px-[22px] py-8 pb-4 animate-fade-up">
        <div className="flex justify-between items-center mb-1">
          <h1 className="font-serif text-[28px] font-bold text-[var(--navy)] tracking-tight">Inventory</h1>
          <button className="w-10 h-10 rounded-xl bg-[var(--navy)] flex items-center justify-center text-white shadow-lg shadow-[var(--navy)]/20 active:scale-95 transition-all">
            <svg className="w-6 h-6 stroke-current stroke-[2.5]" viewBox="0 0 24 24" fill="none">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
        <p className="text-[13px] text-[var(--muted)] font-medium">Manage your stock and prices</p>
      </header>

      {/* QUICK STATS */}
      <div className="px-[22px] mb-6 animate-fade-up [animation-delay:0.05s]">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--card)] border border-[var(--border2)] rounded-[20px] p-4">
            <div className="text-[10px] font-bold text-[var(--muted2)] uppercase tracking-wider mb-1">Total Value</div>
            <div className="font-serif text-xl font-bold text-[var(--navy)]">UGX 12.4M</div>
          </div>
          <div className="bg-[var(--card)] border border-[var(--border2)] rounded-[20px] p-4">
            <div className="text-[10px] font-bold text-[var(--muted2)] uppercase tracking-wider mb-1">Low Stock</div>
            <div className="font-serif text-xl font-bold text-[var(--red)]">8 Items</div>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="px-[22px] mb-6 animate-fade-up [animation-delay:0.1s]">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-[var(--muted2)] group-focus-within:text-[var(--teal)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Search items or SKU..."
            className="w-full bg-[var(--card)] border border-[var(--border2)] rounded-[18px] py-4 pl-12 pr-4 text-sm font-sans text-[var(--navy)] placeholder:text-[var(--muted2)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/10 transition-all"
          />
        </div>
      </div>

      {/* INVENTORY LIST */}
      <div className="px-[22px] animate-fade-up [animation-delay:0.15s]">
        <div className="bg-[var(--card)] border border-[var(--border2)] rounded-[26px] overflow-hidden">
          {inventoryItems.map((item, i) => (
            <div key={item.id} className="p-5 border-b border-[rgba(14,140,114,0.07)] last:border-0 hover:bg-[var(--teal-lt)] transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg
                    ${item.status === 'In Stock' ? 'bg-[var(--green-lt)]' : 
                      item.status === 'Low Stock' ? 'bg-[var(--gold-lt)]' : 'bg-[var(--red-lt)]'}
                  `}>
                    📦
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[var(--navy)] group-hover:text-[var(--teal)] transition-colors">{item.name}</h3>
                    <p className="font-mono text-[10px] text-[var(--muted2)] tracking-tight uppercase">{item.sku}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[14px] font-bold text-[var(--navy)]">UGX {item.sellingPrice.toLocaleString()}</p>
                  <p className="text-[10px] text-[var(--muted2)] font-medium">Profit: {((item.sellingPrice - item.buyingPrice) / 1000).toFixed(1)}K</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-dashed border-[rgba(14,140,114,0.1)]">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[var(--muted)]">Stock:</span>
                  <span className={`text-[13px] font-mono font-bold ${item.quantity < 10 ? 'text-[var(--red)]' : 'text-[var(--navy)]'}`}>
                    {item.quantity} {item.unit}
                  </span>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border
                  ${item.status === 'In Stock' ? 'bg-[var(--green-lt)] text-[var(--green)] border-[var(--green)]/10' : 
                    item.status === 'Low Stock' ? 'bg-[var(--gold-lt)] text-[var(--gold-dark)] border-[var(--gold)]/10' : 
                    'bg-[var(--red-lt)] text-[var(--red)] border-[var(--red)]/10'}
                `}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
