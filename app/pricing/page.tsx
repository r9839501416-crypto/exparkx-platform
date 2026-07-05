import { Check } from "lucide-react";
import { CircuitTreeMark } from "@/components/logo";
import { Badge, Card, LinkButton, SectionTitle } from "@/components/ui";

const tiers = [
  { name: "Starter", price: "Free", copy: "Entry point for validation and founder community.", features: ["Idea validation", "Limited co-founder chat", "Community access"] },
  { name: "Builder", price: "$49/mo", copy: "Full execution system for active builders.", features: ["Unlimited virtual co-founder", "MVP / website support", "Phase-based milestones"], popular: true },
  { name: "Funded", price: "$149/mo", copy: "Investor readiness and growth infrastructure.", features: ["Investor access", "Mock pitch", "Marketing lead tool", "Priority execution support"] },
  { name: "Enterprise", price: "Custom", copy: "For accelerators and universities.", features: ["Multi-founder seats", "Admin controls", "Custom onboarding"] }
];

export default function PricingPage() {
  return (
    <main>
      <header className="border-b-2 border-ink px-5 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <CircuitTreeMark />
          <LinkButton href="/auth">Start Building</LinkButton>
        </div>
      </header>
      <section className="grid-paper border-b-2 border-ink px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Pricing" title="Pay for execution capacity, not access to information." copy="Choose the operating layer that matches your current company build stage." />
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {tiers.map((tier) => (
              <Card key={tier.name} className={tier.popular ? "bg-ink text-white shadow-hard" : ""}>
                <div className="flex min-h-8 items-center justify-between gap-3">
                  <h2 className="font-display text-4xl tracking-normal">{tier.name}</h2>
                  {tier.popular && <Badge>Most Popular</Badge>}
                </div>
                <p className="mt-4 font-display text-5xl tracking-normal">{tier.price}</p>
                <p className={`mt-3 min-h-14 leading-7 ${tier.popular ? "text-neutral-300" : "text-neutral-700"}`}>{tier.copy}</p>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm"><Check className="mt-0.5 h-4 w-4" /> {feature}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="border-b-2 border-ink px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[0.85fr_1.15fr]">
          <Card className="bg-ink text-white">
            <h2 className="font-display text-6xl tracking-normal">Execution-for-Equity</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-300">Exparkx can build MVPs and operating systems in exchange for minority equity, aligning platform upside with founder outcomes.</p>
          </Card>
          <Card>
            <h3 className="font-display text-4xl tracking-normal">Additional platform revenue rails</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {["Marketplace commissions: 10-15%", "Investor deal flow fees", "Exparkx Cohorts: $1.5K-$3K per seat"].map((item) => (
                <div key={item} className="border border-line p-4 text-sm font-bold">{item}</div>
              ))}
            </div>
          </Card>
        </div>
      </section>
      <section className="px-5 py-16">
        <div className="mx-auto max-w-4xl">
          <SectionTitle eyebrow="FAQ" title="Operational questions." />
          <div className="mt-8 divide-y-2 divide-ink border-y-2 border-ink">
            {[
              ["What happens when I upgrade mid-phase?", "Your unlocked execution surface expands immediately while your current milestones and phase stay intact."],
              ["Is Free enough to complete Phase 1?", "Yes. Starter is designed to validate an idea and capture early proof before paid execution support becomes useful."],
              ["How does Execution-for-Equity work?", "Exparkx reviews the startup, scopes build support, and may exchange MVP and systems execution for minority equity through a separate agreement."]
            ].map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="cursor-pointer font-black uppercase tracking-[0.1em]">{q}</summary>
                <p className="mt-3 leading-7 text-neutral-700">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
