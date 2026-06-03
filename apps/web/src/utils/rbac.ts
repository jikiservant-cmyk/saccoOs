import { createClient } from '@/utils/supabase/server';
import { Role, ROLE_PERMISSIONS, Permission } from '@sacco/core';

export async function getUserRole(userId: string, context?: { organizationId?: string; businessId?: string }): Promise<Role | null> {
  const supabase = await createClient();

  // 1. Check for Platform Admin (Super Admin) and generic roles in Profile
  const { data: profile } = await supabase
    .schema('sacco')
    .from('profiles')
    .select('is_platform_admin, roles')
    .eq('id', userId)
    .single();

  if (profile?.is_platform_admin) {
    return 'super_admin' as Role;
  }

  // If there's a primary role in the profile roles array, return it
  if (profile?.roles && profile.roles.length > 0) {
    // If it's a sacco_admin, we still prefer the organization context if provided
    if (!context?.organizationId && !context?.businessId) {
        return profile.roles[0] as Role;
    }
  }

  // 2. Check for SACCO Organization Role (Specific to an Org)
  if (context?.organizationId) {
    const { data } = await supabase
      .schema('sacco')
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
      .schema('sacco')
      .from('business_users')
      .select('role')
      .eq('profile_id', userId)
      .eq('business_id', context.businessId)
      .single();

    if (data) return data.role as Role;
  }

  // 4. Fallback: Check if they are a Member of any SACCO
  const { data: memberRecord } = await supabase
    .schema('sacco')
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
