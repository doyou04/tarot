'use client'

import { useLocaleSwitch } from './ClientLocaleProvider'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const { locale, toggleLocale } = useLocaleSwitch()

  return (
    <button
      onClick={toggleLocale}
      className='flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-slate-900/60 backdrop-blur-sm border border-amber-500/30 text-amber-200 text-xs md:text-sm hover:bg-slate-800/80 transition-all'
    >
      <Globe className='w-3.5 h-3.5 md:w-4 md:h-4' />
      <span className='hidden md:inline'>{locale === 'ko' ? 'EN' : 'KO'}</span>
    </button>
  )
}
