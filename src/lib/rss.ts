export interface RSSArticle {
  title: string
  excerpt: string
  url: string
  source_name: string
  source_url: string
  image_url: string | null
  category: string
  published_at: string
}

const RSS_FEEDS = [
  // Politics
  { url: 'https://www.vanguardngr.com/category/politics/feed', source: 'Vanguard',      category: 'politics' },
  { url: 'https://premiumtimesng.com/feed',                    source: 'Premium Times', category: 'politics' },
  { url: 'https://dailypost.ng/feed',                          source: 'Daily Post',    category: 'politics' },
  { url: 'https://pulse.ng/news/politics/rss',                 source: 'Pulse Nigeria', category: 'politics' },

  // Entertainment
  { url: 'https://pulse.ng/entertainment/rss',                 source: 'Pulse Nigeria', category: 'entertainment' },
  { url: 'https://www.vanguardngr.com/category/entertainment/feed', source: 'Vanguard', category: 'entertainment' },

  // Sports
  { url: 'https://pulse.ng/sports/rss',                        source: 'Pulse Nigeria', category: 'sports' },
  { url: 'https://www.vanguardngr.com/category/sports/feed',   source: 'Vanguard',      category: 'sports' },
  { url: 'https://dailypost.ng/category/sports/feed',          source: 'Daily Post',    category: 'sports' },

  // General
  { url: 'https://arise.tv/feed',                              source: 'Arise TV',      category: 'general' },
  { url: 'https://www.vanguardngr.com/feed',                   source: 'Vanguard',      category: 'general' },
]

function extractImageFromItem(item: string): string | null {
  // Try media:content
  const mediaMatch = item.match(/<media:content[^>]+url="([^"]+)"/)
  if (mediaMatch) return mediaMatch[1]

  // Try enclosure
  const enclosureMatch = item.match(/<enclosure[^>]+url="([^"]+)"/)
  if (enclosureMatch) return enclosureMatch[1]

  // Try og:image in content
  const imgMatch = item.match(/<img[^>]+src="([^"]+)"/)
  if (imgMatch) return imgMatch[1]

  return null
}

function decodeHtml(html: string): string {
  return html
    .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim()
}

async function parseFeed(feedUrl: string, sourceName: string, category: string): Promise<RSSArticle[]> {
  try {
    const res = await fetch(feedUrl, {
      headers: { 'User-Agent': 'PinnacleNewspaper/1.0' },
      next: { revalidate: 600 }, // cache 30 minutes
    })
    if (!res.ok) return []

    const xml = await res.text()
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? []

    return items.slice(0, 10).map(item => {
      const title   = decodeHtml(item.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '')
      const link    = decodeHtml(item.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? '')
      const desc    = decodeHtml(item.match(/<description>([\s\S]*?)<\/description>/)?.[1] ?? '')
      const pubDate = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? ''
      const image   = extractImageFromItem(item)

      return {
        title,
        excerpt:      desc.slice(0, 200),
        url:          link,
        source_name:  sourceName,
        source_url:   new URL(feedUrl).origin,
        image_url:    image,
        category,
        published_at: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      }
    }).filter(a => a.title && a.url)

  } catch {
    return []
  }
}

export async function fetchAllRSSFeeds(): Promise<RSSArticle[]> {
  const results = await Promise.allSettled(
    RSS_FEEDS.map(f => parseFeed(f.url, f.source, f.category))
  )

  return results
    .filter((r): r is PromiseFulfilledResult<RSSArticle[]> => r.status === 'fulfilled')
    .flatMap(r => r.value)
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
}