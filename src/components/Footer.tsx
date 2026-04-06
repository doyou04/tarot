'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const t = useTranslations('footer')
  const pathname = usePathname()

  if (pathname.includes('/businessInfo')) return null

  return (
    <footer className='w-full bg-black/90 border-t border-slate-800 py-4 md:py-6 px-4'>
      <div className='max-w-4xl mx-auto flex flex-col items-center gap-2'>
        {/* 약관 링크 */}
        <nav className='flex items-center gap-4 text-xs text-slate-400'>
          <Link
            href='/terms'
            className='hover:text-amber-400 transition-colors'
          >
            {t('terms')}
          </Link>
          <span className='text-slate-600'>|</span>
          <Link
            href='/privacy'
            className='hover:text-amber-400 transition-colors font-semibold'
          >
            {t('privacy')}
          </Link>
        </nav>

        {/* 사업자 정보 */}
        <p className='text-[10px] text-slate-500 text-center leading-relaxed'>
          {t('businessInfo')}
        </p>
        <p className='text-[10px] text-slate-500 text-center leading-relaxed'>
          {t('businessInfo2')}
          <Link
            href='/businessInfo'
            target='_blank'
            className='hover:text-amber-400 transition-colors ml-2'
          >
            {t('businessInfo0')}
          </Link>
        </p>
        <p className='text-[10px] text-slate-600 text-center leading-relaxed'>
          {t('aiDisclaimer')}
          
        </p>
        <p className='text-[10px] text-slate-500'>
          © {new Date().getFullYear()} {t('copyright')}
        </p>
      </div>
    </footer>
  )
}
