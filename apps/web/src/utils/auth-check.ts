import { createClient } from '@/utils/supabase/server';

/**
 * Returns the SACCO onboarding status for a given user.
 * Only checks SACCO membership — business/SME checks are handled separately.
 */
export async function getOnboardingStatus(userId: string) {
  const supabase = await createClient();

  const { data: member, error: memberError } = await supabase
    .schema('sacco')
    .from('members')
    .select('organization_id, status')
    .eq('profile_id', userId)
    .single();

  if (memberError || !member) {
    // No member record found — user has not joined any SACCO yet
    return { hasOrg: false, isPending: false };
  }

  return {
    hasOrg: member.status === 'active',
    isPending: member.status === 'pending',
  };
}
