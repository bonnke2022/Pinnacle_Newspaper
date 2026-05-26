import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { getAllCategories } from "@/lib/queries";
import { supabaseAdmin, supabaseServer } from "@/lib/supabase"
import { redirect } from "next/navigation";


const WritePage = async() => {
    const supabase = await supabaseServer();
    const {data: {user}} = await supabase.auth.getUser();

    if(!user) redirect('/login');

    //Check they are an approved author;
    const {data: profile} = await supabaseAdmin().from('profiles').select('role').eq('id', user.id).single();

    if(!profile || profile.role !== 'author') redirect('/account');

    // Get their authors row
    const {data: author} = await supabaseAdmin().from('authors').select('*').eq('id', user.id).single();

    if(!author) redirect('/account');

    const categories = await getAllCategories();
  return (
    <ArticleEditor authors={[authors]} categories={categories} lockedAuthorId={author.id}/>
  )
}

export default WritePage
