'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function selectOrganization(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const organizationId = formData.get('organizationId') as string;
  const isIndependent = formData.get('independent') === 'true';

  // Get the user's business
  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_profile_id', user.id)
    .single();

  if (!business) {
    console.error('No business found for user:', user.id);
    return redirect('/onboarding?error=Business profile not found. Please contact support.');
  }

  if (isIndependent) {
    // Record that this business is independent
    const { error } = await supabase
      .from('business_organizations')
      .insert([
        {
          business_id: business.id,
          organization_id: null, // No organization for independent SMEs
          relationship_type: 'member',
          status: 'independent',
          joined_at: new Date(),
        },
      ]);

    if (error && error.code !== '23505') { // Ignore if already exists
      return redirect(`/onboarding?error=${encodeURIComponent(error.message)}`);
    }

    revalidatePath('/', 'layout');
    return redirect('/');
  }

  if (organizationId) {
    // Create a pending relationship with the organization
    const { error } = await supabase
      .from('business_organizations')
      .insert([
        {
          business_id: business.id,
          organization_id: organizationId,
          relationship_type: 'member',
          status: 'pending',
        },
      ]);

    if (error) {
      return redirect(`/onboarding?error=${encodeURIComponent(error.message)}`);
    }

    // TODO: Send notification to SACCO admin via a future notifications system
    // The 'notifications' table is not yet in the schema
    // For now, the admin will see the pending request in the organizations dashboard
    console.log(`New join request: business ${business.id} → org ${organizationId}`);

    revalidatePath('/', 'layout');
    return redirect('/onboarding/success');
  }

  return redirect('/onboarding');
}
