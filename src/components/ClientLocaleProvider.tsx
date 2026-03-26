'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'

interface LocaleContextType {
  locale: string
  toggleLocale: () => void
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'ko',
  toggleLocale: () => {},
})

export function useLocaleSwitch() {
  return useContext(LocaleContext)
}

interface ClientLocaleProviderProps {
  initialLocale: string
  koMessages: Record<string, any>
  enMessages: Record<string, any>
  children: ReactNode
}

export default function ClientLocaleProvider({
  initialLocale,
  koMessages,
  enMessages,
  children,
}: ClientLocaleProviderProps) {
  // 초기값은 서버와 동일하게 (hydration 일치)
  const [locale, setLocale] = useState(initialLocale)

  // 마운트 후 쿠키에서 사용자 설정을 읽어 보정
  useEffect(() => {
    const match = document.cookie.match(/NEXT_LOCALE=(ko|en)/)
    if (match && match[1] !== locale) {
      setLocale(match[1])
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleLocale = useCallback(() => {
    const nextLocale = locale === 'ko' ? 'en' : 'ko'
    setLocale(nextLocale)
    document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=31536000`
  }, [locale])

  const messages = locale === 'ko' ? koMessages : enMessages

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  )
}
