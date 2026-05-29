import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about The Pinnacle Newspaper — Truth. Insight. Impact.',
}

const VALUES = [
  { title: 'Integrity',     desc: 'We uphold truth, fairness, and ethical journalism in all our reporting.' },
  { title: 'Accuracy',      desc: 'We are committed to fact-based reporting and responsible information dissemination.' },
  { title: 'Accountability',desc: 'We believe in transparency, responsible journalism, and public trust.' },
  { title: 'Excellence',    desc: 'We strive for professionalism and quality in every story we publish.' },
  { title: 'Independence',  desc: 'We maintain editorial independence and objective reporting.' },
  { title: 'Innovation',    desc: 'We embrace digital transformation and modern media solutions to better serve our audience.' },
]

const COVERAGE = [
  'Politics and Governance', 'Business and Economy', 'Education',
  'Technology and Innovation', 'Health', 'Entertainment and Lifestyle',
  'Sports', 'Community Development', 'Interviews and Opinions', 'Investigative Reports',
]

const FOUNDER_IMAGE_URL = 'https://zvwecolhiunlcsrjbzlj.supabase.co/storage/v1/object/public/article-images/IMG-20260529-WA0005.jpg'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>

        {/* ── Hero banner ── */}
        <div className="bg-navy text-white py-16 px-4">
          <div className="max-w-reading mx-auto text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-blue-300 mb-3">About Us</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Truth. Insight. Impact.
            </h1>
            <p className="text-blue-200 text-lg leading-relaxed max-w-2xl mx-auto">
              A modern media platform committed to delivering credible journalism, 
              insightful analysis, and people-centered reporting.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">

          {/* ── Who we are ── */}
          <section className="max-w-reading mx-auto mb-16">
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-3">Who We Are</p>
            <h2 className="font-serif text-3xl font-bold text-ink mb-6">About The Pinnacle Newspaper</h2>
            <div className="space-y-4 text-[16px] text-ink-light font-serif leading-relaxed">
              <p>
                The Pinnacle Newspaper is a modern media platform committed to delivering credible journalism, 
                insightful analysis, and people-centered reporting that informs, educates, and inspires society.
              </p>
              <p>
                Founded on the principles of integrity, professionalism, accountability, and press responsibility, 
                The Pinnacle Newspaper exists to provide timely, accurate, and balanced news coverage across politics, 
                business, economy, education, technology, governance, entertainment, sports, and community development.
              </p>
              <p>
                We believe that the media plays a vital role in shaping society, strengthening democracy, promoting 
                transparency, and giving voice to the people. Through responsible journalism and ethical reporting, 
                we are committed to promoting truth, public enlightenment, and constructive national development.
              </p>
              <p>
                At The Pinnacle Newspaper, we combine traditional journalistic values with modern digital innovation 
                to ensure our readers receive reliable information in an accessible and engaging format.
              </p>
            </div>
          </section>

          {/* ── Mission & Vision ── */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-navy text-white rounded-lg p-8">
              <h3 className="font-serif text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-blue-200 leading-relaxed text-[15px]">
                To provide credible, timely, and impactful journalism that informs the public, 
                promotes accountability, and contributes positively to societal growth and democratic development.
              </p>
            </div>
            <div className="bg-brand text-white rounded-lg p-8">
              <h3 className="font-serif text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-red-100 leading-relaxed text-[15px]">
                To become a leading and trusted media platform recognized for excellence in journalism, 
                integrity in reporting, and commitment to public interest.
              </p>
            </div>
          </section>

          {/* ── Core Values ── */}
          <section id="charter" className="mb-16">
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-3">What We Stand For</p>
            <h2 className="font-serif text-3xl font-bold text-ink mb-8">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {VALUES.map(v => (
                <div key={v.title} className="p-6 border border-rule rounded-lg hover:border-navy transition-colors">
                  <div className="w-8 h-8 bg-navy/10 rounded-full flex items-center justify-center mb-3">
                    <div className="w-2 h-2 rounded-full bg-navy" />
                  </div>
                  <h4 className="font-semibold text-ink mb-2">{v.title}</h4>
                  <p className="text-[13px] text-ink-muted leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── What We Cover ── */}
          <section className="mb-16 bg-gray-50 rounded-xl p-8 md:p-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-3">Coverage</p>
            <h2 className="font-serif text-3xl font-bold text-ink mb-6">What We Cover</h2>
            <div className="flex flex-wrap gap-3">
              {COVERAGE.map(c => (
                <span key={c} className="px-4 py-2 bg-white border border-rule rounded-full text-[13px] text-ink-light font-medium">
                  {c}
                </span>
              ))}
            </div>
          </section>

          {/* ── Founder ── */}
          <section className="mb-16">
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-3">Leadership</p>
            <h2 className="font-serif text-3xl font-bold text-ink mb-8">About the Founder</h2>
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 items-start">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] w-full max-w-xs rounded-xl overflow-hidden bg-gray-100 shadow-lg">
                  {FOUNDER_IMAGE_URL === 'https://zvwecolhiunlcsrjbzlj.supabase.co/storage/v1/object/public/article-images/IMG-20260529-WA0005.jpg' ? (
                    <Image
                      src={FOUNDER_IMAGE_URL}
                      alt="Amb. Paul Smith Eghobor"
                      fill
                      className="object-cover object-top"
                      sizes="320px"
                    />
                  ) : (
                    <div className="w-full h-full bg-navy/10 flex items-center justify-center">
                      <span className="text-ink-muted text-sm">Image coming soon</span>
                    </div>
                  )}
                </div>
                <div className="text-center max-w-xs">
                  <p className="font-serif font-bold text-xl text-ink">Amb. Paul Smith Eghobor</p>
                  <p className="text-[13px] text-ink-muted mt-1">Founder & Chief Executive Officer</p>
                  <p className="text-[13px] text-brand font-medium">Pinnacle Group</p>
                </div>
              </div>

              <div className="space-y-4 text-[16px] text-ink-light font-serif leading-relaxed">
                <p>
                  Amb. Paul Smith Eghobor is a visionary entrepreneur, media strategist, youth empowerment 
                  advocate, and business leader committed to innovation, leadership, and societal development.
                </p>
                <p>
                  As the Founder and Chief Executive Officer of Pinnacle Group, he has demonstrated a strong 
                  passion for enterprise development, media advancement, technology-driven solutions, and youth 
                  engagement. Through his leadership, Pinnacle Group continues to grow as a platform focused on 
                  innovation, empowerment, and impactful social contribution.
                </p>
                <p>
                  Known for his dynamic leadership style and commitment to excellence, Amb. Paul Smith Eghobor 
                  has remained actively involved in initiatives that promote community development, entrepreneurship, 
                  youth participation, and public engagement.
                </p>
                <p>
                  Driven by a vision to build credible institutions and impactful platforms, he founded The Pinnacle 
                  Newspaper as a modern media organization dedicated to responsible journalism, public enlightenment, 
                  and credible reporting.
                </p>
                <p>
                  His philosophy is centered on integrity, innovation, service, and impact — values that continue 
                  to define the mission and direction of Pinnacle Group and The Pinnacle Newspaper.
                </p>
                <blockquote className="border-l-4 border-brand pl-4 italic text-ink font-serif text-lg mt-6">
                  "Through leadership, vision, and dedication, committed to building platforms that inform, 
                  inspire, empower, and transform society."
                </blockquote>
              </div>
            </div>
          </section>

          {/* ── Our Commitment ── */}
          <section className="mb-16 border-t border-rule pt-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-3">Our Promise</p>
            <h2 className="font-serif text-3xl font-bold text-ink mb-6">Our Commitment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                'Promoting responsible journalism',
                'Amplifying the voices of the people',
                'Encouraging informed public discourse',
                'Supporting democratic values',
                'Delivering impactful stories that matter',
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                  </span>
                  <p className="text-[15px] text-ink-light">{item}</p>
                </div>
              ))}
            </div>
            <p className="font-serif text-lg text-ink-light leading-relaxed max-w-reading">
              At The Pinnacle Newspaper, we believe information is power, and responsible journalism 
              remains essential for progress, accountability, and national development.
            </p>
            <p className="font-serif text-xl font-bold text-navy mt-4">
              Welcome to The Pinnacle Newspaper, where truth meets impact.
            </p>
          </section>

          {/* ── CTA ── */}
          <section className="text-center py-10 border-t border-rule">
            <h3 className="font-serif text-2xl font-bold text-ink mb-3">Join our community</h3>
            <p className="text-ink-muted mb-6 text-[15px] max-w-md mx-auto">
              Stay informed with credible journalism. Sign up or contribute your expertise as an author.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/signup" className="inline-flex items-center justify-center bg-navy text-white px-8 py-3 rounded font-semibold hover:bg-navy/90 transition-colors">
                Create an account
              </Link>
              <Link href="/write-for-us" className="inline-flex items-center justify-center border border-rule text-ink-light px-8 py-3 rounded font-semibold hover:bg-gray-50 transition-colors">
                Write for us
              </Link>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}