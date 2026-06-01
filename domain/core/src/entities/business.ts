export interface Business {
  id: string;
  owner_profile_id: string;
  name: string;
  registration_number?: string;
  phone?: string;
  email?: string;
  address?: string;
  district?: string;
  business_type?: string;
  subcategory?: string;
  founded_date?: string;
  estimated_monthly_revenue?: number;
  logo_url?: string;
  country: string;
  currency: string;
  status: 'active' | 'inactive' | 'suspended';
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export type BusinessRelationshipType = 'member' | 'supplier' | 'customer' | 'partner';

export interface BusinessOrganization {
  id: string;
  business_id: string;
  organization_id: string;
  relationship_type: BusinessRelationshipType;
  status: string;
  joined_at: Date;
  left_at?: Date;
  notes?: string;
}

export type BusinessTransactionType = 'income' | 'expense';

export interface BusinessTransaction {
  id: string;
  business_id: string;
  transaction_type: BusinessTransactionType;
  amount: number;
  category?: string;
  payment_method: 'cash' | 'mtn_momo' | 'airtel_money' | 'bank' | 'credit' | 'other';
  description?: string;
  reference?: string;
  receipt_url?: string;
  transaction_date: string;
  created_by: string;
  created_at: Date;
}

export interface InventoryItem {
  id: string;
  business_id: string;
  item_name: string;
  sku: string;
  unit: string;
  quantity: number;
  buying_price: number;
  selling_price: number;
  reorder_level: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface BusinessCreditProfile {
  id: string;
  business_id: string;
  score: number;
  risk_level: string;
  repayment_capacity: number;
  debt_burden_ratio: number;
  scoring_factors?: any;
  data_months: number;
  last_calculated_at: Date;
  status: string;
  created_at: Date;
  updated_at: Date;
}
