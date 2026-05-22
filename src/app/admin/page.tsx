import { redirect } from 'next/navigation'
import Link from 'next/link'
import { isAdminAuthenticated} from '@/lib/auth';
import { formatDate } from '@/lib/utils';
import { adminGetAllArticles } from '@/lib/queries'
import { PinnacleLogo } from '@/components/ui/PinnacleLogo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default async function AdminDashboard() {
  if (!isAdminAuthenticated()) redirect('/admin/login')
  const articles = await adminGetAllArticles()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-navy text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <PinnacleLogo variant="white" height={30} />
          <Link href="/" target="_blank" className="text-blue-200 text-sm hover:text-white transition-colors">← View site</Link>
        </div>
        <form action="/api/admin/logout" method="POST">
          <button className="text-sm text-blue-200 hover:text-white transition-colors">Sign out</button>
        </form>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-2xl font-bold text-ink">Articles</h1>
          <Button asChild variant="navy">
            <Link href="/admin/new">+ New article</Link>
          </Button>
        </div>

        {articles.length === 0 ? (
          <div className="bg-white border border-rule rounded-lg p-12 text-center text-ink-muted">
            <p className="font-serif text-lg mb-4">No articles yet.</p>
            <Button asChild variant="navy">
              <Link href="/admin/new">Write your first article</Link>
            </Button>
          </div>
        ) : (
          <div className="bg-white border border-rule rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-rule">
                <tr>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Title</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-ink-muted hidden md:table-cell">Author</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-ink-muted hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Status</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-ink-muted hidden lg:table-cell">Date</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {articles.map(a => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-medium text-ink leading-snug line-clamp-2 max-w-xs">{a.title}</p>
                    </td>
                    <td className="px-4 py-3 text-ink-muted hidden md:table-cell whitespace-nowrap">{a.author?.name ?? '—'}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand">{a.category?.name ?? '—'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={a.status as 'published' | 'draft'}>{a.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-ink-muted text-[12px] hidden lg:table-cell whitespace-nowrap">
                      {a.published_at ? formatDate(a.published_at) : formatDate(a.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 justify-end">
                        <Link href={`/admin/edit/${a.id}`} className="text-[12px] text-brand hover:underline font-medium">Edit</Link>
                        {a.status === 'published' && (
                          <Link href={`/articles/${a.slug}`} target="_blank" className="text-[12px] text-ink-muted hover:text-ink transition-colors">View</Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Link href="/admin/authors" className="bg-white border border-rule rounded-lg p-4 hover:border-navy transition-colors group">
            <p className="font-semibold text-ink text-sm group-hover:text-navy transition-colors">Manage Authors</p>
            <p className="text-[12px] text-ink-muted mt-0.5">Add and edit author profiles</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
