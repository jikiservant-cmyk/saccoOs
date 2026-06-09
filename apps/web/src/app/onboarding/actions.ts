'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function selectSavingPlan(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return redirect('/login');

  const productId = formData.get('productId') as string;

  if (!productId) {
    return redirect(`/onboarding?error=${encodeURIComponent('Please select a saving plan.')}`);
  }

  // One RPC call = one DB transaction.
  // All 5 problems solved inside Postgres:
  //   ✅ org pulled from DB, not the form
  //   ✅ duplicate onboarding check
  //   ✅ product ownership verified against member's SACCO
  //   ✅ collision-safe account code via gen_random_uuid()
  //   ✅ account + member_savings + wallet + status update are atomic —
  //      if any step fails, Postgres rolls ALL of them back automatically
  const { data, error } = await supabase
    .rpc('complete_member_onboarding', {
      p_profile_id: user.id,
      p_product_id: productId,
    });

  if (error) {
    console.error('Onboarding RPC error:', error);
    return redirect(`/onboarding?error=${encodeURIComponent(error.message)}`);
  }

  if (data?.error) {
    return redirect(`/onboarding?error=${encodeURIComponent(data.error)}`);
  }

  // data.already_onboarded just means they hit submit twice — send them through
  revalidatePath('/', 'layout');
  return redirect('/my-wallet');
}
