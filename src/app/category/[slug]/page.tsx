import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { GridCard } from '@/components/article/ArticleCard'
import { getPublishedArticles, getAllCategories, getBreakingHeadlines } from '@/lib/queries'

export const revalidate = 0

export async function generateStaticParams() {
  const cats = await getAllCategories()
  return cats.map((c: any) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cats = await getAllCategories()
  const cat = cats.find((c: any) => c.slug === slug)
  if (!cat) return { title: 'Not found' }
  return { title: (cat as any).name, description: `Analysis and expert commentary on ${(cat as any).name}` }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
const cats = await getAllCategories();
console.log('Looking for slug: ', slug);
console.log('Available slugs: ', cats.map((c:any) => c.slug))
  // const [cats, breaking] = await Promise.all([getAllCategories(), getBreakingHeadlines(4)])
  const cat = cats.find((c: any) => c.slug === slug)
  if (!cat) notFound()

  let articles: any[] = [];
  try {
      const articles = await getPublishedArticles(24, slug)
      console.log('articles result: ', articles.length);
  } catch (error) {
    console.error('getPublishedArticles error: ', error)
  }
  return (
    <>
      <Header  />
      <main className="max-w-site mx-auto px-4 py-8">
        <div className="mb-8 pb-6 border-b-2 border-ink">
          <p className="text-[11px] font-bold uppercase tracking-widest text-ink-muted mb-1">Topic</p>
          <h1 className="font-serif text-4xl font-bold text-ink">{(cat as any).name}</h1>
          <p className="text-ink-muted mt-2 text-[15px]">Analysis and expert commentary on {(cat as any).name.toLowerCase()} from leading researchers.</p>
        </div>

        {articles.length === 0 ? (
          <p className="text-ink-muted text-center py-16 font-serif text-lg">No articles in this topic yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(a => <GridCard key={a.id} a={a} />)}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}