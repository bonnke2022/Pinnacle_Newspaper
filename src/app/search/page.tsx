import { GridCard } from "@/components/article/ArticleCard";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getBreakingHeadlines, searchArticles } from "@/lib/queries";
import { Metadata } from "next";

interface Props {
    searchParams: Promise<{q?: string}>
}

export async function generateMetadata({searchParams}: Props): Promise<Metadata>{
 const {q} = await searchParams;   
 return {
    title: q ? `Search: ${q}` : 'Search',
    description: q ? `Search results for "${q}"` : 'Search Pinnacle Newspaper',
 }
}

export default async function SearchPage({searchParams}: Props){
    const {q} = await searchParams;
    const query = q?.trim() ?? '';

    const [breaking, articles] = await Promise.all([getBreakingHeadlines(4), query ? searchArticles(query) : Promise.resolve([]),]);

    return (
        <>
         <Header ticker={breaking}/>
         <main className="max-w-site mx-auto px-4 py-8">
            <div className="mb-8 pb-6 border-b-2 border-ink">
                <p className="font-bold uppercase tracking-widest text-ink-muted mb-1 text-[11px]">Search</p>
                {query ? (
                    <>
                     <h1 className="font-serif text-4xl font-bold text-ink">Results for "{query}"</h1>
                     <p className="text-ink-muted mt-2 text-[15px]">{articles.length} {articles.length === 1 ? 'article' : 'articles'} found</p>
                    </>
                ) : (
                    <h1 className="font-serif text-4xl font-bold text-ink">Search</h1>
                )}
            </div>

            {!query && (
                <div className="py-16 text-center">
                    <p className="font-serif text-xl text-ink-muted mb-2">What are you looking for?</p>
                    <p className="text-ink-faint text-sm">Use the search bar above to find articles, authors and topics</p>
                </div>
            )}

            {query && articles.length === 0 && (
                <div className="py-16 text-center">
                    <p className="font-serif text-xl text-ink-muted mb-2">No results for "{query}"</p>
                    <p className="text-ink-faint text-sm">Try different keywords or browse by topic below.</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        {['Politics','Business','Sports','Africa','Global','Technology','Health','Opinion'].map(t => (
                         <a                
                            key={t}
                            href={`/category/${t.toLowerCase()}`}
                            className="text-[13px] border border-rule px-3 py-1.5 rounded-full text-ink-light hover:border-brand hover:text-brand transition-colors"
                         >
                            {t}
                         </a>
                       ))}                    
                </div>
                </div>
            )}

            {query && articles.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map(a => <GridCard key={a.id} a={a}/>)}
                </div>
            )}
         </main>
         <Footer/>
        </>
    )

}