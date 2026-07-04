import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ChatScreen } from '../screens/ChatScreen'
import { SettingsScreen } from '../screens/SettingsScreen'

const Tab = createBottomTabNavigator()

interface NavigationProps {
  isDarkMode: boolean
  onThemeToggle: () => void
}

export const BottomTabNavigation: React.FC<NavigationProps> = ({
  isDarkMode,
  onThemeToggle,
}) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#2563eb',
          tabBarInactiveTintColor: '#94a3b8',
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarLabel: 'Chat',
          }}
        />
        <Tab.Screen
          name="Settings"
          options={{
            tabBarLabel: 'Settings',
          }}
        >
          {() => (
            <SettingsScreen
              isDarkMode={isDarkMode}
              onThemeToggle={onThemeToggle}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  )
}
