'use server';

import { createClient } from '@/utils/supabase/server';
import { Member, MemberSavings, Loan } from '@sacco/core';

export interface MemberProfileData {
  member: Member & {
    profile?: {
      full_name: string;
      email: string;
      phone: string;
    };
    organization?: {
      name: string;
      country: string;
      currency: string;
    };
  };
  savings?: Array<MemberSavings & { savings_product?: { name: string; interest_rate: number }; account?: { cached_balance: number } }>;
  loans?: Loan[];
  payments?: Array<any>;
}

export async function getAuthenticatedUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getMemberProfile(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('members')
    .select(`*, profile:profiles(full_name,email,phone), organization:organizations(id,name,country,currency)`)
    .eq('profile_id', userId)
    .single();

  if (error || !data) {
    return null;
  }

  return data as MemberProfileData['member'];
}

export async function getMemberSavings(memberId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('member_savings')
    .select('*, savings_product:savings_products(name,interest_rate), account:accounts(cached_balance)')
    .eq('member_id', memberId)
    .order('opened_date', { ascending: false });

  if (error) {
    console.error('Error fetching member savings:', error.message);
    return [] as MemberSavings[];
  }

  return data as MemberProfileData['savings'];
}

export async function getMemberLoans(memberId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('loans')
    .select('*')
    .eq('member_id', memberId)
    .order('disbursement_date', { ascending: false });

  if (error) {
    console.error('Error fetching member loans:', error.message);
    return [] as Loan[];
  }

  return data as Loan[];
}

export async function getMemberPayments(memberId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('payment_requests')
    .select('*')
    .eq('member_id', memberId)
    .order('created_at', { ascending: false })
    .limit(8);

  if (error) {
    console.error('Error fetching member payments:', error.message);
    return [] as Array<any>;
  }

  return data as Array<any>;
}

export async function getMemberDashboardData(userId: string) {
  const member = await getMemberProfile(userId);
  if (!member) return null;

  const [savings, loans, payments] = await Promise.all([
    getMemberSavings(member.id),
    getMemberLoans(member.id),
    getMemberPayments(member.id),
  ]);

  return { member, savings, loans, payments } as MemberProfileData;
}
