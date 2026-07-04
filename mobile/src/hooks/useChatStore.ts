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
    set({ isLoading: true })
    try {
      // API call implementation
    } finally {
      set({ isLoading: false })
    }
  },
}))
