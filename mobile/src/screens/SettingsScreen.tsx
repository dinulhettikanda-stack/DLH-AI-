import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native'
import { useAuth } from '../context/AuthContext'

interface SettingsScreenProps {
  isDarkMode: boolean
  onThemeToggle: () => void
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  isDarkMode,
  onThemeToggle,
}) => {
  const { logout, user } = useAuth()
  const [apiUrl, setApiUrl] = useState('http://localhost:8000')

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: logout,
        style: 'destructive',
      },
    ])
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>User ID</Text>
          <Text style={styles.settingValue}>{user?.id}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={onThemeToggle}
        >
          <Text style={styles.settingLabel}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>API Settings</Text>
        <TextInput
          style={styles.input}
          placeholder="API URL"
          value={apiUrl}
          onChangeText={setApiUrl}
        />
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>DLH AI v1.0.0</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  settingItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 4,
  },
  settingValue: {
    fontSize: 14,
    color: '#64748b',
  },
  settingButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 8,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  footerText: {
    color: '#64748b',
    fontSize: 14,
  },
})
