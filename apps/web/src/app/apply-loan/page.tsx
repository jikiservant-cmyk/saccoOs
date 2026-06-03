import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@sacco/core';
import { applyForLoan } from './actions';

export default function ApplyLoanPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar role={ROLES.MEMBER} />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-green-600">Loan Request</p>
            <h1 className="text-4xl font-black tracking-tight">Apply for a SACCO Loan</h1>
            <p className="text-sm text-gray-500">Submit a new loan application and track approval status within the SACCO member portal.</p>
          </div>

          <form action={applyForLoan} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm grid gap-6">
            <div>
              <label className="text-[10px] uppercase tracking-[0.35em] text-gray-500 font-black">Loan type</label>
              <select name="loanType" className="mt-3 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-green-600">
                <option value="Member Loan">Member Loan</option>
                <option value="Emergency Loan">Emergency Loan</option>
                <option value="Asset Purchase Loan">Asset Purchase Loan</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.35em] text-gray-500 font-black">Requested amount</label>
              <input name="requestedAmount" type="number" className="mt-3 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-green-600" placeholder="1000000" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-[10px] uppercase tracking-[0.35em] text-gray-500 font-black">Repayment term</label>
                <select name="term" className="mt-3 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-green-600">
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="18">18 months</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.35em] text-gray-500 font-black">Purpose</label>
                <input name="purpose" className="mt-3 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-green-600" placeholder="Working capital, stock purchase, etc." />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.35em] text-gray-500 font-black">Comments</label>
              <textarea name="comments" className="mt-3 w-full min-h-[160px] rounded-3xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-green-600" placeholder="Tell the SACCO why you need this loan..."></textarea>
            </div>

            <button type="submit" className="rounded-3xl bg-green-700 px-6 py-4 text-sm font-black uppercase tracking-[0.35em] text-white hover:bg-green-600 transition-all max-w-max">
              Submit Loan Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
