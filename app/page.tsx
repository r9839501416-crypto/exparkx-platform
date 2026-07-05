import { ArrowRight, CheckCircle2, Gauge, LockKeyhole, Workflow } from "lucide-react";
import { CircuitTreeMark } from "@/components/logo";
import { Badge, Card, LinkButton, SectionTitle } from "@/components/ui";
import { phaseModules } from "@/lib/journey";

export default function LandingPage() {
  return (
    <main>
      <header className="border-b-2 border-ink bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <CircuitTreeMark />
          <nav className="hidden items-center gap-6 text-sm font-bold uppercase tracking-[0.12em] md:flex">
            <a href="#system" className="hover:underline">System</a>
            <a href="#journey" className="hover:underline">Journey</a>
            <a href="#proof" className="hover:underline">Proof</a>
            <a href="/pricing" className="hover:underline">Pricing</a>
          </nav>
          <LinkButton href="/auth" className="hidden sm:inline-flex">Enter Platform</LinkButton>
        </div>
      </header>

      <section className="grid-paper border-b-2 border-ink">
        <div className="mx-auto grid min-h-[calc(100vh-82px)] max-w-7xl content-center gap-10 px-5 py-16 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <Badge>Operating System for Startups</Badge>
            <h1 className="mt-6 max-w-4xl font-display text-7xl leading-[0.88] tracking-normal md:text-9xl">The All-In-One Startup Ecosystem</h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-neutral-700">
              Exparkx is execution infrastructure for early-stage founders: AI co-founder, expert services, investor flow, and milestone tracking from idea to company.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/auth">Build and Launch <ArrowRight className="h-4 w-4" /></LinkButton>
              <LinkButton href="/pricing" variant="outline">View Pricing</LinkButton>
            </div>
          </div>
          <div className="border-2 border-ink bg-white shadow-hard">
            <div className="border-b-2 border-ink px-5 py-3 text-xs font-black uppercase tracking-[0.18em]">Execution Command Feed</div>
            <div className="divide-y-2 divide-ink">
              {["Idea validated", "MVP scope locked", "First 10 users targeted", "Pitch material reviewed"].map((item, index) => (
                <div key={item} className="flex items-center justify-between p-5">
                  <div>
                    <p className="font-black uppercase tracking-[0.08em]">{item}</p>
                    <p className="mt-1 text-sm text-muted">Execution proof captured</p>
                  </div>
                  <span className="font-display text-5xl">{String(index + 1).padStart(2, "0")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="system" className="border-b-2 border-ink px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Infrastructure, not instruction" title="Founders come here to execute." copy="Every surface is organized around what has been built, shipped, launched, validated, and funded." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ["End-to-end coverage", "The idea-to-company journey lives in one operating system."],
              ["Journey-aware UI", "Features unlock as the founder advances through real execution phases."],
              ["Outcome tracking", "Milestones replace passive completion signals."],
            ].map(([title, copy]) => (
              <Card key={title}>
                <CheckCircle2 className="h-7 w-7" />
                <h3 className="mt-8 font-display text-4xl tracking-normal">{title}</h3>
                <p className="mt-3 leading-7 text-neutral-700">{copy}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="journey" className="border-b-2 border-ink bg-panel px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Founder journey" title="The roadmap is visible before it unlocks." />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((phase) => (
              <Card key={phase} className="bg-white">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-muted">Phase {phase}</p>
                <h3 className="mt-2 font-display text-4xl tracking-normal">{phase === 4 ? "Month 5+" : phase === 3 ? "Weeks 9-16" : phase === 2 ? "Weeks 4-8" : "Weeks 1-3"}</h3>
                <ul className="mt-5 space-y-3">
                  {phaseModules.filter((module) => module.phase === phase).slice(0, 3).map((module) => (
                    <li key={module.id} className="flex gap-2 text-sm"><LockKeyhole className="mt-0.5 h-4 w-4" /> {module.title}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="proof" className="px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <Card className="bg-ink text-white">
            <Workflow className="h-8 w-8" />
            <h2 className="mt-8 font-display text-6xl tracking-normal">AI co-founder plus expert services.</h2>
            <p className="mt-4 text-lg leading-8 text-neutral-300">The system remembers founder context, pushes the next build step, and makes execution visible to investors.</p>
          </Card>
          <Card>
            <Gauge className="h-8 w-8" />
            <h2 className="mt-8 font-display text-6xl tracking-normal">Track companies built, launched, and funded.</h2>
            <p className="mt-4 text-lg leading-8 text-neutral-700">Exparkx measures progress by shipped milestones, not content consumption.</p>
          </Card>
        </div>
      </section>
    </main>
  );
}
