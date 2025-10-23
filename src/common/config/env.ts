// Environment variables - Jest compatible
// For Jest tests, use defaults. For browser, Vite will replace these at build time.

// Default values (used in Jest)
export const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;
export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const env = {
  bearerToken: import.meta.env.VITE_BEARER_TOKEN,
  baseUrl: import.meta.env.VITE_BASE_URL,
};
