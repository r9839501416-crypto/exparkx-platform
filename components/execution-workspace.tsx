"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button, Card, Input, Select } from "@/components/ui";
import { track } from "@/lib/analytics";
import { defaultMilestones } from "@/lib/journey";

export function ExecutionWorkspace() {
  const [items, setItems] = useState(defaultMilestones.slice(0, 9).map((m, i) => ({ ...m, status: i < 2 ? "Done" : i < 4 ? "In progress" : "Not started" })));

  function update(index: number, status: string) {
    setItems((current) => current.map((item, i) => i === index ? { ...item, status } : item));
    if (status === "Done") track("Milestone Completed", { title: items[index].title });
  }

  function logWin(formData: FormData) {
    const title = String(formData.get("win"));
    setItems((current) => [{ title, phase: 1, status: "Done" }, ...current]);
    track("Execution Win Logged", { title });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <Card>
        <h1 className="font-display text-6xl tracking-normal">Execution System</h1>
        <div className="mt-6 divide-y-2 divide-ink border-y-2 border-ink">
          {items.map((item, index) => (
            <div key={`${item.title}-${index}`} className="grid gap-3 py-4 md:grid-cols-[1fr_190px] md:items-center">
              <div>
                <p className="font-black uppercase tracking-[0.08em]">{item.title}</p>
                <p className="mt-1 text-sm text-muted">Phase {item.phase} milestone</p>
              </div>
              <Select value={item.status} onChange={(e) => update(index, e.target.value)}>
                <option>Not started</option>
                <option>In progress</option>
                <option>Done</option>
              </Select>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h2 className="font-display text-4xl tracking-normal">Log a win</h2>
        <p className="mt-2 leading-7 text-neutral-700">Capture execution proof outside the preset milestone list.</p>
        <form action={logWin} className="mt-5 space-y-3">
          <Input name="win" placeholder="Example: First pilot call booked" required />
          <Button type="submit"><Plus className="h-4 w-4" /> Add Proof</Button>
        </form>
      </Card>
    </div>
  );
}
