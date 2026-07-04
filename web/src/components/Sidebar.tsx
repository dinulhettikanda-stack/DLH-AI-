import React from 'react'
import { Menu, LogOut, Settings, Moon, Sun } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Sidebar.css'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  isDarkMode: boolean
  onThemeToggle: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  isDarkMode,
  onThemeToggle,
}) => {
  const { logout } = useAuth()

  return (
    <>
      <button className="menu-toggle" onClick={onToggle}>
        <Menu size={24} />
      </button>

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-title">DLH AI</h1>
          <button
            className="close-button"
            onClick={onToggle}
          >
            ×
          </button>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active">
            <span>+ New Chat</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button
            className="sidebar-button"
            onClick={onThemeToggle}
            title="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span>{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>
          <button className="sidebar-button" title="Settings">
            <Settings size={20} />
            <span>Settings</span>
          </button>
          <button
            className="sidebar-button logout"
            onClick={logout}
            title="Logout"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}
    </>
  )
}
