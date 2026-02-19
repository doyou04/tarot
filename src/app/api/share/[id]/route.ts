import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), '.data', 'shares')

// GET: ID로 공유 결과 조회
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const filePath = path.join(DATA_DIR, `${id}.json`)

    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)

    return NextResponse.json(data)
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return NextResponse.json(
        { error: '공유 데이터를 찾을 수 없다냥' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: '조회 실패', message: error.message },
      { status: 500 }
    )
  }
}
