export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function phaseLabel(phase: number) {
  const labels: Record<number, string> = {
    1: "Phase 1 | Weeks 1-3",
    2: "Phase 2 | Weeks 4-8",
    3: "Phase 3 | Weeks 9-16",
    4: "Phase 4 | Month 5+"
  };
  return labels[phase] ?? labels[1];
}
