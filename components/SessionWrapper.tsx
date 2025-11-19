'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

// eslint-disable-next-line react/function-component-definition
export default function SessionWrapper({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
