import AccountClient from "@/components/account/AccountClient";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { supabaseServer } from "@/lib/supabase"
import { redirect } from "next/navigation";

const Account = async() => {
    const supabase = await supabaseServer();
    const {data: {user}} = await supabase.auth.getUser();

    if(!user) redirect('/login');

    // Get profile
    const {data: profile} = await supabase.from('profiles').select('*').eq('id', user.id).single();
  return (
    <>
      <Header/>
      <main className="max-w-site mx-auto px-4 py-10">
        <div className="max-w-reading mx-auto">
            <h1 className="font-serif text-3xl font-bold text-ink mb-8">Your account</h1>
            <AccountClient user={user} profile={profile}/>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default Account
