'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createOrganization(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const name = formData.get('name') as string;
  const code = formData.get('code') as string;
  const registration_number = formData.get('registration_number') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const address = formData.get('address') as string;
  const country = formData.get('country') as string || 'Uganda';
  const currency = formData.get('currency') as string || 'UGX';

  const { error } = await supabase
    .from('organizations')
    .insert([
      {
        name,
        code,
        registration_number,
        email,
        phone,
        address,
        country,
        currency,
        is_active: true,
      },
    ])
    .single();

  if (error) {
    console.error('Error creating organization:', error);
    return;
  }

  revalidatePath('/organizations');
  revalidatePath('/super-admin');
  redirect('/organizations');
}

export async function respondToJoinRequest(requestId: string, status: 'active' | 'rejected') {
  const supabase = await createClient();

  const { error } = await supabase
    .from('business_organizations')
    .update({ status, joined_at: status === 'active' ? new Date() : null })
    .eq('id', requestId);

  if (error) {
    console.error('Error responding to join request:', error);
    return { error: error.message };
  }

  revalidatePath('/admin');
  return { success: true };
}
