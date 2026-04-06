'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Cat, PawPrint, Check, Zap } from 'lucide-react'

interface PricePackage {
  id: string
  amount: number
  price: number
  bonus: number
  popular?: boolean
}

const packages: PricePackage[] = [
  { id: 'basic', amount: 1, price: 990, bonus: 0 },
  { id: 'standard', amount: 10, price: 10000, bonus:1 },
  { id: 'premium', amount: 30, price: 30000, bonus: 4, popular: true },
  { id: 'mega', amount: 50, price: 50000, bonus: 10 },
]

export default function PaymentPage() {
  const { data: session, status } = useSession()
  const t = useTranslations('payment')
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string>('premium')

  if (status === 'loading') {
    return <div className='min-h-screen bg-[#0a0812]' />
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return <div className='min-h-screen bg-[#0a0812]' />
  }

  const selectedPkg = packages.find((p) => p.id === selectedId)

  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-[#0a0812]'>
      {/* 배경 */}
      <div className='absolute inset-0 z-0'>
        <Image
          src='/images/main/bg.jpg'
          alt='Background'
          fill
          quality={80}
          sizes='100vw'
          className='object-cover opacity-20 object-center'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-[#0a0812]/50 via-transparent to-[#0a0812]/90' />
      </div>

      <main className='relative z-10 max-w-xl mx-auto px-4 pt-16 pb-10 space-y-6'>

        {/* ── 헤더 ── */}
        <div className='text-center space-y-2'>
          <div className='inline-flex items-center gap-2 text-amber-400'>
            <PawPrint className='w-6 h-6' />
            <h1 className='text-xl md:text-2xl font-bold text-amber-100 tracking-wide'>
              {t('title')}
            </h1>
          </div>
          <p className='text-xs text-slate-400'>
            {t('subtitle')}
          </p>
        </div>

        {/* ── 패키지 카드 ── */}
        <div className='grid grid-cols-2 gap-3'>
          {packages.map((pkg) => {
            const isSelected = selectedId === pkg.id
            return (
              <button
                key={pkg.id}
                onClick={() => setSelectedId(pkg.id)}
                className={`relative rounded-2xl p-4 text-left transition-all duration-200 border-2 ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500/10 shadow-[0_0_25px_rgba(245,158,11,0.15)]'
                    : 'border-slate-700/50 bg-[#1a1528]/60 hover:border-slate-600/70'
                }`}
              >
                {/* 인기 뱃지 */}
                {pkg.popular && (
                  <div className='absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-[9px] font-bold text-black tracking-wider uppercase flex items-center gap-1'>
                    <Zap className='w-2.5 h-2.5' />
                    {t('popular')}
                  </div>
                )}

                {/* 선택 체크 */}
                {isSelected && (
                  <div className='absolute top-2 right-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center'>
                    <Check className='w-3 h-3 text-black' />
                  </div>
                )}

                {/* 츄르 개수 */}
                <div className='flex items-baseline gap-1 mb-1 mt-1'>
                  <span className='text-2xl md:text-3xl font-black text-amber-100'>{pkg.amount}</span>
                  <span className='text-xs text-amber-400/70'>{t('unit')}</span>
                </div>

                {/* 보너스 */}
                {pkg.bonus > 0 && (
                  <p className='text-[15px] text-emerald-400 font-semibold flex items-center gap-1 mb-2'>
                    +{pkg.bonus} {t('bonus')}
                  </p>
                )}

                {/* 가격 */}
                <p className='text-sm font-bold text-slate-300'>
                  ₩{pkg.price.toLocaleString()}
                </p>

                {/* 개당 가격 */}
                <p className='text-[10px] text-slate-500 mt-0.5'>
                  {t('perUnit')} ₩{Math.round(pkg.price / (pkg.amount + pkg.bonus)).toLocaleString()}
                </p>
              </button>
            )
          })}
        </div>

        {/* ── 선택 요약 ── */}
        {selectedPkg && (
          <div className='bg-[#1a1528]/70 backdrop-blur-sm border border-amber-600/20 rounded-xl p-4 space-y-3'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-slate-400'>{t('selected')}</span>
              <span className='text-amber-100 font-bold'>
                {selectedPkg.amount}{selectedPkg.bonus > 0 ? ` + ${selectedPkg.bonus}` : ''} {t('unit')}
              </span>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-slate-400'>{t('totalPrice')}</span>
              <span className='text-xl font-black text-amber-100'>
                ₩{selectedPkg.price.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* ── 결제 버튼 ── */}
        <button className='w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-base tracking-wide hover:from-amber-400 hover:to-orange-400 transition-all shadow-[0_4px_20px_rgba(245,158,11,0.3)] active:scale-[0.98]'>
          {t('buyButton')}
        </button>

        {/* ── 안내사항 ── */}
        <div className='space-y-1.5 px-2'>
          <p className='text-[10px] text-slate-500 leading-relaxed'>• {t('notice1')}</p>
          <p className='text-[10px] text-slate-500 leading-relaxed'>• {t('notice2')} <span className='text-amber-400'>{t('notice2_1')}</span></p>
          <p className='text-[10px] text-slate-500 leading-relaxed'>• {t('notice3')}</p>
        </div>

      </main>
    </div>
  )
}
