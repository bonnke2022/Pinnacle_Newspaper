export type ArticleStatus = 'draft' | 'published'

export interface Author {
  id: string
  name: string
  slug: string
  title: string        // "Professor of Political Economy"
  institution: string  // "University of Lagos"
  bio: string
  avatar_url: string | null
  expertise: string[]
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  body: object
  cover_image: string | null
  author_id: string
  category_id: string
  status: ArticleStatus
  published_at: string | null
  read_time_mins: number
  disclosure: string | null
  is_breaking: boolean
  created_at: string
  updated_at: string
}

export interface ArticleFull extends Article {
  author: Author
  category: Category
}
