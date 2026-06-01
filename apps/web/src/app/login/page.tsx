import Link from 'next/link';
import { login } from '../auth/actions';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const resolvedParams = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[var(--bg-page)]">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-[var(--accent)] text-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">Welcome back</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Sacco OS Management Portal</p>
        </div>

        <div className="p-8 bg-white border border-[var(--border)] rounded-[var(--radius-lg)] shadow-sm">
          <form action={login} className="space-y-5">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-1.5" htmlFor="email">
                Email Address
              </label>
              <input
                className="w-full px-3.5 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[var(--radius-md)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
                name="email"
                type="email"
                placeholder="name@sacco.com"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]" htmlFor="password">
                  Password
                </label>
                <Link href="#" className="text-xs font-medium text-[var(--accent)] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                className="w-full px-3.5 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[var(--radius-md)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>

            <button className="w-full py-3 px-4 bg-[var(--accent)] text-white text-sm font-medium rounded-[var(--radius-md)] hover:opacity-90 active:scale-[0.98] transition-all shadow-sm">
              Sign in to Dashboard
            </button>

            {resolvedParams?.error && (
              <div className="p-3 text-xs text-center text-[var(--red)] bg-[rgba(163,45,45,0.05)] border border-[rgba(163,45,45,0.1)] rounded-[var(--radius-md)]">
                {resolvedParams.error}
              </div>
            )}
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-[var(--text-secondary)]">
          New SACCO member?{' '}
          <Link href="/signup" className="font-medium text-[var(--text-primary)] hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
