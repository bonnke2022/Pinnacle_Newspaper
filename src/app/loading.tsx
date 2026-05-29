import { Skeleton } from '@/components/ui/skeleton'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function HomeLoading() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* Hero skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 mb-10">
          <div>
            <Skeleton className="w-full aspect-[2.4/1] rounded mb-4" />
            <Skeleton className="h-4 w-24 mb-3" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="hidden lg:block border-l border-rule pl-8">
            <Skeleton className="h-4 w-24 mb-5" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="py-3 border-b border-rule last:border-0">
                <Skeleton className="h-3 w-16 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-4/5 mb-2" />
                <Skeleton className="h-3 w-32" />
              </div>
            ))}
          </div>
        </div>

        {/* Grid skeleton */}
        <Skeleton className="h-4 w-24 mb-5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="w-full aspect-video rounded" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
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