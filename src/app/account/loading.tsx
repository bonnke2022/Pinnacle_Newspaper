import { Skeleton } from '@/components/ui/skeleton'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function AccountLoading() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="max-w-reading mx-auto">
          <Skeleton className="h-9 w-48 mb-8" />
          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-7 w-20 rounded-full" />
              </div>
              <Skeleton className="h-9 w-32" />
            </div>
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-9 w-36" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}