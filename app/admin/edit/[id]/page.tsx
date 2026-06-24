import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import PostForm from "@/components/admin/PostForm";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Edit Post</h1>
      <PostForm initial={post} />
    </div>
  );
}
