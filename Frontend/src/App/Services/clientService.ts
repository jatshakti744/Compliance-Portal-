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
};
