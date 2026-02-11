'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'

interface TarotCard {
  id: string
  image: string
  name: string
}

interface SelectCardComponentProps {
  allCards: TarotCard[]
  onComplete: (cards: TarotCard[]) => void
}

export default function SelectCardComponent({
  allCards,
  onComplete,
}: SelectCardComponentProps) {
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([])
  const [shuffledCards, setShuffledCards] = useState<TarotCard[]>([])

  useEffect(() => {
    const shuffled = [...allCards].sort(() => Math.random() - 0.5)
    setShuffledCards(shuffled)
  }, [allCards])

  const handleCardClick = (card: TarotCard) => {
    if (
      selectedCards.length < 3 &&
      !selectedCards.find(c => c.id === card.id)
    ) {
      setSelectedCards(prev => [...prev, card])

      console.log(selectedCards)
    }
  }

  const handleRemoveCard = (cardId: string) => {
    setSelectedCards(prev => prev.filter(c => c.id !== cardId))
  }

  return (
    <div className='min-h-screen h-full text-white flex flex-col items-center gap-3 md:gap-6 p-4'>
      <h2 className='text-base mt-0 md:mt-15 md:text-2xl text-amber-100 text-center px-4'>
        마음을 담아 3장의
        <br className='md:hidden' />
        카드를 골라주세요
      </h2>

      {/* 선택된 카드가 놓일 자리 (Slot) */}
      <div className='flex gap-2 md:gap-6 min-h-[130px] md:min-h-[320px] items-center justify-center border-2 border-dashed border-amber-500/20 rounded-2xl px-2 md:px-10 w-full max-w-4xl bg-slate-900/30'>
        <AnimatePresence mode='popLayout'>
          {selectedCards.map((card) => (
            <motion.div
              key={card.id}
              layoutId={`card-${card.id}`}
              className='relative cursor-pointer'
              onClick={() => handleRemoveCard(card.id)}>
              <motion.div
                initial={{ rotateY: 180 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.6 }}
                className='relative w-[60px] h-[100px] sm:w-[100px] sm:h-[160px] md:w-[160px] md:h-[280px] overflow-hidden rounded-lg md:rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.2)] border border-amber-500/60'>
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  sizes='(max-width: 768px) 64px, 96px'
                  className='object-fit'
                />
              </motion.div>
              <div className='absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] md:text-sm text-amber-200/60 whitespace-nowrap text-center'></div>
            </motion.div>
          ))}
        </AnimatePresence>

        {selectedCards.length === 0 && (
          <p className='text-slate-500 text-base md:text-lg'>카드가 여기에 나타납니다</p>
        )}
      </div>

      {/* 펼쳐진 카드 더미 */}
      <div className='relative w-full max-w-4xl py-2 group'>
        <div
          className='flex flex-nowrap items-center overflow-x-auto overflow-y-hidden pt-5 md:pt-20 pb-10 md:px-0 pl-0 pr-5 scrollbar-hide touch-pan-x'
          style={{
            WebkitOverflowScrolling: 'touch', // iOS 가속 스크롤 지원
            scrollSnapType: 'x proximity', // 스크롤 시 카드가 자석처럼 붙는 효과 (선택)
          }}>
          {shuffledCards.map(card => {
            const isSelected = selectedCards.some(c => c.id === card.id)
            return (
              <motion.div
                layoutId={`card-${card.id}`}
                style={{
                  opacity: isSelected ? 0 : 1,
                  pointerEvents: isSelected ? 'none' : 'auto',
                  scrollSnapAlign: 'center',
                }}
                whileTap={!isSelected ? { y: -20, scale: 1.1 } : {}}
                whileHover={
                  !isSelected ? { y: -50, scale: 1.1, zIndex: 100 } : {}
                }
                onClick={() => !isSelected && handleCardClick(card)}
                // className='relative w-32 h-48 md:w-32 md:h-48 cursor-pointer flex-shrink-0 -ml-20 md:-ml-23 first:ml-0 transition-opacity duration-300'>
                className='relative w-10 h-16 sm:w-20 sm:h-32 md:w-32 md:h-48 cursor-pointer flex-shrink-0 -ml-7 sm:-ml-12 md:-ml-23 first:ml-0 transition-opacity duration-300'>
                <div className='w-full h-full bg-gradient-to-br from-indigo-900 to-slate-900 border-2 border-amber-500/30 rounded-md md:rounded-lg shadow-xl md:shadow-2xl flex items-center justify-center overflow-hidden'>
                  <div className='w-[90%] h-[90%] border border-amber-500/10 rounded flex items-center justify-center '>
                    <Image
                      src='/images/main/card_back.jpg'
                      alt=''
                      fill
                      sizes='(max-width: 768px) 64px, 96px'
                      // className='rounded-lg md:rounded-xl shadow-[0_0_15px_rgba(251,191,36,0.3)] border-2 border-amber-500 object-fit'
                      className='rounded-lg md:rounded-xl border shadow-[0_0_15px_rgba(251,191,36,0.3)] border-2  border-amber-500 object-fit'
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {selectedCards.length === 3 && (
        <motion.button
          onClick={() => onComplete(selectedCards)}
          whileHover={{
            scale: 1.05,
            boxShadow: '0px 0px 20px rgba(251, 191, 36, 0.6)',
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className='group relative mx-auto px-8 py-3 md:px-12 md:py-4 bg-slate-900/80 border-2 border-amber-400/50 rounded-full flex items-center gap-2 md:gap-3 overflow-hidden'>
          {/* 버튼 내부 반짝임 효과 */}
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000' />

          <Sparkles className='w-4 h-4 md:w-5 md:h-5 text-amber-400 group-hover:animate-pulse flex-shrink-0' />
          <span className='text-base md:text-2xl font-medium text-amber-50 tracking-wider whitespace-nowrap'>
            결과 확인
          </span>
          <Sparkles className='w-4 h-4 md:w-5 md:h-5 text-amber-400 group-hover:animate-pulse flex-shrink-0' />
        </motion.button>
      )}
    </div>
  )
}
