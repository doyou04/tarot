'use client'

import { useState, useEffect } from 'react'

interface TypingTextProps {
  text: string;
  speed?: number; // 글자당 속도 (ms)
}

export default function TypingText({ text, speed = 40 }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // 텍스트가 바뀌면 초기화 (다시 읽기 기능 대비)
    setDisplayedText('')
    setCurrentIndex(0)
  }, [text])

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout) // 클린업 함수로 메모리 누수 방지
    }
  }, [currentIndex, text, speed])

  return (
    <div className="leading-relaxed whitespace-pre-wrap font-light text-slate-200">
      {displayedText}
      {/* 타이핑 중임을 나타내는 커서 효과 (선택 사항) */}
      {currentIndex < text.length && (
        <span className="inline-block w-1 h-5 ml-1 bg-amber-400 animate-pulse align-middle" />
      )}
    </div>
  )
}