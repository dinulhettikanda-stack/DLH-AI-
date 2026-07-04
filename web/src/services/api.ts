import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authService = {
  register: (email: string, username: string, password: string) =>
    api.post('/auth/register', { email, username, password }),
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  getCurrentUser: () => api.get('/users/me'),
  updateUser: (data: any) => api.put('/users/me', data),
}

export const conversationService = {
  createConversation: (data: any) => api.post('/conversations/', data),
  listConversations: () => api.get('/conversations/'),
  getConversation: (id: string) => api.get(`/conversations/${id}`),
  addMessage: (conversationId: string, data: any) =>
    api.post(`/conversations/${conversationId}/messages`, data),
}

export const memoryService = {
  createMemory: (data: any) => api.post('/memory/', data),
  listMemory: () => api.get('/memory/'),
  addMemoryItem: (memoryId: string, data: any) =>
    api.post(`/memory/${memoryId}/items`, data),
}

export const integrationService = {
  createIntegration: (data: any) => api.post('/integrations/', data),
  listIntegrations: () => api.get('/integrations/'),
}

export const fileService = {
  uploadFile: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  listFiles: () => api.get('/files/'),
}

export default api
