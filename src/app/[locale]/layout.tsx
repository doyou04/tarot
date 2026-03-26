import {setRequestLocale} from 'next-intl/server'
import {notFound} from 'next/navigation'
import {routing} from '@/src/i18n/routing'
import AuthProvider from '@/src/components/AuthProvider'
import ClientLocaleProvider from '@/src/components/ClientLocaleProvider'

// 메시지 파일 직접 import
import koMessages from '../../../messages/ko.json'
import enMessages from '../../../messages/en.json'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  if (!routing.locales.includes(locale as any)) notFound()

  setRequestLocale(locale)

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
