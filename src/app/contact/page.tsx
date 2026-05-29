import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with The Pinnacle Newspaper — Truth. Insight. Impact.',
}

const CONTACT_CHANNELS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'info@thepinnaclenewspaper.com',
    href: 'mailto:info@thepinnaclenewspaper.com',
    description: 'For general enquiries and correspondence',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Editorial',
    value: 'editorial@thepinnaclenewspaper.com',
    href: 'mailto:editorial@thepinnaclenewspaper.com',
    description: 'Story tips, press releases, and editorial submissions',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Advertising',
    value: 'ads@thepinnaclenewspaper.com',
    href: 'mailto:ads@thepinnaclenewspaper.com',
    description: 'Sponsorships, adverts, and partnership opportunities',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Phone',
    value: '+234 800 000 0000',
    href: 'tel:+2348000000000',
    description: 'Monday – Friday, 9 am – 5 pm WAT',
  },
]

const SOCIAL_LINKS = [
  { label: 'Facebook',  href: 'https://facebook.com/thepinnaclenewspaper',  icon: 'f' },
  { label: 'X (Twitter)', href: 'https://x.com/thepinnaclenews',             icon: 'x' },
  { label: 'Instagram', href: 'https://instagram.com/thepinnaclenewspaper', icon: 'in' },
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/thepinnaclenewspaper', icon: 'li' },
]

const ENQUIRY_TYPES = [
  'General Enquiry',
  'Story Tip / Press Release',
  'Advertising / Sponsorship',
  'Partnership Opportunity',
  'Author / Contributor Application',
  'Technical / Website Issue',
  'Other',
]

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>

        {/* ── Hero banner ── */}
        <div className="bg-navy text-white py-16 px-4">
          <div className="max-w-reading mx-auto text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-blue-300 mb-3">Contact Us</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight">
              We'd Love to Hear From You
            </h1>
            <p className="text-blue-200 text-lg leading-relaxed max-w-2xl mx-auto">
              Have a story tip, partnership enquiry, or just want to get in touch? 
              Reach out — our team is ready to respond.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">

          {/* ── Contact channels ── */}
          <section className="mb-16">
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-3">Reach Us</p>
            <h2 className="font-serif text-3xl font-bold text-ink mb-8">Contact Channels</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {CONTACT_CHANNELS.map(ch => (
                <a
                  key={ch.label}
                  href={ch.href}
                  className="flex items-start gap-4 p-6 border border-rule rounded-lg hover:border-navy transition-colors group"
                >
                  <div className="w-10 h-10 bg-navy/10 rounded-full flex items-center justify-center shrink-0 text-navy group-hover:bg-navy group-hover:text-white transition-colors">
                    {ch.icon}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-0.5">{ch.label}</p>
                    <p className="font-semibold text-ink text-[15px] mb-1">{ch.value}</p>
                    <p className="text-[13px] text-ink-muted leading-relaxed">{ch.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* ── Contact form + social ── */}
          <section className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 mb-16 items-start">

            {/* Form */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-3">Send a Message</p>
              <h2 className="font-serif text-3xl font-bold text-ink mb-6">Get in Touch</h2>

              <form className="space-y-5" action="#" method="POST">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="first_name" className="block text-[13px] font-semibold text-ink mb-1.5">
                      First Name <span className="text-brand">*</span>
                    </label>
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      required
                      placeholder="Ada"
                      className="w-full border border-rule rounded px-4 py-2.5 text-[15px] text-ink placeholder:text-ink-muted focus:outline-none focus:border-navy transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name" className="block text-[13px] font-semibold text-ink mb-1.5">
                      Last Name <span className="text-brand">*</span>
                    </label>
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      required
                      placeholder="Okafor"
                      className="w-full border border-rule rounded px-4 py-2.5 text-[15px] text-ink placeholder:text-ink-muted focus:outline-none focus:border-navy transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-[13px] font-semibold text-ink mb-1.5">
                    Email Address <span className="text-brand">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="ada@example.com"
                    className="w-full border border-rule rounded px-4 py-2.5 text-[15px] text-ink placeholder:text-ink-muted focus:outline-none focus:border-navy transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[13px] font-semibold text-ink mb-1.5">
                    Phone Number <span className="text-ink-muted font-normal">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    className="w-full border border-rule rounded px-4 py-2.5 text-[15px] text-ink placeholder:text-ink-muted focus:outline-none focus:border-navy transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="enquiry_type" className="block text-[13px] font-semibold text-ink mb-1.5">
                    Enquiry Type <span className="text-brand">*</span>
                  </label>
                  <select
                    id="enquiry_type"
                    name="enquiry_type"
                    required
                    defaultValue=""
                    className="w-full border border-rule rounded px-4 py-2.5 text-[15px] text-ink bg-white focus:outline-none focus:border-navy transition-colors appearance-none"
                  >
                    <option value="" disabled>Select an enquiry type…</option>
                    {ENQUIRY_TYPES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[13px] font-semibold text-ink mb-1.5">
                    Subject <span className="text-brand">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Brief subject of your message"
                    className="w-full border border-rule rounded px-4 py-2.5 text-[15px] text-ink placeholder:text-ink-muted focus:outline-none focus:border-navy transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[13px] font-semibold text-ink mb-1.5">
                    Message <span className="text-brand">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Tell us how we can help…"
                    className="w-full border border-rule rounded px-4 py-2.5 text-[15px] text-ink placeholder:text-ink-muted focus:outline-none focus:border-navy transition-colors resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-navy text-white px-10 py-3 rounded font-semibold hover:bg-navy/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">

              {/* Response time */}
              <div className="bg-navy text-white rounded-lg p-6">
                <h3 className="font-serif text-lg font-bold mb-2">Response Time</h3>
                <p className="text-blue-200 text-[14px] leading-relaxed">
                  We typically respond to all enquiries within <strong className="text-white">1–2 business days</strong>. 
                  Urgent editorial matters are prioritised.
                </p>
              </div>

              {/* Office address */}
              <div className="p-6 border border-rule rounded-lg">
                <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-3">Our Office</p>
                <address className="not-italic text-[14px] text-ink-light leading-relaxed space-y-1">
                  <p className="font-semibold text-ink">The Pinnacle Newspaper</p>
                  <p>Pinnacle Group Headquarters</p>
                  <p>Lagos, Nigeria</p>
                </address>
              </div>

              {/* Social media */}
              <div className="p-6 border border-rule rounded-lg">
                <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-3">Follow Us</p>
                <div className="space-y-2">
                  {SOCIAL_LINKS.map(s => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-[14px] text-ink-light hover:text-navy transition-colors"
                    >
                      <span className="w-7 h-7 rounded-full bg-navy/10 flex items-center justify-center text-[10px] font-bold text-navy uppercase">
                        {s.icon}
                      </span>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </aside>

          </section>

          {/* ── Write for us banner ── */}
          <section className="mb-16 bg-brand text-white rounded-xl p-8 md:p-12">
            <div className="max-w-reading">
              <p className="text-[11px] font-bold uppercase tracking-widest text-red-200 mb-3">Contribute</p>
              <h2 className="font-serif text-3xl font-bold mb-3">Want to Write for Us?</h2>
              <p className="text-red-100 text-[15px] leading-relaxed mb-6 max-w-prose">
                Are you a journalist, analyst, or subject-matter expert? The Pinnacle Newspaper welcomes 
                pitches and contributions from credible writers across all our coverage areas.
              </p>
              <Link
                href="/write-for-us"
                className="inline-flex items-center justify-center bg-white text-brand px-8 py-3 rounded font-semibold hover:bg-red-50 transition-colors"
              >
                Learn about contributing
              </Link>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="mb-16">
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-3">FAQs</p>
            <h2 className="font-serif text-3xl font-bold text-ink mb-8">Common Questions</h2>
            <div className="divide-y divide-rule">
              {[
                {
                  q: 'How do I submit a story tip or press release?',
                  a: 'Send your tip or release to editorial@thepinnaclenewspaper.com with a clear subject line. Our editorial team reviews all submissions and will follow up if the story aligns with our coverage.',
                },
                {
                  q: 'How can I advertise with The Pinnacle Newspaper?',
                  a: 'Reach out to ads@thepinnaclenewspaper.com with details about your brand, target audience, and campaign objectives. We offer display, sponsored content, and partnership packages.',
                },
                {
                  q: 'Can I republish or share articles from The Pinnacle Newspaper?',
                  a: 'You may share links to our published articles freely. Reproduction of full articles requires written permission from our editorial team.',
                },
                {
                  q: 'How do I report an error in a published article?',
                  a: 'We take accuracy seriously. Please email editorial@thepinnaclenewspaper.com with the article title, URL, and details of the correction needed. We will review and address it promptly.',
                },
                {
                  q: 'Are there career or freelance opportunities?',
                  a: 'Yes. We welcome applications from talented journalists, photographers, and content creators. Visit our Write for Us page or email us with your portfolio and areas of interest.',
                },
              ].map(({ q, a }) => (
                <details key={q} className="group py-5 cursor-pointer">
                  <summary className="flex items-center justify-between gap-4 font-semibold text-ink text-[15px] list-none">
                    {q}
                    <span className="w-5 h-5 shrink-0 text-ink-muted group-open:rotate-45 transition-transform">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-[14px] text-ink-light leading-relaxed max-w-prose">{a}</p>
                </details>
              ))}
            </div>
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
