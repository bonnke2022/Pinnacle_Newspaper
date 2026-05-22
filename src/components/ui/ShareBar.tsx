'use client'
import { toast } from 'sonner'

export function ShareBar({ url, title }: { url: string; title: string }) {
  const e = encodeURIComponent
  return (
    <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
      {[
        { label: 'X',  href: `https://twitter.com/intent/tweet?url=${e(url)}&text=${e(title)}` },
        { label: 'FB', href: `https://www.facebook.com/sharer/sharer.php?u=${e(url)}` },
        { label: 'LI', href: `https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}` },
      ].map(({ label, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
          className="text-[11px] font-bold border border-rule px-2 py-1 rounded text-ink-muted hover:text-brand hover:border-brand transition-colors">
          {label}
        </a>
      ))}
      <button
        onClick={() => {
          navigator.clipboard.writeText(url)
          toast.success('Link copied!')
        }}
        className="text-[11px] font-bold border border-rule px-2 py-1 rounded text-ink-muted hover:text-brand hover:border-brand transition-colors"
      >
        Copy
      </button>
    </div>
  )
}
