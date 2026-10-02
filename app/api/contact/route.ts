import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { message: 'Contact endpoint migrated to direct mailto client transmission.' },
    { status: 200 },
  )
}
