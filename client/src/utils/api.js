// production URL should match the deployed API host (remove any stale subdomain)
const defaultBaseUrl = 'https://employee-management-server.vercel.app'
const baseUrl = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
  : defaultBaseUrl

export const apiUrl = (path) => (baseUrl ? `${baseUrl}${path}` : path)
