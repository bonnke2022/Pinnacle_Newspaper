import { NextRequest, NextResponse } from 'next/server'
import { fetchAllRSSFeeds } from '@/lib/rss'
import { supabaseAdmin } from '@/lib/supabase'

export const revalidate = 0

export async function GET(req: NextRequest) {
//   Secure the endpoint — only allow internal calls or cron
 // Skip auth in development
if (process.env.NODE_ENV === 'production') {
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

  try {
    const articles = await fetchAllRSSFeeds()

    if (articles.length === 0) {
      return NextResponse.json({ message: 'No articles fetched', count: 0 })
    }

    const db = supabaseAdmin()

    // Upsert — insert new, skip duplicates based on URL
    const { data, error } = await db
      .from('curated_articles')
      .upsert(
        articles.map(a => ({
          title:       a.title,
          excerpt:     a.excerpt,
          url:         a.url,
          source_name: a.source_name,
          source_url:  a.source_url,
          image_url:   a.image_url,
          category:    a.category,
        })),
        { onConflict: 'url', ignoreDuplicates: true }
      )
      .select('id')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      message: 'RSS sync complete',
      fetched: articles.length,
      inserted: data?.length ?? 0,
    })

  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}