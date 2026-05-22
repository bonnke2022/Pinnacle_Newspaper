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

  const { name, title, institution, bio, expertise } = await req.json()
  if (!name || !title || !institution) {
    return NextResponse.json({ error: 'Name, title, and institution required' }, { status: 400 })
  }

  const db = supabaseAdmin()
  let slug = makeSlug(name)
  const { count } = await db.from('authors').select('id', { count: 'exact' }).like('slug', `${slug}%`)
  if ((count ?? 0) > 0) slug = `${slug}-${Date.now()}`

  const { data, error } = await db.from('authors').insert({
    name, slug, title, institution,
    bio: bio || null,
    expertise: expertise ?? [],
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
