'use server';

import { createClient } from '@/utils/supabase/server';
import { getMemberProfile } from '@/utils/member';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function applyForLoan(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const member = await getMemberProfile(user.id);
  if (!member) {
    redirect('/onboarding');
  }

  const requestedAmount = Number(formData.get('requestedAmount') ?? 0);
  const purpose = String(formData.get('purpose') ?? 'Business capital');
  const loanType = String(formData.get('loanType') ?? 'Member Loan');
  const term = Number(formData.get('term') ?? 6);
  const comments = String(formData.get('comments') ?? '');

  const { error } = await supabase.from('loan_applications').insert([
    {
      organization_id: member.organization?.id ?? null,
      member_id: member.id,
      requested_amount: requestedAmount,
      purpose,
      status: 'pending',
      loan_product_id: null,
      submitted_at: new Date().toISOString(),
      created_by: user.id,
    },
  ]);

  if (error) {
    console.error('Loan application submission failed:', error.message);
    redirect('/apply-loan?error=' + encodeURIComponent(error.message));
  }

  revalidatePath('/apply-loan');
  redirect('/apply-loan?success=Loan request submitted successfully.');
}
