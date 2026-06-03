import Link from 'next/link';
import { login } from '../auth/actions';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const resolvedParams = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 bg-[var(--bg)]">
      <div className="w-full max-w-[400px]">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-5 rounded-2xl bg-[var(--navy)] text-[var(--gold)] shadow-xl">
            <i className="ti ti-lock text-3xl font-black"></i>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[var(--navy)]">Welcome back</h1>
          <p className="text-[13px] text-[var(--muted)] mt-2 font-mono uppercase tracking-wider">WalletBook Portal</p>
        </div>

        <div className="p-8 bg-[var(--card)] border border-[var(--border2)] rounded-[32px] shadow-lg relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--gold)] to-[#0ab898]"></div>
          
          <form action={login} className="space-y-6">
            <div>
              <label className="block font-mono text-[10px] font-bold uppercase tracking-[2px] text-[var(--muted2)] mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="w-full px-4 py-3.5 bg-white/50 border border-[var(--border2)] rounded-2xl text-sm text-[var(--navy)] placeholder:text-[var(--muted2)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20 transition-all font-mono"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block font-mono text-[10px] font-bold uppercase tracking-[2px] text-[var(--muted2)]" htmlFor="password">
                  Password
                </label>
                <Link href="#" className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--teal)] hover:opacity-80 transition-opacity">
                  Forgot?
                </Link>
              </div>
              <input
                className="w-full px-4 py-3.5 bg-white/50 border border-[var(--border2)] rounded-2xl text-sm text-[var(--navy)] placeholder:text-[var(--muted2)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20 transition-all font-mono"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>

            <button className="w-full py-4 px-4 bg-[var(--navy)] text-[var(--gold)] text-sm font-bold uppercase tracking-widest rounded-2xl hover:translate-y-[-2px] active:scale-[0.98] transition-all shadow-md">
              Sign in to Dashboard
            </button>

            {resolvedParams?.error && (
              <div className="p-4 text-[11px] font-mono text-center text-[var(--red)] bg-[var(--red-lt)] border border-[var(--red)]/10 rounded-2xl">
                ERROR: {resolvedParams.error}
              </div>
            )}
          </form>
        </div>

        <p className="mt-10 text-center text-xs text-[var(--muted2)] font-medium">
          New to the platform?{' '}
          <Link href="/signup" className="text-[var(--teal)] font-bold uppercase tracking-wider hover:underline ml-1">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
