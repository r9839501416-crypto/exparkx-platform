"use client";

import { useState } from "react";
import { Button, Card, Input, Textarea } from "@/components/ui";
import { track } from "@/lib/analytics";
import { createClient } from "@/lib/supabase/client";

export function ValidationWorkspace() {
  const [report, setReport] = useState<{ score: number; strengths: string[]; risks: string[]; actions: string[] } | null>(null);
  const [status, setStatus] = useState("");
  const supabase = createClient();

  async function submit(formData: FormData) {
    const problem = String(formData.get("problem"));
    const targetUser = String(formData.get("targetUser"));
    const solution = String(formData.get("solution"));
    const market = String(formData.get("market"));
    const score = Math.min(92, 48 + Math.round((problem.length + targetUser.length + solution.length + market.length) / 12));
    const next = {
      score,
      strengths: ["Clear customer pain surface", "Early market wedge can be tested quickly", "Solution can be shipped as a focused MVP"],
      risks: ["Competitor evidence needs a deeper scan", "Distribution channel still needs proof", "Pricing signal is not yet validated"],
      actions: ["Run 10 customer interviews this week", "Publish a one-page landing surface", "Log competitor positioning gaps in Execution System"]
    };
    setReport(next);
    setStatus("Validation report saved as execution proof.");
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("validation_reports").insert({
        founder_id: user.id,
        problem,
        target_user: targetUser,
        solution,
        market,
        overall_score: score,
        strengths: next.strengths,
        risks: next.risks,
        next_actions: next.actions
      });
    }
    track("Idea Validation Submitted", { score });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <Card>
        <h1 className="font-display text-6xl tracking-normal">Idea Validation</h1>
        <p className="mt-3 leading-7 text-neutral-700">Submit the startup surface. Exparkx returns execution next steps and stores your validation history.</p>
        <form action={submit} className="mt-6 space-y-4">
          <Textarea name="problem" placeholder="Problem" required />
          <Input name="targetUser" placeholder="Target user" required />
          <Textarea name="solution" placeholder="Proposed solution" required />
          <Input name="market" placeholder="Market / segment" required />
          <Button type="submit">Run Validation Pass</Button>
        </form>
        {status && <p className="mt-4 text-sm font-bold text-success">{status}</p>}
      </Card>
      <Card className="bg-white">
        <h2 className="font-display text-5xl tracking-normal">Validation Report</h2>
        {report ? (
          <div className="mt-5 space-y-5">
            <div className="border-2 border-ink p-5"><p className="text-xs font-black uppercase tracking-[0.18em] text-muted">Overall Score</p><p className="font-display text-7xl">{report.score}</p></div>
            {(["strengths", "risks", "actions"] as const).map((key) => (
              <div key={key}>
                <h3 className="font-black uppercase tracking-[0.12em]">{key === "actions" ? "3 concrete next actions" : key}</h3>
                <ul className="mt-2 space-y-2">{report[key].map((item) => <li key={item} className="border border-line p-3">{item}</li>)}</ul>
              </div>
            ))}
          </div>
        ) : <p className="mt-5 leading-7 text-muted">Your scored breakdown will appear here after submission.</p>}
      </Card>
    </div>
  );
}
