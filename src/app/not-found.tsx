import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-24 text-center">
        <p className="text-brand font-bold text-sm uppercase tracking-widest mb-4">404</p>
        <h1 className="font-serif text-4xl font-bold text-ink mb-4">Page not found</h1>
        <p className="text-ink-muted mb-8">The article or page you're looking for doesn't exist or has been moved.</p>
        <Link href="/" className="text-brand font-medium hover:underline">← Back to homepage</Link>
      </main>
      <Footer />
    </>
  )
}
