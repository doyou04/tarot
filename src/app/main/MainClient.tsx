'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import CardShuffleComponent from '@/src/components/CardShuffleComponent'
import MenuButtonComponent from '@/src/components/MenuButtonComponent'
import MentComponent from '@/src/components/MentComponent'
import SelectCardComponent from '@/src/components/SelectCardComponent'
import ResultComponent from '@/src/components/ResultComponent'

type MenuType = 'love' | 'health' | 'money' | 'career'

interface TarotCard {
  id: string
  image: string
  name: string
}

export default function MainClient({ allCards }: { allCards: TarotCard[] }) {
  const [status, setStatus] = useState<
    'intro' | 'select' | 'shuffling' | 'showCard' | 'result'
  >('intro')
  const [selectedMenu, setSelectedMenu] = useState<MenuType | null>(null)
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([])
  const [aiResult, setAiResult] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  // 컴포넌트가 마운트(브라우저 로드)된 후에만 true가 됨
  useEffect(() => {
    setMounted(true)
  }, [])

  // 마운트 전에는 빈 화면 혹은 로딩 바를 보여줌 (Hydration Error 방지)
  if (!mounted) {
    return <div className='bg-black min-h-screen' />
  }

  const handleStart = (menu: MenuType) => {
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
          cards: cards.map((c, i) => ({
            pos: i === 0 ? '과거' : i === 1 ? '현재' : '미래',
            name: c.name,
          })),
        }),
      })

      const data = await response.json()
      setAiResult(data.result)
    } catch (error) {
      setAiResult('운명의 실타래가 꼬였다냥... 잠시 후 다시 시도해달라냥!')
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

      {/* intro 영역 */}
      {status === 'intro' && (
        <div className='z-10 flex flex-col items-center mt-20 gap-12 px-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className='text-center'>
            <h1 className='text-4xl mt-20 md:text-6xl font-serif text-amber-100 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] mb-4'>
              고양이 점술사
            </h1>
            <p className='text-slate-300 tracking-wider text-sm md:text-base font-medium leading-relaxed text-center px-6'>
              영험한 검은 고양이가<br className='md:hidden' /> 집사님의 운명을 읽어드립니다.
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
            고양이가 세상을 구한다.
          </motion.div>
        </div>
      )}

      {/* image select 영역 */}
      {status === 'select' && (
        <MentComponent
          onComplete={() => setStatus('shuffling')}
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
