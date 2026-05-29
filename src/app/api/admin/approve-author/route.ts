import { supabaseAdmin } from "@/lib/supabase";
import { makeSlug } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const jar = await cookies();
    if(jar.get('admin_token')?.value !== process.env.ADMIN_SECRET) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const {id, action} = await req.json();
    if(!id || !action) {
        return NextResponse.json({error: 'Missing id or action'}, {status: 400})
    }

    const db = supabaseAdmin();
    const newRole = action === 'approve' ? 'author' : 'reader';

    const {error: roleError } = await db.from('profiles').update({role: newRole}).eq('id', id);

    if(roleError) return NextResponse.json({error: roleError.message}, {status: 500});

    if(action === 'approve') {
        // Get their profile data
        const {data: profile, error: profileError } = await db.from('profiles').select('full_name, title, institution, bio, expertise, avatar_url').eq('id', id).single();

        if(profileError || !profile) {
            return NextResponse.json({error: 'Could not fetch profile'}, {status: 500})
        }

        // Generate a unique slug
        let slug = makeSlug(profile.full_name ?? 'author');
        const {count} = await db.from('authors').select('id', {count: 'exact'}).like('slug', `${slug}%`);
        if((count ?? 0) > 0) slug = `${slug}-${Date.now()}`

        // Create the authors row
       const { error: authorError } = await db.from('authors').insert({
            id,
            name:        profile.full_name ?? 'Unknown',
            slug,
            title:       profile.title ?? '',
            institution: profile.institution ?? '',
            bio:         profile.bio ?? '',
            expertise:   profile.expertise ?? [],
            avatar_url:  profile.avatar_url ?? null,
        })
        if(authorError) return NextResponse.json({error: authorError.message}, {status: 500})
    }

    return NextResponse.json({ok: true});
}