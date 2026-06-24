import { createServerClient } from "@/lib/supabase/server";
import LoginForm from "@/components/admin/LoginForm";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) return <LoginForm />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {children}
    </div>
  );
}
