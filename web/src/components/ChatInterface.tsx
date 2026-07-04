import React from 'react'
import { MessageCircle, Send, Paperclip, Mic } from 'lucide-react'
import './ChatInterface.css'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  messages: Message[]
  onSendMessage: (content: string) => void
  isLoading?: boolean
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading = false,
}) => {
  const [input, setInput] = React.useState('')
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input)
      setInput('')
    }
  }

  return (
    <div className="chat-interface">
      {/* Messages Container */}
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <MessageCircle size={48} />
            <h2>Start a conversation</h2>
            <p>Ask anything and let DLH AI assist you</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`message message-${message.role}`}>
              <div className="message-content">
                <div className="message-text">{message.content}</div>
                <span className="message-time">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message message-assistant">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="input-area">
        <div className="input-wrapper">
          <button className="input-button" title="Attach file">
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            placeholder="Message DLH AI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
            className="message-input"
          />
          <button className="input-button" title="Record voice">
            <Mic size={20} />
          </button>
          <button
            className="send-button"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
