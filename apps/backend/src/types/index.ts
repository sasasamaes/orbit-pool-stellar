export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  stellar_public_key?: string;
  phone?: string;
  country_code?: string;
  timezone?: string;
  language?: string;
  email_verified: boolean;
  phone_verified: boolean;
  kyc_status: "pending" | "approved" | "rejected";
  notification_preferences: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  created_at: string;
  updated_at: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  creator_id: string;
  stellar_account_id?: string;
  invite_code: string;
  status: "active" | "paused" | "closed";
  settings: {
    min_contribution: number;
    max_contribution: number;
    contribution_frequency: string;
    withdrawal_requires_approval: boolean;
    max_members: number;
    auto_invest_enabled: boolean;
    yield_distribution: string;
  };
  total_balance: number;
  total_yield: number;
  member_count: number;
  created_at: string;
  updated_at: string;
}

export interface GroupMembership {
  id: string;
  group_id: string;
  user_id: string;
  role: "admin" | "member" | "pending";
  joined_at: string;
  total_contributed: number;
  total_withdrawn: number;
  current_balance: number;
  yield_earned: number;
  status: "active" | "suspended" | "left";
}

export interface Transaction {
  id: string;
  group_id: string;
  user_id: string;
  type: "contribution" | "withdrawal" | "yield_distribution" | "fee";
  amount: number;
  fee: number;
  stellar_transaction_id?: string;
  stellar_operation_id?: string;
  status: "pending" | "confirmed" | "failed" | "cancelled";
  description?: string;
  metadata: Record<string, any>;
  created_at: string;
  confirmed_at?: string;
}

export interface WithdrawalRequest {
  id: string;
  group_id: string;
  user_id: string;
  amount: number;
  reason?: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  requested_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  review_notes?: string;
  expires_at: string;
}

export interface CreateGroupRequest {
  name: string;
  description?: string;
  settings?: Partial<Group["settings"]>;
}

export interface JoinGroupRequest {
  invite_code: string;
}

export interface ContributionRequest {
  group_id: string;
  amount: number;
  stellar_transaction_id: string;
  wallet_address: string;
  asset?: string; // Default: USDC
}

export interface ContributionResponse {
  message: string;
  transaction: Transaction;
  new_balance: number;
  validation: {
    isValid: boolean;
    sourceAccount: string;
    amount: number;
    asset: string;
    timestamp: string;
  };
}
