import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { AuthProvider, useAuth } from './src/context/AuthContext'
import { ChatScreen } from './src/screens/ChatScreen'
import { BottomTabNavigation } from './src/navigation/BottomTabNavigation'

function AppContent() {
  const { isAuthenticated } = useAuth()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
    const userMessage = {
      id: Math.random().toString(),
      role: 'user' as const,
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Call API here
      const aiResponse = {
        id: Math.random().toString(),
        role: 'assistant' as const,
        content: 'This is a placeholder response from DLH AI.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return <ChatScreen messages={[]} onSendMessage={() => {}} isLoading={false} />
  }

  return (
    <BottomTabNavigation
      isDarkMode={isDarkMode}
      onThemeToggle={() => setIsDarkMode(!isDarkMode)}
    />
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
