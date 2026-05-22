import type { Metadata, Viewport } from 'next'
import { Inter, Lora } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const lora  = Lora({ subsets: ['latin'], variable: '--font-serif', display: 'swap' })

const SITE_NAME = 'Pinnacle Newspaper'
const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pinnaclenewspaper.com'
const SITE_DESC = 'Academic rigour, journalistic flair — expert analysis on African and global affairs.'

export const viewport: Viewport = { themeColor: '#1B2D5E' }

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s — ${SITE_NAME}` },
  description: SITE_DESC,
  keywords: ['Nigeria', 'Africa', 'news', 'analysis', 'politics', 'business', 'academic journalism'],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_NG',
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESC,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PinnacleNewspaper',
    creator: '@PinnacleNewspaper',
    title: SITE_NAME,
    description: SITE_DESC,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: SITE_URL },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`} suppressHydrationWarning>
      <body className="bg-white">
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  )
}
