import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { Post, PostUpdate } from "@/lib/supabase/types";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body: PostUpdate = await req.json();
  const { data, error } = await supabase
    .from("posts")
    .update(body as never)
    .eq("id", params.id)
    .select()
    .single() as unknown as { data: Post | null; error: { message: string } | null };
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase.from("posts").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
