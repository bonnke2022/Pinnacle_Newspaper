import { NextRequest, NextResponse } from 'next/server'
import { fetchTrendingNigeria, fetchNigeriaPolitics } from '@/lib/newsapi'
import { supabaseAdmin } from '@/lib/supabase'

export const revalidate = 0

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    const [trending, politics] = await Promise.all([
      fetchTrendingNigeria(10),
      fetchNigeriaPolitics(10),
    ])

    const all = [...trending, ...politics].filter(a => a.title && a.url)

    if (all.length === 0) {
      return NextResponse.json({ message: 'No articles fetched', count: 0 })
    }

    const db = supabaseAdmin()
    const { data, error } = await db
      .from('curated_articles')
      .upsert(
        all.map(a => ({
          title:       a.title,
          excerpt:     a.excerpt,
          url:         a.url,
          source_name: a.source_name,
          source_url:  '',
          image_url:   a.image_url,
          category:    'politics',
        })),
        { onConflict: 'url', ignoreDuplicates: true }
      )
      .select('id')

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({
      message: 'NewsAPI sync complete',
      fetched: all.length,
      inserted: data?.length ?? 0,
    })

  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}