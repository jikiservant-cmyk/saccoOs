export interface JournalEntry {
  id: string;
  organization_id: string;
  reference: string;
  description?: string;
  entry_date: string;
  source_module?: string;
  created_by: string;
  created_at: Date;
}

export type JournalLineType = 'debit' | 'credit';

export interface JournalLine {
  id: string;
  journal_entry_id: string;
  account_id: string;
  member_id?: string;
  line_type: JournalLineType;
  debit: number;
  credit: number;
  description?: string;
  created_at: Date;
}

export type PaymentStatus = 'pending' | 'success' | 'failed' | 'reversed';

export interface PaymentRequest {
  id: string;
  organization_id: string;
  member_id?: string;
  provider: string;
  idempotency_key: string;
  direction: 'inbound' | 'outbound';
  amount: number;
  fee: number;
  currency: string;
  phone_number: string;
  internal_reference?: string;
  external_reference?: string;
  status: PaymentStatus;
  journal_entry_id?: string;
  payload?: any;
  created_at: Date;
  completed_at?: Date;
}
