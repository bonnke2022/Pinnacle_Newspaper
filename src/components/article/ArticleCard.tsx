import Link from 'next/link'
import Image from 'next/image'
import { formatAgo, initials } from '@/lib/utils'
import type { ArticleFull } from '@/types'

export function HeroCard({ a }: { a: ArticleFull }) {
  return (
    <article>
      {a.cover_image && (
        <div className="relative aspect-[2.4/1] w-full overflow-hidden rounded mb-4 bg-gray-100">
          <Image src={a.cover_image} alt={a.title} fill priority className="object-cover" sizes="(max-width:1200px) 100vw,1200px" />
        </div>
      )}
      <Link href={`/category/${a.category.slug}`} className="card-category block mb-2">{a.category.name}</Link>
      <h1 className="font-serif font-bold text-3xl md:text-4xl text-ink leading-tight mb-3">
        <Link href={`/articles/${a.slug}`} className="hover:text-brand transition-colors">{a.title}</Link>
      </h1>
      <p className="text-ink-light text-[17px] font-serif leading-relaxed mb-4 line-clamp-3">{a.excerpt}</p>
      <AuthorLine author={a.author} date={a.published_at} readTime={a.read_time_mins} />
    </article>
  )
}

export function GridCard({ a }: { a: ArticleFull }) {
  return (
    <article className="flex flex-col gap-2">
      {a.cover_image && (
        <div className="relative aspect-video w-full rounded overflow-hidden bg-gray-100">
          <Image src={a.cover_image} alt={a.title} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 100vw,400px" />
        </div>
      )}
      <Link href={`/category/${a.category.slug}`} className="card-category">{a.category.name}</Link>
      <h3 className="card-title text-[17px] font-serif font-bold leading-snug">
        <Link href={`/articles/${a.slug}`}>{a.title}</Link>
      </h3>
      <p className="text-[13px] text-ink-light line-clamp-2 font-serif leading-relaxed">{a.excerpt}</p>
      <AuthorLine author={a.author} date={a.published_at} readTime={a.read_time_mins} small />
    </article>
  )
}

export function CompactCard({ a }: { a: ArticleFull }) {
  return (
    <article className="py-3 border-b border-rule last:border-0">
      <Link href={`/category/${a.category.slug}`} className="card-category">{a.category.name}</Link>
      <h4 className="card-title text-[14px] font-serif font-bold mt-1 line-clamp-3">
        <Link href={`/articles/${a.slug}`}>{a.title}</Link>
      </h4>
      <p className="text-[11px] text-ink-muted mt-1">{a.author?.name} · {formatAgo(a.published_at ?? a.created_at)}</p>
    </article>
  )
}

function AuthorLine({ author, date, readTime, small = false }: {
  author: ArticleFull['author']
  date: string | null
  readTime: number
  small?: boolean
}) {
  if (!author) return null
  return (
    <div className="flex items-center gap-2">
      <div className={`rounded-full bg-gray-100 flex items-center justify-center font-bold text-ink-muted shrink-0 ${small ? 'w-6 h-6 text-[10px]' : 'w-8 h-8 text-[11px]'}`}>
        {initials(author.name)}
      </div>
      <div>
        <Link href={`/authors/${author.slug}`} className={`font-semibold text-ink hover:text-brand transition-colors block leading-none ${small ? 'text-[12px]' : 'text-[13px]'}`}>
          {author.name}
        </Link>
        <p className="text-[11px] text-ink-muted leading-tight mt-0.5">
          {author.title}, {author.institution}
          {date && ` · ${formatAgo(date)}`}
          {readTime > 0 && ` · ${readTime} min read`}
        </p>
      </div>
    </div>
  )
}
