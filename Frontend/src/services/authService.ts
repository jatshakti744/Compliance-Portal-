import { config } from "../utils/config";

export const authService = {
  login: async (credentials: { email: string; password: string; rememberMe: boolean }) => {
    const response = await fetch(`${config.base_url}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to sign in");
    }
    
    return data;
  },

  logout: async () => {
    const response = await fetch(`${config.base_url}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to logout");
    }
    
    return true;
  }
};
