import { config } from '../Utils/config';

export const researchService = {
  getResearchCalls: async () => {
    const res = await fetch(`${config.base_url}/research`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch research calls");
    return res.json();
  },

  publishCall: async (researchData: any) => {
    const res = await fetch(`${config.base_url}/research`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify(researchData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to publish research call");
    }
    return res.json();
  }
};
