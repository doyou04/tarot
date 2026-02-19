import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), '.data', 'shares')

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true })
}

// POST: 결과 저장 → 짧은 ID 반환
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id, ids, result } = body

    if (!id || !ids || !result) {
      return NextResponse.json({ error: '필수 데이터 누락' }, { status: 400 })
    }

    await ensureDir()
    const filePath = path.join(DATA_DIR, `${id}.json`)
    await fs.writeFile(filePath, JSON.stringify({ ids, result }, null, 2), 'utf-8')

    return NextResponse.json({ success: true, id })
  } catch (error: any) {
    return NextResponse.json(
      { error: '저장 실패', message: error.message },
      { status: 500 }
    )
  }
}
