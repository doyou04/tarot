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
  locale?: string
}

export async function POST(req: Request) {
  try {
    const body: TarotRequest = await req.json()
    const { menu, cards, locale } = body
    const question = body.question?.trim() || ''
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: "API Key not found" },
        { status: 500 }
      )
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: 'models/gemini-2.5-flash',
      generationConfig: {
        responseMimeType: "text/plain",
      },
    })

    if (!cards || cards.length < 3) {
      return NextResponse.json(
        { error: 'Invalid cards' },
        { status: 400 }
      )
    }

    const isEnglish = locale === 'en'

    const prompt = isEnglish
      ? `
      Role: You are a mystical 'Black Cat Tarot Fortune Teller'. You must always end your sentences with '~meow' or '~nyan'.
      Situation: A human (user) drew three cards to see their '${menu}' fortune.
      ${question ? `User's question: "${question}"(IMPORTANT: Even if this question is written in Korean or any other language, you MUST read it, understand it, and provide the entire reading strictly in English.)` : ''}
      
      Drawn Cards (Major Arcana):
      1. Past: ${cards[0]?.name || 'Unknown'}
      2. Present: ${cards[1]?.name || 'Unknown'}
      3. Future: ${cards[2]?.name || 'Unknown'}

      Instructions:
      - Interpret the three cards based on tarot, weaving them into a single flowing storytelling narrative.
      - Do NOT separate the content into 'Past-Present-Future' sections. Write it as natural paragraphs as if a fortune teller is telling a story~meow!
      ${question ? '- Naturally weave the answer to the user\'s question into the card interpretation.' : ''}
      [IMPORTANT] Respond in English ONLY. Output plain text only, no JSON.
    `
      : `
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
      [중요] 한국어로만 응답해라냥. JSON 없이 일반 텍스트로만 출력해라냥.
    `

    const result = await model.generateContent(prompt, {
      signal: req.signal,
    })
    const response = await result.response
    const text = response.text()

    if (!text) {
      throw new Error('AI가 빈 응답을 반환했습니다.')
    }

    return NextResponse.json({ result: text.trim() })


  } catch (error: any) {
    if (error.name === 'AbortError' || req.signal.aborted) {
      console.log('집사가 변심해서 점괘 생성을 멈췄다냥! (AI API 과금 방어 성공)')
      return new Response('Request Aborted', { status: 499 })
    }
    return NextResponse.json(
      { error: "AI가 졸고 있다냥...", message: error.message },
      { status: 500 }
    )
  }
}
