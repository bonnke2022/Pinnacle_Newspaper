import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { GridCard } from '@/components/article/ArticleCard'
import { getAuthorBySlug, getArticlesByAuthor, getBreakingHeadlines } from '@/lib/queries'
import { initials } from '@/lib/utils'

export const revalidate = 300

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const author = await getAuthorBySlug((await params).slug)
  if (!author) return { title: 'Not found' }
  return { title: author.name, description: `${author.title}, ${author.institution}` }
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const [author, breaking] = await Promise.all([getAuthorBySlug((await params).slug), getBreakingHeadlines(4)])
  if (!author) notFound()
  const articles = await getArticlesByAuthor((await params).slug)

  return (
    <>
      <Header ticker={breaking} />
      <main className="max-w-site mx-auto px-4 py-10">
        <div className="max-w-reading mx-auto mb-10 pb-10 border-b border-rule">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-ink-muted shrink-0">
              {initials(author.name)}
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold text-ink">{author.name}</h1>
              <p className="text-[15px] text-ink-muted mt-1">
                {author.title}, <span className="font-medium text-ink">{author.institution}</span>
              </p>
              {author.bio && <p className="mt-4 text-[15px] text-ink-light leading-relaxed font-serif">{author.bio}</p>}
              {author.expertise?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {author.expertise.map(e => (
                    <span key={e} className="text-[11px] px-2.5 py-1 border border-rule rounded-full text-ink-muted">{e}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="section-rule"><span>Articles by {author.name.split(' ')[0]}</span></div>
        {articles.length === 0
          ? <p className="text-ink-muted py-10 text-center font-serif">No published articles yet.</p>
          : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">{articles.map(a => <GridCard key={a.id} a={a} />)}</div>
        }
      </main>
      <Footer />
    </>
  )
}
