const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : ''

export const apiUrl = (path) => (baseUrl ? `${baseUrl}${path}` : path)
