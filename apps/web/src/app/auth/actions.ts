'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error, data: authData } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return redirect('/login?error=' + encodeURIComponent(error.message));
  }

  if (authData.user) {
    const { data: profile } = await supabase
      .schema('sacco')
      .from('profiles')
      .select('is_platform_admin, roles')
      .eq('id', authData.user.id)
      .single();

    revalidatePath('/', 'layout');

    if (profile?.is_platform_admin) {
      return redirect('/super-admin');
    }

    const roles: string[] = profile?.roles || [];

    if (roles.includes('sacco_admin')) {
      return redirect('/admin');
    }

    if (roles.includes('member') || roles.includes('sme_owner')) {
      return redirect('/my-wallet');
    }

    // FIX: was silently falling through to redirect('/') when profile was
    // null or roles was empty (e.g. RLS blocking the profile read).
    // Send to onboarding to recover gracefully instead of getting lost.
    return redirect('/onboarding');
  }

  return redirect('/login?error=Authentication failed. Please try again.');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;
  const phone = formData.get('phone') as string;
  const requestedRole = formData.get('role') as string;
  const role = requestedRole === 'sacco_admin' ? 'sacco_admin' : 'member';

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, phone, role },
      // FIX: pass ?next=/onboarding so email-confirmed users land correctly
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=/onboarding`,
    },
  });

  if (error) {
    return redirect('/signup?error=' + encodeURIComponent(error.message));
  }

  if (data.user) {
    // 1. Create profile
    const { error: profileError } = await supabase
      .schema('sacco')
      .from('profiles')
      .upsert({
        id: data.user.id,
        full_name: fullName,
        email,
        phone,
        is_platform_admin: false,
        is_active: true,
        roles: ['member'],
      }, { onConflict: 'id' });

    if (profileError) {
      console.error('Error ensuring profile:', profileError);
    }

    // 2. Auto-assign to the one SACCO
    const { data: defaultOrg } = await supabase
      .schema('sacco')
      .from('organizations')
      .select('id')
      .limit(1)
      .single();

    if (defaultOrg) {
      await supabase
        .schema('sacco')
        .from('members')
        .upsert({
          profile_id: data.user.id,
          organization_id: defaultOrg.id,
          membership_number: `MEM-${Math.floor(Math.random() * 10000)}`,
          status: 'active',
          joined_date: new Date(),
        }, { onConflict: 'profile_id, organization_id' });
    }

    // Email confirmation OFF — session exists, redirect immediately
    if (data.session) {
      revalidatePath('/', 'layout');
      if (role === 'sacco_admin') return redirect('/admin');
      return redirect('/onboarding');
    }
  }

  revalidatePath('/', 'layout');
  return redirect('/signup?message=Check your email to confirm your account.');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/login');
}
