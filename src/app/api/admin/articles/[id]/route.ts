import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabase'

async function isAdmin() {
  const jar = await cookies();
  return jar.get('admin_token')?.value === process.env.ADMIN_SECRET
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { title, excerpt, body, authorId, categoryId, status, disclosure, isBreaking, coverImage } = await req.json()
  const db = supabaseAdmin()
  const readTimeMins = Math.max(1, Math.round(JSON.stringify(body).length / 1500))

  const { data: existing } = await db.from('articles').select('status, published_at').eq('id', params.id).single()
  const publishedAt = status === 'published' && existing?.status !== 'published'
    ? new Date().toISOString()
    : existing?.published_at ?? null

  const { data, error } = await db.from('articles').update({
    title, excerpt, body,
    author_id: authorId,
    category_id: categoryId,
    status,
    disclosure: disclosure || null,
    is_breaking: isBreaking ?? false,
    cover_image: coverImage || null,
    read_time_mins: readTimeMins,
    published_at: publishedAt,
  }).eq('id', params.id).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { error } = await supabaseAdmin().from('articles').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
