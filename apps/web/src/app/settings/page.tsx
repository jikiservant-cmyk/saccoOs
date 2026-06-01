import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';

export default function AdminSettingsPage() {
  const role = ROLES.SACCO_ADMIN;

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Sidebar role={role} />
      
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">System Settings</h1>
            <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest text-[10px] font-bold">Configure SACCO Rules & Organization Identity</p>
          </div>

          <div className="space-y-8">
            {/* Organization Identity */}
            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-4">Organization Identity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SACCO Name</label>
                  <input className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:border-green-600" defaultValue="Kampala Central SACCO" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Registration Number</label>
                  <input className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:border-green-600" defaultValue="KLA-SACCO-2026-001" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Email</label>
                  <input className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:border-green-600" defaultValue="admin@kampalacentral.sacco" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Currency</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:border-green-600">
                    <option>UGX - Ugandan Shilling</option>
                    <option>KES - Kenyan Shilling</option>
                    <option>USD - US Dollar</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Lending Rules */}
            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-4">Lending & Credit Rules</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="text-sm font-black">Max Loan Multiplier</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">How many times of savings a member can borrow</p>
                  </div>
                  <input className="w-20 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-black text-center" defaultValue="3.0" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="text-sm font-black">Auto-Approval Threshold</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Loans below this amount are auto-approved for high-score members</p>
                  </div>
                  <input className="w-32 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-black text-center font-mono" defaultValue="500,000" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="text-sm font-black">Penalty Grace Period</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Days before late payment penalties accrue</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input className="w-16 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-black text-center" defaultValue="3" />
                    <span className="text-[10px] font-black text-gray-400 uppercase">Days</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Security & Access */}
            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-4">Security & Access</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black">Two-Factor Authentication</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Require 2FA for all staff accounts</p>
                  </div>
                  <div className="w-12 h-6 bg-green-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black">Audit Trail Retention</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">How long to keep detailed action logs</p>
                  </div>
                  <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold">
                    <option>1 Year</option>
                    <option>5 Years</option>
                    <option>Indefinite</option>
                  </select>
                </div>
              </div>
            </section>
          </div>

          {/* Action Footer */}
          <div className="pt-8 border-t border-gray-200 flex justify-end gap-4">
            <button className="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-600">Reset to Defaults</button>
            <button className="bg-gray-900 text-white px-10 py-3 rounded-2xl text-sm font-black shadow-xl shadow-gray-900/20 hover:bg-black transition-all">Save All Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
