import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: '타로 사이트',
  description: '검은고양이가 미래를 보여주는 타로 사이트',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${notoSansKR.variable} antialiased`}
        suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
