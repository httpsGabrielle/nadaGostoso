import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { AuthProvider } from './src/contexts/AuthContext'
import Navigation from './src/components/Navigation'

export default function App(){
  return (
      <SafeAreaProvider style={{ flex: 1 }}>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </SafeAreaProvider>
  )
}
