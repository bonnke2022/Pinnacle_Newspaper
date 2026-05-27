import { supabaseAdmin, supabaseServer } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const supabase = await supabaseServer();
    const {data: {user}} = await supabase.auth.getUser();

    console.log('service role key exists: ', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
    console.log('key starts with: ', process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 10));

    if(!user) return NextResponse.json({error: 'Unauthorized'}, {status: 401});

    const {title, institution, bio, expertise} = await req.json();

    if(!title || !institution || !bio) {
        return NextResponse.json({error: 'Title, institution and bio are required'}, {status: 400})
    } 

    const {error} = await supabaseAdmin().from('profiles').update({role: 'author_pending', title, institution, bio, expertise: expertise ?? [],}).eq('id', user.id);

    if(error) return NextResponse.json({error: error.message}, {status: 500});
    return NextResponse.json({ok: true})
}