import { config } from "../utils/config";

export const clientService = {
  getDashboardData: async () => {
    const res = await fetch(`${config.base_url}/clients/dashboard`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch dashboard data");
    return res.json();
  },
  getMyProfile: async () => {
    const res = await fetch(`${config.base_url}/clients/my-profile`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    return res.json();
  },
  getResearchCalls: async () => {
    const res = await fetch(`${config.base_url}/clients/research-calls`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to fetch research calls");
    }
    return res.json();
  },
  completeOnboarding: async (data: any) => {
    const res = await fetch(`${config.base_url}/clients/complete-onboarding`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to complete onboarding");
    }
    return res.json();
  },
};
