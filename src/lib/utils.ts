
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow } from 'date-fns'
import slugify from 'slugify'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const formatDate = (d: string) => format(new Date(d), 'MMMM d, yyyy')
export const formatAgo  = (d: string) => formatDistanceToNow(new Date(d), { addSuffix: true })
export const makeSlug   = (s: string) => slugify(s, { lower: true, strict: true, trim: true })
export const initials   = (name: string) =>
  name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()

export const SITE_NAME = 'Pinnacle Newspaper'
export const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pinnaclenewspaper.com'
export const SITE_DESC = 'Academic rigour, journalistic flair — expert analysis on African and global affairs.'

