import { config } from "../utils/config";

export const complianceService = {
  getLogsByCompany: async (companyId: string) => {
    const res = await fetch(`${config.base_url}/compliance/company/${companyId}`, {
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
  }
};
