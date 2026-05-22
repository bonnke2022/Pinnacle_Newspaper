import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/auth'
import { getAllAuthors } from '@/lib/queries'
import { AuthorsManager } from '@/components/admin/AuthorsManager'

export default async function AdminAuthorsPage() {
  if (!isAdminAuthenticated()) redirect('/admin/login')
  const authors = await getAllAuthors()
  return <AuthorsManager authors={authors} />
}
