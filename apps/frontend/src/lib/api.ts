import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// API configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

// API utility functions
export class ApiClient {
  private static async getAuthHeaders() {
    const supabase = createClientComponentClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log("🔍 Debug - Session:", session); // Debug log
    console.log("🔍 Debug - Session token:", session?.access_token); // Debug log

    if (!session) {
      throw new Error("No authenticated session");
    }

    return {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    };
  }

  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = await this.getAuthHeaders();

    console.log("🔍 Debug - Making request to:", url); // Debug log
    console.log("🔍 Debug - Headers:", headers); // Debug log

    const config: RequestInit = {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    };

    console.log("🔍 Debug - Request config:", config); // Debug log

    const response = await fetch(url, config);

    console.log("🔍 Debug - Response status:", response.status); // Debug log
    console.log("🔍 Debug - Response ok:", response.ok); // Debug log

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Network error" }));
      console.log("🔍 Debug - Error response:", errorData); // Debug log
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("🔍 Debug - Response data:", data); // Debug log

    return data;
  }

  // Groups API
  static async createGroup(groupData: {
    name: string;
    description?: string;
    settings?: any;
  }) {
    return this.request("/groups", {
      method: "POST",
      body: JSON.stringify(groupData),
    });
  }

  static async getGroup(groupId: string) {
    return this.request(`/groups/${groupId}`);
  }

  static async joinGroup(inviteCode: string) {
    return this.request("/groups/join", {
      method: "POST",
      body: JSON.stringify({ invite_code: inviteCode }),
    });
  }

  static async getUserGroups() {
    return this.request("/users/groups");
  }

  static async getGroupTransactions(
    groupId: string,
    page: number = 1,
    limit: number = 20
  ) {
    return this.request(
      `/groups/${groupId}/transactions?page=${page}&limit=${limit}`
    );
  }

  static async getGroupBalance(groupId: string) {
    return this.request(`/groups/${groupId}/balance`);
  }

  // Contributions API
  static async createContribution(contributionData: {
    group_id: string;
    amount: number;
    stellar_transaction_id: string;
  }) {
    return this.request("/contributions", {
      method: "POST",
      body: JSON.stringify(contributionData),
    });
  }

  static async getUserContributions(groupId: string) {
    return this.request(`/contributions/group/${groupId}`);
  }
}
