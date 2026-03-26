'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import CardShuffleComponent from '@/src/components/CardShuffleComponent'
import MenuButtonComponent from '@/src/components/MenuButtonComponent'
import MentComponent from '@/src/components/MentComponent'
import SelectCardComponent from '@/src/components/SelectCardComponent'
import ResultComponent from '@/src/components/ResultComponent'
import { MenuType } from '@/src/types/menu'
import { useSession, signOut } from 'next-auth/react'
import { LogIn, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from '@/src/components/LanguageSwitcher'

interface TarotReading {
  ko: string
  en: string
}

interface TarotCard {
  id: string
  image: string
  name: string
}

export default function MainClient({ allCards }: { allCards: TarotCard[] }) {
  const { data: session } = useSession()
  const router = useRouter()
  const t = useTranslations()
  const [status, setStatus] = useState<
    'intro' | 'select' | 'shuffling' | 'showCard' | 'result'
  >('intro')
  const [selectedMenu, setSelectedMenu] = useState<MenuType | null>(null)
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([])
  const [aiResult, setAiResult] = useState<TarotReading | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [userQuestion, setUserQuestion] = useState<string>('')

  // 컴포넌트가 마운트(브라우저 로드)된 후에만 true가 됨
  useEffect(() => {
    
    setMounted(true)
  }, [])

  // 마운트 전에는 빈 화면 혹은 로딩 바를 보여줌 (Hydration Error 방지)
  if (!mounted) {
    return <div className='bg-black min-h-screen' />
  }

  const handleStart = (menu: MenuType) => {
    // 오늘의 운세(daily) 외 메뉴는 로그인 필요
    if (menu !== 'daily' && !session) {
      router.push('/login')
      return
    }
    setSelectedMenu(menu)
    setStatus('select')
  }

  // 카드 3장 선택 완료 시 실행될 함수
  const handleCardsSelected = async (cards: TarotCard[]) => {
    setSelectedCards(cards)
    setStatus('result')
    setIsLoading(true)

    try {
      const response = await fetch('/api/tarot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          menu: selectedMenu,
          question: userQuestion,
          cards: cards.map((c, i) => ({
            pos: i === 0 ? t('common.past') : i === 1 ? t('common.present') : t('common.future'),
            name: c.name,
          })),
        }),
      })

      const data = await response.json()
      setAiResult(data.result)
    } catch (error) {
      const errorMsg = t('common.error')
      setAiResult({ ko: errorMsg, en: errorMsg })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className='relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        <Image
          src='/images/main/bg.jpg'
          alt='Mystic Black Cat Tarot'
          fill
          priority
          quality={95}
          sizes='100vw'
          className={`object-cover transition-opacity duration-1000 ${
            status === 'intro' ? 'opacity-70' : 'opacity-30'
          } object-center`}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70' />
      </div>

      {/* 로그인/로그아웃 + 언어 전환 버튼 */}
      <div className='absolute top-4 right-4 md:top-6 md:right-6 z-20 flex items-center gap-2'>
        <LanguageSwitcher />
        {session ? (
          <button
            onClick={() => signOut()}
            className='flex items-center gap-1.5 px-2 py-1.5 md:px-4 md:py-2 rounded-full bg-slate-900/60 backdrop-blur-sm border border-amber-500/30 text-amber-200 text-xs md:text-sm hover:bg-slate-800/80 transition-all'>
            <LogOut className='w-3.5 h-3.5 md:w-4 md:h-4' />
            <span className='hidden md:inline'>{t('common.logout')}</span>
          </button>
        ) : (
          <button
            onClick={() => router.push('/login')}
            className='flex items-center gap-1.5 px-2 py-1.5 md:px-4 md:py-2 rounded-full bg-slate-900/60 backdrop-blur-sm border border-amber-500/30 text-amber-200 text-xs md:text-sm hover:bg-slate-800/80 transition-all'>
            <LogIn className='w-3.5 h-3.5 md:w-4 md:h-4' />
            <span className='hidden md:inline'>{t('common.login')}</span>
          </button>
        )}
      </div>

      {/* intro 영역 */}
      {status === 'intro' && (
        <div className='z-10 flex flex-col items-center mt-10 md:mt-20 gap-6 md:gap-12 px-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className='text-center'>
            <h1 className='text-4xl mt-20 md:text-6xl font-serif text-amber-100 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] mb-4'>
              {t('main.title')}
            </h1>
            <p className='text-slate-300 tracking-wider text-sm md:text-base font-medium leading-relaxed text-center px-6'>
              {t('main.subtitle')}
            </p>
          </motion.div>

          {/* 메뉴 선택 버튼 */}
          <div className='grid grid-cols-2 gap-2 md:gap-4'>
            <MenuButtonComponent onSelect={handleStart} />
          </div>

          {/* 하단 장식 요소 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.5, duration: 2 }}
            className='absolute bottom-10 text-[10px] text-amber-200/40 tracking-[0.5em] uppercase'>
            {t('main.footer')}
          </motion.div>
        </div>
      )}

      {/* image select 영역 */}
      {status === 'select' && (
        <MentComponent
          onComplete={(question: string) => {
            setUserQuestion(question)
            setStatus('shuffling')
          }}
          selectedMenu={selectedMenu ?? 'career'}
        />
      )}

      {/* card shuffling 영역 */}
      {status === 'shuffling' && (
        <div className='z-10 w-full max-w-2xl px-4'>
          <CardShuffleComponent onComplete={() => setStatus('showCard')} />
        </div>
      )}

      {/* show card 영역 */}
      {status === 'showCard' && (
        <div className='z-10 w-full max-w-5xl px-4'>
          <SelectCardComponent
            allCards={allCards}
            onComplete={handleCardsSelected}
          />
          ;
        </div>
      )}

      {/* result 영역 추가 */}
      {status === 'result' && (
        <ResultComponent
          selectedCards={selectedCards}
          aiResult={aiResult}
          isLoading={isLoading}
          onRestart={() => setStatus('intro')} // 처음으로 돌아가기 기능
        />
      )}
    </main>
  )
}
