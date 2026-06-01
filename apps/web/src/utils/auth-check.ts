import { createClient } from '@/utils/supabase/server';

export async function getOnboardingStatus(userId: string) {
  const supabase = await createClient();

  // 1. Check if user has a business
  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_profile_id', userId)
    .single();

  if (!business) return { hasBusiness: false, hasOrg: false, isPending: false };

  // 2. Check if business is linked to an organization (independent or joined)
  const { data: relationship } = await supabase
    .from('business_organizations')
    .select('status')
    .eq('business_id', business.id)
    .single();

  if (!relationship) {
    return { hasBusiness: true, hasOrg: false, isPending: false };
  }

  return { 
    hasBusiness: true, 
    hasOrg: relationship.status === 'active' || relationship.status === 'independent', 
    isPending: relationship.status === 'pending' 
  };
}
