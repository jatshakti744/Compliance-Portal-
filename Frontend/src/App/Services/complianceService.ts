import { config } from "../utils/config";

export const complianceService = {
  getLogs: async () => {
    const res = await fetch(`${config.base_url}/compliance`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch compliance logs");
    return res.json();
  },

  createLog: async (data: any) => {
    const res = await fetch(`${config.base_url}/compliance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create compliance log");
    return res.json();
  },

  getPenaltyMatrix: async () => {
    const res = await fetch(`${config.base_url}/compliance/matrix`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch penalty matrix");
    return res.json();
  }
};
