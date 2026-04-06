'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function BusinessInfoPage() {
  const t = useTranslations('businessPage')

  const rows = [
    { label: t('companyName.label'), value: t('companyName.value') },
    { label: t('ceo.label'), value: t('ceo.value') },
    { label: t('regNo.label'), value: t('regNo.value') },
    { label: t('ecommerce.label'), value: t('ecommerce.value') },
    { label: t('address.label'), value: t('address.value') },
    { label: t('email.label'), value: t('email.value') },
  ]

  return (
    <div className='min-h-screen bg-black text-white flex flex-col items-center px-4 py-10 md:py-16'>
      
      {/* 타이틀 */}
      <h1 className='text-xl md:text-2xl font-bold text-amber-100 mb-8'>
        {t('title')}
      </h1>

      {/* 테이블 */}
      <div className='w-full max-w-xl rounded-xl overflow-hidden border border-slate-700/50'>
        <table className='w-full text-sm'>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-slate-700/50 last:border-b-0 ${
                  i % 2 === 0 ? 'bg-slate-900/60' : 'bg-slate-800/40'
                }`}
              >
                <th className='text-left px-4 md:px-6 py-3 md:py-4 text-slate-400 font-medium w-[120px] md:w-[160px] align-top whitespace-nowrap'>
                  {row.label}
                </th>
                <td className='px-4 md:px-6 py-3 md:py-4 text-slate-200'>
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}