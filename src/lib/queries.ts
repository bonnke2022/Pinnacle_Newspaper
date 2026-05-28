import { supabaseServer, supabaseAdmin, supabasePublic } from './supabase'
import type { ArticleFull, Author, Category } from '@/types'

const WITH_RELATIONS = `*, author:authors(*), category:categories(*)`

export async function getPublishedArticles(
  limit = 20,
  categorySlug?: string
) {
  const db = await supabaseServer()

  if (categorySlug) {
    // Use supabasePublic for categories — public data, no auth needed
    const { data: cat } = await supabasePublic
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single()


    if (!cat) return []

    const { data, error } = await db
      .from('articles')
      .select(WITH_RELATIONS)
      .eq('status', 'published')
      .eq('category_id', cat.id)
      .order('published_at', { ascending: false })
      .limit(limit)

    return (data ?? []) as ArticleFull[]
  }

  const { data } = await supabasePublic
    .from('articles')
    .select(WITH_RELATIONS)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)

  return (data ?? []) as ArticleFull[]
}

export async function getArticleBySlug(
  slug: string
): Promise<ArticleFull | null> {

  const db = await supabaseServer()

  const { data } = await db
    .from('articles')
    .select(WITH_RELATIONS)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  return (data as ArticleFull) ?? null
}

export async function getArticleById(
  id: string
): Promise<ArticleFull | null> {

  const db = supabaseAdmin()

  const { data } = await db
    .from('articles')
    .select(WITH_RELATIONS)
    .eq('id', id)
    .single()

  return (data as ArticleFull) ?? null
}

export async function getRelatedArticles(
  articleId: string,
  categoryId: string,
  limit = 4
) {

  const db = await supabaseServer()

  const { data } = await db
    .from('articles')
    .select(WITH_RELATIONS)
    .eq('status', 'published')
    .eq('category_id', categoryId)
    .neq('id', articleId)
    .order('published_at', { ascending: false })
    .limit(limit)

  return (data ?? []) as ArticleFull[]
}

export async function getBreakingHeadlines(limit = 5) {

  const db = await supabaseServer()

  const { data } = await db
    .from('articles')
    .select('id, slug, title')
    .eq('status', 'published')
    .eq('is_breaking', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  return data ?? []
}

export async function getAllCategories(): Promise<Category[]> {
  
  const { data, error } = await supabasePublic
    .from('categories')
    .select('*')
    .order('name')

  return (data ?? []) as Category[]
}

export async function getAllAuthors(): Promise<Author[]> {

  const db = supabaseAdmin()

  const { data } = await db
    .from('authors')
    .select('*')
    .order('name')

  return (data ?? []) as Author[]
}

export async function getAuthorBySlug(
  slug: string
): Promise<Author | null> {

  const db = await supabaseServer()

  const { data } = await db
    .from('authors')
    .select('*')
    .eq('slug', slug)
    .single()

  return (data as Author) ?? null
}

export async function getArticlesByAuthor(
  authorSlug: string,
  limit = 20
): Promise<ArticleFull[]> {

  const db = await supabaseServer()

  const { data: author } = await db
    .from('authors')
    .select('id')
    .eq('slug', authorSlug)
    .single()

  if (!author) return []

  const { data } = await db
    .from('articles')
    .select(WITH_RELATIONS)
    .eq('status', 'published')
    .eq('author_id', author.id)
    .order('published_at', { ascending: false })
    .limit(limit)

  return (data ?? []) as ArticleFull[]
}

export async function getPublishedSlugs(): Promise<string[]> {
  const { data } = await supabasePublic
    .from('articles')
    .select('slug')
    .eq('status', 'published')

  return (data ?? []).map((r) => r.slug)
}

export async function adminGetAllArticles(): Promise<ArticleFull[]> {

  const db = supabaseAdmin()

  const { data } = await db
    .from('articles')
    .select(WITH_RELATIONS)
    .order('created_at', { ascending: false })

  return (data ?? []) as ArticleFull[]
}

export async function searchArticles(query: string, limit = 20): Promise<ArticleFull[]> {
  const { data } = await supabasePublic
      .from('articles')
      .select('*, author:authors(*), category:categories(*)')
      .eq('status', 'published')
      .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`)
      .order('published_at', { ascending: false })
      .limit(limit)  
  
    return (data ?? []) as ArticleFull[];
}

export async function getCuratedArticles(limit = 6, category?: string) {
  let q = supabasePublic
    .from('curated_articles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (category) q = q.eq('category', category)

  const { data } = await q
  return data ?? []
}