import type { ReactNode } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { createClient } from "@/lib/supabase/server";

export async function ModuleFrame({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user ? await supabase.from("profiles").select("current_phase").eq("id", user.id).single() : { data: null };
  return <DashboardShell phase={profile?.current_phase ?? 1}>{children}</DashboardShell>;
}
