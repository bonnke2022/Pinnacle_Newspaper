import Link from 'next/link'
import { PinnacleLogo } from '@/components/ui/PinnacleLogo'

export function Footer() {
  return (
    <footer className="border-t border-rule mt-16 bg-gray-50">
      <div className="max-w-site mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-block mb-4">
            <PinnacleLogo variant="default" height={40} />
          </Link>
          <p className="text-[13px] text-ink-muted leading-relaxed">
            Independent analysis written by academics and researchers, edited by journalists.
          </p>
          <p className="text-[11px] text-ink-faint mt-3">Content available under CC BY-ND 4.0</p>
        </div>

        <div>
          <p className="font-semibold text-ink text-[11px] uppercase tracking-wider mb-3">Topics</p>
          {['Politics','Business','Africa','Global','Technology','Health','Environment','Education','Opinion'].map(t => (
            <Link key={t} href={`/category/${t.toLowerCase()}`} className="block text-[13px] text-ink-muted hover:text-brand py-0.5 transition-colors">{t}</Link>
          ))}
        </div>

        <div>
          <p className="font-semibold text-ink text-[11px] uppercase tracking-wider mb-3">About</p>
          {[
            ['About us',      '/about'],
            ['Our authors',   '/authors'],
            ['Write for us',  '/write-for-us'],  // ← add this
            ['Republish',     '/republish'],
            ['Contact',       '/contact'],
          ].map(([l, h]) => (
             <Link key={h} href={h} className="block text-[13px] text-ink-muted hover:text-brand py-0.5 transition-colors">{l}</Link> 
          ))}
        </div>

        <div>
          <p className="font-semibold text-ink text-[11px] uppercase tracking-wider mb-3">Follow</p>
          {[['Twitter / X','https://twitter.com/pinnaclenewspaper'],['Facebook','https://facebook.com'],['LinkedIn','https://linkedin.com']].map(([l,h]) => (
            <a key={l} href={h} target="_blank" rel="noopener noreferrer" className="block text-[13px] text-ink-muted hover:text-brand py-0.5 transition-colors">{l}</a>
          ))}
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="max-w-site mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between gap-2 text-[12px] text-ink-faint">
          <span>© {new Date().getFullYear()} Pinnacle Newspaper. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-ink transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
