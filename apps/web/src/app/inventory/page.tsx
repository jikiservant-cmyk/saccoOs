import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';

export default function InventoryPage() {
  const role = ROLES.SME_OWNER;
  
  const inventoryItems = [
    { id: '1', name: 'Maize Flour', sku: 'MF-001', quantity: 45, unit: 'kg', buyingPrice: 2500, sellingPrice: 3500, status: 'In Stock' },
    { id: '2', name: 'Sugar', sku: 'SG-012', quantity: 12, unit: 'kg', buyingPrice: 4000, sellingPrice: 5000, status: 'Low Stock' },
    { id: '3', name: 'Cooking Oil', sku: 'CO-005', quantity: 0, unit: 'Liters', buyingPrice: 6000, sellingPrice: 7500, status: 'Out of Stock' },
    { id: '4', name: 'Rice', sku: 'RC-022', quantity: 120, unit: 'kg', buyingPrice: 3200, sellingPrice: 4200, status: 'In Stock' },
    { id: '5', name: 'Soap', sku: 'SP-009', quantity: 24, unit: 'Bars', buyingPrice: 1500, sellingPrice: 2000, status: 'In Stock' },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      <Sidebar role={role} />
      
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Inventory</h1>
              <p className="text-gray-400 text-sm mt-1">Manage your stock and track reorder levels.</p>
            </div>
            <button className="w-full md:w-auto bg-green-600 hover:bg-green-700 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-green-900/20">
              + Add New Item
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Items</p>
              <p className="text-2xl font-black mt-1">156</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Stock Value</p>
              <p className="text-2xl font-black mt-1 text-green-500">12.4M</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Low Stock</p>
              <p className="text-2xl font-black mt-1 text-orange-500">8</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Out of Stock</p>
              <p className="text-2xl font-black mt-1 text-red-500">3</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
              <input 
                className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-green-600 transition-colors"
                placeholder="Search by product name or SKU..."
              />
            </div>
            <button className="bg-gray-900 border border-gray-800 px-6 rounded-xl text-sm font-bold">
              Filter
            </button>
          </div>

          {/* Inventory Table */}
          <div className="bg-gray-900/50 rounded-3xl border border-gray-800 overflow-x-auto">
            <div className="min-w-[800px]">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-900 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-800">
                    <th className="px-6 py-4">Item Name</th>
                    <th className="px-6 py-4">SKU</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4">Buying Price</th>
                    <th className="px-6 py-4">Selling Price</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {inventoryItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-800/30 transition-colors cursor-pointer group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-xs">📦</div>
                          <span className="text-sm font-bold">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-gray-400">{item.sku}</td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold">{item.quantity}</span>
                        <span className="text-[10px] text-gray-500 ml-1">{item.unit}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">UGX {item.buyingPrice.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm font-bold text-green-500">UGX {item.sellingPrice.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          item.status === 'In Stock' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                          item.status === 'Low Stock' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                          'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                          {item.status}
                        </span>
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
