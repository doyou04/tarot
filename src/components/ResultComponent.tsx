import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import TypingText from './TypingText'
import { Share2, RotateCcw } from 'lucide-react' 
import { nanoid } from "nanoid"

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
  const scrollRef = useRef<HTMLDivElement>(null)

  // 공유하기 기능 함수 (서버 저장 + 짧은 URL)
  const handleShare = async () => {
    try {
      const id = nanoid(10) // 짧은 고유 ID 생성

      // 서버에 결과 저장
      const res = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          ids: selectedCards.map(c => c.id),
          result: aiResult,
        }),
      })

      if (!res.ok) throw new Error('저장 실패')

      const shareUrl = `${window.location.origin}/share/${id}`

      if (navigator.share) {
        await navigator.share({
          title: '고양이 타로 결과',
          text: '나의 신비로운 고양이 타로 결과를 확인해봐!',
          url: shareUrl,
        })
      } else {
        await navigator.clipboard.writeText(shareUrl)
        alert('결과가 담긴 링크가 복사되었다냥! 🐾')
      }
    } catch (error) {
      console.error('공유하기 실패:', error)
    }
  }

  useEffect(() => {
    const target = scrollRef.current
    if (!target) return

    // 내부 DOM(텍스트)이 바뀔 때마다 실행될 함수
    const observer = new MutationObserver(() => {
      target.scrollTo({
        top: target.scrollHeight,
        behavior: 'smooth',
      })
    })

    // target(해석 영역 div) 내부의 자식 요소와 하위 텍스트 변화를 감시
    observer.observe(target, {
      childList: true,
      subtree: true,
      characterData: true,
    })

    return () => observer.disconnect() // 컴포넌트 언마운트 시 감시 종료
  }, [isLoading])

  return (
    <div className='z-10 w-full h-full min-h-screen max-w-4xl px-5 md:px-5 py-5 md:py-10 flex flex-col items-center justify-center gap-5 md:gap-10'>
      {/* 1. 선택한 3장의 카드 나열 */}
      <div className='flex gap-4 md:gap-8 justify-center items-end'>
        {selectedCards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3 }}
            className='flex flex-col items-center gap-3'>
            <div className='relative w-[80px] h-[130px] sm:w-[100px] sm:h-[160px] md:w-[160px] md:h-[280px] overflow-hidden rounded-lg md:rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.2)] border border-amber-500/60'>
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
      <div
        ref={scrollRef}
        className='w-full h-[180px] md:h-[300px] bg-slate-900/60 backdrop-blur-md border border-amber-500/20 rounded-3xl p-4 md:p-8 shadow-2xl overflow-y-auto scrollbar-hide'>
        {isLoading ? (
          <div className='flex flex-col items-center justify-center h-full gap-4 text-amber-200'>
            <div className='w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin' />
            <p className='animate-pulse text-sm text-center md:text-lg'>
              검은 고양이 점술사가
              <br className='md:hidden' />
              별의 지도를 읽고 있다냥...
            </p>
          </div>
        ) : (
          <div className='pb-4'>
            <TypingText text={aiResult} />
          </div>
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className='flex flex-row gap-2 md:gap-4 w-full justify-center items-center px-2'>
        {/* 다시하기 버튼 */}
        <button
          onClick={onRestart}
          className='flex-1 max-w-[160px] flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-200 border border-amber-500/30 transition-all text-xs md:text-base whitespace-nowrap'>
          <RotateCcw className='w-3.5 h-3.5 md:w-4 md:h-4' />
          다시 점치기
        </button>

        {/* 결과 공유하기 버튼 */}
        <button
          onClick={handleShare}
          className='flex-1 max-w-[200px] group relative flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold shadow-lg transition-all text-xs md:text-base whitespace-nowrap'>
          <Share2 className='w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform' />
          결과 공유하기
          {/* 반짝임 광택 효과 */}
          <div className='absolute inset-0 bg-white/20 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity' />
        </button>
      </motion.div>
    </div>
  )
}
