import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

// 요청 바디의 인터페이스 정의
interface TarotCard {
  pos: string
  name: string
}

interface TarotRequest {
  menu: string
  cards: TarotCard[]
  question?: string
}

export async function POST(req: Request) {
  try {
    const body: TarotRequest = await req.json()
    const { menu, cards, question } = body
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API_KEY가 설정되지 않았습니다.' },
        { status: 500 }
      )
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: 'models/gemini-2.5-flash',
    })

    if (!cards || cards.length < 3) {
      return NextResponse.json(
        { error: '카드가 3장이 아닙니다.' },
        { status: 400 }
      )
    }

    const prompt = `
      역할: 너는 신비로운 '검은 고양이 타로 점술사'야 말투는 항상 '~냥'으로 끝나야 해.
      상황: 집사(유저)가 '${menu}' 운세를 보기 위해 세 장의 카드를 뽑았어.
      ${question ? `집사의 질문: "${question}"` : ''}
      
      뽑힌 카드: 메이저 아르카나
      1. 과거: ${cards[0]?.name || '알 수 없음'}
      2. 현재: ${cards[1]?.name || '알 수 없음'}
      3. 미래: ${cards[2]?.name || '알 수 없음'}

      지시사항:
      - 세 카드를 타로에 기반하여 흐름을 하나로 이어서 스토리텔링 형식으로 해석해줘.
      - 전체 내용을 '과거-현재-미래' 섹션으로 나누지 말고, 술사가 이야기해 주듯 자연스러운 문단으로 작성해라냥!
      ${question ? '- 집사의 질문에 대한 답변을 카드 해석에 자연스럽게 녹여서 이야기해줘.' : ''}
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    if (!text) {
      throw new Error('AI가 빈 응답을 반환했습니다.')
    }

    return NextResponse.json({ result: text })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'AI가 졸고 있다냥..', message: error.message },
      { status: 500 }
    )
  }
}
