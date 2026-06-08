import Link from 'next/link';
import { signup } from '../auth/actions';

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string; error: string }>;
}) {
  const resolvedParams = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 bg-[var(--bg)] py-12">
      <div className="w-full max-w-[450px]">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-5 rounded-2xl bg-[var(--navy)] text-[var(--gold)] shadow-xl">
            <i className="ti ti-user-plus text-3xl font-black"></i>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[var(--navy)]">Join WalletBook</h1>
          <p className="text-[13px] text-[var(--muted)] mt-2 font-mono uppercase tracking-wider">Create your profile</p>
        </div>

        <div className="p-8 bg-[var(--card)] border border-[var(--border2)] rounded-[32px] shadow-lg relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--gold)] to-[#0ab898]"></div>

          <form action={signup} className="space-y-5">
            <div>
              <label className="block font-mono text-[10px] font-bold uppercase tracking-[2px] text-[var(--muted2)] mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                className="w-full px-4 py-3 bg-white/50 border border-[var(--border2)] rounded-2xl text-sm text-[var(--navy)] placeholder:text-[var(--muted2)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20 transition-all font-mono"
                name="fullName"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] font-bold uppercase tracking-[2px] text-[var(--muted2)] mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 bg-white/50 border border-[var(--border2)] rounded-2xl text-sm text-[var(--navy)] placeholder:text-[var(--muted2)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20 transition-all font-mono"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] font-bold uppercase tracking-[2px] text-[var(--muted2)] mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                className="w-full px-4 py-3 bg-white/50 border border-[var(--border2)] rounded-2xl text-sm text-[var(--navy)] placeholder:text-[var(--muted2)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20 transition-all font-mono"
                name="phone"
                type="tel"
                placeholder="+256..."
                required
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] font-bold uppercase tracking-[2px] text-[var(--muted2)] mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-4 py-3 bg-white/50 border border-[var(--border2)] rounded-2xl text-sm text-[var(--navy)] placeholder:text-[var(--muted2)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20 transition-all font-mono"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="hidden">
              <label className="block font-mono text-[10px] font-bold uppercase tracking-[2px] text-[var(--muted2)] mb-2" htmlFor="role">
                Account Type
              </label>
              <select
                name="role"
                className="w-full px-4 py-3 bg-white/50 border border-[var(--border2)] rounded-2xl text-sm text-[var(--navy)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20 transition-all font-mono appearance-none"
                required
              >
                <option value="member" selected>SACCO Member</option>
              </select>
            </div>

            <button className="w-full py-4 px-4 bg-[var(--navy)] text-[var(--gold)] text-sm font-bold uppercase tracking-widest rounded-2xl hover:translate-y-[-2px] active:scale-[0.98] transition-all shadow-md">
              Create Account
            </button>

            {resolvedParams?.message && (
              <div className="p-4 text-[11px] font-mono text-center text-[var(--green)] bg-[var(--green-lt)] border border-[var(--green)]/10 rounded-2xl">
                {resolvedParams.message}
              </div>
            )}
            
            {resolvedParams?.error && (
              <div className="p-4 text-[11px] font-mono text-center text-[var(--red)] bg-[var(--red-lt)] border border-[var(--red)]/10 rounded-2xl">
                ERROR: {resolvedParams.error}
              </div>
            )}
          </form>
        </div>

        <p className="mt-10 text-center text-xs text-[var(--muted2)] font-medium">
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--teal)] font-bold uppercase tracking-wider hover:underline ml-1">
            Log in instead
          </Link>
        </p>
      </div>
    </div>
  );
}
