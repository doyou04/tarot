import {getRequestConfig} from 'next-intl/server'
import {cookies} from 'next/headers'
import {routing} from './routing'

export default getRequestConfig(async () => {
  // 쿠키에서 사용자가 선택한 locale 읽기
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value

  let locale = cookieLocale
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: 'Asia/Seoul',
  }
})
