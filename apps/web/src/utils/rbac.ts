import { createClient } from '@/utils/supabase/server';
import { Role, ROLE_PERMISSIONS, Permission } from '@sacco/core';

export async function getUserRole(userId: string, context?: { organizationId?: string; businessId?: string }): Promise<Role | null> {
  const supabase = await createClient();

  // 1. Check for Platform Admin (Super Admin)
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_platform_admin')
    .eq('id', userId)
    .single();

  if (profile?.is_platform_admin) {
    return 'super_admin' as Role;
  }

  // 2. Check for SACCO Organization Role
  if (context?.organizationId) {
    const { data } = await supabase
      .from('user_org_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('organization_id', context.organizationId)
      .single();

    if (data) return data.role as Role;
  }

  // 3. Check for SME Business Role
  if (context?.businessId) {
    const { data } = await supabase
      .from('business_users')
      .select('role')
      .eq('profile_id', userId)
      .eq('business_id', context.businessId)
      .single();

    if (data) return data.role as Role;
  }

  // 4. Fallback: Check if they are a Member of any SACCO
  const { data: memberRecord } = await supabase
    .from('members')
    .select('id')
    .eq('profile_id', userId)
    .limit(1)
    .single();

  if (memberRecord) return 'member' as Role;

  return null;
}

export async function hasPermission(
  userId: string, 
  permission: Permission, 
  context?: { organizationId?: string; businessId?: string }
): Promise<boolean> {
  const role = await getUserRole(userId, context);
  if (!role) return false;

  const permissions = ROLE_PERMISSIONS[role];
  return permissions.includes(permission);
}
