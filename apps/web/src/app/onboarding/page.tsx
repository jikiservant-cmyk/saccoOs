import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { selectSavingPlan } from './actions';

async function getSavingProducts(orgId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .schema('sacco')
    .from('saving_products')
    .select('id, name, interest_rate, min_balance')
    .eq('organization_id', orgId)
    .eq('is_active', true)
    .order('min_balance', { ascending: true });
  return data || [];
}

export default async function OnboardingPage({
  searchParams,
}: {
  // Next.js 15 App Router passes searchParams as a Promise
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect('/login');

  const { data: member } = await supabase
    .schema('sacco')
    .from('members')
    .select('id, organization_id, status')
    .eq('profile_id', user.id)
    .single();

  if (!member) return redirect('/login');

  // ✅ Let the RPC be the source of truth.
  // If the member is active, all 4 steps (account, member_savings, wallet, status)
  // have already been completed atomically. No need to double-check member_savings here.
  if (member.status === 'active') {
    return redirect('/my-wallet');
  }

  const [savingProducts, resolvedParams] = await Promise.all([
    getSavingProducts(member.organization_id),
    searchParams,
  ]);

  const errorMessage = resolvedParams?.error;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[var(--bg-page)] py-12">
      <div className="w-full max-w-[600px]">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-[var(--green)] text-white shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8M8 12h8" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
            Choose Your Saving Plan
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Pick a plan that fits your savings goals to get started.
          </p>
        </div>

        {/* Error banner */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-6 p-4 text-sm text-center text-[var(--red)] bg-[rgba(163,45,45,0.05)] border border-[rgba(163,45,45,0.1)] rounded-[var(--radius-md)]"
          >
            {errorMessage}
          </div>
        )}

        {/* Plan cards */}
        <div className="grid gap-4">
          {savingProducts.length > 0 ? (
            savingProducts.map((product) => (
              <div
                key={product.id}
                className="p-6 bg-white border border-[var(--border)] rounded-[var(--radius-lg)] shadow-sm hover:border-[var(--green)] transition-all group"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      Interest:{' '}
                      <span className="text-[var(--green)] font-bold">
                        {product.interest_rate}% p.a
                      </span>
                    </p>
                    <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest mt-2">
                      Min. Balance: UGX {product.min_balance.toLocaleString()}
                    </p>
                  </div>

                  {/* ✅ org_id is NOT sent from the client — RPC pulls it from DB via profile_id */}
                  <form action={selectSavingPlan} className="shrink-0">
                    <input type="hidden" name="productId" value={product.id} />
                    <button
                      type="submit"
                      className="py-3 px-8 bg-[var(--bg-secondary)] text-[var(--text-primary)] text-xs font-black uppercase tracking-widest rounded-xl group-hover:bg-[var(--green)] group-hover:text-white transition-all shadow-sm"
                    >
                      Choose Plan
                    </button>
                  </form>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 bg-white border border-[var(--border)] rounded-[var(--radius-lg)] text-center">
              <p className="text-[var(--text-secondary)] italic">
                No saving plans configured yet.
              </p>
              <p className="text-xs mt-2 text-[var(--text-secondary)]">
                Please contact your SACCO administrator.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
