import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroCard, GridCard, CompactCard } from '@/components/article/ArticleCard'
import { getPublishedArticles, getBreakingHeadlines, getAllCategories, getCuratedArticles } from '@/lib/queries'
import { CuratedCard, CuratedCompact } from '@/components/article/CuratedCard'
import { fetchTrendingNigeria, fetchNigeriaPolitics } from '@/lib/newsapi'

export const revalidate = 600

export const metadata: Metadata = {
  description: 'Academic rigour, journalistic flair — expert analysis on African and global affairs.',
}

export default async function HomePage() {
  const [articles, breaking, categories, curatedPolitics, trending, newsPolitics] = await Promise.all([
    getPublishedArticles(20),
    getBreakingHeadlines(5),
    getAllCategories(),
    getCuratedArticles(6, 'politics'),
    fetchTrendingNigeria(6),
    fetchNigeriaPolitics(6),
  ]);

  const [hero, ...rest] = articles
  const secondary = rest.slice(0, 3)
  const sidebar   = rest.slice(3, 9)
  const more      = rest.slice(9, 15)

  return (
    <>
      <Header ticker={breaking} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        

        {/* Hero + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 mb-10">
          <div>
            {hero && (
              <div className="mb-8 pb-8 border-b border-rule">
                <HeroCard a={hero} />
              </div>
            )}
            {secondary.length > 0 && (
              <>
                <div className="section-rule"><span>Latest</span></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {secondary.map(a => <GridCard key={a.id} a={a} />)}
                </div>
              </>
            )}
          </div>

          <aside className="hidden lg:block border-l border-rule pl-8">
            <div className="section-rule"><span>Most Recent</span></div>
            {sidebar.map(a => <CompactCard key={a.id} a={a} />)}
            <div className="section-rule mt-8"><span>Topics</span></div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c: any) => (
                <Link key={c.id} href={`/category/${c.slug}`}
                  className="text-[12px] border border-rule px-3 py-1 rounded-full text-ink-light hover:border-brand hover:text-brand transition-colors">
                  {c.name}
                </Link>
              ))}
            </div>
             <div className="section-rule mt-8"><span>Politics Today</span></div>
              {curatedPolitics.slice(0, 4).map((a: any) => (
                <CuratedCompact key={a.id} a={a} />
              ))}
          </aside>
         
        </div>

        {more.length > 0 && (
          <section>
            <div className="section-rule"><span>More Analysis</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {more.map(a => <GridCard key={a.id} a={a} />)}
            </div>
          </section>
        )}

                {/* Nigeria Politics — from RSS feeds */}
        {curatedPolitics.length > 0 && (
          <section className="mt-12">
            <div className="section-rule">
              <span>Nigeria Politics</span>
            </div>
            <p className="text-[12px] text-ink-faint mb-5">
              Latest political news from across Nigerian media
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {curatedPolitics.map((a: any) => (
                <CuratedCard key={a.id} a={a} />
              ))}
            </div>
          </section>
        )}

        {/* Trending in Nigeria — from NewsAPI */}
        {trending.length > 0 && (
          <section className="mt-12">
            <div className="section-rule">
              <span>Trending in Nigeria</span>
            </div>
            <p className="text-[12px] text-ink-faint mb-5">
              What Nigeria is reading right now
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {trending.map((a, i) => (
                <CuratedCard
                  key={i}
                  a={{
                    id: String(i),
                    title: a.title,
                    excerpt: a.excerpt,
                    url: a.url,
                    source_name: a.source_name,
                    image_url: a.image_url,
                    category: 'general',
                    created_at: a.published_at,
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {newsPolitics.length > 0 && (
          <section className="mt-12">
            <div className="section-rule">
              <span>Politics — Global Coverage</span>
            </div>
            <p className="text-[12px] text-ink-faint mb-5">
              Nigerian politics covered by international media
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsPolitics.map((a, i) => (
                <CuratedCard
                  key={i}
                  a={{
                    id: String(i),
                    title: a.title,
                    excerpt: a.excerpt,
                    url: a.url,
                    source_name: a.source_name,
                    image_url: a.image_url,
                    category: 'politics',
                    created_at: a.published_at,
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {articles.length === 0 && (
          <div className="py-24 text-center text-ink-muted">
            <p className="text-lg font-serif mb-4">No articles published yet.</p>
            <Link href="/write" className="text-brand text-sm hover:underline">Publish your first article →</Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
