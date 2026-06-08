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

    // Check roles for redirection
    const roles = profile?.roles || [];
    if (roles.includes('sacco_admin')) {
      return redirect('/admin');
    } else if (roles.includes('member') || roles.includes('business_owner')) {
      // Both members and business owners go to the member wallet
      return redirect('/my-wallet');
    }
  }

  revalidatePath('/', 'layout');
  return redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;
  const phone = formData.get('phone') as string;
  const requestedRole = formData.get('role') as string;
  const role = requestedRole === 'sacco_admin' ? 'sacco_admin' : 'member';

  console.log('Attempting signup for:', email);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone,
        role: role,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  });

  if (error) {
    console.error('Supabase Auth Signup Error:', error);
    return redirect('/signup?error=' + encodeURIComponent(error.message));
  }

  if (data.user) {
    console.log('Auth user created successfully:', data.user.id);

    // 1. Ensure Profile exists in sacco.profiles
    const { error: profileError } = await supabase
      .schema('sacco')
      .from('profiles')
      .upsert({
        id: data.user.id,
        full_name: fullName,
        email: email,
        phone: phone,
        is_platform_admin: false,
        is_active: true,
        roles: ['member'], // Force member role for simplified flow
      }, { onConflict: 'id' });
    
    if (profileError) {
        console.error('Error ensuring profile:', profileError);
    } else {
        console.log('Profile ensured successfully');
        
        // 2. Link user as a member of the default organization
        const { data: defaultOrg } = await supabase
          .schema('sacco')
          .from('organizations')
          .select('id')
          .limit(1)
          .single();

        if (defaultOrg) {
          // Strictly follow: auth.users → sacco.profiles → sacco.members
          await supabase
            .schema('sacco')
            .from('members')
            .upsert({
              profile_id: data.user.id,
              organization_id: defaultOrg.id,
              membership_number: `MEM-${Math.floor(Math.random() * 10000)}`,
              status: 'active', // Set to active immediately for simplified flow
              joined_date: new Date(),
            }, { onConflict: 'profile_id, organization_id' });
          
          console.log('Member record created for organization:', defaultOrg.id);
        }
    }

    // If session exists (email confirmation is OFF in Supabase), go to dashboard
    if (data.session) {
      revalidatePath('/', 'layout');
      // Redirect based on role
      if (role === 'sacco_admin') return redirect('/admin');
      return redirect('/my-wallet');
    }
  }

  revalidatePath('/', 'layout');
  // If no session, it means email confirmation is still ON in Supabase
  return redirect('/signup?message=Signup successful! Please disable "Confirm email" in Supabase Auth settings to skip this step next time.');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/login');
}
