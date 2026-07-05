import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Badge, Card, LinkButton } from "@/components/ui";
import { phaseModules, defaultMilestones } from "@/lib/journey";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user ? await supabase.from("profiles").select("*").eq("id", user.id).single() : { data: null };
  const phase = profile?.current_phase ?? 1;
  const { data: milestones } = user ? await supabase.from("milestones").select("*").eq("founder_id", user.id).order("created_at") : { data: null };
  const tracker = milestones?.length ? milestones : defaultMilestones.map((m, i) => ({ id: i, title: m.title, status: i < 3 ? "done" : i < 6 ? "in_progress" : "not_started", phase: m.phase }));

  return (
    <DashboardShell phase={phase}>
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-muted">Command center</p>
        <h1 className="font-display text-7xl tracking-normal">Build status, not busywork.</h1>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-4 md:grid-cols-2">
          {phaseModules.map((module) => {
            const active = module.phase <= phase;
            const Icon = module.icon;
            const content = (
              <Card className={active ? "min-h-56" : "min-h-56 bg-neutral-100 text-muted"}>
                <div className="flex items-start justify-between gap-3">
                  <Icon className="h-7 w-7" />
                  <Badge tone={active ? "success" : "locked"}>{active ? "Active" : `Unlocks Phase ${module.phase}`}</Badge>
                </div>
                <h2 className="mt-10 font-display text-4xl tracking-normal">{module.title}</h2>
                <p className="mt-3 leading-7">{module.preview}</p>
                {!active && <p className="mt-5 flex gap-2 text-sm font-bold"><LockKeyhole className="h-4 w-4" /> Visible roadmap, locked until execution phase advances.</p>}
              </Card>
            );
            return active ? <Link key={module.id} href={module.href}>{content}</Link> : <div key={module.id}>{content}</div>;
          })}
        </div>
        <aside className="space-y-5">
          <Card>
            <h2 className="font-display text-4xl tracking-normal">Execution Tracker</h2>
            <div className="mt-5 space-y-3">
              {tracker.slice(0, 8).map((milestone) => (
                <div key={milestone.id} className="border border-line p-3">
                  <p className="font-bold">{milestone.title}</p>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-muted">{String(milestone.status).replace("_", " ")}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="bg-ink text-white">
            <h2 className="font-display text-4xl tracking-normal">Next concrete move</h2>
            <p className="mt-3 leading-7 text-neutral-300">Complete the highest-priority active milestone, then log the execution proof.</p>
            <LinkButton href="/dashboard/execution" variant="outline" className="mt-5 border-white text-white hover:bg-white hover:text-ink">Open Execution</LinkButton>
          </Card>
        </aside>
      </div>
    </DashboardShell>
  );
}
