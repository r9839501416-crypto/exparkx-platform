import type { ComponentType } from "react";
import { Bot, BriefcaseBusiness, Building2, Clock, Code2, FileText, Globe2, Landmark, Megaphone, Mic2, Network, SearchCheck, Users } from "lucide-react";

export type JourneyModule = {
  id: string;
  title: string;
  phase: number;
  href: string;
  preview: string;
  icon: ComponentType<{ className?: string }>;
};

export const phaseModules: JourneyModule[] = [
  { id: "idea-validation", title: "Idea Validation", phase: 1, href: "/dashboard/idea-validation", preview: "Stress-test problem, market signal, and differentiation.", icon: SearchCheck },
  { id: "tech-explainer", title: "Tech Term Explainer", phase: 1, href: "/dashboard/execution", preview: "Translate build decisions into founder-ready execution language.", icon: Code2 },
  { id: "startup-ops", title: "Startup Operating Basics", phase: 1, href: "/dashboard/execution", preview: "Set the first operating rhythm without drifting into passive learning.", icon: BriefcaseBusiness },
  { id: "cofounder", title: "Virtual Co-Founder", phase: 2, href: "/dashboard/cofounder", preview: "Decision support, weekly nudges, and founder-specific context.", icon: Bot },
  { id: "team", title: "Team Building", phase: 2, href: "/dashboard/community", preview: "Find builders, operators, and co-founder candidates.", icon: Users },
  { id: "time", title: "Time Management", phase: 2, href: "/dashboard/execution", preview: "Convert limited founder time into a weekly execution system.", icon: Clock },
  { id: "mvp", title: "MVP / Website Support", phase: 3, href: "/dashboard/execution", preview: "Ship the product surface and launch path.", icon: Building2 },
  { id: "domain", title: "Domain & Digital Presence", phase: 3, href: "/dashboard/marketing", preview: "Turn the startup into a visible operating company.", icon: Globe2 },
  { id: "legal", title: "Legal Docs", phase: 3, href: "/dashboard/execution", preview: "Prepare the documents needed to operate and raise.", icon: FileText },
  { id: "investor", title: "Investor Access", phase: 4, href: "/investor", preview: "Make validated startups visible to the investor portal.", icon: Landmark },
  { id: "mock-pitch", title: "Mock Pitch", phase: 4, href: "/dashboard/mock-pitch", preview: "Practice and refine investor-ready pitches.", icon: Mic2 },
  { id: "execution-support", title: "Execution Support", phase: 4, href: "/dashboard/execution", preview: "Advance through launch, funding, and support milestones.", icon: Network },
  { id: "marketing", title: "Marketing Tool", phase: 4, href: "/dashboard/marketing", preview: "Generate free-channel campaigns and ready-to-post assets.", icon: Megaphone }
];

export const defaultMilestones = [
  { title: "Problem statement validated", phase: 1 },
  { title: "Competitor scan completed", phase: 1 },
  { title: "First 10 customer interviews logged", phase: 1 },
  { title: "Founder operating rhythm set", phase: 2 },
  { title: "Role gaps identified", phase: 2 },
  { title: "Technical co-founder search launched", phase: 2 },
  { title: "MVP scope locked", phase: 3 },
  { title: "Domain and landing surface shipped", phase: 3 },
  { title: "Legal entity checklist prepared", phase: 3 },
  { title: "Pitch delivered", phase: 4 },
  { title: "Investor visibility enabled", phase: 4 },
  { title: "Funding conversations started", phase: 4 }
];

export function priorityToPhase(priority: string) {
  const map: Record<string, number> = {
    "Validate my idea": 1,
    "Find a co-founder or team": 2,
    "Build my MVP": 3,
    "Get funded": 4
  };
  return map[priority] ?? 1;
}
