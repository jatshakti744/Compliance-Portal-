import { config } from "../utils/config";

export const superAdminService = {
  getCompanies: async (params?: { page?: number; limit?: number; search?: string }) => {
    let url = `${config.base_url}/companies`;
    if (params) {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.search) queryParams.append('search', params.search);
      if (queryParams.toString()) url += `?${queryParams.toString()}`;
    }
    const res = await fetch(url, {
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

  updateCompany: async (id: string, data: any) => {
    const res = await fetch(`${config.base_url}/companies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update company");
    return res.json();
  },

  toggleCompanyStatus: async (id: string) => {
    const res = await fetch(`${config.base_url}/companies/${id}/status`, {
      method: "PUT",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to toggle company status");
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
