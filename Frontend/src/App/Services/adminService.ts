import { config } from "../utils/config";

// Notice: We don't need to pass 'token' as an argument anymore!
// Because we migrated to HttpOnly cookies, fetch automatically sends the secure cookie
// as long as we set credentials: "include".

export const adminService = {
  getClientList: async () => {
    const res = await fetch(`${config.base_url}/clients`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch clients");
    return res.json();
  },

  createClient: async (clientData: any) => {
    const res = await fetch(`${config.base_url}/clients`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify(clientData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to create client");
    }
    return res.json();
  },

  uploadCamsFile: async (formData: FormData) => {
    const res = await fetch(`${config.base_url}/admin/upload-cams-file`, {
      method: "POST",
      credentials: "include",
      body: formData, // fetch handles multipart/form-data boundaries automatically
    });
    if (!res.ok) throw new Error("Failed to upload CAMS file");
    return res.json();
  },

  getDashboardData: async () => {
    const res = await fetch(`${config.base_url}/admin/dashboard`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch admin dashboard data");
    return res.json();
  },

  getStaffList: async () => {
    const res = await fetch(`${config.base_url}/admin/staff`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch staff");
    return res.json();
  },

  createStaff: async (staffData: any) => {
    const res = await fetch(`${config.base_url}/admin/staff`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify(staffData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to create staff");
    }
    return res.json();
  }
};
