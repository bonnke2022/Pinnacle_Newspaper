import { redirect, notFound } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/auth'
import { getAllAuthors, getAllCategories, getArticleById } from '@/lib/queries'
import { ArticleEditor } from '@/components/admin/ArticleEditor'

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  if (!isAdminAuthenticated()) redirect('/admin/login')
  const [article, authors, categories] = await Promise.all([
    getArticleById(params.id),
    getAllAuthors(),
    getAllCategories(),
  ])
  if (!article) notFound()
  return <ArticleEditor article={article} authors={authors} categories={categories} />
}
