import { create } from 'zustand'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatStore {
  conversations: any[]
  currentConversation: any | null
  messages: Message[]
  isLoading: boolean
  addMessage: (message: Message) => void
  setCurrentConversation: (conversation: any) => void
  createConversation: (title: string) => Promise<void>
}

export const useChatStore = create<ChatStore>((set) => ({
  conversations: [],
  currentConversation: null,
  messages: [],
  isLoading: false,

  addMessage: (message: Message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setCurrentConversation: (conversation: any) =>
    set({ currentConversation: conversation, messages: [] }),

  createConversation: async (title: string) => {
    // API call to create conversation
    set({ isLoading: true })
    try {
      const response = await fetch('/api/v1/conversations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({ title }),
      })
      // Handle response
    } finally {
      set({ isLoading: false })
    }
  },
}))
