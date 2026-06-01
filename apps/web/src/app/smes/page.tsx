import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';

export default function SmeProfilePage() {
  const role = ROLES.SME_OWNER;

  const business = {
    name: 'Kizito General Store',
    regNumber: 'KLA-2023-998',
    phone: '+254 700 123 456',
    email: 'kizito.store@gmail.com',
    address: 'Plot 45, Jinja Road, Kampala',
    district: 'Kampala',
    businessType: 'Retail',
    foundedDate: 'May 2023',
    linkedSaccos: [
      { name: 'Kampala Unity SACCO', joinedAt: 'June 2023', status: 'Active' },
      { name: 'Central Micro-Finance', joinedAt: 'Jan 2024', status: 'Pending' },
    ]
  };

  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      <Sidebar role={role} />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex items-center gap-8 border-b border-gray-800 pb-12">
            <div className="w-32 h-32 bg-gray-800 rounded-3xl flex items-center justify-center text-5xl font-black shadow-2xl border border-gray-700">
              {business.name[0]}
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight">{business.name}</h1>
              <p className="text-green-500 font-bold tracking-widest text-xs uppercase">{business.businessType} • {business.district}</p>
              <div className="flex gap-2 pt-2">
                <span className="bg-gray-900 text-gray-400 text-[10px] font-black px-2 py-1 rounded-md border border-gray-800 uppercase tracking-widest">Verified Merchant</span>
                <span className="bg-green-500/10 text-green-500 text-[10px] font-black px-2 py-1 rounded-md border border-green-500/20 uppercase tracking-widest">Credit Level 1</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Business Info */}
            <div className="space-y-8">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Business Details</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Registration Number</p>
                  <p className="text-sm font-bold">{business.regNumber}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Email Address</p>
                  <p className="text-sm font-bold">{business.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Phone Number</p>
                  <p className="text-sm font-bold">{business.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Physical Address</p>
                  <p className="text-sm font-bold leading-relaxed">{business.address}</p>
                </div>
              </div>
            </div>

            {/* Linked SACCOs */}
            <div className="space-y-8">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Linked SACCO Organizations</h3>
              <div className="space-y-4">
                {business.linkedSaccos.map((sacco) => (
                  <div key={sacco.name} className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 flex justify-between items-center group hover:border-gray-700 transition-colors">
                    <div>
                      <h4 className="text-sm font-black">{sacco.name}</h4>
                      <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-bold">Member since {sacco.joinedAt}</p>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${
                      sacco.status === 'Active' ? 'text-green-500 bg-green-500/10' : 'text-orange-400 bg-orange-500/10'
                    }`}>
                      {sacco.status}
                    </span>
                  </div>
                ))}
                <button className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-800 text-xs font-black text-gray-500 uppercase tracking-widest hover:border-green-600/50 hover:text-green-500 transition-all">
                  + Link to another SACCO
                </button>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-12 border-t border-gray-800 flex justify-between items-center">
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Account Created: May 12, 2023</p>
            <div className="flex gap-4">
              <button className="text-sm font-black text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest">Deactivate Business</button>
              <button className="bg-white text-black px-8 py-3 rounded-2xl text-sm font-black transition-transform hover:scale-105 active:scale-95">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
