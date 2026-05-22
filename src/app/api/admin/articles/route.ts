import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabase'
import { makeSlug } from '@/lib/utils'

async function isAdmin() {
  const jar = await cookies();
  return jar.get('admin_token')?.value === process.env.ADMIN_SECRET
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { title, excerpt, body, authorId, categoryId, status, disclosure, isBreaking, coverImage } = await req.json()
  if (!title || !excerpt || !authorId || !categoryId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const db = supabaseAdmin()
  const readTimeMins = Math.max(1, Math.round(JSON.stringify(body).length / 1500))

  let slug = makeSlug(title)
  const { count } = await db.from('articles').select('id', { count: 'exact' }).like('slug', `${slug}%`)
  if ((count ?? 0) > 0) slug = `${slug}-${Date.now()}`

  const { data, error } = await db.from('articles').insert({
    title, slug, excerpt, body,
    author_id: authorId,
    category_id: categoryId,
    status,
    disclosure: disclosure || null,
    is_breaking: isBreaking ?? false,
    cover_image: coverImage || null,
    read_time_mins: readTimeMins,
    published_at: status === 'published' ? new Date().toISOString() : null,
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
