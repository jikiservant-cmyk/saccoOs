import { createClient } from '@/utils/supabase/server';

export async function getOnboardingStatus(userId: string) {
  const supabase = await createClient();

  // 1. Check for SACCO membership
  const { data: member, error: memberError } = await supabase
    .schema('sacco')
    .from('members')
    .select('organization_id, status')
    .eq('profile_id', userId)
    .single();

  if (memberError || !member) {
    return { hasBusiness: true, hasOrg: false, isPending: false };
  }

  return { 
    hasBusiness: true, 
    hasOrg: member.status === 'active', 
    isPending: member.status === 'pending' 
  };
}
