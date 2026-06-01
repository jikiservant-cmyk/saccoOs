import Link from 'next/link';
import { signup } from '../auth/actions';

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string; error: string }>;
}) {
  const resolvedParams = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[var(--bg-page)] py-12">
      <div className="w-full max-w-[450px]">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-[var(--accent)] text-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">Join Sacco OS</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Create your member profile to get started</p>
        </div>

        <div className="p-8 bg-white border border-[var(--border)] rounded-[var(--radius-lg)] shadow-sm">
          <form action={signup} className="space-y-5">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-1.5" htmlFor="fullName">
                Full Name
              </label>
              <input
                className="w-full px-3.5 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[var(--radius-md)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
                name="fullName"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-1.5" htmlFor="email">
                Email Address
              </label>
              <input
                className="w-full px-3.5 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[var(--radius-md)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-1.5" htmlFor="phone">
                Phone Number
              </label>
              <input
                className="w-full px-3.5 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[var(--radius-md)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
                name="phone"
                type="tel"
                placeholder="+256..."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-1.5" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-3.5 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[var(--radius-md)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
              <p className="mt-1.5 text-[10px] text-[var(--text-secondary)]">Must be at least 8 characters long</p>
            </div>

            <button className="w-full py-3 px-4 bg-[var(--accent)] text-white text-sm font-medium rounded-[var(--radius-md)] hover:opacity-90 active:scale-[0.98] transition-all shadow-sm">
              Create Account
            </button>

            {resolvedParams?.message && (
              <div className="p-3 text-xs text-center text-[var(--green)] bg-[rgba(59,109,17,0.05)] border border-[rgba(59,109,17,0.1)] rounded-[var(--radius-md)]">
                {resolvedParams.message}
              </div>
            )}
            
            {resolvedParams?.error && (
              <div className="p-3 text-xs text-center text-[var(--red)] bg-[rgba(163,45,45,0.05)] border border-[rgba(163,45,45,0.1)] rounded-[var(--radius-md)]">
                {resolvedParams.error}
              </div>
            )}
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-[var(--text-secondary)]">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-[var(--text-primary)] hover:underline">
            Log in instead
          </Link>
        </p>
      </div>
    </div>
  );
}
