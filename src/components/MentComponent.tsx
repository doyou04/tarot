import { useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

type MenuType = 'love' | 'money' | 'health' | 'career'

interface CatSelectProps {
  selectedMenu: MenuType
  onComplete: () => void
}

const MENU_NAMES: Record<MenuType, string> = {
  love: '연애',
  money: '금전',
  health: '건강',
  career: '직장',
}

export default function MentComponent({
  selectedMenu,
  onComplete,
}: CatSelectProps) {
  let menuName = MENU_NAMES[selectedMenu] || '직장/커리어'

  return (
    <motion.div
      // 초기 상태: 투명하고 살짝 아래에 위치
      initial={{ opacity: 0, y: 10 }}
      // 애니메이션 후: 불투명해지고 제자리로 이동
      animate={{ opacity: 1, y: 0 }}
      // 1초 동안 부드럽게 진행
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className='z-10 text-white px-4 md:px-2'>
      <h2 className='text-1xl md:text-2xl text-amber-100 mb-2 md:mb-3 text-center leading-relaxed tracking-tight'>
        {(selectedMenu === 'love' &&
          (<>누군가의 마음을 사냥하고 싶은<br className="md:hidden" />집사가 왔구냥?</>)) ||
          (selectedMenu === 'career' &&
            (<>거친 사냥터에서 살아남고 싶은<br className="md:hidden" />집사로구냥.</>)) ||
          (selectedMenu === 'money' &&
           (<>황금 츄르를 가득 모으고 싶은<br className="md:hidden" />집사로구냥.</>)) ||
         (<>건강이 궁금해서<br className="md:hidden" />나를 찾아왔구냥?</>)}
      </h2>
      <h2 className='ttext-1xl md:text-2xl text-amber-100 text-center leading-relaxed'>
        마음속으로 {menuName}에 대한<br className="md:hidden" />질문을 떠올려라냥
      </h2>

      <motion.button
        onClick={() => onComplete()}
        whileHover={{
          scale: 1.05,
          boxShadow: '0px 0px 20px rgba(251, 191, 36, 0.6)',
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className='group relative mt-12 md:mt-20 mx-auto px-8 py-3 md:px-12 md:py-4 bg-slate-900/80 border-2 border-amber-400/50 rounded-full flex items-center gap-2 md:gap-3 overflow-hidden'>
        {/* 버튼 내부 반짝임 효과 */}
        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000' />

        <Sparkles className='w-4 h-4 md:w-5 md:h-5 text-amber-400 group-hover:animate-pulse flex-shrink-0' />
        <span className='text-base md:text-2xl font-medium text-amber-50 tracking-wider whitespace-nowrap'>
          마음의 준비 완료
        </span>
        <Sparkles className='w-4 h-4 md:w-5 md:h-5 text-amber-400 group-hover:animate-pulse flex-shrink-0' />
      </motion.button>
    </motion.div>
  )
}
