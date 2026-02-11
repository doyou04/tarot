import fs from 'fs'
import path from 'path'
import MainClient from '@/src/app/main/MainClient'


export default function MainPage() {
  const cardDir = path.join(process.cwd(), 'public/images/cards')
  const filenames = fs.readdirSync(cardDir)

  const cardList = filenames
    .filter(file => /\.(png|jpe?g|webp)$/i.test(file))
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map(file => ({
      id: file, // 파일명 자체를 ID로 사용
      image: `/images/cards/${file}`,
      name: file.split('_').slice(1).join(' ').replace('.jpg', ''),
    }))


  return <MainClient allCards={cardList} />
}
