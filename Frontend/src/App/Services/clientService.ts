import { config } from "../utils/config";

export const clientService = {
  getDashboardData: async () => {
    const res = await fetch(`${config.base_url}/client/dashboard`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch dashboard data");
    return res.json();
  },
  getMyProfile: async () => {
    const res = await fetch(`${config.base_url}/client/my-profile`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    return res.json();
  },
  getResearchCalls: async () => {
    const res = await fetch(`${config.base_url}/client/research-calls`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to fetch research calls");
    }
    return res.json();
  },
};
