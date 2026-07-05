import Link from "next/link";
import type { ReactNode } from "react";
import { BarChart3, Bot, CheckSquare, Landmark, Megaphone, Mic2, SearchCheck, Settings, Users } from "lucide-react";
import { CircuitTreeMark } from "@/components/logo";
import { Badge } from "@/components/ui";
import { phaseLabel } from "@/lib/utils";

const nav = [
  ["Dashboard", "/dashboard", BarChart3],
  ["Idea Validation", "/dashboard/idea-validation", SearchCheck],
  ["Virtual Co-Founder", "/dashboard/cofounder", Bot],
  ["Execution System", "/dashboard/execution", CheckSquare],
  ["Mock Pitch", "/dashboard/mock-pitch", Mic2],
  ["Community", "/dashboard/community", Users],
  ["Marketing Tool", "/dashboard/marketing", Megaphone],
  ["Investor Access", "/investor", Landmark],
  ["Settings", "/dashboard/settings", Settings]
] as const;

export function DashboardShell({ children, phase = 1 }: { children: ReactNode; phase?: number }) {
  return (
    <div className="min-h-screen bg-panel lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-b-2 border-ink bg-white p-5 lg:min-h-screen lg:border-b-0 lg:border-r-2">
        <CircuitTreeMark />
        <nav className="mt-8 grid gap-2">
          {nav.map(([label, href, Icon]) => (
            <Link key={href} href={href} className="focus-ring flex items-center gap-3 border border-line px-3 py-3 text-sm font-black uppercase tracking-[0.1em] hover:border-ink hover:bg-panel">
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
        </nav>
      </aside>
      <section>
        <header className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink bg-white px-5 py-4">
          <Badge>{phaseLabel(phase)}</Badge>
          <div className="text-xs font-black uppercase tracking-[0.18em] text-muted">Account / Profile</div>
        </header>
        <div className="p-5 lg:p-8">{children}</div>
      </section>
    </div>
  );
}
