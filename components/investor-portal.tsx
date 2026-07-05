"use client";

import { useState } from "react";
import { Button, Card, Input, Select } from "@/components/ui";
import { track } from "@/lib/analytics";

type Idea = {
  id?: string;
  title?: string;
  one_liner?: string;
  industry?: string;
  stage?: string;
  ask_size?: string;
  location?: string;
  profiles?: { full_name?: string; current_phase?: number } | null;
};

const demoIdeas: Idea[] = [
  { title: "Ops layer for AI agencies", one_liner: "A tracked execution system for small AI service teams.", industry: "AI tooling", stage: "Have users", ask_size: "$250K", location: "Remote", profiles: { full_name: "Demo Founder", current_phase: 4 } },
  { title: "Credit workflow for exporters", one_liner: "Automates documentation proof for export financing.", industry: "Fintech", stage: "Fundraising", ask_size: "$500K", location: "Mumbai", profiles: { full_name: "Demo Founder", current_phase: 4 } }
];

export function InvestorPortal({ ideas }: { ideas: Idea[] }) {
  const [selected, setSelected] = useState<Idea | null>((ideas[0] ?? demoIdeas[0]));
  const feed = ideas.length ? ideas : demoIdeas;

  return (
    <main className="min-h-screen bg-panel">
      <header className="border-b-2 border-ink bg-white px-5 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="font-display text-5xl tracking-normal">Best Ideas to Get Funded</h1>
          <p className="hidden text-xs font-black uppercase tracking-[0.18em] text-muted md:block">Investor diligence portal</p>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <div className="grid gap-3 md:grid-cols-4">
            <Input placeholder="Industry" />
            <Select><option>Any stage</option><option>Have users</option><option>Fundraising</option></Select>
            <Input placeholder="Ask size" />
            <Input placeholder="Location" />
          </div>
          <div className="mt-6 space-y-4">
            {feed.map((idea) => (
              <button key={idea.title} onClick={() => setSelected(idea)} className="block w-full border-2 border-ink bg-white p-4 text-left hover:bg-panel">
                <h2 className="font-display text-4xl tracking-normal">{idea.title}</h2>
                <p className="mt-2 leading-7 text-neutral-700">{idea.one_liner}</p>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-muted">{idea.industry} | {idea.stage} | {idea.ask_size}</p>
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="font-display text-6xl tracking-normal">{selected?.title}</h2>
          <p className="mt-3 text-lg leading-8 text-neutral-700">{selected?.one_liner}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="border-2 border-ink p-4"><p className="text-xs font-black uppercase">Validation Score</p><p className="font-display text-5xl">84</p></div>
            <div className="border-2 border-ink p-4"><p className="text-xs font-black uppercase">Phase</p><p className="font-display text-5xl">{selected?.profiles?.current_phase ?? 4}</p></div>
            <div className="border-2 border-ink p-4"><p className="text-xs font-black uppercase">Milestones</p><p className="font-display text-5xl">9</p></div>
          </div>
          <div className="mt-6 border-y-2 border-ink py-5">
            <h3 className="font-black uppercase tracking-[0.12em]">Guided investment flow</h3>
            {["Review idea", "Ask AI diligence questions", "Indicate interest / term sheet stage", "Connect with founder"].map((step, index) => (
              <div key={step} className="mt-3 flex items-center justify-between border border-line p-3">
                <span>{index + 1}. {step}</span>
                <Button variant="outline" onClick={() => track("Investor Interest Submitted", { step })}>Start</Button>
              </div>
            ))}
          </div>
          <p className="leading-7 text-neutral-700">The AI diligence assistant answers basic questions from stored validation reports, milestones, team context, and pitch material, reducing investor back-and-forth without a third-party intermediary.</p>
        </Card>
      </div>
    </main>
  );
}
