'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { PinnacleLogo } from '@/components/ui/PinnacleLogo'

const CATEGORIES = [
  { name: 'Home',        href: '/' },
  { name: 'Politics',    href: '/category/politics' },
  { name: 'Business',    href: '/category/business' },
  { name: 'Africa',      href: '/category/africa' },
  { name: 'Global',      href: '/category/global' },
  { name: 'Technology',  href: '/category/technology' },
  { name: 'Health',      href: '/category/health' },
  { name: 'Environment', href: '/category/environment' },
  { name: 'Education',   href: '/category/education' },
  { name: 'Opinion',     href: '/category/opinion' },
]

interface HeaderProps {
  ticker?: { slug: string; title: string }[]
}

export function Header({ ticker = [] }: HeaderProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [tickIdx, setTickIdx] = useState(0)

  useEffect(() => {
    if (ticker.length < 2) return
    const t = setInterval(() => setTickIdx(i => (i + 1) % ticker.length), 5000)
    return () => clearInterval(t)
  }, [ticker.length])

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-rule">
      {/* Red identity bar */}
      <div className="bg-navy">
        <div className="max-w-site mx-auto px-4 flex items-center justify-between h-14">
          <Link href="/" aria-label="Pinnacle Newspaper — Home">
            <PinnacleLogo variant="white" height={38} />
          </Link>

          <div className="hidden md:flex items-center gap-3 overflow-hidden max-w-md">
            {ticker.length > 0 && (
              <>
                <span className="bg-brand text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shrink-0 tracking-wider">
                  Breaking
                </span>
                <Link
                  href={`/articles/${ticker[tickIdx]?.slug}`}
                  className="text-[12px] text-blue-200 hover:text-white transition-colors truncate"
                >
                  {ticker[tickIdx]?.title}
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="hidden md:inline-flex text-[12px] font-semibold text-blue-200 hover:text-white border border-blue-300/30 px-3 py-1.5 rounded transition-colors"
            >
              Admin
            </Link>
            <button
              className="md:hidden p-2 text-white hover:bg-white/10 rounded transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <nav className="hidden md:block bg-white border-b border-rule">
        <div className="max-w-site mx-auto px-4">
          <ul className="flex items-center gap-0.5 py-1 overflow-x-auto">
            {CATEGORIES.map(c => (
              <li key={c.href} className="shrink-0">
                <Link
                  href={c.href}
                  className={cn('nav-pill', (pathname === c.href || (c.href !== '/' && pathname.startsWith(c.href))) && 'active')}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-rule">
          {CATEGORIES.map(c => (
            <Link
              key={c.href}
              href={c.href}
              onClick={() => setOpen(false)}
              className={cn('block px-4 py-2.5 text-sm border-b border-rule/50', pathname === c.href ? 'text-brand font-semibold' : 'text-ink-light hover:text-ink')}
            >
              {c.name}
            </Link>
          ))}
          <Link href="/admin" className="block px-4 py-3 text-sm font-semibold text-brand">
            Admin →
          </Link>
        </div>
      )}
    </header>
  )
}
