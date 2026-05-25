"use client";

import { supabaseBrowser } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Props {
    user: User;
    profile: {
        id: string;
        full_name: string | null;
        role: string;
        avatar_url: string | null;
    } | null;
}

const AccountClient = ({user, profile}: Props) => {
    const router = useRouter();
    const [fullName, setFullName] = useState(profile?.full_name ?? '');
    const [saving, setSaving] = useState(false);
    const [applying, setApplying] = useState(false);

    async function saveProfile(e: FormEvent) {
        e.preventDefault();
        setSaving(true);
        const supabase = supabaseBrowser();
        const {error} = await supabase.from('profiles').update({full_name: fullName}).eq('id', user.id);
        setSaving(false);
        if(error) {
            toast.error('Failed to save.');
            return;
        }
        toast.success('Profile updated');
        router.refresh();
    }

    async function applyAsAuthor() {
        setApplying(true);
        const supabase = supabaseBrowser();
        const {error} = await supabase.from('profiles').update({role: 'author_pending'}).eq('id', user.id);
        setApplying(false);
        if(error) {
            toast.error('Failed to apply'); 
            return;
        }
        toast.success('Application submitted! We will review it shortly.');
        router.refresh();
    }

    const role = profile?.role ?? 'reader';

    const roleBadge: Record<string, {label: string; class: string}> = {
        reader: {label: 'Reader', class: 'bg-gray-100 text-gray-700'},
        author_pending: {label: 'Pending approval', class: 'bg-yellow-100 text-yellow-800'},
        author: {label: 'Author', class: 'bg-green-100 text-green-800'},
        admin: {label: 'Admin', class: 'bg-navy/10 text-navy'},
    }
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-serif text-lg">Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={saveProfile} className="space-y-4">
                   <div className="space-y-1 5">
                     <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="field" placeholder="Your full name"/>
                   </div>
                   <div className="space-y-1 5">
                    <Label>Email</Label>
                    <p className="text-sm text-ink-muted py-2">{user.email}</p>
                   </div>

                   <div className="space-y-1 5">
                    <Label>Role</Label>
                    <div>
                        <span className={`text-[12px] font-semibold px-2.5 py-1 rounded-full ${roleBadge[role]?.class}`}>{roleBadge[role]?.label}</span>
                    </div>
                   </div>

                   <Button type="submit" variant="navy" disabled={saving}>{saving ? "Saving..." : 'Save changes'}</Button>
                   
                </form>
            </CardContent>
        </Card>

        {role === 'reader' && (
            <Card>
                <CardHeader>
                    <CardTitle className="font-serif text-lg">Write for Pinnacle Newspaper</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="text-sm text-ink-muted leading-relaxed">
                        Are you a researcher, academic, or subject matter expert? Apply to become an author and share your analysis with our readers.
                    </p>
                    <Button variant="brand" onClick={applyAsAuthor} disabled={applying}>{applying ? 'Submitting...' : 'Apply as an Author'}</Button>
                </CardContent>
            </Card>
        )}

        {role === 'author_pending' && (
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l 33m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-ink">Application under review</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )}
      
      {role === 'author' && (
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-ink">You're an approved author</p>
                        <p className="text-sm text-ink-muted mt-0 5">Your articles appear on Pinnacle Newspaper with your credentials.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AccountClient
