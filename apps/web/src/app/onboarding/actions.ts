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
  const { data: business, error: fetchError } = await supabase
    .schema('sacco')
    .from('businesses')
    .select('id')
    .eq('owner_profile_id', user.id)
    .single();

  if (fetchError || !business) {
    console.error('Business fetch error:', fetchError);
    const detail = fetchError ? `${fetchError.code}: ${fetchError.message}` : 'No business record found in "sacco.businesses" table.';
    return redirect(`/onboarding?error=${encodeURIComponent(`Database Error: ${detail}`)}`);
  }

  if (isIndependent) {
    // Record that this business is independent
    const { error: insertError } = await supabase
      .schema('sacco')
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

    if (insertError && insertError.code !== '23505') { // Ignore if already exists
      console.error('Business relationship insert error:', insertError);
      return redirect(`/onboarding?error=${encodeURIComponent(`Database Error (${insertError.code}): ${insertError.message}`)}`);
    }

    revalidatePath('/', 'layout');
    return redirect('/');
  }

  if (organizationId) {
    // Create a pending relationship with the organization
    const { error } = await supabase
      .schema('sacco')
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
