import { Skeleton } from '@/components/ui/skeleton'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function CategoryLoading() {
  return (
    <>
      <Header />
      <main className="max-w-site mx-auto px-4 py-8">
        <div className="mb-8 pb-6 border-b-2 border-ink">
          <Skeleton className="h-3 w-16 mb-2" />
          <Skeleton className="h-12 w-48 mb-3" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="w-full aspect-video rounded" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-3 w-full" />
              <div className="flex items-center gap-2 mt-1">
                <Skeleton className="w-6 h-6 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-36" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}