export interface NewsAPIArticle {
  title: string
  excerpt: string
  url: string
  source_name: string
  image_url: string | null
  published_at: string
}

export async function fetchTrendingNigeria(limit = 10): Promise<NewsAPIArticle[]> {
  const apiKey = process.env.NEWS_API_KEY
  if (!apiKey) return []

  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=ng&pageSize=${limit}&apiKey=${apiKey}`,
      { next: { revalidate: 1800 } }
    )

    if (!res.ok) return []

    const data = await res.json()

    return (data.articles ?? [])
      .filter((a: any) => a.title && a.url && a.title !== '[Removed]')
      .map((a: any) => ({
        title:        a.title,
        excerpt:      a.description ?? '',
        url:          a.url,
        source_name:  a.source?.name ?? 'Unknown',
        image_url:    a.urlToImage ?? null,
        published_at: a.publishedAt ?? new Date().toISOString(),
      }))

  } catch {
    return []
  }
}

export async function fetchNigeriaPolitics(limit = 10): Promise<NewsAPIArticle[]> {
  const apiKey = process.env.NEWS_API_KEY
  if (!apiKey) return []

  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=Nigeria+politics&language=en&sortBy=publishedAt&pageSize=${limit}&apiKey=${apiKey}`,
      { next: { revalidate: 1800 } }
    )

    if (!res.ok) return []

    const data = await res.json()

    return (data.articles ?? [])
      .filter((a: any) => a.title && a.url && a.title !== '[Removed]')
      .map((a: any) => ({
        title:        a.title,
        excerpt:      a.description ?? '',
        url:          a.url,
        source_name:  a.source?.name ?? 'Unknown',
        image_url:    a.urlToImage ?? null,
        published_at: a.publishedAt ?? new Date().toISOString(),
      }))

  } catch {
    return []
  }
}