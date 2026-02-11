import Image from 'next/image'
import Main from './main/page'

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center  font-sans dark:bg-black'>
      <main className='flex min-h-screen w-full  flex-col items-center justify-between bg-black dark:bg-black sm:items-start'>
        <Main />
      </main>
    </div>
  )
}
