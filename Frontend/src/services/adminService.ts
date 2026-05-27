import { config } from "../utils/config";

// Notice: We don't need to pass 'token' as an argument anymore!
// Because we migrated to HttpOnly cookies, fetch automatically sends the secure cookie
// as long as we set credentials: "include".

export const adminService = {
  getClientList: async () => {
    const res = await fetch(`${config.base_url}/admin/clients`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch clients");
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
  }
};
