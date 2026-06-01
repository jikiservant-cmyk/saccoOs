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

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return redirect('/login?error=' + encodeURIComponent(error.message));
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

  console.log('Attempting signup for:', email);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone,
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

    // 1. Ensure Profile exists
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert([
        {
          id: data.user.id,
          full_name: fullName,
          email: email,
          phone: phone,
          is_platform_admin: false,
          is_active: true,
        },
      ]);
    
    if (profileError) {
        console.error('Error creating/updating profile:', profileError);
        // We continue even if profile fails, as the user is already created in Auth
    } else {
        console.log('Profile ensured successfully');
    }

    // 2. Every person who signs up must be an SME
    const { error: businessError } = await supabase
      .from('businesses')
      .upsert([
        {
          owner_profile_id: data.user.id,
          name: `${fullName}'s Business`,
          status: 'active',
          country: 'Uganda',
          currency: 'UGX',
        },
      ], { onConflict: 'owner_profile_id' });

    if (businessError) {
      console.error('Error creating initial business:', businessError);
    } else {
      console.log('Initial business created successfully');
    }

    // If session exists (email confirmation is OFF in Supabase), go to dashboard
    if (data.session) {
      revalidatePath('/', 'layout');
      return redirect('/');
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
