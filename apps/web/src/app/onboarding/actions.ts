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

  if (!organizationId) {
    return redirect(`/onboarding?error=${encodeURIComponent('Please select a SACCO to join.')}`);
  }

  // Create an active relationship with the organization in members table
  const { error } = await supabase
    .schema('sacco')
    .from('members')
    .upsert({
      profile_id: user.id,
      organization_id: organizationId,
      membership_number: `MEM-${Math.floor(Math.random() * 10000)}`,
      status: 'active',
      joined_date: new Date(),
    }, { onConflict: 'profile_id, organization_id' });

    if (error) {
      return redirect(`/onboarding?error=${encodeURIComponent(error.message)}`);
    }

    console.log(`New join request: user ${user.id} → org ${organizationId}`);

    revalidatePath('/', 'layout');
    return redirect('/onboarding?step=saving-plan');
}

export async function selectSavingPlan(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const productId = formData.get('productId') as string;
  const organizationId = formData.get('organizationId') as string;

  if (!productId || !organizationId) {
    return redirect(`/onboarding?step=saving-plan&error=${encodeURIComponent('Please select a saving plan.')}`);
  }

  // 0. Get the actual member ID for this profile
  const { data: member } = await supabase
    .schema('sacco')
    .from('members')
    .select('id')
    .eq('profile_id', user.id)
    .eq('organization_id', organizationId)
    .single();

  if (!member) {
    return redirect(`/onboarding?step=organization&error=${encodeURIComponent('Member profile not found.')}`);
  }

  // 1. Create a savings account for the member
  const { data: account, error: accountError } = await supabase
    .schema('sacco')
    .from('accounts')
    .insert({
      organization_id: organizationId,
      account_category: 'liability',
      code: `SAV-${Math.floor(1000 + Math.random() * 9000)}`,
      name: 'Savings Account',
      member_id: member.id,
      currency: 'UGX',
      cached_balance: 0,
      is_system: false,
      is_active: true,
    })
    .select()
    .single();

  if (accountError) {
    console.error('Account creation error:', accountError);
    return redirect(`/onboarding?step=saving-plan&error=${encodeURIComponent(accountError.message)}`);
  }

  // 2. Link the product to the member
  const { error: memberSavingsError } = await supabase
    .schema('sacco')
    .from('member_savings')
    .insert({
      organization_id: organizationId,
      member_id: member.id,
      savings_product_id: productId,
      account_id: account.id,
      status: 'active',
      opened_date: new Date().toISOString(),
    });

  if (memberSavingsError) {
    console.error('Member savings link error:', memberSavingsError);
    return redirect(`/onboarding?step=saving-plan&error=${encodeURIComponent(memberSavingsError.message)}`);
  }

  revalidatePath('/', 'layout');
  return redirect('/my-wallet');
}
