'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { PawPrint, Cat, ChevronDown, CreditCard, RotateCcw } from 'lucide-react'

// --- 타입 ---
interface ReadingHistoryItem {
  id: string
  date: string
  question: string
  cards: string[]
  category: string
  summary: string
}

// --- Mock 데이터 ---
const mockReadings: ReadingHistoryItem[] = [
  {
    id: '1',
    date: '2026.03.26',
    category: '직업',
    question: '이직해도 괜찮을까?',
    cards: ['/images/cards/0_the_fool.jpg', '/images/cards/1_the_magician.jpg', '/images/cards/2_the_high_priestess.jpg'],
    summary: '새로운 방향과 성공이 보입니다.새로운 방향과 성공이 보입니다.새로운 방향과 성공이 보입니다.',
  },
  {
    id: '2',
    date: '2026.03.25',
    category: '연애',
    question: '썸 타는 사람과 잘 될까?',
    cards: ['/images/cards/6_the_lovers.jpg', '/images/cards/7_the_chariot.jpg', '/images/cards/8_strength.jpg'],
    summary: '진심이 통하는 순간이 옵니다.',
  },
  {
    id: '3',
    date: '2026.03.24',
    category: '금전',
    question: '올해 재테크 운이 좋을까?',
    cards: ['/images/cards/3_the_empress.jpg', '/images/cards/4_the_emperor.jpg', '/images/cards/5_the_hierophant.jpg'],
    summary: '안정적인 수익이 기대됩니다.',
  },
  {
    id: '4',
    date: '2026.03.24',
    category: '금전',
    question: '올해 재테크 운이 좋을까?',
    cards: ['/images/cards/3_the_empress.jpg', '/images/cards/4_the_emperor.jpg', '/images/cards/5_the_hierophant.jpg'],
    summary: '안정적인 수익이 기대됩니다.',
  },
  {
    id: '5',
    date: '2026.03.24',
    category: '금전',
    question: '올해 재테크 운이 좋을까?',
    cards: ['/images/cards/3_the_empress.jpg', '/images/cards/4_the_emperor.jpg', '/images/cards/5_the_hierophant.jpg'],
    summary: '안정적인 수익이 기대됩니다.',
  },
]

export default function MyPage() {
  const { data: session, status } = useSession()
  const t = useTranslations('mypage')
  const router = useRouter()
  const points = 50
  const ITEMS_PER_PAGE = 3
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // 로딩 또는 미로그인 시 빈 화면
  if (status !== 'authenticated') {
    return <div className='min-h-screen bg-[#0a0812]' />
  }

  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-[#0a0812]'>
      {/* 배경 */}
      <div className='absolute inset-0 z-0'>
        <Image
          src='/images/main/bg.jpg'
          alt='Background'
          fill
          quality={85}
          sizes='100vw'
          className='object-cover opacity-25 object-center'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-[#0a0812]/40 via-transparent to-[#0a0812]/80' />
      </div>

      <main className='relative z-10 max-w-xl mx-auto px-4 pt-16 pb-10 space-y-6'>

        {/* ── 프로필 카드 ── */}
        <section className='bg-[#1a1528]/70 backdrop-blur-sm border border-amber-600/20 rounded-2xl p-5 shadow-xl'>
          <div className='flex items-center gap-4'>
            {/* 아바타 */}
            <div className='relative w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500/50 shadow-[0_0_15px_rgba(217,119,6,0.2)] flex-shrink-0'>
                <Image src='/images/mypage/paw_profile.png' alt='Cat' fill sizes='56px' className='object-cover' />
            </div>
            {/* 닉네임 */}
            <div className='flex-1 min-w-0'>
              <p className='text-[10px] text-amber-400/60 tracking-widest uppercase'>{t('nickname')}</p>
              <p className='text-lg font-bold text-amber-100 truncate'>
                {session?.user?.name || t('defaultName')}
              </p>
            </div>
            {/* 포인트 */}
            <div className='text-right flex-shrink-0'>
              <p className='text-[10px] text-purple-300/70 tracking-wider uppercase flex items-center justify-end gap-1 mb-1'>
                
                {t('points')}
              </p>
              <div className='inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-100 to-amber-200 rounded-lg border border-amber-600/40 shadow-md'>
                <PawPrint className='w-3.5 h-3.5 text-amber-600 fill-amber-600' />
                <span className='text-xl font-black text-amber-900'>{points}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 충전 / 환불 버튼 ── */}
        <section className='grid grid-cols-2 gap-3'>
          <Link
            href='/payment'
            className='flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm hover:from-amber-400 hover:to-orange-400 transition-all shadow-md active:scale-[0.98]'
          >
            <CreditCard className='w-4 h-4' />
            {t('charge')}
          </Link>
          <button
            className='flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-600/50 bg-[#1a1528]/60 text-slate-300 font-bold text-sm hover:border-slate-500/70 hover:text-slate-200 transition-all active:scale-[0.98]'
          >
            <RotateCcw className='w-4 h-4' />
            {t('refund')}
          </button>
        </section>

        {/* ── 타로 기록 리스트 ── */}
        <section>
          <h2 className='text-sm font-bold text-amber-200/80 tracking-widest uppercase px-1 mb-3'>
            {t('pastReadings')}
          </h2>

          {/* 스크롤 가능 영역 */}
          <div className='max-h-[400px] overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-amber-600/30 scrollbar-track-transparent'>
            {mockReadings.slice(0, visibleCount).map((reading) => (
              <div
                key={reading.id}
                className='bg-[#1a1528]/60 backdrop-blur-sm border border-amber-600/15 rounded-xl p-4 hover:border-amber-600/30 transition-all cursor-pointer group'
              >
                {/* 상단: 카테고리 + 날짜 */}
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full'>
                    {reading.category}
                  </span>
                  <span className='text-[10px] text-slate-500'>
                    {reading.date}
                  </span>
                </div>

                {/* 중간: 질문 + 카드 */}
                <div className='flex items-center gap-3'>
                  <p className='flex-1 text-sm text-slate-200 truncate'>
                    {reading.question}
                  </p>
                  <div className='flex gap-0.5 flex-shrink-0'>
                    {reading.cards.map((card, i) => (
                      <div
                        key={i}
                        className='relative w-[28px] h-[44px] rounded overflow-hidden border border-amber-800/30 shadow-sm group-hover:-translate-y-0.5 transition-transform'
                        style={{ transitionDelay: `${i * 40}ms` }}
                      >
                        <Image src={card} alt={`Card ${i + 1}`} fill sizes='28px' className='object-cover' />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 하단: 요약 */}
                <p className='text-xs text-slate-400 mt-2 truncate'>
                  {reading.summary}
                </p>
              </div>
            ))}

            {/* 더보기 버튼 */}
            {visibleCount < mockReadings.length && (
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, mockReadings.length))}
                className='w-full py-3 rounded-xl border border-amber-600/20 text-sm text-amber-300/70 hover:text-amber-200 hover:border-amber-600/40 hover:bg-amber-600/5 transition-all flex items-center justify-center gap-1'
              >
                {t('loadMore')}
                <ChevronDown className='w-4 h-4' />
              </button>
            )}
          </div>
        </section>

      </main>
    </div>
  )
}