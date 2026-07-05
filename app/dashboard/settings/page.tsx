import { DashboardShell } from "@/components/dashboard-shell";
import { Card, Input, Select } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user ? await supabase.from("profiles").select("*").eq("id", user.id).single() : { data: null };

  return (
    <DashboardShell phase={profile?.current_phase ?? 1}>
      <Card className="max-w-2xl">
        <h1 className="font-display text-6xl tracking-normal">Settings</h1>
        <div className="mt-6 space-y-4">
          <Input defaultValue={profile?.full_name ?? ""} placeholder="Name" />
          <Input defaultValue={profile?.industry ?? ""} placeholder="Industry" />
          <Select defaultValue={profile?.role ?? "Founder"}><option>Founder</option><option>Investor</option></Select>
        </div>
      </Card>
    </DashboardShell>
  );
}
