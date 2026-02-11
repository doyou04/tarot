import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import TypingText from './TypingText'

interface ResultComponentProps {
  selectedCards: any[]
  aiResult: string
  isLoading: boolean
  onRestart: () => void
}

export default function ResultComponent({
  selectedCards,
  aiResult,
  isLoading,
  onRestart,
}: ResultComponentProps) {
  return (
    <div className='z-10 w-full max-w-4xl px-8 md:px-6 py-10 flex flex-col items-center gap-5 md:gap-10'>
      {/* 1. 선택한 3장의 카드 나열 */}
      <div className='flex gap-4 md:gap-8 justify-center items-end'>
        {selectedCards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3 }}
            className='flex flex-col items-center gap-3'>
            {/* <div className='relative w-24 h-40 md:w-44 md:h-72 rounded-xl overflow-hidden border-2 border-amber-500/40 shadow-[0_0_20px_rgba(251,191,36,0.2)]'> */}
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

      {/* 2. 해석 영역 */}
      {/* <div className='w-full min-h-[300px] bg-slate-900/60 backdrop-blur-md border border-amber-500/20 rounded-3xl p-8 shadow-2xl'> */}
       <div className='w-full h-[250px] md:h-[300px] bg-slate-900/60 backdrop-blur-md border border-amber-500/20 rounded-3xl p-4 md:p-8 shadow-2xl overflow-y-auto scrollbar-hide'>
        {isLoading ? (
          <div className='flex flex-col items-center justify-center h-full gap-4 text-amber-200'>
            <div className='w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin' />
            <p className='animate-pulse text-base md:text-lg'>
              검은 고양이 점술사가 별의 지도를 읽고 있다냥...
            </p>
          </div>
        ) : (
          <TypingText text={aiResult} />
        )}
      </div>
    </div>
  )
}
