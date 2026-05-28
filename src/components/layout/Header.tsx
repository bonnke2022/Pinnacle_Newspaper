'use client'
import { useState, useEffect, FormEvent } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { PinnacleLogo } from '@/components/ui/PinnacleLogo'
import { supabaseBrowser } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

const CATEGORIES = [
  { name: 'Home',        href: '/' },
  { name: 'Politics',    href: '/category/politics' },
  { name: 'Business',    href: '/category/business' },
  { name: 'Sports',      href: '/category/sports' },
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
  const pathname  = usePathname()
  const router    = useRouter()
  const [searchOpen,  setSearchOpen]  = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [tickIdx,     setTickIdx]     = useState(0)
  const [user,        setUser]        = useState<User | null>(null)

  // Breaking news ticker rotation
  useEffect(() => {
    if (ticker.length < 2) return
    const t = setInterval(() => setTickIdx(i => (i + 1) % ticker.length), 5000)
    return () => clearInterval(t)
  }, [ticker.length])

  // Auth state
  useEffect(() => {
    const supabase = supabaseBrowser()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleSignOut() {
    const supabase = supabaseBrowser()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setSearchOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-rule">

      {/* ── Navy identity bar ── */}
      <div className="bg-navy">
        <div className="max-w-site mx-auto px-4 flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" aria-label="Pinnacle Newspaper — Home">
            <PinnacleLogo variant="white" height={38} />
          </Link>

          {/* Breaking news ticker */}
          <div className="hidden md:flex items-center justify-center gap-3 overflow-hidden max-w-md flex-1 mx-8">
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

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Search icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className={`p-1.5 rounded transition-all duration-200 ${
                searchOpen
                  ? 'text-white bg-white/20'
                  : 'text-blue-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
              </svg>
            </button>

            <li className="shrink-0">
              <span className="w-px h-8 bg-rule block" />
            </li>
            <Link 
              href="/write-for-us" 
              className="hidden md:block text-[13px] text-blue-200 hover:text-white transition-colors whitespace-nowrap"
            >
              Write for us
            </Link>

            <li className="shrink-0">
            <span className="w-px h-8 bg-rule block" />
          </li>

            {/* Auth buttons */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    href="/account"
                    className="text-[12px] font-medium text-blue-200 hover:text-white transition-colors"
                  >
                    Hello, {user.user_metadata?.full_name?.split(' ')[0] ?? 'Account'}
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-[12px] font-semibold text-blue-200 hover:text-white border border-blue-300/30 hover:border-blue-200 px-3 py-1.5 rounded transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-[12px] font-medium text-blue-200 hover:text-white transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="text-[12px] font-semibold text-white bg-brand hover:bg-brand-dark px-3 py-1.5 rounded transition-colors"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-white hover:bg-white/10 rounded transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Search bar — always in DOM for smooth animation ── */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
          searchOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-gray-50 border-b border-rule px-4 py-4">
          <form onSubmit={handleSearch} className="max-w-site mx-auto flex items-center justify-center gap-3">
            <input
              autoFocus={searchOpen}
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles, authors, topics…"
              className="field flex-1 max-w-xl"
            />
            <button
              type="submit"
              className="bg-navy text-white px-5 py-2 rounded text-sm font-semibold hover:bg-navy/90 transition-colors shrink-0"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => { setSearchOpen(false); setSearchQuery('') }}
              className="flex items-center gap-2 text-sm font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-900 px-4 py-2 rounded transition-all duration-150 shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Cancel
            </button>
          </form>
        </div>
      </div>

      {/* ── Category navigation ── */}
      <nav className="hidden md:block bg-white border-b border-rule">
        <div className="max-w-site mx-auto px-4">
          <ul className="w-full flex items-center justify-center gap-4 py-1 overflow-x-auto scrollbar-none">
            {CATEGORIES.map(c => (
              <li key={c.href} className="shrink-0">
                <Link
                  href={c.href}
                  className={cn(
                    'nav-pill',
                    (pathname === c.href || (c.href !== '/' && pathname.startsWith(c.href))) && 'active'
                  )}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-rule">
          {CATEGORIES.map(c => (
            <Link
              key={c.href}
              href={c.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                'block px-4 py-2.5 text-sm border-b border-rule/50',
                pathname === c.href ? 'text-brand font-semibold' : 'text-ink-light hover:text-ink'
              )}
            >
              {c.name}
            </Link>
          ))}
          <div className="px-4 py-3 flex gap-3">
            {user ? (
              <>
                <Link href="/account" className="text-sm font-medium text-ink hover:text-brand transition-colors">
                  Account
                </Link>
                <button onClick={handleSignOut} className="text-sm font-medium text-ink-muted hover:text-brand transition-colors">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-ink hover:text-brand transition-colors">
                  Sign in
                </Link>
                <Link href="/signup" className="text-sm font-semibold text-white bg-brand px-3 py-1 rounded hover:bg-brand-dark transition-colors">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}

    </header>
  )
}