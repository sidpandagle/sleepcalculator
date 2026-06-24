"use client";
import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useRouter } from "next/navigation";

interface PostFormProps {
  initial?: {
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    meta_description: string;
    published: boolean;
  };
}

export default function PostForm({ initial }: PostFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [metaDesc, setMetaDesc] = useState(initial?.meta_description ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false })],
    content: initial?.content ?? "",
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none min-h-[300px] focus:outline-none p-4",
      },
    },
  });

  function generateSlug(t: string) {
    return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const body = {
      title,
      slug,
      excerpt,
      content: editor?.getHTML() ?? "",
      meta_description: metaDesc,
      published,
    };
    const url = initial?.id ? `/api/admin/posts/${initial.id}` : "/api/admin/posts";
    const method = initial?.id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to save");
      setSaving(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm text-slate-400 mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!initial?.id) setSlug(generateSlug(e.target.value));
          }}
          className={inputClass}
          placeholder="Post title"
        />
      </div>
      <div>
        <label className="block text-sm text-slate-400 mb-1">Slug</label>
        <input value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass} placeholder="post-slug" />
      </div>
      <div>
        <label className="block text-sm text-slate-400 mb-1">Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className={inputClass}
          placeholder="Short summary shown on blog index"
        />
      </div>
      <div>
        <label className="block text-sm text-slate-400 mb-1">Meta Description (SEO)</label>
        <textarea
          value={metaDesc}
          onChange={(e) => setMetaDesc(e.target.value)}
          rows={2}
          className={inputClass}
          placeholder="160 character max for Google search results"
          maxLength={160}
        />
        <p className="text-xs text-slate-500 mt-1">{metaDesc.length}/160</p>
      </div>
      <div>
        <label className="block text-sm text-slate-400 mb-1">Content</label>
        <div className="rounded-xl border border-white/20 bg-white/5 min-h-[350px]">
          {/* TipTap toolbar */}
          <div className="flex gap-2 p-2 border-b border-white/10 flex-wrap">
            {[
              { label: "B", action: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive("bold") },
              { label: "I", action: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive("italic") },
              { label: "H2", action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), active: editor?.isActive("heading", { level: 2 }) },
              { label: "H3", action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(), active: editor?.isActive("heading", { level: 3 }) },
              { label: "• List", action: () => editor?.chain().focus().toggleBulletList().run(), active: editor?.isActive("bulletList") },
              { label: "1. List", action: () => editor?.chain().focus().toggleOrderedList().run(), active: editor?.isActive("orderedList") },
            ].map(({ label, action, active }) => (
              <button
                key={label}
                type="button"
                onClick={action}
                className={`px-3 py-1 text-xs rounded font-mono transition-colors ${
                  active ? "bg-indigo-600 text-white" : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <EditorContent editor={editor} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-white/20 peer-checked:bg-indigo-600 rounded-full transition-colors" />
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
        </label>
        <span className="text-sm text-slate-300">{published ? "Published" : "Draft"}</span>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : initial?.id ? "Update Post" : "Create Post"}
        </button>
        <button
          onClick={() => router.push("/admin")}
          className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
