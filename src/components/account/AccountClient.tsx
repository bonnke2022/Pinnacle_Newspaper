"use client";

import { supabaseBrowser } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";

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
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const [uploadingAvatar, setUploadingAvatar] = useState(false)
    const [applying, setApplying] = useState(false);
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [applyForm, setApplyForm] = useState({
        title: '',
        institution: '',
        bio: '',
        expertise: '',
    });
    function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return
        setAvatarFile(file)
        setAvatarPreview(URL.createObjectURL(file))
    }

async function handleApply(e: React.FormEvent) {
  e.preventDefault()
  if (!avatarFile) {
    toast.error('Please upload a profile photo.')
    return
  }
  setApplying(true)

  // Upload avatar first
  setUploadingAvatar(true)
  const form = new FormData()
  form.append('file', avatarFile)
  const uploadRes = await fetch('/api/admin/upload', {
    method: 'POST',
    body: form,
  })
  const uploadData = await uploadRes.json()
  setUploadingAvatar(false)

  if (!uploadRes.ok) {
    toast.error('Failed to upload photo. Please try again.')
    setApplying(false)
    return
  }

  const res = await fetch('/api/auth/apply-author', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: applyForm.title,
      institution: applyForm.institution,
      bio: applyForm.bio,
      expertise: applyForm.expertise.split(',').map(s => s.trim()).filter(Boolean),
      avatar_url: uploadData.url,
    }),
  })
  const data = await res.json()
  setApplying(false)
  if (!res.ok) { toast.error(data.error ?? 'Failed to apply.'); return }
  toast.success('Application submitted! We will review it shortly.')
  router.refresh()
}

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
        const res = await fetch('/api/auth/apply-author', {method: 'POST'});
        const data = await res.json();

        setApplying(false);
        if(!res.ok) {
            toast.error(data.error ?? 'Failed to apply.');
            return;
        };
        toast.success('Application submitted! We will review it shortly.')
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
                   <div className="space-y-1.5">
                     <Label htmlFor="fullName">Full Name</Label>
                    <input id="fullName" type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="field" placeholder="Your full name"/>
                   </div>
                   <div className="space-y-1.5">
                    <Label>Email</Label>
                    <p className="text-sm text-ink-muted py-2">{user.email}</p>
                   </div>

                   <div className="space-y-1.5">
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
                    {!showApplyForm ? (
                        <Button variant='brand' onClick={() => setShowApplyForm(true)}>Apply as an Author</Button>
                    ) : (
                        <form onSubmit={handleApply} className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="title">Title / Position *</Label>
                                <input type="text" id="title" value={applyForm.title} onChange={e => setApplyForm(p => ({...p, title: e.target.value}))} placeholder="Professor of Political Economy" required className="field" />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="institution">Institution *</Label>
                                <input type="text" id="institution" value={applyForm.institution} onChange={e => setApplyForm(p => ({...p, institution: e.target.value}))} placeholder="University of Lagos" required className="field" />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="bio">Short bio *</Label>
                                <textarea id="bio" value={applyForm.bio} onChange={e => setApplyForm(p => ({...p, bio: e.target.value}))} placeholder="Brief description of your background and expertise" required rows={3} className="field" />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="expertise">Areas of expertise *</Label>
                                <input type="text" id="expertise" value={applyForm.expertise} onChange={e => setApplyForm(p => ({...p, expertise: e.target.value}))} placeholder="e.g Fiscal Policy, Public Finance, Development Economics" required className="field" />
                                <p className="text-[11px] text-ink-faint">Separate with commas</p>
                            </div>            

                            <div className="space-y-1.5">
                                <Label htmlFor="avatar">Profile photo *</Label>
                                {avatarPreview && (
                                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-2">
                                    <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <label className="flex items-center gap-2 w-full border border-rule rounded px-3 py-2 text-sm text-ink-muted hover:bg-gray-50 cursor-pointer transition-colors">
                                    {avatarPreview ? 'Change photo' : 'Upload profile photo'}
                                    <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                    />
                                </label>
                                <p className="text-[11px] text-ink-faint">JPEG, PNG or WebP. Will appear on your articles.</p>
                            </div>

                            <div className="flex gap-3">
                                <Button type="submit" variant='brand' disabled={applying}>
                                    {applying ? 'Submitting...' : 'Submit application'}
                                </Button>
                                <Button type="button" variant='outline' onClick={() => setShowApplyForm(false)}>Cancel</Button>
                            </div>                
                        </form>
                    )}
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
                    <div className="flex-1">
                        <p className="font-semibold text-sm text-ink">You're an approved author</p>
                        <p className="text-sm text-ink-muted mt-0.5">Your articles appear on Pinnacle Newspaper with your credentials.</p>
                        <Link href='/write' className="inline-block mt-3 text-sm font-semibold text-white bg-brand hover:bg-brand-dark px-4 py-2 rounded transition-colors ">Start writing → </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AccountClient
