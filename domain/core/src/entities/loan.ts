export type LoanStatus = 'pending' | 'approved' | 'rejected' | 'disbursed' | 'active' | 'closed' | 'overdue';

export interface LoanProduct {
  id: string;
  organization_id: string;
  name: string;
  interest_rate: number;
  min_principal: number;
  max_principal: number;
  term_months: number;
  processing_fee: number;
  is_active: boolean;
  created_at: Date;
  deleted_at?: Date;
}

export interface LoanApplication {
  id: string;
  organization_id: string;
  member_id: string;
  loan_product_id?: string;
  requested_amount: number;
  approved_amount?: number;
  purpose?: string;
  status: 'pending' | 'approved' | 'rejected';
  risk_score?: number;
  submitted_at: Date;
  reviewed_by?: string;
  reviewed_at?: Date;
}

export interface Loan {
  id: string;
  organization_id: string;
  member_id: string;
  loan_application_id?: string;
  loan_product_id?: string;
  loan_number: string;
  principal: number;
  interest_rate: number;
  term_months: number;
  repayment_frequency: 'weekly' | 'monthly';
  status: LoanStatus;
  application_date: string;
  approval_date?: string;
  disbursement_date?: string;
  expected_end_date?: string;
  actual_end_date?: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface LoanInstallment {
  id: string;
  loan_id: string;
  due_date: string;
  principal_due: number;
  interest_due: number;
  total_due: number;
  paid_principal: number;
  paid_interest: number;
  status: 'pending' | 'paid' | 'overdue' | 'partially_paid';
  paid_at?: Date;
  created_at: Date;
}

export interface LoanRepayment {
  id: string;
  organization_id: string;
  loan_id: string;
  installment_id?: string;
  payment_request_id?: string;
  journal_entry_id?: string;
  member_id: string;
  principal_paid: number;
  interest_paid: number;
  penalty_paid: number;
  total_paid: number;
  repayment_date: string;
  created_by: string;
  created_at: Date;
}
