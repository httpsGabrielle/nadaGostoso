import React from 'react'
import { AuthProvider } from './src/contexts/authContext'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './src/components/Navigation'

export default function App(){
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </AuthProvider>
  )
}
