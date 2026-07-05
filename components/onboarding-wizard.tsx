"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input, Select, Textarea } from "@/components/ui";
import { track } from "@/lib/analytics";
import { priorityToPhase } from "@/lib/journey";
import { createClient } from "@/lib/supabase/client";
import { phaseLabel } from "@/lib/utils";

const priorities = ["Validate my idea", "Find a co-founder or team", "Build my MVP", "Get funded"];

export function OnboardingWizard({ userId }: { userId: string }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    idea: "",
    industry: "",
    stage: "Idea only",
    founderType: "Solo founder",
    role: "",
    commitment: "Part-time",
    priority: "Validate my idea"
  });
  const [status, setStatus] = useState("");
  const router = useRouter();
  const supabase = createClient();
  const phase = useMemo(() => priorityToPhase(data.priority), [data.priority]);

  function update(key: keyof typeof data, value: string) {
    setData((current) => ({ ...current, [key]: value }));
  }

  async function finish() {
    setStatus("Saving founder operating profile...");
    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      role: "Founder",
      onboarding_completed: true,
      current_phase: phase,
      idea_summary: data.idea,
      industry: data.industry,
      stage: data.stage,
      founder_type: data.founderType,
      founder_role: data.role,
      time_commitment: data.commitment,
      priority: data.priority
    });

    if (!error) {
      await supabase.from("ideas").insert({
        founder_id: userId,
        title: data.idea.slice(0, 80) || "Untitled startup",
        one_liner: data.idea,
        industry: data.industry,
        stage: data.stage,
        visible_to_investors: phase >= 4
      });
      track("Onboarding Completed", { phase });
      router.push("/dashboard");
      return;
    }

    setStatus(error.message);
  }

  return (
    <main className="min-h-screen bg-panel px-5 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 border-2 border-ink bg-white p-4">
          <div className="flex justify-between text-xs font-black uppercase tracking-[0.16em]">
            {[1, 2, 3, 4].map((item) => <span key={item} className={item <= step ? "text-ink" : "text-muted"}>Step {item}</span>)}
          </div>
          <div className="mt-3 h-3 border-2 border-ink"><div className="h-full bg-ink" style={{ width: `${step * 25}%` }} /></div>
        </div>
        <Card className="shadow-hard">
          {step === 1 && (
            <div className="space-y-4">
              <h1 className="font-display text-6xl tracking-normal">About your idea</h1>
              <Textarea placeholder="One-line idea description" value={data.idea} onChange={(e) => update("idea", e.target.value)} />
              <Input placeholder="Industry / vertical" value={data.industry} onChange={(e) => update("industry", e.target.value)} />
              <Select value={data.stage} onChange={(e) => update("stage", e.target.value)}>
                {["Idea only", "Building", "Have users", "Fundraising"].map((item) => <option key={item}>{item}</option>)}
              </Select>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h1 className="font-display text-6xl tracking-normal">About you</h1>
              <Select value={data.founderType} onChange={(e) => update("founderType", e.target.value)}>
                <option>Solo founder</option>
                <option>Team</option>
              </Select>
              <Input placeholder="Your operating role" value={data.role} onChange={(e) => update("role", e.target.value)} />
              <Select value={data.commitment} onChange={(e) => update("commitment", e.target.value)}>
                <option>Part-time</option>
                <option>Full-time</option>
              </Select>
            </div>
          )}
          {step === 3 && (
            <div>
              <h1 className="font-display text-6xl tracking-normal">Your priority right now</h1>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {priorities.map((priority) => (
                  <button key={priority} type="button" onClick={() => update("priority", priority)} className={`border-2 border-ink p-5 text-left font-black uppercase tracking-[0.1em] ${data.priority === priority ? "bg-ink text-white" : "bg-white"}`}>
                    {priority}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <h1 className="font-display text-6xl tracking-normal">Your Founder Journey starts at Phase {phase}</h1>
              <p className="mt-3 text-lg font-bold">{phaseLabel(phase)}</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="border-2 border-ink p-4"><p className="font-black uppercase">Unlocks now</p><p className="mt-2 text-neutral-700">{data.priority}</p></div>
                <div className="border-2 border-line bg-panel p-4"><p className="font-black uppercase">Unlocks later</p><p className="mt-2 text-neutral-700">The full roadmap stays visible as your execution proof grows.</p></div>
              </div>
            </div>
          )}
          <div className="mt-8 flex justify-between gap-3">
            <Button type="button" variant="outline" disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>Back</Button>
            {step < 4 ? <Button type="button" onClick={() => setStep((s) => s + 1)}>Continue</Button> : <Button type="button" onClick={finish}>Enter Dashboard</Button>}
          </div>
          {status && <p className="mt-4 text-sm text-muted">{status}</p>}
        </Card>
      </div>
    </main>
  );
}
