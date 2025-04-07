'use client'
import { store } from '@/redux/store'
import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import AuthProvider from '@/components/layout/AuthProvider'
import dynamic from 'next/dynamic'

// Client tarafında çalışacak bir bileşen oluşturuyoruz
// Bu bileşen sadece client tarafında çalışacak, böylece hydration sorunları önlenecek
const ClientOnlyProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // İlk render'da null döndürerek server-side ile client-side içeriği arasında
  // fark olmasını engelliyoruz
  if (!mounted) {
    // SSR sırasında hiçbir şey render etme
    return null
  }
  
  return (
    <Provider store={store}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Provider>
  )
}

// NoSSR wrapper'ı, bileşenin sadece client tarafında çalışmasını sağlar
const SafeHydrate = dynamic(() => Promise.resolve(ClientOnlyProvider), {
  ssr: false
})

export default function DependencyLayout({children} : {children: React.ReactNode}) {
  return (
    <div>
      <SafeHydrate>
        {children}
      </SafeHydrate>
    </div>
  )
}
