import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import TiptapImage from '@tiptap/extension-image'
import TiptapLink from '@tiptap/extension-link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CompactCard } from '@/components/article/ArticleCard'
import { ShareBar } from '@/components/ui/ShareBar'
import { getArticleBySlug, getRelatedArticles, getBreakingHeadlines, getPublishedSlugs } from '@/lib/queries'
import { formatDate, initials, SITE_URL, SITE_NAME } from '@/lib/utils'

export const revalidate = 300

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = await getArticleBySlug((await params).slug)
  if (!a) return { title: 'Not found' }
  const img = a.cover_image ?? `${SITE_URL}/api/og?title=${encodeURIComponent(a.title)}&author=${encodeURIComponent(a.author?.name ?? '')}`
  return {
    title: a.title,
    description: a.excerpt,
    authors: [{ name: a.author?.name }],
    openGraph: {
      type: 'article',
      title: a.title,
      description: a.excerpt,
      publishedTime: a.published_at ?? undefined,
      images: [{ url: img, width: 1200, height: 630 }],
    },
    alternates: { canonical: `${SITE_URL}/articles/${a.slug}` },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const [article, breaking] = await Promise.all([
    getArticleBySlug((await params).slug),
    getBreakingHeadlines(4),
  ])
  if (!article) notFound()

  const related = await getRelatedArticles(article.id, article.category_id, 4)

  let bodyHtml = ''
  try {
    bodyHtml = generateHTML(article.body as any, [StarterKit, TiptapImage, TiptapLink])
  } catch {
    bodyHtml = '<p>Content unavailable.</p>'
  }

  const articleUrl = `${SITE_URL}/articles/${article.slug}`

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: article.title, description: article.excerpt,
    image: article.cover_image, datePublished: article.published_at,
    dateModified: article.updated_at,
    author: { '@type': 'Person', name: article.author?.name, affiliation: { '@type': 'Organization', name: article.author?.institution } },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header ticker={breaking} />

      <main className="max-w-site mx-auto pl-40 pr-0 py-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">

          {/* Article */}
          <article className="max-w-reading">
            <nav className="text-[12px] text-ink-muted mb-5 flex gap-2">
              <Link href="/" className="hover:text-brand">Home</Link>
              <span>/</span>
              <Link href={`/category/${article.category?.slug}`} className="hover:text-brand">{article.category?.name}</Link>
            </nav>

            <Link href={`/category/${article.category?.slug}`} className="card-category block mb-3">
              {article.category?.name}
            </Link>

            <h1 className="font-serif text-3xl md:text-[2.4rem] font-bold text-ink leading-tight mb-5">
              {article.title}
            </h1>

            <p className="font-serif text-xl text-ink-light leading-relaxed border-l-4 border-brand pl-4 mb-6">
              {article.excerpt}
            </p>

            {/* Author row */}
            {article.author && (
              <div className="flex items-start gap-3 mb-6 pb-6 border-b border-rule">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-ink-muted shrink-0">
                  {initials(article.author.name)}
                </div>
                <div className="flex-1">
                  <Link href={`/authors/${article.author.slug}`} className="font-semibold text-ink hover:text-brand transition-colors text-[15px]">
                    {article.author.name}
                  </Link>
                  <p className="text-[13px] text-ink-muted">
                    {article.author.title}, <span className="font-medium text-ink">{article.author.institution}</span>
                  </p>
                  {article.published_at && (
                    <p className="text-[12px] text-ink-faint mt-0.5">
                      {formatDate(article.published_at)} · {article.read_time_mins} min read
                    </p>
                  )}
                </div>
                <ShareBar url={articleUrl} title={article.title} />
              </div>
            )}
            {/* Cover image */}
            {article.cover_image && (
              <div className="relative aspect-video w-full rounded overflow-hidden mb-8 bg-gray-100">
                <Image src={article.cover_image} alt={article.title} fill priority className="object-cover" sizes="(max-width:1024px) 100vw,740px" />
              </div>
            )}

            <div className="article-body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

            {/* Disclosure */}
            {article.disclosure && (
              <div className="mt-10 p-4 bg-amber-50 border border-amber-200 rounded text-[13px] text-amber-900">
                <strong className="block font-semibold mb-1">Disclosure statement</strong>
                {article.disclosure}
              </div>
            )}

            {/* Republish CTA — The Conversation's key feature */}
            <div className="mt-8 p-5 bg-gray-50 border border-rule rounded">
              <h3 className="font-semibold text-[15px] mb-1">Republish this article</h3>
              <p className="text-[13px] text-ink-muted leading-relaxed mb-3">
                Available under Creative Commons (CC BY-ND 4.0). Republish free — online or in print — with attribution and without modification.
              </p>
              <Link href="/republish" className="text-[13px] text-brand hover:underline font-medium">
                Get republishing guidelines →
              </Link>
            </div>

            {/* Author bio */}
            {article.author && (
              <div className="mt-8 pt-8 border-t border-rule">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-[15px] font-bold text-ink-muted shrink-0">
                    {initials(article.author.name)}
                  </div>
                  <div>
                    <Link href={`/authors/${article.author.slug}`} className="font-serif font-bold text-[18px] hover:text-brand transition-colors">
                      {article.author.name}
                    </Link>
                    <p className="text-[13px] text-ink-muted mt-0.5">{article.author.title}, {article.author.institution}</p>
                    <p className="text-[14px] text-ink-light mt-3 leading-relaxed font-serif">{article.author.bio}</p>
                    {article.author.expertise?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {article.author.expertise.map(e => (
                          <span key={e} className="text-[11px] px-2.5 py-1 border border-rule rounded-full text-ink-muted">{e}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            {related.length > 0 && (
              <div className="sticky top-24">
                <div className="section-rule"><span>Related</span></div>
                {related.map(r => <CompactCard key={r.id} a={r} />)}
              </div>
            )}
          </aside>
        </div>
      </main>
      <Footer />
    </>
  )
}
