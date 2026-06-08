import { createClient } from '@/utils/supabase/server';
import { ROLES } from '@sacco/core';
import { getUserRole } from '@/utils/rbac';
import { redirect } from 'next/navigation';

export default async function LandingRouter() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const role = await getUserRole(user.id);

  // Check for SACCO membership status to decide landing page
  const { data: member } = await supabase
    .schema('sacco')
    .from('members')
    .select('status')
    .eq('profile_id', user.id)
    .single();

  const { data: wallet } = await supabase
    .schema('sacco')
    .from('wallets')
    .select('id')
    .eq('profile_id', user.id)
    .single();

  // Redirection logic for Simplified v1
  if (role === ROLES.SACCO_ADMIN) {
    return redirect('/admin');
  }
  
  if (role === ROLES.SUPER_ADMIN) {
    return redirect('/super-admin');
  }

  // If not onboarded, send to onboarding
  if (!member || member.status === 'pending' || !wallet) {
    return redirect('/onboarding');
  }

  // Fully onboarded members go to the Wallet
  return redirect('/my-wallet');
}
