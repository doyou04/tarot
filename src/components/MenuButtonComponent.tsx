'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

type MenuType = 'love' | 'money' | 'health' | 'career'

interface MenuConfig {
  id: MenuType
  label: string
}

const MENUS: MenuConfig[] = [
  { id: 'love', label: '연애' },
  { id: 'money', label: '금전' },
  { id: 'health', label: '건강' },
  { id: 'career', label: '직업' },
]

interface MenuProps {
  onSelect: (menuId: MenuType) => void
}

export default function MenuButtonComponent({ onSelect }: MenuProps) {
  return (
    <>
      {MENUS.map((menu, index) => (
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
          className='group relative w-full py-3 md:py-4 px-4 md:px-12 bg-slate-900/80 border-2 border-amber-400/50 rounded-full flex items-center justify-center gap-2 md:gap-3 overflow-hidden shadow-lg'>
          {/* 버튼 내부 반짝임 효과 */}
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000' />
          <Sparkles className='w-4 h-4 md:w-5 md:h-5 text-amber-400 group-hover:animate-pulse flex-shrink-0' />
          <span className='text-sm md:text-xl font-medium text-amber-50 tracking-wider whitespace-nowrap'>
            {menu.label}
          </span>
          <Sparkles className='w-4 h-4 md:w-5 md:h-5 text-amber-400 group-hover:animate-pulse flex-shrink-0' />
        </motion.button>
      ))}
    </>
  )
}
