// production URL should match the deployed API host.  Set VITE_API_URL in your env
// or update this default when you deploy to a new Vercel subdomain.
const defaultBaseUrl =
  import.meta.env.VITE_API_URL ||
  'https://employee-management-server-d9294smx3-gitanshgilhotras-projects.vercel.app'
const baseUrl = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
  : defaultBaseUrl

export const apiUrl = (path) => (baseUrl ? `${baseUrl}${path}` : path)
