export interface Organization {
  id: string;
  name: string;
  code: string;
  registration_number: string;
  email: string;
  phone: string;
  address: string;
  logo_url?: string;
  primary_color?: string;
  country: string;
  currency: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  is_platform_admin: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Member {
  id: string;
  organization_id: string;
  profile_id?: string;
  member_number: string;
  first_name: string;
  last_name: string;
  other_names?: string;
  date_of_birth?: string;
  gender?: string;
  phone?: string;
  email?: string;
  national_id?: string;
  address?: string;
  next_of_kin_name?: string;
  next_of_kin_phone?: string;
  photo_url?: string;
  registration_date: string;
  status: 'active' | 'suspended' | 'closed';
  business_id?: string;
  created_by?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
