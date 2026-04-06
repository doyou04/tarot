'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, User, CreditCard, LogOut, LogIn } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  const t = useTranslations('sideMenu')
  const pathname = usePathname()

  if (pathname.includes('/share')) return null

  const menuItems = [
    { href: '/main', icon: Home, label: t('home') },
    { href: '/mypage', icon: User, label: t('mypage') },
    { href: '/payment', icon: CreditCard, label: t('payment') },
  ]

  return (
    <>
      {/* 햄버거 버튼 (메뉴 닫혀있을 때만) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className='fixed top-4 left-4 md:top-6 md:left-6 z-[80] p-2 rounded-full bg-black/50 backdrop-blur-sm border border-amber-500/30 text-amber-200 hover:bg-black/70 transition-all'
          aria-label='Open menu'
        >
          <Menu className='w-5 h-5' />
        </button>
      )}

      {/* 사이드 메뉴 패널 */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] md:w-[300px] bg-[#12101a]/95 backdrop-blur-md border-r border-amber-600/20 z-[70] transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* 닫기 버튼 (패널 우측 상단) */}
        <button
          onClick={() => setIsOpen(false)}
          className='absolute top-3 right-3 p-2 rounded-full text-slate-400 hover:text-amber-200 hover:bg-amber-600/10 transition-all'
          aria-label='Close menu'
        >
          <X className='w-5 h-5' />
        </button>

        {/* 프로필 영역 */}
        <div className='px-6 pt-14 pb-6 border-b border-amber-600/15'>
          {session?.user ? (
            <div className='flex items-center gap-3'>
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt='Profile'
                  className='w-10 h-10 rounded-full border border-amber-600/40'
                />
              )}
              <div>
                <p className='text-sm font-bold text-amber-100'>{session.user.name}</p>
                <p className='text-[10px] text-slate-400 truncate max-w-[150px]'>{session.user.email}</p>
              </div>
            </div>
          ) : (
            <p className='text-sm text-slate-400'>{t('guest')}</p>
          )}
        </div>

        {/* 메뉴 항목 */}
        <nav className='px-3 py-4 space-y-1'>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => {
                setIsOpen(false)
                if (window.location.pathname.endsWith(item.href)) {
                  e.preventDefault()
                  window.location.href = item.href
                }
              }}
              className='flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-300 hover:text-amber-100 hover:bg-amber-600/10 transition-all group'
            >
              <item.icon className='w-4 h-4 text-amber-500/60 group-hover:text-amber-400 transition-colors' />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 하단 영역 */}
        <div className='absolute bottom-0 left-0 right-0 px-6 py-5 border-t border-amber-600/15 space-y-3'>
          {/* 언어 전환 */}
          <div className='flex items-center justify-between'>
            <span className='text-[10px] text-slate-500 uppercase tracking-wider'>{t('language')}</span>
            <LanguageSwitcher />
          </div>

          {/* 로그인/로그아웃 */}
          {session ? (
            <button
              onClick={() => { signOut(); setIsOpen(false) }}
              className='flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm text-rose-300 bg-rose-500/10 hover:bg-rose-500/10 transition-all'
            >
              <LogOut className='w-4 h-4' />
              {t('logout')}
            </button>
          ) : (
            <Link
              href='/login'
              onClick={() => setIsOpen(false)}
              className='flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm text-amber-200 bg-amber-500/10 hover:bg-amber-600/10 transition-all'
            >
              <LogIn className='w-4 h-4' />
              {t('login')}
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
