const isLocalhost = window.location.hostname === "localhost";

export const config = {
  // Use localhost during development, otherwise use the origin for production
  base_url: isLocalhost
    ? "http://localhost:5000/api"
    : `${window.location.origin}/api`,
    
  // You can add more global configurations here later
  // e.g., date formats, pagination limits, socket URLs
  dateFormat: "DD-MM-YYYY",
};
