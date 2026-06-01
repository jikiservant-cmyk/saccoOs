import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';
import { createOrganization } from '../actions';
import Link from 'next/link';

export default function NewOrganizationPage() {
  const role = ROLES.SUPER_ADMIN;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar role={role} />
      
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 flex items-center gap-4">
            <Link 
              href="/organizations"
              className="p-2 hover:bg-slate-200 rounded-full transition-colors"
            >
              <span className="text-xl">←</span>
            </Link>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight">Register New SACCO</h1>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Platform Expansion • Onboarding</p>
            </div>
          </div>

          <form action={createOrganization} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">SACCO Name</label>
                <input 
                  name="name"
                  type="text" 
                  required
                  placeholder="e.g. Wakiso United SACCO"
                  className="w-full px-5 py-3 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Organization Code</label>
                <input 
                  name="code"
                  type="text" 
                  required
                  placeholder="e.g. WAK-001"
                  className="w-full px-5 py-3 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Registration Number</label>
                <input 
                  name="registration_number"
                  type="text" 
                  required
                  placeholder="e.g. REG-12345"
                  className="w-full px-5 py-3 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Official Email</label>
                <input 
                  name="email"
                  type="email" 
                  required
                  placeholder="contact@sacco.com"
                  className="w-full px-5 py-3 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Phone Number</label>
                <input 
                  name="phone"
                  type="tel" 
                  required
                  placeholder="+256..."
                  className="w-full px-5 py-3 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Physical Address</label>
                <input 
                  name="address"
                  type="text" 
                  required
                  placeholder="Plot 12, Kampala Road"
                  className="w-full px-5 py-3 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Country</label>
                <select 
                  name="country"
                  className="w-full px-5 py-3 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold appearance-none"
                >
                  <option value="Uganda">Uganda</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Rwanda">Rwanda</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Currency</label>
                <select 
                  name="currency"
                  className="w-full px-5 py-3 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold appearance-none"
                >
                  <option value="UGX">UGX (Uganda Shilling)</option>
                  <option value="KES">KES (Kenya Shilling)</option>
                  <option value="TZS">TZS (Tanzania Shilling)</option>
                  <option value="RWF">RWF (Rwanda Franc)</option>
                  <option value="USD">USD (US Dollar)</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex gap-4">
              <button 
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest py-4 rounded-2xl shadow-lg shadow-indigo-900/20 transition-all active:scale-[0.98]"
              >
                Register SACCO
              </button>
              <Link 
                href="/organizations"
                className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black uppercase tracking-widest rounded-2xl transition-all text-center"
              >
                Cancel
              </Link>
            </div>
          </form>

          {/* Tips for Super Admin */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Onboarding Tip</p>
              <p className="text-xs font-bold text-indigo-700">Ensure the SACCO code is unique as it will be used for account numbers.</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Monetization</p>
              <p className="text-xs font-bold text-emerald-700">Default subscription will be set to &apos;Trial&apos; for new organizations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
