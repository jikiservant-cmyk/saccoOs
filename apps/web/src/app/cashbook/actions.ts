/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getBusinessTransactions(businessId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema('sacco')
    .from('business_transactions')
    .select('*')
    .eq('business_id', businessId)
    .order('transaction_date', { ascending: false });

  if (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
  return data;
}

export async function addTransaction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const amount = Number(formData.get('amount'));
  const description = formData.get('description') as string;
  const businessId = formData.get('businessId') as string;
  const transaction_type = formData.get('type') as string;
  const category = formData.get('category') as string || 'General';

  const { data, error } = await supabase
    .schema('sacco')
    .from('business_transactions')
    .insert([{
      amount,
      description,
      business_id: businessId,
      transaction_type,
      category,
      transaction_date: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    console.error('Transaction error:', error);
    return { success: false, error: error.message };
  }
  
  revalidatePath('/cashbook');
  return { success: true, data };
}

/**
 * Top up a member's personal SACCO wallet
 */
export async function topUpWallet(amount: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Get current balance
  const { data: wallet, error: fetchError } = await supabase
    .schema('sacco')
    .from('wallets')
    .select('id, balance')
    .eq('profile_id', user.id)
    .single();

  if (fetchError) throw fetchError;

  const newBalance = (wallet.balance || 0) + amount;

  // Update balance
  const { error: updateError } = await supabase
    .schema('sacco')
    .from('wallets')
    .update({ balance: newBalance })
    .eq('id', wallet.id);

  if (updateError) throw updateError;

  // Record the transaction in the ledger for audit
  await supabase
    .schema('sacco')
    .from('business_transactions')
    .insert({
      description: 'Wallet Top-up',
      amount: amount,
      transaction_type: 'income',
      category: 'Wallet',
      business_id: null, // personal
    });

  revalidatePath('/cashbook');
  return { success: true, newBalance };
}

/**
 * Record a deposit to the SACCO central treasury (Admin only)
 */
export async function depositToSacco(amount: number, organizationId: string) {
  const supabase = await createClient();
  
  // Get current treasury balance
  const { data: wallet, error: fetchError } = await supabase
    .schema('sacco')
    .from('wallets')
    .select('id, balance')
    .eq('organization_id', organizationId)
    .single();

  if (fetchError) throw fetchError;

  const newBalance = (wallet.balance || 0) + amount;

  const { error: updateError } = await supabase
    .schema('sacco')
    .from('wallets')
    .update({ balance: newBalance })
    .eq('id', wallet.id);

  if (updateError) throw updateError;

  revalidatePath('/admin');
  return { success: true };
}
