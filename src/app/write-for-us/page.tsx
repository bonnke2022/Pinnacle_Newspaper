import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Write for Us',
  description: 'Share your expertise with our readers. Apply to become an author at Pinnacle Newspaper.',
}

export default function WriteForUsPage() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">

          {/* Hero */}
          <div className="mb-10 pb-8 border-b border-rule">
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-3">Write for us</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink leading-tight mb-4">
              Share your expertise with our readers
            </h1>
            <p className="text-ink-light text-xl font-serif leading-relaxed">
              Pinnacle Newspaper publishes analysis and commentary from academics, researchers, 
              and subject matter experts. If you have deep knowledge of a topic and a story to tell, 
              we want to hear from you.
            </p>
          </div>

          {/* What we publish */}
          <section className="mb-10">
            <h2 className="font-sans font-bold text-xl text-ink mb-4">What we publish</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Analysis', desc: 'In-depth examination of current events, policies, and trends backed by evidence and expertise.' },
                { title: 'Commentary', desc: 'Informed opinion pieces that advance the public conversation on important issues.' },
                { title: 'Explainers', desc: 'Clear, accessible explanations of complex topics for a general audience.' },
                { title: 'Research findings', desc: 'Summaries of academic research translated into accessible journalism.' },
              ].map(({ title, desc }) => (
                <div key={title} className="p-5 border border-rule rounded-lg">
                  <h3 className="font-semibold text-ink mb-1">{title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Who we're looking for */}
          <section className="mb-10">
            <h2 className="font-sans font-bold text-xl text-ink mb-4">Who we're looking for</h2>
            <ul className="space-y-3">
              {[
                'University academics and researchers',
                'Policy analysts and think tank experts',
                'Industry professionals with deep sector knowledge',
                'Practitioners with frontline experience',
                'Journalists with specialist expertise',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-ink-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Editorial standards */}
          <section className="mb-10 p-6 bg-gray-50 border border-rule rounded-lg">
            <h2 className="font-sans font-bold text-xl text-ink mb-3">Our editorial standards</h2>
            <p className="text-[15px] text-ink-light leading-relaxed mb-3">
              All articles are edited by our journalism team for clarity, accuracy, and accessibility. 
              We require full disclosure of any funding sources or conflicts of interest. 
              Articles must be original and not published elsewhere.
            </p>
            <p className="text-[15px] text-ink-light leading-relaxed">
              Published articles are available under a Creative Commons licence (CC BY-ND 4.0), 
              allowing free republication with attribution.
            </p>
          </section>

          {/* CTA */}
          <section className="text-center py-8">
            <h2 className="font-serif text-2xl font-bold text-ink mb-3">Ready to contribute?</h2>
            <p className="text-ink-muted mb-6 text-[15px]">
              Create an account and apply as an author. Our editorial team will review your 
              application and get back to you within 3 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center bg-navy text-white px-8 py-3 rounded font-semibold hover:bg-navy/90 transition-colors"
              >
                Create an account
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center border border-rule text-ink-light px-8 py-3 rounded font-semibold hover:bg-gray-50 transition-colors"
              >
                Sign in to apply
              </Link>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}