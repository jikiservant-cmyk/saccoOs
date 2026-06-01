export type AccountCategory = 'asset' | 'liability' | 'equity' | 'income' | 'expense';

export interface Account {
  id: string;
  organization_id: string;
  parent_id?: string;
  account_category: AccountCategory;
  code: string;
  name: string;
  member_id?: string;
  currency: string;
  cached_balance: number;
  is_system: boolean;
  is_active: boolean;
  description?: string;
  created_at: Date;
  deleted_at?: Date;
}

export interface SavingsProduct {
  id: string;
  organization_id: string;
  name: string;
  interest_rate: number;
  min_balance: number;
  allows_withdrawals: boolean;
  is_active: boolean;
  created_at: Date;
  deleted_at?: Date;
}

export interface MemberSavings {
  id: string;
  organization_id: string;
  member_id: string;
  savings_product_id: string;
  account_id: string;
  status: 'active' | 'closed' | 'frozen';
  opened_date: string;
  closed_date?: string;
  created_at: Date;
  deleted_at?: Date;
}
