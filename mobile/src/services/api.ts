import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

const API_URL = 'http://localhost:8000'

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (error) {
    console.error('Error getting auth token:', error)
  }
  return config
})

export const authService = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (email: string, username: string, password: string) =>
    api.post('/auth/register', { email, username, password }),
  getCurrentUser: () => api.get('/users/me'),
}

export const conversationService = {
  createConversation: (data: any) => api.post('/conversations/', data),
  listConversations: () => api.get('/conversations/'),
  getConversation: (id: string) => api.get(`/conversations/${id}`),
  addMessage: (conversationId: string, data: any) =>
    api.post(`/conversations/${conversationId}/messages`, data),
}

export default api
