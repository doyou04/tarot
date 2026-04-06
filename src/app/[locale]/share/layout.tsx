import { getLocale } from 'next-intl/server'
import ClientLocaleProvider from '@/src/components/ClientLocaleProvider'

import koMessages from '@/messages/ko.json'
import enMessages from '@/messages/en.json'

export default async function ShareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  return (
    <ClientLocaleProvider
      initialLocale={locale}
      koMessages={koMessages}
      enMessages={enMessages}
    >
      {children}
    </ClientLocaleProvider>
  )
}
