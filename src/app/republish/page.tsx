import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Republishing Guidelines',
  description: 'Guidelines for republishing content from The Pinnacle Newspaper.',
}

const RULES = [
  {
    title: 'Proper Attribution',
    desc: 'All republished articles must clearly credit The Pinnacle Newspaper and the original author, with a direct link to the original article where applicable.',
  },
  {
    title: 'No Unauthorized Editing',
    desc: 'Articles may not be materially altered, rewritten, or edited in ways that distort the original meaning or context.',
  },
  {
    title: 'Headline Integrity',
    desc: 'Headlines may be adjusted slightly for formatting purposes, but they must remain accurate and not mislead readers.',
  },
  {
    title: 'Media Usage',
    desc: 'Not all images, graphics, or videos are licensed for republication. Ensure proper rights and credits before reuse.',
  },
  {
    title: 'No Misrepresentation',
    desc: 'Republished content must not appear in misleading, defamatory, or harmful contexts that compromise editorial integrity.',
  },
  {
    title: 'Commercial Restrictions',
    desc: 'Our content may not be resold, syndicated commercially, or placed behind strict paywalls without written permission.',
  },
]

const ALLOWED = [
  'Republish full articles with proper credit',
  'Quote short excerpts with attribution',
  'Share links to original stories',
  'Use article introductions with “Read More” links',
  'Correct grammar or formatting for house style',
]

const NOT_ALLOWED = [
  'Publishing misleading or altered versions',
  'Removing author or publication credits',
  'Using clickbait headlines',
  'Republishing copyrighted images without permission',
  'Selling or redistributing articles commercially without approval',
]

export default function RepublishingGuidelinesPage() {
  return (
    <>
      <Header />

      <main>

        {/* ── Hero ── */}
        <div className="bg-navy text-white py-16 px-4">
          <div className="max-w-reading mx-auto text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-blue-300 mb-3">
              Editorial Policy
            </p>

            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Republishing Guidelines
            </h1>

            <p className="text-blue-200 text-lg leading-relaxed max-w-2xl mx-auto">
              We encourage the responsible sharing of credible journalism while
              protecting the integrity, accuracy, and independence of our reporting.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">

          {/* ── Introduction ── */}
          <section className="max-w-reading mx-auto mb-16">
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-3">
              Introduction
            </p>

            <h2 className="font-serif text-3xl font-bold text-ink mb-6">
              Sharing Journalism Responsibly
            </h2>

            <div className="space-y-4 text-[16px] text-ink-light font-serif leading-relaxed">
              <p>
                At The Pinnacle Newspaper, we believe responsible journalism should
                be accessible, impactful, and beneficial to society.
              </p>

              <p>
                Selected content published by The Pinnacle Newspaper may be
                republished online, in print, or across digital platforms provided
                that all republication guidelines are followed carefully.
              </p>

              <p>
                These guidelines exist to protect editorial integrity, ensure proper
                attribution, and maintain the accuracy and credibility of our reporting.
              </p>
            </div>
          </section>

          {/* ── Rules ── */}
          <section className="mb-16">
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-3">
              Republishing Rules
            </p>

            <h2 className="font-serif text-3xl font-bold text-ink mb-8">
              What You Must Follow
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {RULES.map(rule => (
                <div
                  key={rule.title}
                  className="p-6 border border-rule rounded-lg hover:border-navy transition-colors"
                >
                  <div className="w-8 h-8 bg-navy/10 rounded-full flex items-center justify-center mb-3">
                    <div className="w-2 h-2 rounded-full bg-navy" />
                  </div>

                  <h4 className="font-semibold text-ink mb-2">
                    {rule.title}
                  </h4>

                  <p className="text-[13px] text-ink-muted leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Attribution Example ── */}
          <section className="mb-16 bg-gray-50 rounded-xl p-8 md:p-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-3">
              Attribution Example
            </p>

            <h2 className="font-serif text-3xl font-bold text-ink mb-6">
              How To Credit Our Work
            </h2>

            <div className="bg-white border border-rule rounded-lg p-6">
              <p className="text-[15px] text-ink-light leading-relaxed mb-4">
                When republishing our content, please include a visible credit line similar to:
              </p>

              <blockquote className="border-l-4 border-brand pl-4 italic text-ink font-serif text-lg">
                “Originally published by The Pinnacle Newspaper.”
              </blockquote>

              <p className="text-[14px] text-ink-muted mt-4">
                Where possible, include a direct link back to the original article.
              </p>
            </div>
          </section>

          {/* ── Allowed vs Not Allowed ── */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">

            <div className="bg-navy text-white rounded-lg p-8">
              <h3 className="font-serif text-2xl font-bold mb-5">
                Allowed
              </h3>

              <div className="space-y-4">
                {ALLOWED.map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>

                    <p className="text-blue-100 text-[15px]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand text-white rounded-lg p-8">
              <h3 className="font-serif text-2xl font-bold mb-5">
                Not Allowed
              </h3>

              <div className="space-y-4">
                {NOT_ALLOWED.map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>

                    <p className="text-red-100 text-[15px]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </section>

          {/* ── Corrections & Updates ── */}
          <section className="mb-16 border-t border-rule pt-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-3">
              Corrections Policy
            </p>

            <h2 className="font-serif text-3xl font-bold text-ink mb-6">
              Updates and Corrections
            </h2>

            <div className="space-y-4 text-[16px] text-ink-light font-serif leading-relaxed max-w-reading">
              <p>
                If an article is updated or corrected after republication,
                republishers are expected to make reasonable efforts to update
                their versions accordingly.
              </p>

              <p>
                Maintaining factual accuracy and editorial integrity remains
                essential to responsible journalism.
              </p>

              <p className="font-serif text-xl font-bold text-navy pt-2">
                Truth. Insight. Impact.
              </p>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="text-center py-10 border-t border-rule">
            <h3 className="font-serif text-2xl font-bold text-ink mb-3">
              Need Permission or Clarification?
            </h3>

            <p className="text-ink-muted mb-6 text-[15px] max-w-md mx-auto">
              Contact our editorial team for syndication requests, commercial use,
              partnerships, or republication inquiries.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-navy text-white px-8 py-3 rounded font-semibold hover:bg-navy/90 transition-colors"
              >
                Contact Us
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center border border-rule text-ink-light px-8 py-3 rounded font-semibold hover:bg-gray-50 transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  )
}
