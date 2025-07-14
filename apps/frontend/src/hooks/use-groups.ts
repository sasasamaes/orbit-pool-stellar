import { useState, useEffect, useCallback } from "react";
import { ApiClient } from "@/lib/api";

export interface Group {
  group_id: string;
  group_name: string;
  description?: string;
  member_count: number;
  total_balance: number;
  user_balance: number;
  role: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UseGroupsResult {
  groups: Group[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useGroups = (): UseGroupsResult => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await ApiClient.getUserGroups();

      setGroups(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Error fetching groups:", err);
      setError(err instanceof Error ? err.message : "Error al cargar grupos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return {
    groups,
    isLoading,
    error,
    refetch: fetchGroups,
  };
};
