import { createClient } from '@/utils/supabase/server';
import { selectOrganization } from './actions';

async function getOrganizations() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('organizations')
    .select('id, name, code, district')
    .eq('is_active', true);
  return data || [];
}

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const organizations = await getOrganizations();
  const resolvedParams = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[var(--bg-page)] py-12">
      <div className="w-full max-w-[600px]">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-[var(--accent)] text-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">Setup your SME</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-2">Every SME should be either independent or under a SACCO/Microfinance.</p>
        </div>

        <div className="grid gap-6">
          {/* Independent Option */}
          <div className="p-6 bg-white border border-[var(--border)] rounded-[var(--radius-lg)] shadow-sm hover:border-[var(--accent)] transition-all group">
            <form action={selectOrganization}>
              <input type="hidden" name="independent" value="true" />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-[var(--text-primary)]">Independent SME</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Manage your business without any SACCO affiliation.</p>
                </div>
                <button className="py-2 px-6 bg-[var(--bg-secondary)] text-[var(--text-primary)] text-xs font-bold uppercase tracking-widest rounded-xl group-hover:bg-[var(--accent)] group-hover:text-white transition-all">
                  Select
                </button>
              </div>
            </form>
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[var(--border)]"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[var(--bg-page)] px-4 text-[var(--text-secondary)] font-medium tracking-widest">Or join an organization</span>
            </div>
          </div>

          {/* Organizations List */}
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

        {resolvedParams?.error && (
          <div className="mt-6 p-4 text-sm text-center text-[var(--red)] bg-[rgba(163,45,45,0.05)] border border-[rgba(163,45,45,0.1)] rounded-[var(--radius-md)]">
            {resolvedParams.error}
          </div>
        )}
      </div>
    </div>
  );
}
