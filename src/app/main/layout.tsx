import AuthProvider from '@/src/components/AuthProvider'
import ClientLocaleProvider from '@/src/components/ClientLocaleProvider'
import { getLocale } from 'next-intl/server'

import koMessages from '../../../messages/ko.json'
import enMessages from '../../../messages/en.json'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  return (
    <AuthProvider>
      <ClientLocaleProvider
        initialLocale={locale}
        koMessages={koMessages}
        enMessages={enMessages}
      >
        {children}
      </ClientLocaleProvider>
    </AuthProvider>
  )
}
