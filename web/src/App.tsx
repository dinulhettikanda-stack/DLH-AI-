import React, { useState, useEffect } from 'react'
import { useAuth } from './context/AuthContext'
import { ChatInterface } from './components/ChatInterface'
import { Sidebar } from './components/Sidebar'
import { useNavigate } from 'react-router-dom'
import './styles/globals.css'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

function App() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Math.random().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/v1/conversations/123/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({ content, message_type: 'text' }),
      })

      if (response.ok) {
        const aiResponse: Message = {
          id: Math.random().toString(),
          role: 'assistant',
          content: 'This is a placeholder response from DLH AI.',
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiResponse])
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-container">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
      />
      <main className="main-content">
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </main>
    </div>
  )
}

export default App
