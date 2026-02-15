'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface CardShuffleProps {
  onComplete: () => void
}

export default function CardShuffleComponent({ onComplete }: CardShuffleProps) {
  // 10장의 카드를 가상으로 생성
  const [cards, setCards] = useState(Array.from({ length: 12 }, (_, i) => i))

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 3500)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className='relative w-full h-48 md:h-64 flex items-center justify-center'>
      <AnimatePresence>
        {cards.map((card, index) => (
          <motion.div
            key={card}
            initial={{ x: 0, y: 0, rotate: 0 }}
            animate={{
              // 랜덤하게 퍼졌다가 다시 모이는 애니메이션
              x: [0, (index - 5) * 20, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * -50, Math.random() * 50, 0],
              rotate: [0, index * 15, Math.random() * 360, 0],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              zIndex: cards.length - index,
            }}
            className='absolute w-20 h-32 md:w-32 md:h-48 bg-gradient-to-br from-indigo-900 to-slate-900 border-2 border-amber-500/30 rounded-lg shadow-2xl flex items-center justify-center'>
            {/* 카드 뒷면 문양 (검은 고양이 실루엣 등) */}
            <div className='relative w-full h-full overflow-hidden'>
              <Image
                src='/images/main/card_back.jpg'
                alt=''
                fill
                sizes='(max-width: 768px) 96px, 160px'
                className='rounded-lg md:rounded-xl shadow-[0_0_15px_rgba(251,191,36,0.3)] border-2 border-amber-500 object-fit'
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 셔플링 중 안내 문구 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        /* 4. 문구 위치도 카드 크기에 맞춰 살짝 조정 (-bottom-20 -> -bottom-12) */
        className='absolute -bottom-10 md:-bottom-20 text-xs md:text-xl text-amber-100 font-light tracking-widest'>
        운명의 카드를 섞는 중...
      </motion.div>
    </div>
  )
}
