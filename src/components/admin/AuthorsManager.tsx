'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PinnacleLogo } from '@/components/ui/PinnacleLogo'
import { initials } from '@/lib/utils'
import type { Author } from '@/types'

export function AuthorsManager({ authors }: { authors: Author[] }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [saving,   setSaving]   = useState(false)

  const [form, setForm] = useState({
    name: '', title: '', institution: '', bio: '', expertise: '',
  })

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.title || !form.institution) {
      toast.error('Name, title, and institution are required.')
      return
    }
    setSaving(true)
    const res = await fetch('/api/admin/authors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        expertise: form.expertise.split(',').map(s => s.trim()).filter(Boolean),
      }),
    })
    const data = await res.json()
    setSaving(false)
    if (!res.ok) { toast.error(data.error ?? 'Failed to create author.'); return }
    toast.success('Author created!')
    setForm({ name: '', title: '', institution: '', bio: '', expertise: '' })
    setShowForm(false)
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white px-6 py-3 flex items-center gap-5">
        <PinnacleLogo variant="white" height={28} />
        <Link href="/admin" className="text-blue-200 text-sm hover:text-white transition-colors">← Dashboard</Link>
        <span className="text-blue-300 text-sm">Authors</span>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-2xl font-bold text-ink">Authors</h1>
          <Button variant="navy" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New author'}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-serif text-lg">New author</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Full name *</Label>
                  <Input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Dr. Amaka Okafor" required />
                </div>
                <div className="space-y-1.5">
                  <Label>Title / position *</Label>
                  <Input value={form.title} onChange={e => update('title', e.target.value)} placeholder="Professor of Political Economy" required />
                </div>
                <div className="space-y-1.5">
                  <Label>Institution *</Label>
                  <Input value={form.institution} onChange={e => update('institution', e.target.value)} placeholder="University of Lagos" required />
                </div>
                <div className="space-y-1.5">
                  <Label>Expertise (comma separated)</Label>
                  <Input value={form.expertise} onChange={e => update('expertise', e.target.value)} placeholder="Fiscal Policy, Public Finance" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label>Bio</Label>
                  <Textarea value={form.bio} onChange={e => update('bio', e.target.value)} rows={3} placeholder="Short biography…" />
                </div>
                <div className="md:col-span-2 flex gap-3">
                  <Button type="submit" variant="navy" disabled={saving}>
                    {saving ? 'Creating…' : 'Create author'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {authors.length === 0 ? (
          <div className="bg-white border border-rule rounded-lg p-10 text-center text-ink-muted">
            <p className="font-serif mb-3">No authors yet.</p>
            <Button variant="navy" onClick={() => setShowForm(true)}>Add your first author</Button>
          </div>
        ) : (
          <div className="space-y-3">
            {authors.map(a => (
              <div key={a.id} className="bg-white border border-rule rounded-lg p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-ink-muted shrink-0">
                  {initials(a.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-ink">{a.name}</p>
                  <p className="text-[13px] text-ink-muted">{a.title}, {a.institution}</p>
                  {a.expertise?.length > 0 && (
                    <p className="text-[11px] text-ink-faint mt-1">{a.expertise.join(', ')}</p>
                  )}
                </div>
                <Link href={`/authors/${a.slug}`} target="_blank" className="text-[12px] text-brand hover:underline shrink-0">
                  View →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
