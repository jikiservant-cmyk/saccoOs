'use server';

import { createClient } from '@/utils/supabase/server';
import { BusinessTransaction, BusinessTransactionType } from '@sacco/core';
import { revalidatePath } from 'next/cache';

export async function getBusinessTransactions(businessId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('business_transactions')
    .select('*')
    .eq('business_id', businessId)
    .order('transaction_date', { ascending: false });

  if (error) {
    console.error('Error fetching business transactions:', error);
    return [];
  }

  return data as BusinessTransaction[];
}

export async function addBusinessTransaction(formData: FormData) {
  const supabase = await createClient();
  
  const businessId = formData.get('businessId') as string;
  const type = formData.get('type') as BusinessTransactionType;
  const amount = parseFloat(formData.get('amount') as string);
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const paymentMethod = formData.get('paymentMethod') as any;
  const transactionDate = formData.get('date') as string;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('business_transactions')
    .insert([
      {
        business_id: businessId,
        transaction_type: type,
        amount,
        category,
        description,
        payment_method: paymentMethod,
        transaction_date: transactionDate,
        created_by: user.id,
      },
    ]);

  if (error) {
    console.error('Error adding transaction:', error);
    return { error: error.message };
  }

  revalidatePath('/cashbook');
  return { success: true };
}

export async function getBusinessAnalytics(businessId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('business_analytics_snapshots')
    .select('*')
    .eq('business_id', businessId)
    .order('snapshot_date', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows found is not an error for analytics
    console.error('Error fetching business analytics:', error);
    return null;
  }

  return data;
}

export async function getBusinessCreditProfile(businessId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('business_credit_profiles')
    .select('*')
    .eq('business_id', businessId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows found is not an error
    console.error('Error fetching credit profile:', error);
    return null;
  }

  return data;
}

