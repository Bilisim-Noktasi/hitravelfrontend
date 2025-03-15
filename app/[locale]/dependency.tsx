'use client'
import { store } from '@/redux/store'
import React from 'react'
import { Provider } from 'react-redux'
import AuthProvider from '@/components/layout/AuthProvider'

export default function DependencyLayout({children} : {children: React.ReactNode}) {
  return (
    <div>
        <Provider store={store}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Provider>
    </div>
  )
}
