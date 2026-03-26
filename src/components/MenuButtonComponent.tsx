'use client'

import { MessageCircleHeart, BadgeDollarSign, SquareActivity, BriefcaseBusiness,Flower} from 'lucide-react'
import { motion } from 'framer-motion'
import { MenuType } from '@/src/types/menu'
import { useTranslations } from 'next-intl'


interface MenuConfig {
  id: MenuType
  labelKey: string
}

const MENUS: MenuConfig[] = [
  { id: 'love', labelKey: 'menu.love' },
  { id: 'money', labelKey: 'menu.money' },
  { id: 'health', labelKey: 'menu.health' },
  { id: 'career', labelKey: 'menu.career' },
  { id: 'daily', labelKey: 'menu.daily' },
]

interface MenuProps {
  onSelect: (menuId: MenuType) => void
}

export default function MenuButtonComponent({ onSelect }: MenuProps) {
  const t = useTranslations()

  return (
    <>
      {MENUS.map((menu) => (
        <motion.button
          key={menu.id}
          onClick={() => onSelect(menu.id)}
          whileHover={{
            scale: 1.05,
            boxShadow: '0px 0px 20px rgba(251, 191, 36, 0.6)',
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className={`group relative w-full py-3 md:py-4 px-4 md:px-12 bg-slate-900/80 border-2 border-amber-400/50 rounded-full flex items-center justify-center gap-2 md:gap-3 shadow-lg ${menu.id === 'daily' ? 'col-span-2 justify-self-center max-w-[60%]' : ''}`}>
          {/* 버튼 내부 반짝임 효과 */}
          <div className='absolute inset-0 overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000' />
          </div>
          {menu.id ==='love' && 
            <MessageCircleHeart className='w-4 h-4 md:w-5 md:h-5 text-amber-400 group-hover:animate-pulse flex-shrink-0' />
          }
          {menu.id ==='money' && 
            <BadgeDollarSign className='w-4 h-4 md:w-5 md:h-5 text-amber-400 group-hover:animate-pulse flex-shrink-0' />
          }
          {menu.id ==='health' && 
            <SquareActivity className='w-4 h-4 md:w-5 md:h-5 text-amber-400 group-hover:animate-pulse flex-shrink-0' />
          }
          {menu.id ==='career' && 
            <BriefcaseBusiness className='w-4 h-4 md:w-5 md:h-5 text-amber-400 group-hover:animate-pulse flex-shrink-0' />
          }
          {menu.id ==='daily' && 
          <Flower className='w-4 h-4 md:w-5 md:h-5 text-amber-400 group-hover:animate-pulse flex-shrink-0' />
          }
          <span className='text-sm md:text-xl font-medium text-amber-50 tracking-wider whitespace-nowrap'>
            {t(menu.labelKey)}
          </span>

          {/* FREE 플로팅 배지 (오늘의 운세 전용) */}
          {menu.id === 'daily' && (
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className='absolute -top-2 -right-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full shadow-lg shadow-rose-500/30 pointer-events-none'
            >
              {t('menu.free')}
            </motion.span>
          )}
        </motion.button>
      ))}
    </>
  )
}
