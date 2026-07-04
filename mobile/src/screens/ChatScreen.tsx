import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useChatStore } from '../hooks/useChatStore'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatScreenProps {
  messages: Message[]
  onSendMessage: (content: string) => void
  isLoading: boolean
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  messages,
  onSendMessage,
  isLoading,
}) => {
  const [input, setInput] = useState('')
  const scrollViewRef = useRef<ScrollView>(null)

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input)
      setInput('')
    }
  }

  React.useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }, [messages])

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Start a conversation</Text>
            <Text style={styles.emptySubtitle}>
              Ask anything and let DLH AI assist you
            </Text>
          </View>
        ) : (
          messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.message,
                message.role === 'user'
                  ? styles.messageUser
                  : styles.messageAssistant,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  message.role === 'user'
                    ? styles.bubbleUser
                    : styles.bubbleAssistant,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.role === 'user' && styles.messageTextUser,
                  ]}
                >
                  {message.content}
                </Text>
                <Text
                  style={[
                    styles.messageTime,
                    message.role === 'user' && styles.messageTimeUser,
                  ]}
                >
                  {new Date(message.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          ))
        )}
        {isLoading && (
          <View style={[styles.message, styles.messageAssistant]}>
            <View style={[styles.messageBubble, styles.bubbleAssistant]}>
              <ActivityIndicator color="#64748b" size="small" />
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputArea}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Message DLH AI..."
            placeholderTextColor="#94a3b8"
            value={input}
            onChangeText={setInput}
            editable={!isLoading}
            multiline
            maxLength={5000}
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={!input.trim() || isLoading}
            style={[
              styles.sendButton,
              (!input.trim() || isLoading) && styles.sendButtonDisabled,
            ]}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  message: {
    marginVertical: 4,
    flexDirection: 'row',
  },
  messageUser: {
    justifyContent: 'flex-end',
  },
  messageAssistant: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  bubbleUser: {
    backgroundColor: '#2563eb',
  },
  bubbleAssistant: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  messageText: {
    fontSize: 16,
    color: '#1e293b',
    lineHeight: 20,
  },
  messageTextUser: {
    color: '#ffffff',
  },
  messageTime: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  messageTimeUser: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  inputArea: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 16,
    color: '#1e293b',
    maxHeight: 100,
  },
  sendButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#2563eb',
    borderRadius: 20,
    marginLeft: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
})
