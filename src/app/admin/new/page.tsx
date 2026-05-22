import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/auth'
import { getAllAuthors, getAllCategories } from '@/lib/queries'
import { ArticleEditor } from '@/components/admin/ArticleEditor'

export default async function NewArticlePage() {
  if (!isAdminAuthenticated()) redirect('/admin/login')
  const [authors, categories] = await Promise.all([getAllAuthors(), getAllCategories()])
  return <ArticleEditor authors={authors} categories={categories} />
}
