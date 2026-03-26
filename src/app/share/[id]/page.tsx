import fs from 'fs'
import fsp from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'
import ShareResultView from './ShareResultView'

interface SharePageProps {
  params: Promise<{ id: string }>
}

export default async function SharePage({ params }: SharePageProps) {
  const { id } = await params

  // 1. 공유 데이터 파일 읽기 (서버에서 직접 — API 호출 없음)
  const filePath = path.join(process.cwd(), '.data', 'shares', `${id}.json`)

  let shareData: { ids: string[]; result: { ko: string; en: string } | string }
  try {
    const content = await fsp.readFile(filePath, 'utf-8')
    shareData = JSON.parse(content)
  } catch {
    notFound()
  }

  // 2. 카드 이미지 정보 매칭 (서버에서 직접 — API 호출 없음)
  const cardDir = path.join(process.cwd(), 'public/images/cards')
  const filenames = fs.readdirSync(cardDir)

  const allCards = filenames
    .filter(file => /\.(png|jpe?g|webp)$/i.test(file))
    .map(file => ({
      id: file,
      image: `/images/cards/${file}`,
      name: file.split('_').slice(1).join(' ').replace('.jpg', ''),
    }))

  // ids 순서(과거→현재→미래)를 유지하며 카드 정보 매칭
  const selectedCards = shareData.ids
    .map(id => allCards.find(c => c.id === id))
    .filter(Boolean) as { id: string; image: string; name: string }[]

  // 3. 데이터가 포함된 상태로 바로 렌더링 — 클라이언트에서 fetch 없음
  return (
    <main className='relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black'>
      <div className='absolute inset-0 z-0'>
        <img
          src='/images/main/bg.jpg'
          alt='Mystic Black Cat Tarot'
          className='w-full h-full object-cover opacity-30 object-center'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70' />
      </div>

      <ShareResultView
        selectedCards={selectedCards}
        aiResult={shareData.result}
      />
    </main>
  )
}
