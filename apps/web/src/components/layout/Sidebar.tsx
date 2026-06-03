'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Role } from '@sacco/core';

interface Module {
  name: string;
  path: string;
  icon: string;
}

const ROLE_MODULES: Record<Role, Module[]> = {
  super_admin: [
    { name: 'Dashboard', path: '/super-admin', icon: '📊' },
    { name: 'Organizations', path: '/organizations', icon: '🏢' },
    { name: 'Members', path: '/members', icon: '👥' },
    { name: 'Transactions', path: '/transactions', icon: '🔄' },
    { name: 'Loan Intel', path: '/loan-intel', icon: '🧠' },
    { name: 'SME Intel', path: '/sme-intel', icon: '🏪' },
    { name: 'Payments', path: '/payments', icon: '💸' },
    { name: 'Analytics', path: '/analytics', icon: '📈' },
    { name: 'Billing', path: '/billing', icon: '💳' },
    { name: 'Support', path: '/support', icon: '🎧' },
    { name: 'Audit Logs', path: '/audit', icon: '🕵️' },
    { name: 'Integrations', path: '/integrations', icon: '🔌' },
    { name: 'System Health', path: '/health', icon: '🩺' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ],
  sacco_admin: [
    { name: 'Mission Control', path: '/admin', icon: '🚀' },
    { name: 'Members', path: '/members', icon: '👥' },
    { name: 'Loans', path: '/loans', icon: '💰' },
    { name: 'Savings', path: '/savings', icon: '🐷' },
    { name: 'Accounting', path: '/accounting', icon: '📖' },
    { name: 'SME Intel', path: '/sme-intel', icon: '🏪' },
    { name: 'Staff', path: '/staff', icon: '🧑‍💼' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ],
  loan_officer: [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Applications', path: '/loans/applications', icon: '📝' },
    { name: 'Active Loans', path: '/loans/active', icon: '💰' },
    { name: 'Repayments', path: '/loans/repayments', icon: '📥' },
    { name: 'Credit Risk', path: '/loans/risk', icon: '⚠️' },
    { name: 'SME Analytics', path: '/sme-intel', icon: '📈' },
  ],
  teller: [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Deposits', path: '/transactions/deposit', icon: '📥' },
    { name: 'Withdrawals', path: '/transactions/withdraw', icon: '📤' },
    { name: 'Repayments', path: '/transactions/repayment', icon: '💰' },
    { name: 'History', path: '/transactions/history', icon: '📜' },
  ],
  accountant: [
    { name: 'Financials', path: '/accounting', icon: '📖' },
    { name: 'Chart of Accounts', path: '/accounting/coa', icon: '🗺️' },
    { name: 'Journal', path: '/accounting/journal', icon: '📓' },
    { name: 'Reconciliation', path: '/accounting/reconcile', icon: '⚖️' },
    { name: 'Reports', path: '/reports', icon: '📊' },
  ],
  member: [
    { name: 'SME Dashboard', path: '/cashbook', icon: '🏪' },
    { name: 'My Wallet', path: '/my-wallet', icon: '👛' },
    { name: 'My Savings', path: '/my-savings', icon: '🐷' },
    { name: 'My Loans', path: '/my-loans', icon: '💰' },
    { name: 'Loan Request', path: '/apply-loan', icon: '📝' },
    { name: 'Statements', path: '/statements', icon: '📜' },
    { name: 'Profile', path: '/profile', icon: '👤' },
  ],
  sme_owner: [
    { name: 'SME Dashboard', path: '/cashbook', icon: '🏪' },
    { name: 'Inventory', path: '/inventory', icon: '📦' },
    { name: 'Receivables', path: '/receivables', icon: '📉' },
    { name: 'Payables', path: '/payables', icon: '📈' },
    { name: 'Reports', path: '/reports', icon: '📊' },
    { name: 'Team', path: '/team', icon: '👥' },
  ],
  sme_staff: [
    { name: 'Cashbook', path: '/cashbook', icon: '📓' },
    { name: 'Inventory', path: '/inventory', icon: '📦' },
    { name: 'Sales', path: '/sales', icon: '💰' },
    { name: 'Expenses', path: '/expenses', icon: '💸' },
  ],
  auditor: [
    { name: 'Audit Stream', path: '/audit', icon: '🕵️' },
    { name: 'Ledger Logs', path: '/audit/ledger', icon: '📓' },
    { name: 'Loan Audit', path: '/audit/loans', icon: '💰' },
    { name: 'Member Audit', path: '/audit/members', icon: '👥' },
  ],
};

export default function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const filteredModules = ROLE_MODULES[role] || ROLE_MODULES.member;

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-600 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          onClick={toggleSidebar}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        border-r border-gray-800
      `}>
        <div className="mb-8 px-2 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-green-500 tracking-tight">saccoOs</h1>
            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-black">{role.replace('_', ' ')}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {filteredModules.map((module) => {
            const isActive = pathname === module.path;
            return (
              <Link
                key={module.path}
                href={module.path}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group
                  ${isActive 
                    ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }
                `}
              >
                <span className={`text-xl transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {module.icon}
                </span>
                <span className="text-sm font-bold tracking-tight">{module.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-800 text-[10px] text-gray-500 text-center font-black uppercase tracking-widest">
          © 2026 saccoOs Platform
        </div>
      </aside>
    </>
  );
}
