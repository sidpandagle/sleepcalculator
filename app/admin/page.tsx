import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/supabase/types";

type PostListItem = Pick<Post, "id" | "title" | "slug" | "published" | "created_at">;

export default async function AdminDashboard() {
  const supabase = createServerClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, published, created_at")
    .order("created_at", { ascending: false }) as unknown as { data: PostListItem[] | null };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Posts</h1>
        <Link
          href="/admin/new"
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
        >
          + New Post
        </Link>
      </div>
      <div className="space-y-3">
        {(posts ?? []).map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4"
          >
            <div>
              <p className="font-medium text-white">{post.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">/{post.slug}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  post.published
                    ? "bg-green-500/20 text-green-400"
                    : "bg-amber-500/20 text-amber-400"
                }`}
              >
                {post.published ? "Published" : "Draft"}
              </span>
              <Link
                href={`/admin/edit/${post.id}`}
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
        {(!posts || posts.length === 0) && (
          <p className="text-center text-slate-500 py-12">No posts yet. Create your first one!</p>
        )}
      </div>
    </div>
  );
}
