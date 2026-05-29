import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getAllAuthors, getArticlesByAuthor } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Our Authors',
  description:
    'Meet the journalists, editors, contributors, and analysts behind The Pinnacle Newspaper.',
}


const VALUES = [
  'Credible journalism',
  'Responsible reporting',
  'Balanced perspectives',
  'Editorial independence',
  'Community-focused storytelling',
  'Truth and accountability',
]

export default async function AuthorsPage() {
    const authors = await getAllAuthors()


  return (
    <>
      <Header />

      <main>

        {/* ── Hero ── */}
        <div className="bg-navy text-white py-16 px-4">
          <div className="max-w-reading mx-auto text-center">

            <p className="text-[11px] font-bold uppercase tracking-widest text-blue-300 mb-3">
              Editorial Team
            </p>

            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Meet Our Authors
            </h1>

            <p className="text-blue-200 text-lg leading-relaxed max-w-2xl mx-auto">
              The journalists, writers, editors, analysts, and contributors
              committed to delivering credible journalism, insightful reporting,
              and impactful storytelling.
            </p>

          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">

          {/* ── Intro ── */}
          <section className="max-w-reading mx-auto text-center mb-16">

            <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-3">
              Journalism With Purpose
            </p>

            <h2 className="font-serif text-3xl font-bold text-ink mb-6">
              The Voices Behind The Pinnacle Newspaper
            </h2>

            <p className="text-[16px] text-ink-light font-serif leading-relaxed">
              Our editorial team is made up of passionate storytellers,
              investigative reporters, commentators, and contributors focused
              on informing the public and amplifying meaningful conversations
              across politics, business, technology, education, sports,
              entertainment, health, and community development.
            </p>

          </section>

          {/* ── Authors Grid ── */}
          <section className="mb-20">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {authors.map(author => (
                <div
                  key={author.id}
                  className="group bg-white border border-rule rounded-2xl overflow-hidden hover:border-navy hover:shadow-lg transition-all duration-300"
                >

                  {/* ── Avatar ── */}
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">

                    {author.avatar_url ? (
                      <Image
                        src={author.avatar_url}
                        alt={author.name}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-navy/5 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-navy/10 flex items-center justify-center">
                          <span className="font-serif text-3xl font-bold text-navy">
                            {author.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* ── Content ── */}
                  <div className="p-6">

                    {author.title && (
                      <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-2">
                        {author.title}
                      </p>
                    )}

                    <h3 className="font-serif text-2xl font-bold text-ink mb-3">
                      {author.name}
                    </h3>

                    <p className="text-[14px] text-ink-muted leading-relaxed mb-5 line-clamp-5">
                      {author.bio ||
                        'Contributor at The Pinnacle Newspaper focused on impactful journalism and responsible storytelling.'}
                    </p>

                    {/* ── Meta ── */}
                    <div className="flex flex-wrap gap-2">

                      {author.expertise && (
                        <span className="px-3 py-1 rounded-full bg-navy/5 text-navy text-[12px] font-medium">
                          {author.expertise}
                        </span>
                      )}

                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* ── Empty State ── */}
            {authors.length === 0 && (
              <div className="text-center py-20 border border-dashed border-rule rounded-2xl mt-8">

                <div className="w-16 h-16 rounded-full bg-navy/10 mx-auto flex items-center justify-center mb-5">
                  <svg
                    className="w-8 h-8 text-navy"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>

                <h3 className="font-serif text-2xl font-bold text-ink mb-3">
                  No Authors Yet
                </h3>

                <p className="text-ink-muted max-w-md mx-auto">
                  Author profiles and contributors will appear here once
                  editorial team members are added.
                </p>

              </div>
            )}

          </section>

          {/* ── Editorial Standards ── */}
          <section className="mb-16 bg-gray-50 rounded-2xl p-8 md:p-12">

            <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-3">
              Editorial Standards
            </p>

            <h2 className="font-serif text-3xl font-bold text-ink mb-8">
              Built on Integrity and Accountability
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {VALUES.map(value => (
                <div
                  key={value}
                  className="flex items-start gap-3 bg-white border border-rule rounded-xl p-4"
                >

                  <span className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-brand"
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

                  <p className="text-[15px] text-ink-light">
                    {value}
                  </p>

                </div>
              ))}

            </div>

          </section>

          {/* ── CTA ── */}
          <section className="text-center py-10 border-t border-rule">

            <h3 className="font-serif text-2xl font-bold text-ink mb-3">
              Interested in Contributing?
            </h3>

            <p className="text-ink-muted mb-6 text-[15px] max-w-md mx-auto">
              Join our growing network of journalists, analysts, and contributors
              committed to impactful and responsible journalism.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">

              <Link
                href="/write-for-us"
                className="inline-flex items-center justify-center bg-navy text-white px-8 py-3 rounded font-semibold hover:bg-navy/90 transition-colors"
              >
                Write For Us
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center border border-rule text-ink-light px-8 py-3 rounded font-semibold hover:bg-gray-50 transition-colors"
              >
                Learn More
              </Link>

            </div>

          </section>

        </div>
      </main>

      <Footer />
    </>
  )
}
