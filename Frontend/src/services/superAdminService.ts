import { config } from "../utils/config";

export const superAdminService = {
  getCompanies: async () => {
    const res = await fetch(`${config.base_url}/companies`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch companies");
    return res.json();
  },
  
  createCompany: async (data: any) => {
    const res = await fetch(`${config.base_url}/companies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create company");
    return res.json();
  },

  deleteCompany: async (id: string) => {
    const res = await fetch(`${config.base_url}/companies/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to delete company");
    return res.json();
  }
};
