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
      // Both members and business owners go to the SME dashboard (cashbook)
      return redirect('/cashbook');
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
  const role = formData.get('role') as string;

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

    // 1. Ensure Profile exists with the chosen role
    // Using upsert since the user might already have an auth record but no profile
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
        roles: [role],
      }, { onConflict: 'id' });
    
    if (profileError) {
        console.error('Error ensuring profile:', profileError);
    } else {
        console.log('Profile ensured successfully');
        
        // 2. Ensure a default Business exists for SME owners and members
        if (role === 'business_owner' || role === 'member') {
          const { data: existingBiz } = await supabase
            .schema('sacco')
            .from('businesses')
            .select('id')
            .eq('owner_profile_id', data.user.id)
            .single();

          if (!existingBiz) {
            const { error: bizError } = await supabase
              .schema('sacco')
              .from('businesses')
              .insert({
                owner_profile_id: data.user.id,
                name: `${fullName}'s Business`,
                business_type: 'General',
                district: 'Uganda',
              });
            
            if (bizError) {
              console.error('Error creating default business:', bizError);
            } else {
              console.log('Default business created successfully');
            }
          }
        }
    }

    // If session exists (email confirmation is OFF in Supabase), go to dashboard
    if (data.session) {
      revalidatePath('/', 'layout');
      // Redirect based on role
      if (role === 'sacco_admin') return redirect('/admin');
      return redirect('/cashbook');
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
