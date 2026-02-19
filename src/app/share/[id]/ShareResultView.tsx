'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { RotateCcw } from 'lucide-react'

interface ShareResultViewProps {
  selectedCards: { id: string; image: string; name: string }[]
  aiResult: string
}

export default function ShareResultView({
  selectedCards,
  aiResult,
}: ShareResultViewProps) {
  return (
    <div className='z-10 w-full h-full min-h-screen max-w-4xl px-8 md:px-6 py-5 md:py-10 flex flex-col items-center justify-center gap-5 md:gap-10'>
      {/* 공유 결과 타이틀 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='text-amber-400/70 text-xs md:text-sm tracking-widest'>
        ✦ 고양이 점술사의 타로 결과 ✦
      </motion.p>

      {/* 선택한 3장의 카드 */}
      <div className='flex gap-4 md:gap-8 justify-center items-end'>
        {selectedCards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3 }}
            className='flex flex-col items-center gap-3'>
            <div className='relative w-[60px] h-[100px] sm:w-[100px] sm:h-[160px] md:w-[160px] md:h-[280px] overflow-hidden rounded-lg md:rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.2)] border border-amber-500/60'>
              <Image
                src={card.image}
                alt={card.name}
                fill
                sizes='(max-width: 768px) 64px, 96px'
                className='object-fit'
              />
            </div>
            <span className='text-amber-400 font-bold text-sm md:text-base'>
              {i === 0 ? '과거' : i === 1 ? '현재' : '미래'}
            </span>
          </motion.div>
        ))}
      </div>

      {/* 해석 영역 — 타이핑 효과 없이 바로 표시 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className='w-full bg-slate-900/60 backdrop-blur-md border border-amber-500/20 rounded-3xl p-4 md:p-8 shadow-2xl overflow-y-auto scrollbar-hide max-h-[300px] md:max-h-[400px]'>
        <p className='text-amber-100 text-sm md:text-base leading-relaxed whitespace-pre-wrap'>
          {aiResult}
        </p>
      </motion.div>

      {/* 나도 점 보기 버튼 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}>
        <Link
          href='/main'
          className='flex items-center justify-center gap-2 px-8 py-3 md:px-12 md:py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold shadow-lg transition-all text-sm md:text-base whitespace-nowrap'>
          <RotateCcw className='w-4 h-4 md:w-5 md:h-5' />
          나도 점 보러 가기
        </Link>
      </motion.div>
    </div>
  )
}
