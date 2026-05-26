"use client";

import { initials } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface PendingAuthor {
    id: string;
    full_name: string | null;
    title: string | null;
    institution: string | null;
    bio: string | null;
    expertise: string[] | null;
    role: string;
}

const PendingAuthors = () => {
    const [pending, setPending] = useState<PendingAuthor[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchPending() {
        const res = await fetch('/api/admin/pending-authors');
        const data = await res.json();
        setPending(data ?? []);
        setLoading(false);
    }

    useEffect(() => {
        fetchPending();
    }, []);

    async function approve(id: string) {
        const res = await fetch('/api/admin/approve-author', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id, action: 'approve'}),
        });
        if(res.ok) {
            toast.success('Author approved.')
            fetchPending();
        } else {
            toast.error('Failed to approve.')
        }
    }

    async function reject(id: string) {
        const res = await fetch('/api/admin/approve-author', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id, action: 'reject'}),
        });
        if(res.ok){
            toast.success('Application rejected');
            fetchPending();
        } else {
            toast.error('Failed to reject');
        }
    }

    if(loading) return null;

    if(pending.length === 0) return (
        <div className="mt-6 bg-white border border-rule rounded-lg p-5">
            <p className="text-sm font-semibold text-ink mb-1">Pending author applications</p>
            <p className="text-[13px] text-ink-muted">No pending applications</p>
        </div>
    )
  return (
     <div className="mt-6 bg-white border border-rule rounded-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-rule">
        <p className="text-sm font-semibold text-ink">
          Pending author applications
          <span className="ml-2 bg-brand text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
            {pending.length}
          </span>
        </p>
      </div>
      <div className="divide-y divide-rule">
        {pending.map(p => (
          <div key={p.id} className="px-5 py-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-ink-muted shrink-0 mt-0.5">
              {initials(p.full_name ?? 'U')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-ink">{p.full_name ?? 'Unnamed user'}</p>
              {p.title && p.institution && (
                <p className="text-[13px] text-ink-muted mt-0.5">
                  {p.title}, <span className="font-medium text-ink">{p.institution}</span>
                </p>
              )}
              {p.bio && (
                <p className="text-[13px] text-ink-light mt-2 leading-relaxed line-clamp-3">{p.bio}</p>
              )}
              {p.expertise && p.expertise.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {p.expertise.map(e => (
                    <span key={e} className="text-[11px] px-2 py-0.5 border border-rule rounded-full text-ink-muted">
                      {e}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="navy" size="sm" onClick={() => approve(p.id)}>Approve</Button>
              <Button variant="outline" size="sm" onClick={() => reject(p.id)}>Reject</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PendingAuthors
