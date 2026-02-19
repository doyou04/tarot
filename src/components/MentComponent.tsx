import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

type MenuType = 'love' | 'money' | 'health' | 'career'

interface CatSelectProps {
  selectedMenu: MenuType
  onComplete: (question: string) => void
}

const MENU_NAMES: Record<MenuType, string> = {
  love: '연애',
  money: '금전',
  health: '건강',
  career: '직장',
}

const PLACEHOLDER: Record<MenuType, string> = {
  love: '예) 썸 타는 사람과 잘 될 수 있을까?',
  money: '예) 올해 재테크 운이 좋을까?',
  health: '예) 요즘 몸이 안 좋은데 괜찮아질까?',
  career: '예) 이직해도 괜찮을까?',
}

export default function MentComponent({
  selectedMenu,
  onComplete,
}: CatSelectProps) {
  const [question, setQuestion] = useState('')
  const menuName = MENU_NAMES[selectedMenu] || '직장/커리어'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className='z-10 text-white px-4 md:px-2 w-full max-w-lg flex flex-col items-center'>
      <h2 className='text-1xl md:text-2xl text-amber-100 mb-2 md:mb-3 text-center leading-relaxed tracking-tight'>
        {(selectedMenu === 'love' &&
          (<>누군가의 마음을 사냥하고 싶은<br className="md:hidden" />집사가 왔구냥?</>)) ||
          (selectedMenu === 'career' &&
            (<>거친 사냥터에서 살아남고 싶은<br className="md:hidden" />집사로구냥.</>)) ||
          (selectedMenu === 'money' &&
           (<>황금 츄르를 가득 모으고 싶은<br className="md:hidden" />집사로구냥.</>)) ||
         (<>건강이 궁금해서<br className="md:hidden" />나를 찾아왔구냥?</>)}
      </h2>
      <h2 className='text-1xl md:text-2xl text-amber-100 text-center leading-relaxed mb-6 md:mb-8'>
        {menuName}에 대한 질문을<br className="md:hidden" />적어보라냥
      </h2>

      {/* 질문 입력 영역 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className='w-full px-2'>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={PLACEHOLDER[selectedMenu]}
          maxLength={50}
          rows={3}
          className='w-full bg-slate-900/70 backdrop-blur-sm border border-amber-500/30 rounded-2xl px-4 py-3 md:px-5 md:py-4 text-amber-50 text-sm md:text-base placeholder:text-amber-200/30 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 resize-none transition-all'
        />
        <p className='text-right text-xs text-amber-200/30 mt-1 mr-1'>
          {question.length}/50
        </p>
      </motion.div>

      <motion.button
        onClick={() => onComplete(question)}
        whileHover={{
          scale: 1.05,
          boxShadow: '0px 0px 20px rgba(251, 191, 36, 0.6)',
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className='group relative mt-4 md:mt-8 mx-auto px-8 py-3 md:px-12 md:py-4 bg-slate-900/80 border-2 border-amber-400/50 rounded-full flex items-center gap-2 md:gap-3 overflow-hidden'>
        {/* 버튼 내부 반짝임 효과 */}
        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000' />

        <Sparkles className='w-4 h-4 md:w-5 md:h-5 text-amber-400 group-hover:animate-pulse flex-shrink-0' />
        <span className='text-base md:text-2xl font-medium text-amber-50 tracking-wider whitespace-nowrap'>
          입력완료
        </span>
        <Sparkles className='w-4 h-4 md:w-5 md:h-5 text-amber-400 group-hover:animate-pulse flex-shrink-0' />
      </motion.button>
    </motion.div>
  )
}
