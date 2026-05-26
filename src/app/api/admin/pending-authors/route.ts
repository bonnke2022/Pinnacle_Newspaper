import { supabaseAdmin } from "@/lib/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const jar = await cookies();
    if(jar.get('admin_token')?.value !== process.env.ADMIN_SECRET) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const {data, error} = await supabaseAdmin().from('profiles').select('id, full_name, title, institution, bio, expertise, role').eq('role', 'author_pending').order('created_at', {ascending: true});
    
    if(error) return NextResponse.json({error: error.message}, {status: 500});
    return NextResponse.json(data);
}