"use client";
import { formatAgo } from '@/lib/utils'

interface CuratedArticle {
  id: string
  title: string
  excerpt: string | null
  url: string
  source_name: string
  image_url: string | null
  category: string
  created_at: string
}

const SOURCE_COLORS: Record<string, string> = {
  'Vanguard':      'bg-green-100 text-green-800',
  'Premium Times': 'bg-blue-100 text-blue-800',
  'Daily Post':    'bg-purple-100 text-purple-800',
  'Pulse Nigeria': 'bg-orange-100 text-orange-800',
  'Arise TV':      'bg-red-100 text-red-800',
}

export function CuratedCard({ a }: { a: CuratedArticle }) {
  return (
    <article className="flex flex-col gap-2 group">
      {a.image_url && (
        <div className="relative aspect-video w-full rounded overflow-hidden bg-gray-100">
          <img
            src={a.image_url}
            alt={a.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>
      )}
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${SOURCE_COLORS[a.source_name] ?? 'bg-gray-100 text-gray-700'}`}>
          {a.source_name}
        </span>
        <span className="text-[11px] text-ink-faint">{formatAgo(a.created_at)}</span>
      </div>
      <h3 className="font-serif font-bold text-[16px] leading-snug text-ink group-hover:text-brand transition-colors line-clamp-3">
        <a href={a.url} target="_blank" rel="noopener noreferrer">{a.title}</a>
      </h3>
      {a.excerpt && (
        <p className="text-[13px] text-ink-light line-clamp-2 leading-relaxed">{a.excerpt}</p>
      )}
      <a
        href={a.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[12px] text-brand hover:underline font-medium mt-auto"
      >
        Read full article →
      </a>
    </article>
  )
}

export function CuratedCompact({ a }: { a: CuratedArticle }) {
  return (
    <article className="py-3 border-b border-rule last:border-0">
      <div className="flex items-center gap-2 mb-1">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${SOURCE_COLORS[a.source_name] ?? 'bg-gray-100 text-gray-700'}`}>
          {a.source_name}
        </span>
        <span className="text-[11px] text-ink-faint">{formatAgo(a.created_at)}</span>
      </div>
      <h4 className="font-serif font-bold text-[14px] leading-snug text-ink hover:text-brand transition-colors line-clamp-2">
        <a href={a.url} target="_blank" rel="noopener noreferrer">{a.title}</a>
      </h4>
    </article>
  )
}