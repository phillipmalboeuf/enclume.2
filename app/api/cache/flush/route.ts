import { redis } from '@/clients/redis'
import { NextResponse } from 'next/server'

export async function POST() {
  await redis.flushAll()
  return NextResponse.json({ ok: true })
}
