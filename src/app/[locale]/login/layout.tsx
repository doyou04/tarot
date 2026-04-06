import { getLocale } from 'next-intl/server'
import AuthProvider from '@/src/components/AuthProvider'
import ClientLocaleProvider from '@/src/components/ClientLocaleProvider'

import koMessages from '@/messages/ko.json'
import enMessages from '@/messages/en.json'

export default async function LoginLayout({
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
