import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { selectOrganization, selectSavingPlan } from './actions';

async function getOrganizations() {
  const supabase = await createClient();
  const { data } = await supabase
    .schema('sacco')
    .from('organizations')
    .select('id, name, code, district')
    .eq('is_active', true);
  return data || [];
}

async function getSavingProducts(orgId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .schema('sacco')
    .from('saving_products')
    .select('*')
    .eq('organization_id', orgId)
    .eq('is_active', true);
  return data || [];
}

async function getUserOrg() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .schema('sacco')
    .from('members')
    .select('organization_id, status')
    .eq('profile_id', user.id)
    .limit(1)
    .single();
  
  return data;
}

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; step?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  // Check if already fully onboarded: active member + at least one saving plan
  const { data: member } = await supabase
    .schema('sacco')
    .from('members')
    .select('status')
    .eq('profile_id', user.id)
    .single();

  const { data: memberSavings } = await supabase
    .schema('sacco')
    .from('member_savings')
    .select('id')
    .eq('status', 'active')
    .limit(1)
    .single();

  if (member?.status === 'active' && memberSavings) {
    return redirect('/my-wallet');
  }

  const resolvedParams = await searchParams;
  const userOrg = await getUserOrg();
  const organizations = await getOrganizations();
  
  let step = resolvedParams.step || 'organization';
  if (userOrg && step === 'organization') {
    step = 'saving-plan';
  }

  const savingProducts = userOrg ? await getSavingProducts(userOrg.organization_id) : [];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[var(--bg-page)] py-12">
      <div className="w-full max-w-[600px]">
        
        {step === 'organization' && (
          <>
            <div className="mb-10 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-[var(--accent)] text-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">Join a SACCO</h1>
              <p className="text-sm text-[var(--text-secondary)] mt-2">Select the SACCO you belong to to get started with your savings.</p>
            </div>

            <div className="grid gap-6">
              <div className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] shadow-sm overflow-hidden">
                <div className="p-4 bg-[var(--bg-secondary)] border-b border-[var(--border)]">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Available Organizations</p>
                </div>
                <div className="divide-y divide-[var(--border)] max-h-[400px] overflow-y-auto">
                  {organizations.map((org) => (
                    <div key={org.id} className="p-4 hover:bg-[var(--bg-secondary)]/50 transition-all flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[var(--text-primary)]">{org.name}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{org.district} • {org.code}</p>
                      </div>
                      <form action={selectOrganization}>
                        <input type="hidden" name="organizationId" value={org.id} />
                        <button className="py-2 px-4 bg-[var(--bg-secondary)] text-[var(--text-primary)] text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-[var(--accent)] hover:text-white transition-all">
                          Request to Join
                        </button>
                      </form>
                    </div>
                  ))}
                  {organizations.length === 0 && (
                    <div className="p-8 text-center text-[var(--text-secondary)] italic text-sm">
                      No organizations available at the moment.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {step === 'saving-plan' && (
          <>
            <div className="mb-10 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-[var(--green)] text-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8M8 12h8"></path></svg>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">Choose Saving Plan</h1>
              <p className="text-sm text-[var(--text-secondary)] mt-2">Select a plan that fits your savings goals.</p>
            </div>

            <div className="grid gap-4">
              {savingProducts.map((product) => (
                <div key={product.id} className="p-6 bg-white border border-[var(--border)] rounded-[var(--radius-lg)] shadow-sm hover:border-[var(--green)] transition-all group">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[var(--text-primary)]">{product.name}</h3>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">Interest: <span className="text-[var(--green)] font-bold">{product.interest_rate}% p.a</span></p>
                      <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest mt-2">Min. Balance: UGX {product.min_balance.toLocaleString()}</p>
                    </div>
                    <form action={selectSavingPlan}>
                      <input type="hidden" name="productId" value={product.id} />
                      <input type="hidden" name="organizationId" value={userOrg?.organization_id} />
                      <button className="py-3 px-8 bg-[var(--bg-secondary)] text-[var(--text-primary)] text-xs font-black uppercase tracking-widest rounded-xl group-hover:bg-[var(--green)] group-hover:text-white transition-all shadow-sm">
                        Choose Plan
                      </button>
                    </form>
                  </div>
                </div>
              ))}
              {savingProducts.length === 0 && (
                <div className="p-12 bg-white border border-[var(--border)] rounded-[var(--radius-lg)] text-center">
                  <p className="text-[var(--text-secondary)] italic">No saving plans configured by your SACCO yet.</p>
                  <p className="text-xs mt-2">Please contact your SACCO administrator.</p>
                </div>
              )}
            </div>
          </>
        )}

        {resolvedParams?.error && (
          <div className="mt-6 p-4 text-sm text-center text-[var(--red)] bg-[rgba(163,45,45,0.05)] border border-[rgba(163,45,45,0.1)] rounded-[var(--radius-md)]">
            {resolvedParams.error}
          </div>
        )}
      </div>
    </div>
  );
}
