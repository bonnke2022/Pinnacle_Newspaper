'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapImage from '@tiptap/extension-image'
import TiptapLink from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { PinnacleLogo } from '@/components/ui/PinnacleLogo'
import type { ArticleFull, Author, Category } from '@/types'

interface EditorProps {
  article?: ArticleFull
  authors: Author[]
  categories: Category[]
}

export function ArticleEditor({ article, authors, categories }: EditorProps) {
  const router = useRouter()
  const isEdit = !!article

  const [title,      setTitle]      = useState(article?.title ?? '')
  const [excerpt,    setExcerpt]    = useState(article?.excerpt ?? '')
  const [authorId,   setAuthorId]   = useState(article?.author_id ?? '')
  const [categoryId, setCategoryId] = useState(article?.category_id ?? '')
  const [status,     setStatus]     = useState<'draft'|'published'>(article?.status ?? 'draft')
  const [disclosure, setDisclosure] = useState(article?.disclosure ?? '')
  const [isBreaking, setIsBreaking] = useState(article?.is_breaking ?? false)
  const [coverImage, setCoverImage] = useState(article?.cover_image ?? '')
  const [saving,     setSaving]     = useState(false)
  const [uploading,  setUploading]  = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapImage.configure({ inline: false }),
      TiptapLink.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Write your article here…' }),
    ],
    content: article?.body ?? '',
    editorProps: {
      attributes: {
        class: 'min-h-[500px] focus:outline-none font-serif text-[17px] leading-relaxed text-ink',
      },
    },
  })

  async function uploadImage(file: File): Promise<string | null> {
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
    const data = await res.json()
    return data.url ?? null
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const url = await uploadImage(file)
    if (url) setCoverImage(url)
    setUploading(false)
  }

  async function save() {
    if (!title.trim() || !excerpt.trim() || !authorId || !categoryId) {
      toast.error('Title, excerpt, author, and category are required.')
      return
    }
    if (!editor) return
    setSaving(true)

    const payload = { title, excerpt, body: editor.getJSON(), authorId, categoryId, status, disclosure, isBreaking, coverImage }
    const url    = isEdit ? `/api/admin/articles/${article!.id}` : '/api/admin/articles'
    const method = isEdit ? 'PUT' : 'POST'

    const res  = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    setSaving(false)

    if (!res.ok) { toast.error(data.error ?? 'Save failed.'); return }

    toast.success(status === 'published' ? 'Article published!' : 'Draft saved.')
    router.push('/admin')
    router.refresh()
  }

  async function handleDelete() {
    const res = await fetch(`/api/admin/articles/${article!.id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Article deleted.'); router.push('/admin'); router.refresh() }
    else toast.error('Delete failed.')
  }

  const toolbarBtns = [
    { label: 'B',  fn: () => editor?.chain().focus().toggleBold().run(),                   active: () => !!editor?.isActive('bold') },
    { label: 'I',  fn: () => editor?.chain().focus().toggleItalic().run(),                 active: () => !!editor?.isActive('italic') },
    { label: 'H2', fn: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),   active: () => !!editor?.isActive('heading', { level: 2 }) },
    { label: 'H3', fn: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),   active: () => !!editor?.isActive('heading', { level: 3 }) },
    { label: '"',  fn: () => editor?.chain().focus().toggleBlockquote().run(),             active: () => !!editor?.isActive('blockquote') },
    { label: 'UL', fn: () => editor?.chain().focus().toggleBulletList().run(),             active: () => !!editor?.isActive('bulletList') },
    { label: 'OL', fn: () => editor?.chain().focus().toggleOrderedList().run(),            active: () => !!editor?.isActive('orderedList') },
    { label: '—',  fn: () => editor?.chain().focus().setHorizontalRule().run(),            active: () => false },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-navy text-white px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-5">
          <PinnacleLogo variant="white" height={28} />
          <a href="/admin" className="text-blue-200 text-sm hover:text-white transition-colors">← Articles</a>
          <span className="text-blue-300 text-sm">{isEdit ? 'Edit article' : 'New article'}</span>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={e => setStatus(e.target.value as 'draft' | 'published')}
            className="text-sm bg-white/10 border border-white/20 text-white rounded px-2 py-1.5 focus:outline-none"
          >
            <option value="draft" className="text-ink">Draft</option>
            <option value="published" className="text-ink">Published</option>
          </select>
          <Button onClick={save} disabled={saving} variant="brand" size="sm">
            {saving ? 'Saving…' : status === 'published' ? 'Publish' : 'Save draft'}
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        {/* Editor */}
        <div className="space-y-5">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Article title…"
            className="w-full text-3xl font-serif font-bold text-ink border-none focus:outline-none bg-transparent placeholder:text-ink-faint"
          />
          <textarea
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            placeholder="Standfirst — one or two sentences that hook the reader…"
            rows={2}
            className="w-full font-serif text-[17px] text-ink-light border-none focus:outline-none bg-transparent resize-none placeholder:text-ink-faint leading-relaxed"
          />

          {/* Toolbar */}
          {editor && (
            <div className="flex flex-wrap items-center gap-1 p-2 bg-white border border-rule rounded sticky top-[68px] z-10">
              {toolbarBtns.map(({ label, fn, active }) => (
                <button key={label} type="button" onClick={fn}
                  className={`px-2.5 py-1 text-sm rounded font-medium transition-colors ${active() ? 'bg-navy text-white' : 'text-ink-light hover:bg-gray-100'}`}>
                  {label}
                </button>
              ))}
              <div className="w-px h-5 bg-rule mx-1" />
              <label className="px-2.5 py-1 text-sm rounded text-ink-light hover:bg-gray-100 cursor-pointer transition-colors" title="Insert image">
                IMG
                <input type="file" accept="image/*" className="hidden" onChange={async e => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  const url = await uploadImage(file)
                  if (url) editor.chain().focus().setImage({ src: url }).run()
                }} />
              </label>
            </div>
          )}

          <div className="bg-white border border-rule rounded-lg p-6 min-h-[500px]">
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <div className="bg-white border border-rule rounded-lg p-5 space-y-4">
            <p className="font-semibold text-sm text-ink">Article details</p>

            <div className="space-y-1.5">
              <Label>Author *</Label>
              <select value={authorId} onChange={e => setAuthorId(e.target.value)} className="field text-sm">
                <option value="">Select author…</option>
                {authors.map(a => <option key={a.id} value={a.id}>{a.name} — {a.institution}</option>)}
              </select>
              <a href="/admin/authors" target="_blank" className="text-[11px] text-brand hover:underline">+ Add new author</a>
            </div>

            <div className="space-y-1.5">
              <Label>Category *</Label>
              <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="field text-sm">
                <option value="">Select category…</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label>Cover image</Label>
              {coverImage && (
                <img src={coverImage} alt="Cover preview" className="w-full aspect-video object-cover rounded mb-2" />
              )}
              <label className="flex items-center justify-center gap-2 w-full border border-rule rounded px-3 py-2 text-sm text-ink-muted hover:bg-gray-50 cursor-pointer transition-colors">
                {uploading ? 'Uploading…' : coverImage ? 'Change image' : 'Upload image'}
                <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
              </label>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="breaking" className="cursor-pointer">Breaking news</Label>
              <Switch id="breaking" checked={isBreaking} onCheckedChange={setIsBreaking} />
            </div>
          </div>

          <div className="bg-white border border-rule rounded-lg p-5 space-y-1.5">
            <Label>Disclosure statement</Label>
            <Textarea
              value={disclosure}
              onChange={e => setDisclosure(e.target.value)}
              rows={4}
              placeholder="e.g. The author declares no conflict of interest…"
            />
            <p className="text-[11px] text-ink-faint">Required by editorial standards. Shown at the bottom of the article.</p>
          </div>

          {isEdit && (
            <div className="bg-white border border-rule rounded-lg p-5">
              {deleteConfirm ? (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-ink">Delete this article? This cannot be undone.</p>
                  <div className="flex gap-2">
                    <Button variant="destructive" size="sm" onClick={handleDelete}>Delete</Button>
                    <Button variant="outline" size="sm" onClick={() => setDeleteConfirm(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirm(true)} className="text-[13px] text-ink-faint hover:text-destructive transition-colors">
                  Delete article…
                </button>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
