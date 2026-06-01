import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';

export default function AdminSmeIntelPage() {
  const role = ROLES.SACCO_ADMIN;

  const smes = [
    { name: 'Kizito General Store', owner: 'Robert Kizito', score: 71, status: 'Low Risk', growth: '+24%', category: 'Retail' },
    { name: 'Mama Jane Shop', owner: 'Jane Namuli', score: 68, status: 'Low Risk', growth: '+18%', category: 'Retail' },
    { name: 'Kato Hardware', owner: 'Paul Kato', score: 54, status: 'Medium Risk', growth: '+12%', category: 'Construction' },
    { name: 'Sunshine Cafe', owner: 'Grace Akello', score: 42, status: 'Medium Risk', growth: '-5%', category: 'Food' },
    { name: 'Boda Parts Ltd', owner: 'John Musoke', score: 31, status: 'High Risk', growth: '+2%', category: 'Automotive' },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      <Sidebar role={role} />
      
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black tracking-tight">SME Intelligence</h1>
              <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest text-[10px] font-bold">Monitor Business Growth & Lending Opportunities</p>
            </div>
            <div className="bg-green-500/10 text-green-500 text-[10px] font-black px-4 py-2 rounded-xl border border-green-500/20 uppercase tracking-widest">
              AI Credit Analysis Active
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Linked SMEs', val: '63' },
              { label: 'Healthy (Low Risk)', val: '48', color: 'text-green-500' },
              { label: 'Credit Ready', val: '12', color: 'text-blue-400' },
              { label: 'High Risk Alert', val: '3', color: 'text-red-500' },
            ].map(stat => (
              <div key={stat.label} className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                <p className={`text-2xl font-black mt-1 ${stat.color || 'text-white'}`}>{stat.val}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-900/50 rounded-3xl border border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-800 bg-gray-900/80 flex justify-between items-center">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">SME Credit Directory</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-white text-black rounded-lg text-[10px] font-black uppercase tracking-widest">High Score First</button>
                <button className="px-3 py-1.5 bg-gray-800 text-gray-400 rounded-lg text-[10px] font-black uppercase tracking-widest">Risk Level</button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-800">
                    <th className="px-6 py-4">Business Details</th>
                    <th className="px-6 py-4">Credit Score</th>
                    <th className="px-6 py-4">Risk Status</th>
                    <th className="px-6 py-4">Growth (MoM)</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {smes.map((sme) => (
                    <tr key={sme.name} className="hover:bg-gray-800/30 transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-black">{sme.name}</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{sme.category} • {sme.owner}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${sme.score > 60 ? 'bg-green-500' : sme.score > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${sme.score}%` }}></div>
                          </div>
                          <span className="text-sm font-black">{sme.score}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                          sme.status === 'Low Risk' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                          sme.status === 'Medium Risk' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                          'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                          {sme.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-sm font-black ${sme.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {sme.growth}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[10px] font-black uppercase text-green-500 hover:text-green-400 tracking-widest">Analyze</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
