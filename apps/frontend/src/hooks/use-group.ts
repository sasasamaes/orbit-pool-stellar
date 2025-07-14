import { useState, useEffect } from "react";
import { ApiClient } from "@/lib/api";

export interface GroupMember {
  id: string;
  user_id: string;
  role: "admin" | "member";
  joined_at: string;
  current_balance: number;
  total_contributed: number;
  yield_earned: number;
  users: {
    full_name: string;
    avatar_url?: string;
  };
}

export interface GroupDetails {
  id: string;
  name: string;
  description?: string;
  creator_id: string;
  invite_code: string;
  status: "active" | "paused" | "closed";
  settings: {
    min_contribution?: number;
    max_contribution?: number;
    contribution_frequency?: string;
    withdrawal_requires_approval?: boolean;
    max_members?: number;
    auto_invest_enabled?: boolean;
    yield_distribution?: string;
  };
  total_balance: number;
  total_yield: number;
  member_count: number;
  created_at: string;
  updated_at: string;
  group_memberships: GroupMember[];
}

export interface GroupTransaction {
  id: string;
  type: "contribution" | "withdrawal" | "yield_distribution" | "fee";
  amount: number;
  fee: number;
  stellar_transaction_id?: string;
  stellar_operation_id?: string;
  status: "pending" | "confirmed" | "failed" | "cancelled";
  description?: string;
  created_at: string;
  confirmed_at?: string;
  users: {
    full_name: string;
    avatar_url?: string;
  };
}

export interface GroupBalance {
  group_total: number;
  user_balance: number;
}

export interface UseGroupResult {
  group: GroupDetails | null;
  transactions: GroupTransaction[];
  balance: GroupBalance | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  refetchTransactions: () => Promise<void>;
  refetchBalance: () => Promise<void>;
}

export const useGroup = (groupId: string): UseGroupResult => {
  const [group, setGroup] = useState<GroupDetails | null>(null);
  const [transactions, setTransactions] = useState<GroupTransaction[]>([]);
  const [balance, setBalance] = useState<GroupBalance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGroup = async () => {
    try {
      const response = await ApiClient.getGroup(groupId);
      if (response && typeof response === "object") {
        setGroup(response as GroupDetails);
      }
    } catch (err) {
      console.error("Error fetching group:", err);
      throw err;
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await ApiClient.getGroupTransactions(groupId, 1, 20);
      setTransactions(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      // Don't throw here, just log the error
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await ApiClient.getGroupBalance(groupId);
      if (response && typeof response === "object") {
        setBalance(response as GroupBalance);
      }
    } catch (err) {
      console.error("Error fetching balance:", err);
      // Don't throw here, just log the error
    }
  };

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await fetchGroup();
      await Promise.all([fetchTransactions(), fetchBalance()]);
    } catch (err) {
      console.error("Error fetching group data:", err);
      setError(err instanceof Error ? err.message : "Error al cargar grupo");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (groupId) {
      fetchAllData();
    }
  }, [groupId]);

  return {
    group,
    transactions,
    balance,
    isLoading,
    error,
    refetch: fetchAllData,
    refetchTransactions: fetchTransactions,
    refetchBalance: fetchBalance,
  };
};
