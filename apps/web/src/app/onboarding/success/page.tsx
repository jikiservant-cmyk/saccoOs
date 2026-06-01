import Link from 'next/link';

export default function OnboardingSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[var(--bg-page)] text-center">
      <div className="w-full max-w-[400px]">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[var(--green-bg)] text-[var(--green)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] mb-2">Request Sent!</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-8">Your request to join the organization has been sent. You will be notified once they approve your application.</p>
        
        <Link 
          href="/"
          className="inline-block w-full py-3 px-4 bg-[var(--accent)] text-white text-sm font-medium rounded-[var(--radius-md)] hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
