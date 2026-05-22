import { NextResponse } from 'next/server'
import { getPublishedSlugs } from '@/lib/queries'

export const revalidate = 3600

export async function GET() {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pinnaclenewspaper.com'
  const slugs = await getPublishedSlugs()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}</loc><priority>1.0</priority><changefreq>daily</changefreq></url>
  <url><loc>${SITE_URL}/about</loc><priority>0.6</priority></url>
  <url><loc>${SITE_URL}/republish</loc><priority>0.5</priority></url>
${slugs.map(s => `  <url><loc>${SITE_URL}/articles/${s}</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' },
  })
}
